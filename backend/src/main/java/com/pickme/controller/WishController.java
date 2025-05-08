package com.pickme.controller;

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
@RequestMapping("/api/wishlists/{wishListsId}/wishes")
public class WishController {

    private final WishService wishService;
    private final WishMapper wishMapper;

    public WishController(WishService wishService, WishMapper wishMapper) {
        this.wishService = wishService;
        this.wishMapper = wishMapper;
    }

    @PostMapping
    public ResponseEntity<WishResponse> createWish(
            @PathVariable Long wishListsId,
            @Valid @RequestBody WishCreateRequest request) {
        Wish created = wishService.createWish(wishListsId, request);
        WishResponse response = wishMapper.toWishResponse(created);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    @GetMapping
    public ResponseEntity<List<WishResponse>> getAllWishes(@PathVariable Long wishListsId) {
        List<WishResponse> dtos = wishService
                .findByWishListId(wishListsId)
                .stream()
                .map(wishMapper::toWishResponse)
                .collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<WishResponse> getWish(@PathVariable Long wishListsId, @PathVariable Long id) {
        Wish wish = wishService.findByWishListIdAndId(wishListsId, id);
        WishResponse response = wishMapper.toWishResponse(wish);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<WishResponse> updateWish(
            @PathVariable Long wishListsId,
            @PathVariable Long id,
            @Valid @RequestBody WishUpdateRequest request) {
        Wish wish = wishService.updateWish(wishListsId, id, request);
        WishResponse response = wishMapper.toWishResponse(wish);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<WishResponse> deleteWish(
            @PathVariable Long wishListsId,
            @PathVariable Long id) {
        wishService.deleteWish(wishListsId, id);
        return ResponseEntity.noContent().build();
    }
}
