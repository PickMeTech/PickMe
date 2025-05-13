package com.pickme.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.ObjectCannedACL;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.UUID;

@Service
public class S3FileService {

    private final S3Client s3Client;
    private final String bucketName;
    private final String region;

    public S3FileService(S3Client s3Client, @Value("${aws.s3.bucket-name}") String bucketName,
                         @Value("${aws.region}") String region) {
        this.s3Client = s3Client;
        this.bucketName = bucketName;
        this.region = region;
    }

    public String uploadFile(MultipartFile file) throws IOException {
        String contentType = file.getContentType();

        List<String> allowedTypes = List.of("image/jpeg", "image/png", "image/webp");

        if (contentType == null || !allowedTypes.contains(contentType)) {
            throw new IOException("Unsupported content type: " + contentType);
        }

        String key = UUID.randomUUID() + "_" + file.getOriginalFilename();

        PutObjectRequest request = PutObjectRequest.builder()
                .bucket(bucketName)
                .key(key)
                .contentType(contentType)
                .acl(ObjectCannedACL.PUBLIC_READ)
                .build();

        try (InputStream stream = file.getInputStream()) {
            s3Client.putObject(
                    request, RequestBody.fromInputStream(stream, file.getSize())
            );
        }
        return "https://" + bucketName + ".s3." + region + ".amazonaws.com/" + key;
    }
}
