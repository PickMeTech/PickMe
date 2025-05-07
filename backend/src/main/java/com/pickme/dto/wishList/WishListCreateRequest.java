package com.pickme.dto.wishList;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class WishListCreateRequest {

    @NotBlank
    @Size(max = 100)
    private String name;

    @NotNull
    private Long userId;

    public WishListCreateRequest() {
    }

    public WishListCreateRequest(String name, Long userId) {
        this.name = name;
        this.userId = userId;
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
}
