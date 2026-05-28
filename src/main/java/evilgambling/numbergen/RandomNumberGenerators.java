package evilgambling.numbergen;

import java.util.Random;

public class RandomNumberGenerators {
	private final Random random = new Random();

    public int generate() {
        return random.nextInt(69) + 1;
    }
}
