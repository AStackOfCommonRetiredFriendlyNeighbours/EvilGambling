package evilgambling.numbergen;

import java.util.Random;

public class RandomNumberGenerators {
	private Random random;
	private int from;
	private int to;
	
	public RandomNumberGenerators(int from, int to) {
		random = new Random();
		this.from = from;
		this.to = to+1;
	}
    public int generate() {
    	return random.nextInt(from,to);
    }
}
