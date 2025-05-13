package com.pickme.mapper;

import com.pickme.dto.wish.WishResponse;
import com.pickme.dto.wishList.WishListResponse;
import com.pickme.model.WishList;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class WishListMapper {

    private final WishMapper wishMapper;

    public WishListMapper(WishMapper wishMapper) {
        this.wishMapper = wishMapper;
    }

    public WishListResponse toWishListResponse(WishList wishList) {

        List<WishResponse> wishes = wishList.getWishes().stream()
                .map(wishMapper::mapToWishResponse)
                .collect(Collectors.toList());

        WishListResponse response = new WishListResponse();
        response.setId(wishList.getId());
        response.setName(wishList.getName());
        response.setUserId(wishList.getUser().getId());
        response.setWishes(wishes);
        return response;
    }
}
