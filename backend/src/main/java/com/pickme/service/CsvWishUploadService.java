package com.pickme.service;

import com.pickme.model.Wish;
import com.pickme.model.WishList;
import com.pickme.repository.WishRepository;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

@Service
public class CsvWishUploadService {

    private final WishRepository wishRepository;

    public CsvWishUploadService(WishRepository wishRepository) {
        this.wishRepository = wishRepository;
    }

    public int uploadWishesFromCsv(InputStream inputStream, WishList wishList) throws IOException {
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream))) {
            String line;
            int count = 0;
            boolean skipHeader = true;

            while ((line = reader.readLine()) != null) {
                if (skipHeader) {
                    skipHeader = false;
                    continue;
                }

                if (line.trim().isEmpty() || line.trim().charAt(0) == '#') continue;

                try {
                    processWishLine(line, wishList);
                    count++;
                } catch (Exception e) {
                    System.out.println(e.getMessage());
                }
            }
            return count;
        }
    }

    private void processWishLine(String line, WishList wishList) {
        String[] parts = line.split(",");

        if (parts.length < 5) return;

        Wish wish = new Wish();
        wish.setTitle(parts[0].replace("\"", ""));
        wish.setDescription(parts[1].replace("\"", ""));
        wish.setUrl(parts[2].replace("\"", ""));
        wish.setPrice(Integer.parseInt(parts[3].replace("\"", "")));
        wish.setPicked(Boolean.parseBoolean(parts[4]));

        wish.setWishList(wishList);
        wishRepository.save(wish);
    }

}
