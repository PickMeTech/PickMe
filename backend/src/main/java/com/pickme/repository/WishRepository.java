package com.pickme.repository;

import com.pickme.model.Wish;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface WishRepository extends JpaRepository<Wish, Long> {

    List<Wish> findByWishListId(Long wishListId);

    Optional<Wish> findByWishListIdAndId(Long wishListId, Long id);
}
