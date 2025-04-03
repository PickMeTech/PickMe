package com.pickme.model;

import java.time.LocalDateTime;
import java.util.Objects;

public class User {
    private Long id;
    private String username;
    private String password;
    private String email;
    private String phoneNumber;
    private String country;
    private LocalDateTime birthDate;
    private String profileImageUrl;
    private String bio;
    private String instagramUrl;
    private String telegramUsername;

    public User() {
    }

    public User(String bio, LocalDateTime birthDate, String country, String email,
                Long id, String instagramUrl, String password, String phoneNumber,
                String profileImageUrl, String telegramUsername, String username) {
        this.bio = bio;
        this.birthDate = birthDate;
        this.country = country;
        this.email = email;
        this.id = id;
        this.instagramUrl = instagramUrl;
        this.password = password;
        this.phoneNumber = phoneNumber;
        this.profileImageUrl = profileImageUrl;
        this.telegramUsername = telegramUsername;
        this.username = username;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public LocalDateTime getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(LocalDateTime birthDate) {
        this.birthDate = birthDate;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getInstagramUrl() {
        return instagramUrl;
    }

    public void setInstagramUrl(String instagramUrl) {
        this.instagramUrl = instagramUrl;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getProfileImageUrl() {
        return profileImageUrl;
    }

    public void setProfileImageUrl(String profileImageUrl) {
        this.profileImageUrl = profileImageUrl;
    }

    public String getTelegramUsername() {
        return telegramUsername;
    }

    public void setTelegramUsername(String telegramUsername) {
        this.telegramUsername = telegramUsername;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return Objects.equals(id, user.id) && Objects.equals(username, user.username) && Objects.equals(password, user.password) && Objects.equals(email, user.email) && Objects.equals(phoneNumber, user.phoneNumber) && Objects.equals(country, user.country) && Objects.equals(birthDate, user.birthDate) && Objects.equals(profileImageUrl, user.profileImageUrl) && Objects.equals(bio, user.bio) && Objects.equals(instagramUrl, user.instagramUrl) && Objects.equals(telegramUsername, user.telegramUsername);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, username, password, email, phoneNumber, country, birthDate, profileImageUrl, bio, instagramUrl, telegramUsername);
    }
}


