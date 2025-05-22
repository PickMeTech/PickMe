package com.pickme.service;

import com.pickme.dto.wish.WishCreateRequest;
import com.pickme.dto.wish.WishUpdateRequest;
import com.pickme.events.WishCreatedEvent;
import com.pickme.mapper.WishMapper;
import com.pickme.model.Wish;
import com.pickme.model.WishList;
import com.pickme.repository.WishListRepository;
import com.pickme.repository.WishRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class WishService {

    private final WishRepository wishRepository;
    private final WishListRepository wishListRepository;
    private final WishMapper wishMapper;
    private final ApplicationEventPublisher applicationEventPublisher;

    public Wish createWish(Long wishListId, WishCreateRequest dto) {
        WishList wishList = wishListRepository.findById(wishListId)
                .orElseThrow(() -> new EntityNotFoundException("WishList not found with id: " + wishListId));
        Wish wish = wishMapper.mapFromCreateRequest(dto, wishList);
        Wish savedWish = wishRepository.save(wish);

        Long userId = wishList.getUser().getId();
        String wishTitle = wish.getTitle();
        String userEmail = wishList.getUser().getEmail();

        applicationEventPublisher.publishEvent(new WishCreatedEvent(userId, wishListId, wishTitle, userEmail));
        return savedWish;
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

    public Wish getOldestWish(Long wishListId) {
        List<Wish> wishes = wishRepository.findOldestWishesByWishListId(wishListId);
        if (wishes.isEmpty()) {
            throw new EntityNotFoundException("Wish not found with id " + wishListId);
        }
        return wishes.getFirst();
    }

    public Wish getNewestWish(Long wishListId) {
        List<Wish> wishes = wishRepository.findNewestWishesByWishListId(wishListId);
        if (wishes.isEmpty()) {
            throw new EntityNotFoundException("Wish not found with id " + wishListId);
        }
        return wishes.getFirst();
    }

    public Wish createWishFromBook(Long wishListId, Wish wish) {
        WishList wishList = wishListRepository.findById(wishListId)
                .orElseThrow(() -> new EntityNotFoundException("WishList not found with id: " + wishListId));
        wish.setWishList(wishList);
        return wishRepository.save(wish);
    }
}
