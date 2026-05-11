package rw.bnr.licensing.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.*;
import rw.bnr.licensing.dto.request.ApproveUserDTO;
import rw.bnr.licensing.dto.request.CreateUserDTO;
import rw.bnr.licensing.dto.request.UserLoginDTO;
import rw.bnr.licensing.dto.response.LoginResponseDTO;
import rw.bnr.licensing.entity.User;
import rw.bnr.licensing.security.JWTService;
import rw.bnr.licensing.service.UserService;

import java.util.List;

@RestController
public class UserController {
    @Autowired private UserService userService;


    @GetMapping("/home")
    public String home(){
        return "userService.getAllUsers()";
    }

    @GetMapping("/users")
    public List<User> getAllUsers(){
        return userService.getAllUsers();
    }

    @PostMapping("/create-account")
    public User createUser(@Valid @RequestBody CreateUserDTO userDTO){
        return userService.createUser(userDTO);
    }

    @PostMapping("/login")
    public LoginResponseDTO login(@Valid @RequestBody UserLoginDTO userDTO){
        return userService.login(userDTO);
    }

    //Make this return user to screen of Admin
    @PutMapping("/approve-user")
    public User approveUser(@Valid @RequestBody ApproveUserDTO dto){
        return userService.approveUser(dto);
    }
}
