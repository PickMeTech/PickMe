package com.pickme.service;

import com.pickme.model.Wish;
import com.pickme.repository.WishRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class WishService {

    private final WishRepository wishRepository;

    @Autowired
    public WishService(WishRepository wishRepository) {
        this.wishRepository = wishRepository;
    }

    public Wish createWish(Wish wish) {
        return wishRepository.save(wish);
    }

    public List<Wish> findByWishListId(Long wishListId) {
        return wishRepository.findByWishListId(wishListId);
    }

    public Wish findByWishListIdAndId(Long wishListId, Long id) {
        return wishRepository.findByWishListIdAndId(wishListId, id)
                .orElseThrow(() -> new EntityNotFoundException("Wish not found with id "+ id));
    }

    @Transactional
    public Wish updateWish(Wish updatedWish, Long id) {
        Wish existingWish = wishRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Wish not found with id " + id));

        existingWish.setTitle(updatedWish.getTitle());
        existingWish.setDescription(updatedWish.getDescription());
        existingWish.setImageUrl(updatedWish.getImageUrl());
        existingWish.setUrl(updatedWish.getUrl());
        existingWish.setPrice(updatedWish.getPrice());
        existingWish.setPicked(updatedWish.getPicked());

        return wishRepository.save(existingWish);
    }

    @Transactional
    public void deleteWish(Long id) {
        Wish existingWish = wishRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Wish not found with id " + id));
        wishRepository.delete(existingWish);
    }
}
