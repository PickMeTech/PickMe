package com.pickme.dto.wish;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BookWishRequest {

    private String title;
    private String description;
    private String previewUrl;
    private Double price;
}
