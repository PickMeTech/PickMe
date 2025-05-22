package com.pickme.events;


import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class WishCreatedEvent {

    private final Long userId;
    private final Long wishListId;
    private final String wishTitle;
    private final String userEmail;
}
