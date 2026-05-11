package rw.bnr.licensing.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import rw.bnr.licensing.dto.request.ApproveUserDTO;
import rw.bnr.licensing.dto.request.CreateUserDTO;
import rw.bnr.licensing.dto.request.UserLoginDTO;
import rw.bnr.licensing.dto.response.LoginResponseDTO;
import rw.bnr.licensing.entity.Permission;
import rw.bnr.licensing.entity.Role;
import rw.bnr.licensing.entity.User;
import rw.bnr.licensing.enums.UserStatus;
import rw.bnr.licensing.exception.NotFoundException;
import rw.bnr.licensing.exception.DuplicateKeyException;
import rw.bnr.licensing.exception.UnauthorizedException;
import rw.bnr.licensing.mapper.UserMapper;
import rw.bnr.licensing.repository.RoleRepository;
import rw.bnr.licensing.repository.UserRepository;
import rw.bnr.licensing.security.JWTService;

import java.util.List;

@Service
public class UserService {
    @Autowired private UserRepository userRepository;
   @Autowired private PasswordEncoder passwordEncoder;
   @Autowired private RoleRepository roleRepository;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JWTService jwtService;

   public List<User> getAllUsers(){
       // this needs to pass to dto for sanity
       return  userRepository.findAll();
   }
    public User createUser(CreateUserDTO dto){
        User user = UserMapper.toEntity(dto);
        if(userRepository.existsByEmail(dto.getEmail())){
            throw  new DuplicateKeyException("Username already taken");
        }else if(userRepository.existsByTelephone(dto.getEmail())){
            throw  new DuplicateKeyException("Telephone number already used");
        }else if(userRepository.existsByNationalId(dto.getEmail())){
            throw  new DuplicateKeyException("National ID already used");
        }
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        // to each user created they will start with pending so that the admin can approve them later
        Role role = roleRepository.findByName("ROLE_APPLICANT")
                .orElseThrow(() -> new NotFoundException("Role Not found"));
        user.setRole(role);
        user.setStatus(UserStatus.PENDING);
        return  userRepository.save(user);
    }

    public LoginResponseDTO login(UserLoginDTO dto){
        User user = userRepository.findByEmail(dto.getEmail())
                .orElseThrow(() -> new NotFoundException("Invalid username or password"));

        if (!passwordEncoder.matches(dto.getPassword(), user.getPassword())) {
            throw new NotFoundException("Invalid username or password");
        }

        if (!user.getStatus().equals(UserStatus.ACTIVE)) {
            throw new UnauthorizedException("Account Locked");
        }
        System.out.println(dto);

        Authentication authentication =
                authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(
                                dto.getEmail(),
                                dto.getPassword()
                        )
                );
        if (authentication.isAuthenticated()) {

            List<String> roles = user.getRole().getPermissions()
                    .stream()
                    .map(Permission::getName)
                    .toList();
            String token =
                    jwtService.generateToken(dto.getEmail());

            return new LoginResponseDTO(
                    "Login successful",
                    true,
                    token,
                    user.getEmail(),
                    user.getTelephone(),
                    user.getId(),
                    user.getFirstName(),
                    user.getTitle(),
                    user.getRole().getName(),
                    roles
            );
        }
System.out.println("::::LOGIN FAILED");
        // make algorithm in case of failed login
        return new LoginResponseDTO();


    }

    public User getLoggedInUser(String username){
        return  userRepository.findByEmail(username)
                .orElseThrow(() -> new NotFoundException("User not found"));
    }

    public void updateUser(User user){
       userRepository.save(user);
    }

    //Implement this to return value to screen of Admin
    public User approveUser(ApproveUserDTO dto){
       User user = userRepository.findByEmail(dto.getUsername()).
               orElseThrow(()-> new NotFoundException("User not found"));
        user.setStatus(UserStatus.ACTIVE);
       return userRepository.save(user);
    }
}
