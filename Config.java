import java.util.Random;

public class Config {
    public static void main(String[] args) {
        Random random = new Random();
        int randomNumber = random.nextInt(11) + 30;
        System.out.println("Random number between 30 and 40: " + randomNumber);
    }
}