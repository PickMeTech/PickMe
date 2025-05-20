package com.pickme.dto.wish;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class WishCreateRequest {

    @NotBlank
    @Size(max = 100)
    private String title;

    @Size(max = 255)
    private String description;

    @PositiveOrZero
    private Integer price;

    @Size(max = 255)
    private String imageUrl;

    @Size(max = 255)
    private String url;

    private Boolean picked;
}
