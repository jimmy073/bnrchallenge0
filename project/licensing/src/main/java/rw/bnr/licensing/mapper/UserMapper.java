package rw.bnr.licensing.mapper;

import rw.bnr.licensing.dto.request.CreateUserDTO;
import rw.bnr.licensing.dto.response.UserDTO;
import rw.bnr.licensing.entity.User;

public class UserMapper {

    // Mapping to the response
    public static UserDTO toDTO(User user) {
        if (user == null) return null;

        UserDTO dto = new UserDTO();

        dto.setId(user.getId());
        dto.setFirstName(user.getFirstName());
        dto.setLastName(user.getLastName());
        dto.setEmail(user.getEmail());
        dto.setTelephone(user.getTelephone());
        dto.setNationalId(user.getNationalId());
        dto.setLoggedIn(user.isLoggedIn());

        if (user.getRole() != null) {
            dto.setRoleName(user.getRole().getName());
        }

        return dto;
    }



    // Mapping from the request of creating user
    public static User toEntity(CreateUserDTO dto) {
        if (dto == null) return null;

        User user = new User();

        user.setFirstName(dto.getFirstName());
        user.setLastName(dto.getLastName());
        user.setEmail(dto.getEmail());
        user.setTelephone(dto.getTelephone());
        user.setNationalId(dto.getNationalId());
       // user.setRole(role); this has to be done in service
        user.setLoggedIn(false);
        // password is getting  hashed value from SERVICE layer
        user.setPassword(dto.getPassword());

        //TO DO implement user status

        return user;
    }
}
