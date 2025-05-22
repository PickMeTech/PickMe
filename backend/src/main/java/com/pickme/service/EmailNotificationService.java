package com.pickme.service;

import lombok.AllArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class EmailNotificationService {

    private final JavaMailSender mailSender;

    public void sendWishCreatedEmail(String toEmail, String wishTitle) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject("Wish Created");
        message.setText("Thank you for adding " + wishTitle + " to your wishList.");
        mailSender.send(message);
    }
}
