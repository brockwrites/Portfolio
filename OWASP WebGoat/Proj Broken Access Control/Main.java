public class Main {
    public static void main(String[] args) {
        AuthService authService = new AuthService();
        UserController userController = new UserController(authService);

        // Valid authentication
        userController.handleRequest("user1", "password1");

        // Invalid authentication
        userController.handleRequest("user3", "password3");
    }
}
