package com.pickme.service;

import com.pickme.dto.wish.WishCreateRequest;
import com.pickme.dto.wish.WishUpdateRequest;
import com.pickme.model.Wish;
import com.pickme.model.WishList;
import com.pickme.repository.WishListRepository;
import com.pickme.repository.WishRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class WishService {

    private final WishRepository wishRepository;
    private final WishListRepository wishListRepository;

    @Autowired
    public WishService(WishRepository wishRepository, WishListRepository wishListRepository) {
        this.wishRepository = wishRepository;
        this.wishListRepository = wishListRepository;
    }

    public Wish createWish(Long wishListId, WishCreateRequest dto) {
        WishList wishList = wishListRepository.findById(wishListId)
                .orElseThrow(() -> new EntityNotFoundException("WishList not found with id: " + wishListId));
        Wish wish = new Wish();
        wish.setTitle(dto.getTitle());
        wish.setDescription(dto.getDescription());
        wish.setPrice(dto.getPrice());
        wish.setImageUrl(dto.getImageUrl());
        wish.setWishList(wishList);
        wish.setPicked(dto.getPicked() != null ? dto.getPicked() : false);
        return wishRepository.save(wish);
    }

    public List<Wish> findByWishListId(Long wishListId) {
        wishListRepository.findById(wishListId)
                .orElseThrow(() -> new EntityNotFoundException("WishList not found with id: " + wishListId));
        return wishRepository.findByWishListId(wishListId);
    }

    public Wish findByWishListIdAndId(Long wishListId, Long id) {
        return wishRepository.findByWishListIdAndId(wishListId, id)
                .orElseThrow(() -> new EntityNotFoundException("Wish not found with id "+ id));
    }

    @Transactional
    public Wish updateWish(Long wishListId ,Long id, WishUpdateRequest dto) {
        Wish existingWish = wishRepository.findByWishListIdAndId(wishListId, id)
                .orElseThrow(() -> new EntityNotFoundException("Wish not found with id " + id));
        existingWish.setTitle(dto.getTitle());
        existingWish.setDescription(dto.getDescription());
        existingWish.setPrice(dto.getPrice());
        existingWish.setImageUrl(dto.getImageUrl());
        existingWish.setUrl(dto.getUrl());
        existingWish.setPicked(dto.getPicked() != null ? dto.getPicked() : false);

        return wishRepository.save(existingWish);
    }

    @Transactional
    public void deleteWish(Long wishListId , Long id) {
        Wish existingWish = wishRepository.findByWishListIdAndId(wishListId, id)
                .orElseThrow(() -> new EntityNotFoundException("Wish not found with id " + id));
        wishRepository.delete(existingWish);
    }
}
