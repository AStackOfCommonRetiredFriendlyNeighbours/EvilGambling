package evilgambling.numbergen;

public class TestForNumberGen {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		 RandomNumberGenerators generator = new RandomNumberGenerators();

	        int reel1 = generator.generate();
	        int reel2 = generator.generate();
	        int reel3 = generator.generate();
	        
	        System.out.println("\n" + "| " + reel1 + " | " + reel2 + " | " + reel3 + " |" + "\n");
	        
	        if (reel1 == reel2) {
	        		if (reel2 == reel3) {
	        			int winnings = reel1;
	        			if (winnings == 1) {
	        				System.out.println("You won: " + winnings + " Grape!");
	        			} else {
	        				System.out.println("You won: " + winnings + " Grapes!");
	        			}
	        		} else {
	        			System.out.println("You lost!");
	        		}
	        } else {
	        	System.out.println("You lost!");
	        }
	}

}
