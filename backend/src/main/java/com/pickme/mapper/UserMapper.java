package com.pickme.mapper;

import com.pickme.dto.user.UserProfileResponse;
import com.pickme.dto.user.UserRegistrationRequest;
import com.pickme.dto.user.UserUpdateRequest;
import com.pickme.model.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    public UserProfileResponse mapToProfileResponse(User user) {
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

    public User mapFromRegistrationRequest(UserRegistrationRequest dto){
        User user = new User();
        user.setUsername(dto.getUsername());
        user.setPassword(dto.getPassword());
        user.setEmail(dto.getEmail());
        user.setPhoneNumber(dto.getPhoneNumber());
        user.setBirthDate(dto.getBirthDate());
        user.setCountry(dto.getCountry());
        user.setName(dto.getName());
        user.setSurname(dto.getSurname());
        return user;
    }

    public void mapFromUpdateRequest(User user, UserUpdateRequest dto){
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
    }
}
