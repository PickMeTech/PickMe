package com.pickme.mapper;

import com.pickme.dto.user.UserProfileResponse;
import com.pickme.model.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {
    public UserProfileResponse toUserProfileResponse(User user) {
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
