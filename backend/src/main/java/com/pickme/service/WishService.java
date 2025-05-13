package com.pickme.service;

import com.pickme.dto.wish.WishCreateRequest;
import com.pickme.dto.wish.WishUpdateRequest;
import com.pickme.mapper.WishMapper;
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
    private final WishMapper wishMapper;

    @Autowired
    public WishService(WishRepository wishRepository, WishListRepository wishListRepository, WishMapper wishMapper) {
        this.wishRepository = wishRepository;
        this.wishListRepository = wishListRepository;
        this.wishMapper = wishMapper;
    }

    public Wish createWish(Long wishListId, WishCreateRequest dto) {
        WishList wishList = wishListRepository.findById(wishListId)
                .orElseThrow(() -> new EntityNotFoundException("WishList not found with id: " + wishListId));
        Wish wish = wishMapper.mapFromCreateRequest(dto, wishList);
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
        wishMapper.mapFromUpdateRequest(dto, existingWish);
        return wishRepository.save(existingWish);
    }

    @Transactional
    public void deleteWish(Long wishListId , Long id) {
        Wish existingWish = wishRepository.findByWishListIdAndId(wishListId, id)
                .orElseThrow(() -> new EntityNotFoundException("Wish not found with id " + id));
        wishRepository.delete(existingWish);
    }
}
