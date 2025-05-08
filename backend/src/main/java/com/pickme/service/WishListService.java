package com.pickme.service;

import com.pickme.dto.wishList.WishListCreateRequest;
import com.pickme.dto.wishList.WishListUpdateRequest;
import com.pickme.model.User;
import com.pickme.model.WishList;
import com.pickme.repository.UserRepository;
import com.pickme.repository.WishListRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class WishListService {

    private final UserRepository userRepository;

    private final WishListRepository wishListRepository;

    @Autowired
    public WishListService(WishListRepository wishListRepository, UserRepository userRepository) {
        this.wishListRepository = wishListRepository;
        this.userRepository = userRepository;
    }

    public WishList createWishList(WishList wishList) {
        return wishListRepository.save(wishList);
    }

    public WishList createWishList(Long userId, WishListCreateRequest dto) {
        WishList wishList = new WishList();
        wishList.setName(dto.getName());
        User user = userRepository.findById(userId).
                orElseThrow(() -> new EntityNotFoundException("User not found with id " + userId));
        return wishListRepository.save(wishList);
    }

    public WishList findByUserIdAndId(Long userId, Long id) {
        return wishListRepository.findByUserIdAndId(userId, id)
                .orElseThrow(() -> new EntityNotFoundException("WishList not found with id: " + id));
    }

    public List<WishList> findByUserId(Long userId) {
        return wishListRepository.findByUserId(userId);
    }

    @Transactional
    public WishList updateWishList(Long userId, Long id, WishListUpdateRequest dto) {
        WishList existingWishList = wishListRepository.findByUserIdAndId(userId, id)
                .orElseThrow(() -> new EntityNotFoundException("WishList not found with id " + id));
        existingWishList.setName(dto.getName());
        return wishListRepository.save(existingWishList);
    }

    @Transactional
    public void deleteWishList(Long userId, Long id) {
        WishList existingWishList = wishListRepository.findByUserIdAndId(userId, id)
                .orElseThrow(() -> new EntityNotFoundException("WishList not found with id " + id));
        wishListRepository.delete(existingWishList);
    }
}
