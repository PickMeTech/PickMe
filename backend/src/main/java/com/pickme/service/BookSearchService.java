package com.pickme.service;

import com.pickme.dto.book.BookDTO;
import com.pickme.logging.Loggable;
import com.pickme.proxy.CachingAuthProxy;
import org.json.JSONArray;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.logging.LogLevel;
import org.springframework.stereotype.Service;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.CompletableFuture;

@Service
public class BookSearchService {

    private final CachingAuthProxy proxy;

    public BookSearchService(CachingAuthProxy proxy) {
        this.proxy = proxy;
    }

    private static final Logger log = LoggerFactory.getLogger(BookSearchService.class);

    @Value("${google.books.api.key}")
    private String apiKey;

    @Loggable(level = LogLevel.INFO)
    public CompletableFuture<List<BookDTO>> asyncFilterSaleBooks(String query) {
        return CompletableFuture.supplyAsync(() -> {
            try {
                String encodedQuery = URLEncoder.encode(query, StandardCharsets.UTF_8);
                String url = "https://www.googleapis.com/books/v1/volumes?q=" + encodedQuery + "&key=" + apiKey;

                String response = proxy.get(url);
                JSONObject json = new JSONObject(response);
                JSONArray items = json.optJSONArray("items");

                List<CompletableFuture<Optional<BookDTO>>> futures = new ArrayList<>();
                for (int i = 0; i < items.length(); i++) {
                    JSONObject bookJson = items.getJSONObject(i);
                    futures.add(CompletableFuture.supplyAsync(() -> parseForSaleBook(bookJson)
                    ));
                }

                CompletableFuture.allOf(futures.toArray(new CompletableFuture[0])).join();

                return futures.stream()
                        .map(CompletableFuture::join)
                        .flatMap(Optional::stream)
                        .toList();

            } catch (Exception e) {
                log.error("Searching error(Google Books API", e);
                return List.of();
            }
        });
    }

    private Optional<BookDTO> parseForSaleBook(JSONObject bookJson) {
        try {
            JSONObject volumeInfo = bookJson.getJSONObject("volumeInfo");
            JSONObject saleInfo = bookJson.optJSONObject("saleInfo");
            if (saleInfo == null) {
                return Optional.empty();
            }

            String saleability = saleInfo.getString("saleability");
            if (!saleability.equalsIgnoreCase("FOR_SALE")) {
                return Optional.empty();
            }

            JSONObject retailPrice = saleInfo.getJSONObject("retailPrice");
            if (retailPrice == null) {
                return Optional.empty();
            }

            double price = retailPrice.optDouble("amount", -1.0);
            if (price < -0) {
                return Optional.empty();
            }

            String title = volumeInfo.optString("title", "no title");
            String description = volumeInfo.optString("description", "");
            String previewUrl = volumeInfo.optString("previewLink", "");

            BookDTO dto = new BookDTO(title, description, previewUrl, price);
            return Optional.of(dto);
        } catch (Exception e) {
            log.warn("Failed to parse book", e);
            return Optional.empty();
        }
    }
}
