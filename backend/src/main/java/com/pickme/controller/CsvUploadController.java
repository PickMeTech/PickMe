package com.pickme.controller;

import com.pickme.model.Wish;
import com.pickme.model.WishList;
import com.pickme.repository.WishListRepository;
import com.pickme.repository.WishRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

@RestController
@RequestMapping("/api/wishes")
public class CsvUploadController {

    private final WishRepository wishRepository;
    private final WishListRepository wishListRepository;

    public CsvUploadController(WishRepository wishRepository, WishListRepository wishListRepository) {
        this.wishRepository = wishRepository;
        this.wishListRepository = wishListRepository;
    }

    @PostMapping("/upload-csv")
    public ResponseEntity<String> uploadCsv(@RequestParam("file") MultipartFile file,
                                            @RequestParam("wishListId") Long wishListId) {
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(file.getInputStream()))) {
            WishList wishList = wishListRepository.findById(wishListId)
                    .orElseThrow(() -> new RuntimeException("WishList with id " + wishListId + " not found"));
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
                } catch (Exception e){
                    System.out.println(e.getMessage());
                }
            }

            return ResponseEntity.ok("Wishes uploaded successfully: " + count);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Reading file error");
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
