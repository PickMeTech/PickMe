package com.pickme.controller;

import com.pickme.model.WishList;
import com.pickme.repository.WishListRepository;
import com.pickme.service.CsvWishUploadService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/wishes")
public class CsvUploadController {

    private final WishListRepository wishListRepository;
    private final CsvWishUploadService csvWishUploadService;

    public CsvUploadController(WishListRepository wishListRepository, CsvWishUploadService csvWishUploadService) {
        this.wishListRepository = wishListRepository;
        this.csvWishUploadService = csvWishUploadService;
    }

    @PostMapping("/upload-csv")
    public ResponseEntity<String> uploadCsv(@RequestParam("file") MultipartFile file,
                                            @RequestParam("wishListId") Long wishListId) {
        try {
            WishList wishList = wishListRepository.findById(wishListId)
                    .orElseThrow(() -> new RuntimeException("WishList with id " + wishListId + " not found"));
            int count = csvWishUploadService.uploadWishesFromCsv(file.getInputStream(), wishList);
            return ResponseEntity.ok("Wishes upload successfully: " + count);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Reading file error");
        }
    }
}