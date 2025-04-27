package com.pickme.service;

import com.pickme.model.WishList;
import com.pickme.repository.WishListRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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

    public WishList updateWishList(Long wishListId, WishList updatedWishList) {
        Optional<WishList> existingWishList = wishListRepository.findById(wishListId);
        if (existingWishList.isPresent()) {
            updatedWishList.setId(wishListId);
            return wishListRepository.save(updatedWishList);
        } else {
            throw new EntityNotFoundException("WishList not found with id " + wishListId);
        }
    }
    public void deleteWishList(Long wishListId) {
        if (wishListRepository.existsById(wishListId)) {
            wishListRepository.deleteById(wishListId);
        } else {
            throw new EntityNotFoundException("WishList not found with id " + wishListId);
        }
    }
}
