package cli;

public class GamblingInterface {

    public static void main(String[] args) {
        int fakereel1 = 0;
        int fakereel2 = 0;
        int fakereel3 = 0;
        int winnings = 0;

        printSlotMachine(fakereel1, fakereel2, fakereel3, winnings);
    }

    public static void printSlotMachine(int fakereel1, int fakereel2, int fakereel3, int winnings) {
        System.out.println(
            "\n\t\tEvil Gambling\n\n" +
            "\t\t_____________________________________\n" +
            "\t\t|           |           |           |\n" +
            "\t\t|     " + fakereel1 + "     |     " + fakereel2 + "     |     " + fakereel3 + "     |\n" +
            "\t\t|___________|___________|___________|\n\n" +
            "\t\tTotal Winnings: " + winnings
        );
    }
}