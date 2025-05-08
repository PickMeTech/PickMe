package com.pickme.dto.wishList;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class WishListUpdateRequest {

    @NotBlank
    @Size(max = 100)
    private String name;

    public WishListUpdateRequest() {
    }

    public WishListUpdateRequest(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
