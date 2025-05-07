package com.pickme.dto.wishList;

import com.pickme.dto.wish.WishResponse;

import java.util.List;

public class WishListResponse {

    private Long id;
    private String name;
    private Long userId;
    private List<WishResponse> wishes;

    public WishListResponse() {
    }

    public WishListResponse(Long id, String name, Long userId, List<WishResponse> wishes) {
        this.id = id;
        this.name = name;
        this.userId = userId;
        this.wishes = wishes;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public List<WishResponse> getWishes() {
        return wishes;
    }

    public void setWishes(List<WishResponse> wishes) {
        this.wishes = wishes;
    }
}
