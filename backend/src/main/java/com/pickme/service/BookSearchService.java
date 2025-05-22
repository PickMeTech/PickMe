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
    public List<BookDTO> searchBooks(String query){
        try {
            String encodedQuery = URLEncoder.encode(query, StandardCharsets.UTF_8);
            String url = "https://www.googleapis.com/books/v1/volumes?q=" + encodedQuery + "&key=" + apiKey;

            String response = proxy.get(url);

            JSONObject json = new JSONObject(response);
            JSONArray items = json.optJSONArray("items");

            List<BookDTO> result = new ArrayList<>();
            if (items != null) {
                for (int i = 0; i < items.length(); i++){
                    JSONObject volumeInfo = items.getJSONObject(i).getJSONObject("volumeInfo");

                    String title = volumeInfo.optString("title");
                    JSONArray authorsArray = volumeInfo.optJSONArray("authors");
                    String author = (authorsArray != null) ? authorsArray.join(",").replaceAll("\"", "") : "Unknown";
                    String description = volumeInfo.optString("description", "no description");

                    result.add(new BookDTO(title, author, description));
                }
            }
            return result;
        }
        catch (Exception e){
            log.error("Помилка під час пошуку книг у Google Books API", e);
            return List.of();
        }
    }
}
