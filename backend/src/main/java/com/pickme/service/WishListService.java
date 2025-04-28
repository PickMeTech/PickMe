package com.pickme.service;

import com.pickme.model.WishList;
import com.pickme.repository.WishListRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class WishListService {

    private final WishListRepository wishListRepository;

    @Autowired
    public WishListService(WishListRepository wishListRepository) {
        this.wishListRepository = wishListRepository;
    }

    public WishList createWishList(WishList wishList) {
        return wishListRepository.save(wishList);
    }

    public List<WishList> findByUserId(Long userId) {
        return wishListRepository.findByUserId(userId);
    }

    @Transactional
    public WishList updateWishList(Long id, WishList updatedWishList) {
        WishList existingWishList = wishListRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("WishList not found with id " + id));
        existingWishList.setName(updatedWishList.getName());
        return wishListRepository.save(existingWishList);
    }

    @Transactional
    public void deleteWishList(Long id) {
        WishList existingWishList = wishListRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("WishList not found with id " + id));
        wishListRepository.delete(existingWishList);
    }
}
