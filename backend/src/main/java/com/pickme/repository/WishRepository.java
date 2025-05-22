package com.pickme.repository;

import com.pickme.model.Wish;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface WishRepository extends JpaRepository<Wish, Long> {

    List<Wish> findByWishListId(Long wishListId);

    Optional<Wish> findByWishListIdAndId(Long wishListId, Long id);

    @Query("SELECT w FROM Wish w WHERE w.wishList.id = :wishListId ORDER BY w.createdAt ASC")
    List<Wish> findOldestWishesByWishListId(@Param("wishListId") Long wishListId);

    @Query("SELECT w FROM Wish w WHERE w.wishList.id = :wishListId ORDER BY w.createdAt DESC")
    List<Wish> findNewestWishesByWishListId(@Param("wishListId") Long wishListId);

}
