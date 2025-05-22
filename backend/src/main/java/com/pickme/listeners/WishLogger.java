package com.pickme.listeners;

import com.pickme.events.WishCreatedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Component
public class WishLogger {

    @EventListener
    public void handleWishCreated(WishCreatedEvent event) {
        System.out.println("WishLogger: UserID: " + event.getUserId()
        + " created a new wish in listID " + event.getWishListId()
        + " with title: '" + event.getWishTitle() + "'");
    }
}
