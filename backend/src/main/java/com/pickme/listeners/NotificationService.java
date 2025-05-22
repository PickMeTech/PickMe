package com.pickme.listeners;

import com.pickme.events.WishCreatedEvent;
import com.pickme.service.EmailNotificationService;
import lombok.AllArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class NotificationService {

    private final EmailNotificationService emailService;

    @EventListener
    public void notifyWishCreated(WishCreatedEvent event) {
        String email = event.getUserEmail();
        String title = event.getWishTitle();

        System.out.println("Sending email to " + email);

        emailService.sendWishCreatedEmail(email, title);
    }
}
