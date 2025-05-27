package com.pickme.controller;

import com.pickme.dto.wish.BookWishRequest;
import com.pickme.dto.wish.WishCreateRequest;
import com.pickme.dto.wish.WishResponse;
import com.pickme.dto.wish.WishUpdateRequest;
import com.pickme.mapper.WishMapper;
import com.pickme.model.Wish;
import com.pickme.service.WishService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/wishlists/{wishListId}/wishes")
public class WishController {

    private final WishService wishService;
    private final WishMapper wishMapper;

    public WishController(WishService wishService, WishMapper wishMapper) {
        this.wishService = wishService;
        this.wishMapper = wishMapper;
    }

    @PostMapping
    public ResponseEntity<WishResponse> createWish(
            @PathVariable("wishListId") Long wishListId,
            @Valid @RequestBody WishCreateRequest request) {
        Wish created = wishService.createWish(wishListId, request);
        WishResponse response = wishMapper.mapToWishResponse(created);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    @GetMapping
    public ResponseEntity<List<WishResponse>> getAllWishes(@PathVariable("wishListId") Long wishListId) {
        List<WishResponse> dtos = wishService
                .findByWishListId(wishListId)
                .stream()
                .map(wishMapper::mapToWishResponse)
                .collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<WishResponse> getWish(@PathVariable("wishListId") Long wishListId, @PathVariable("id") Long id) {
        Wish wish = wishService.findByWishListIdAndId(wishListId, id);
        WishResponse response = wishMapper.mapToWishResponse(wish);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/peek-oldest")
    public ResponseEntity<WishResponse> getOldestWishes(@PathVariable("wishListId") Long wishListId) {
        Wish wish = wishService.getOldestWish(wishListId);
        WishResponse response = wishMapper.mapToWishResponse(wish);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/peek-newest")
    public ResponseEntity<WishResponse> getNewestWishes(@PathVariable("wishListId") Long wishListId) {
        Wish wish = wishService.getNewestWish(wishListId);
        WishResponse response = wishMapper.mapToWishResponse(wish);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<WishResponse> updateWish(
            @PathVariable("wishListId") Long wishListId,
            @PathVariable("id") Long id,
            @Valid @RequestBody WishUpdateRequest request) {
        Wish wish = wishService.updateWish(wishListId, id, request);
        WishResponse response = wishMapper.mapToWishResponse(wish);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<WishResponse> deleteWish(
            @PathVariable("wishListId") Long wishListId,
            @PathVariable("id") Long id) {
        wishService.deleteWish(wishListId, id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/from-book")
    public ResponseEntity<WishResponse> addWishFromBook(
            @PathVariable("wishListId") Long wishListId,
            @RequestBody BookWishRequest request) {
        Wish created = wishService.createWishFromBook(wishListId, request);
        WishResponse response = wishMapper.mapToWishResponse(created);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}
