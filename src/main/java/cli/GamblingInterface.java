package cli;

import evilgambling.numbergen.RandomNumberGenerators;

import java.util.Scanner;

public class GamblingInterface {

    public static void main(String[] args) {
    		RandomNumberGenerators generator = new RandomNumberGenerators(1,9);
    		
    		RandomNumberGenerators spins = new RandomNumberGenerators(10, 1000);
    		
    		Scanner scanner = new Scanner(System.in);
    		
    		//int winnings is going to be 0 every time you run this code we need to rethink for GUI
    		
    		int winnings = 0;
    		
    		int numberofspins = 0;
    		
    		//Warning Line 20 to 27 Is useless for GUI. DO NOT IMPLEMENT!!!!!!!!
    		
    		System.out.println(
    	            "\n\t\tEvil Gambling\n\n" +
    	            "\t\t_____________________________________\n" +
    	            "\t\t|           |           |           |\n" +
    	            "\t\t|     ?     |     ?     |     ?     |\n" +
    	            "\t\t|___________|___________|___________|\n\n" +
    	            "\t\tTotal Winnings: ?"
    	        );
    		
    		while (true) {
    			System.out.println("Press enter to spin...");
    		    scanner.nextLine();
    		    int fakereel1 = generator.generate();
    		    int fakereel2 = generator.generate();
    		    int fakereel3 = generator.generate();
    		    int maxspins = spins.generate();
    		    
    		    if (fakereel1 == fakereel2) {
    	        		if (fakereel2 == fakereel3) {
    	        			winnings = winnings + fakereel3;
    	        		}
    	        }
    		  
    		    printSlotMachine(fakereel1, fakereel2, fakereel3, winnings);
    		    
    		    numberofspins ++;
    		    
    		    if (numberofspins > maxspins) {
    		    		numberofspins = 0;
    		    		winnings = 0;
    		    }
    		    
    		}
    }
    
    //Attention line 50 to 59 is also useless for GUI. DO NOT IMPLEMENT!!!!!!!!!
    
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