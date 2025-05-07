package com.pickme.dto.wish;

import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;

public class WishUpdateRequest {

    @Size(max = 100)
    private String title;

    @Size(max = 255)
    private String description;

    @PositiveOrZero
    private Integer price;

    @Size(max = 255)
    private String imageUrl;

    @Size(max = 255)
    private String url;

    private Long wishListId;

    private Boolean picked;

    public WishUpdateRequest() {
    }

    public WishUpdateRequest(String title, String description, Integer price, String imageUrl,
                             String url, Long wishListId, Boolean picked) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.imageUrl = imageUrl;
        this.url = url;
        this.wishListId = wishListId;
        this.picked = picked;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public Long getWishListId() {
        return wishListId;
    }

    public void setWishListId(Long wishListId) {
        this.wishListId = wishListId;
    }

    public Boolean getPicked() {
        return picked;
    }

    public void setPicked(Boolean picked) {
        this.picked = picked;
    }
}
