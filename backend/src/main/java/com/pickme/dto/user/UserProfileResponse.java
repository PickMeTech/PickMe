package com.pickme.dto.user;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserProfileResponse {

    private Long id;
    private String username;
    private String phoneNumber;
    private String email;
    private String country;
    private String name;
    private String surname;
    private LocalDate birthDate;
    private String profileImageUrl;
    private String bio;
    private String instagramUrl;
    private String telegramUsername;
    private String city;
    private String streetAddress;
    private String postCode;
    private String postService;
}
