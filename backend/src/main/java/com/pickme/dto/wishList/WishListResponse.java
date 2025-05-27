package com.pickme.dto.wishList;

import com.pickme.dto.wish.WishResponse;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class WishListResponse {

    private Long id;
    private String name;
    private Long userId;
    private List<WishResponse> wishes;

}
