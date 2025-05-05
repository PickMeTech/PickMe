package com.pickme.service;

import com.pickme.dto.user.UserRegistrationRequest;
import com.pickme.dto.user.UserUpdateRequest;
import com.pickme.model.User;
import com.pickme.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;


@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User createUser(User user) {
        return userRepository.save(user);
    }

    public User createUser(UserRegistrationRequest dto) {
        User user = new User();
        user.setUsername(dto.getUsername());
        user.setPassword(dto.getPassword());
        user.setEmail(dto.getEmail());
        user.setPhoneNumber(dto.getPhoneNumber());
        user.setBirthDate(dto.getBirthDate());
        user.setCountry(dto.getCountry());
        user.setName(dto.getName());
        user.setSurname(dto.getSurname());

        return userRepository.save(user);
    }

    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Transactional
    public User updateUser(User user) {
        User existingUser = userRepository.findById(user.getId())
                .orElseThrow(() -> new EntityNotFoundException("User not found with id " + user.getId()));

        existingUser.setUsername(user.getUsername());
        existingUser.setEmail(user.getEmail());
        existingUser.setBio(user.getBio());
        existingUser.setCity(user.getCity());
        existingUser.setCountry(user.getCountry());
        existingUser.setBirthDate(user.getBirthDate());
        existingUser.setPhoneNumber(user.getPhoneNumber());
        existingUser.setInstagramUrl(user.getInstagramUrl());
        existingUser.setTelegramUsername(user.getTelegramUsername());
        existingUser.setName(user.getName());
        existingUser.setSurname(user.getSurname());
        existingUser.setPostService(user.getPostService());
        existingUser.setPostCode(user.getPostCode());
        existingUser.setStreetAddress(user.getStreetAddress());
        existingUser.setProfileImageUrl(user.getProfileImageUrl());

        return userRepository.save(existingUser);
    }

    @Transactional
    public User updateUserFromDto(long id, UserUpdateRequest dto) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("User not found with id " + id));
        user.setUsername(dto.getUsername());
        user.setEmail(dto.getEmail());
        user.setPhoneNumber(dto.getPhoneNumber());
        user.setCountry(dto.getCountry());
        user.setName(dto.getName());
        user.setSurname(dto.getSurname());
        user.setBirthDate(dto.getBirthDate());
        user.setProfileImageUrl(dto.getProfileImageUrl());
        user.setBio(dto.getBio());
        user.setInstagramUrl(dto.getInstagramUrl());
        user.setTelegramUsername(dto.getTelegramUsername());
        user.setCity(dto.getCity());
        user.setStreetAddress(dto.getStreetAddress());
        user.setPostCode(dto.getPostCode());
        user.setPostService(dto.getPostService());

        return userRepository.save(user);
    }

    @Transactional
    public void deleteUser(Long id) {
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("User not found with id " + id));
        userRepository.delete(existingUser);
    }
}
