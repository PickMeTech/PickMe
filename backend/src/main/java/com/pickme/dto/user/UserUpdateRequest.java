package com.pickme.dto.user;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.validator.constraints.URL;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
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
}
