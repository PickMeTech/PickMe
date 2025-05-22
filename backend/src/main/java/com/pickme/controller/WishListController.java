package com.pickme.controller;

import com.pickme.dto.wishList.WishListCreateRequest;
import com.pickme.dto.wishList.WishListResponse;
import com.pickme.dto.wishList.WishListUpdateRequest;
import com.pickme.mapper.WishListMapper;
import com.pickme.model.WishList;
import com.pickme.service.WishListService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/users/{userId}/wishlists")
public class
WishListController {

    private final WishListService wishListService;
    private final WishListMapper wishListMapper;

    public WishListController(WishListService wishListService, WishListMapper wishListMapper) {
        this.wishListService = wishListService;
        this.wishListMapper = wishListMapper;
    }

    @PostMapping
    public ResponseEntity<WishListResponse> createWishList(
            @PathVariable("userId") Long userId,
            @Valid @RequestBody WishListCreateRequest dto) {
        WishList created = wishListService.createWishList(userId, dto);
        WishListResponse response = wishListMapper.toWishListResponse(created);
        return ResponseEntity.
                status(HttpStatus.CREATED)
                .body(response);
    }

    @GetMapping
    public ResponseEntity<List<WishListResponse>> getWishListsByUser(@PathVariable("userId") Long userId){
        List<WishList> lists = wishListService.findByUserId(userId);
        List<WishListResponse> dtos = lists.stream()
                .map(wishListMapper::toWishListResponse)
                .collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<WishListResponse> getWishListById(
            @PathVariable("userId") Long userId, @PathVariable("id") Long id) {
        WishList wishList = wishListService.findByUserIdAndId(userId, id);
        return ResponseEntity.ok(wishListMapper.toWishListResponse(wishList));
    }

    @PutMapping("/{id}")
    public ResponseEntity<WishListResponse> updateWishList(
            @PathVariable("userId") Long userId,
            @PathVariable("id") Long id,
            @Valid @RequestBody WishListUpdateRequest dto) {

        WishList updated = wishListService.updateWishList(userId, id, dto);
        WishListResponse response = wishListMapper.toWishListResponse(updated);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<WishListResponse> deleteWishList(
            @PathVariable("userId") Long userId, @PathVariable("id") Long id) {
        wishListService.deleteWishList(userId, id);
        return ResponseEntity.noContent().build();
    }
}
