package com.pickme.dto.user;

import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class UserChangePasswordRequest {

    @NotBlank(message = "Current password is required")
    private String oldPassword;

    @NotBlank(message = "New password is required")
    @Size(min = 6, message = "New password must be at least 6 characters long")
    private String newPassword;

    @NotBlank(message = "Please confirm your new password")
    private String confirmNewPassword;

    public UserChangePasswordRequest() {
    }

    public UserChangePasswordRequest(String confirmNewPassword, String newPassword, String oldPassword) {
        this.confirmNewPassword = confirmNewPassword;
        this.newPassword = newPassword;
        this.oldPassword = oldPassword;
    }

    public String getNewPassword() {
        return newPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }

    public String getOldPassword() {
        return oldPassword;
    }

    public void setOldPassword(String oldPassword) {
        this.oldPassword = oldPassword;
    }

    public String getConfirmNewPassword() {
        return confirmNewPassword;
    }

    public void setConfirmNewPassword(String confirmNewPassword) {
        this.confirmNewPassword = confirmNewPassword;
    }

    @AssertTrue(message = "New password and confirmation must match")
    public boolean isNewPasswordMatch() {
        return newPassword != null && newPassword.equals(confirmNewPassword);
    }
}
