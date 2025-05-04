package com.pickme.controller;

import com.pickme.dto.user.UserProfileResponse;
import com.pickme.dto.user.UserRegistrationRequest;
import com.pickme.dto.user.UserUpdateRequest;
import com.pickme.model.User;
import com.pickme.repository.UserRepository;
import com.pickme.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;
    private final UserRepository userRepository;

    @Autowired
    public UserController(UserService userService, UserRepository userRepository) {
        this.userService = userService;
        this.userRepository = userRepository;
    }

    @PostMapping("/register")
    public ResponseEntity<UserProfileResponse> registerUser(
            @Valid @RequestBody UserRegistrationRequest dto) {
        User created = userService.createUser(dto);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(mapToProfileResponse(created));
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserProfileResponse> getUserProfile(@PathVariable Long id)  {
        User user = userService.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return ResponseEntity.ok(mapToProfileResponse(user));
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserProfileResponse> updateUser(@PathVariable Long id,
                                                          @Valid @RequestBody UserUpdateRequest dto) {
        User user = userService.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setUsername(dto.getUsername());
        user.setEmail(dto.getEmail());
        user.setBio(dto.getBio());
        user.setCity(dto.getCity());
        user.setCountry(dto.getCountry());
        user.setBirthDate(dto.getBirthDate());
        user.setPhoneNumber(dto.getPhoneNumber());
        user.setInstagramUrl(dto.getInstagramUrl());
        user.setTelegramUsername(dto.getTelegramUsername());
        user.setName(dto.getName());
        user.setSurname(dto.getSurname());
        user.setPostService(dto.getPostService());
        user.setPostCode(dto.getPostCode());
        user.setStreetAddress(dto.getStreetAddress());
        user.setProfileImageUrl(dto.getProfileImageUrl());

        User updatedUser = userService.updateUser(user);

        UserProfileResponse response = mapToProfileResponse(updatedUser);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id)  {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

    private UserProfileResponse mapToProfileResponse(User user) {
        UserProfileResponse response = new UserProfileResponse();
        response.setId(user.getId());
        response.setUsername(user.getUsername());
        response.setEmail(user.getEmail());
        response.setPhoneNumber(user.getPhoneNumber());
        response.setName(user.getName());
        response.setSurname(user.getSurname());
        response.setCountry(user.getCountry());
        response.setBirthDate(user.getBirthDate());
        response.setProfileImageUrl(user.getProfileImageUrl());
        response.setBio(user.getBio());
        response.setInstagramUrl(user.getInstagramUrl());
        response.setTelegramUsername(user.getTelegramUsername());
        response.setCity(user.getCity());
        response.setStreetAddress(user.getStreetAddress());
        response.setPostCode(user.getPostCode());
        response.setPostService(user.getPostService());
        return response;
    }
}
