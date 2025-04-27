package com.pickme.service;

import com.pickme.model.Wish;
import com.pickme.repository.WishRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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

    public Optional<Wish> findByWishListIdAndId(Long wishListId, Long id) {
        return wishRepository.findByWishListIdAndId(wishListId, id);
    }

    public Wish updateWish(Wish updatedWish, Long id) {
        Optional<Wish> wishExisting = wishRepository.findById(id);
        if (wishExisting.isPresent()) {
            updatedWish.setId(id);
            return wishRepository.save(updatedWish);
        } else {
            throw new EntityNotFoundException("Wish not found with id " + id);
        }
    }

    public void deleteWish(Long id) {
        if (wishRepository.existsById(id)) {
            wishRepository.deleteById(id);
        } else {
            throw new EntityNotFoundException("Wish not found with id " + id);
        }
    }
}
