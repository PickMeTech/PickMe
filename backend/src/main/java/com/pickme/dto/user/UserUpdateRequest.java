package com.pickme.dto.user;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Size;
import org.hibernate.validator.constraints.URL;

import java.time.LocalDate;

public class UserUpdateRequest {

    @NotBlank(message = "Username is required")
    @Size(min = 3, max = 30, message = "Username must be between 3 and 30 characters")
    private String username;

    //add mask
    private String phoneNumber;

    @NotBlank(message = "Email is required")
    @Email(message = "Email should be valid")
    private String email;

    @Size(max = 100)
    private String country;

    @NotBlank(message = "Name is required")
    @Size(max = 30)
    private String name;

    @NotBlank(message = "Surname is required")
    @Size(max = 30)
    private String surname;

    @Past(message = "Birth date must be in the past")
    private LocalDate birthDate;

    @Size(max = 255)
    @URL
    private String profileImageUrl;

    @Size(max = 250)
    private String bio;

    @Size(max = 100)
    @URL
    private String instagramUrl;

    @Size(max = 100)
    private String telegramUsername;

    @Size(max = 100)
    private String city;

    @Size(max = 100)
    private String streetAddress;

    @Size(max = 20)
    private String postCode;

    @Size(max = 100)
    private String postService;

    public UserUpdateRequest() {
    }

    public UserUpdateRequest(String bio, LocalDate birthDate, String city,
                             String country, String email, String instagramUrl,
                             String name, String phoneNumber, String postCode,
                             String postService, String profileImageUrl, String streetAddress,
                             String surname, String telegramUsername, String username) {
        this.bio = bio;
        this.birthDate = birthDate;
        this.city = city;
        this.country = country;
        this.email = email;
        this.instagramUrl = instagramUrl;
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.postCode = postCode;
        this.postService = postService;
        this.profileImageUrl = profileImageUrl;
        this.streetAddress = streetAddress;
        this.surname = surname;
        this.telegramUsername = telegramUsername;
        this.username = username;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public LocalDate getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(LocalDate birthDate) {
        this.birthDate = birthDate;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
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

    public String getInstagramUrl() {
        return instagramUrl;
    }

    public void setInstagramUrl(String instagramUrl) {
        this.instagramUrl = instagramUrl;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getPostCode() {
        return postCode;
    }

    public void setPostCode(String postCode) {
        this.postCode = postCode;
    }

    public String getPostService() {
        return postService;
    }

    public void setPostService(String postService) {
        this.postService = postService;
    }

    public String getProfileImageUrl() {
        return profileImageUrl;
    }

    public void setProfileImageUrl(String profileImageUrl) {
        this.profileImageUrl = profileImageUrl;
    }

    public String getStreetAddress() {
        return streetAddress;
    }

    public void setStreetAddress(String streetAddress) {
        this.streetAddress = streetAddress;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
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
}
