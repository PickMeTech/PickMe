package com.pickme.controller;

import com.pickme.service.S3FileService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/files")
public class FileController {

    private final S3FileService fileService;

    public FileController(S3FileService s3FileService) {
        this.fileService = s3FileService;
    }

    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) {
        try {
            String imageUrl = fileService.uploadFile(file);
            return ResponseEntity.ok(imageUrl);
        }
        catch (Exception e) {
            return ResponseEntity.badRequest().body("Upload failed : " + e.getMessage());
        }
    }
}
