package com.pickme.mapper;

import com.pickme.dto.wish.BookWishRequest;
import com.pickme.dto.wish.WishCreateRequest;
import com.pickme.dto.wish.WishResponse;
import com.pickme.dto.wish.WishUpdateRequest;
import com.pickme.model.Wish;
import com.pickme.model.WishList;
import org.springframework.stereotype.Component;

@Component
public class WishMapper {

    public WishResponse mapToWishResponse(Wish wish) {
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

    public Wish mapFromCreateRequest(WishCreateRequest dto, WishList wishList) {
        Wish wish = new Wish();
        wish.setTitle(dto.getTitle());
        wish.setDescription(dto.getDescription());
        wish.setPrice(dto.getPrice());
        wish.setImageUrl(dto.getImageUrl());
        wish.setWishList(wishList);
        wish.setPicked(dto.getPicked() != null ? dto.getPicked() : false);
        return wish;
    }

    public void mapFromUpdateRequest(WishUpdateRequest dto, Wish wish) {
        wish.setTitle(dto.getTitle());
        wish.setDescription(dto.getDescription());
        wish.setPrice(dto.getPrice());
        wish.setImageUrl(dto.getImageUrl());
        wish.setUrl(dto.getUrl());
        wish.setPicked(dto.getPicked() != null ? dto.getPicked() : false);
    }

    public Wish mapFromBookRequest(BookWishRequest dto) {
        Wish wish = new Wish();
        wish.setTitle(dto.getTitle());
        wish.setDescription(dto.getDescription());
        wish.setPicked(false);
        return wish;
    }
}
