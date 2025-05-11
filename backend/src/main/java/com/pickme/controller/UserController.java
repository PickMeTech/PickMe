package com.pickme.controller;

import com.pickme.dto.user.UserProfileResponse;
import com.pickme.dto.user.UserRegistrationRequest;
import com.pickme.dto.user.UserUpdateRequest;
import com.pickme.mapper.UserMapper;
import com.pickme.model.User;
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
    private final UserMapper userMapper;

    @Autowired
    public UserController(UserService userService, UserMapper userMapper) {
        this.userService = userService;
        this.userMapper = userMapper;
    }

    @PostMapping("/register")
    public ResponseEntity<UserProfileResponse> registerUser(
            @Valid @RequestBody UserRegistrationRequest dto) {
        User createdUser = userService.createUser(dto);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(userMapper.mapToProfileResponse(createdUser));
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserProfileResponse> getUserProfile(@PathVariable Long id)  {
        User user = userService.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return ResponseEntity.ok(userMapper.mapToProfileResponse(user));
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserProfileResponse> updateUserProfile(@PathVariable Long id,
                                                          @Valid @RequestBody UserUpdateRequest dto) {
        User updatedUser = userService.updateUserFromDto(id, dto);
        return ResponseEntity.ok(userMapper.mapToProfileResponse(updatedUser));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id)  {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}
