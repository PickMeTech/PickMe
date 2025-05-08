package com.pickme.mapper;

import com.pickme.dto.wish.WishResponse;
import com.pickme.model.Wish;
import org.springframework.stereotype.Component;

@Component
public class WishMapper {
    public WishResponse toWishResponse(Wish wish) {
        WishResponse response = new WishResponse();
        response.setId(wish.getId());
        response.setDescription(wish.getDescription());
        response.setPrice(wish.getPrice());
        response.setPicked(wish.isPicked());
        response.setTitle(wish.getTitle());
        response.setImageUrl(wish.getImageUrl());
        response.setUrl(wish.getUrl());
        response.setWishListId(wish.getWishList().getId());
        return response;
    }
}
