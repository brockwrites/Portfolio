/*
Broken Access Control is a situation where the application does not properly enforce restrictions on what authenticated users are allowed to do.
In this example, a user authentication system demonstrates broken access control.
--I have a basic authentication system with a User class representing user information, an AuthService class for authentication, and a UserController class to handle user requests.
--The UserController simulates a broken access control scenario by allowing special access to sensitive data for a specific user (user1), and doesn't use roles to assign permissions.
*/
import java.util.HashMap;
import java.util.Map;

class User {
    private String username;
    private String password;

    public User(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }
}

class AuthService {
    private Map<String, User> userDatabase;

    public AuthService() {
        this.userDatabase = new HashMap<>();
        // Adding some dummy users
        userDatabase.put("user1", new User("user1", "password1"));
        userDatabase.put("user2", new User("user2", "password2"));
    }

    public User authenticate(String username, String password) {
        User user = userDatabase.get(username);
        if (user != null && user.getPassword().equals(password)) {
            return user;
        }
        return null;
    }
}

class UserController {
    private AuthService authService;

    public UserController(AuthService authService) {
        this.authService = authService;
    }

    public void handleRequest(String username, String password) {
        User user = authService.authenticate(username, password);
        if (user != null) {
            System.out.println("Authentication successful for user: " + user.getUsername());
            // Simulate a broken access control scenario
            if (user.getUsername().equals("user1")) {
                System.out.println("Access granted to sensitive data for user1.");
            } else {
                System.out.println("Access denied to sensitive data for " + user.getUsername());
            }
        } else {
            System.out.println("Authentication failed. Access denied.");
        }
    }
}
