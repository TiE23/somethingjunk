package packageA;

import static org.junit.Assert.assertTrue;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.fail;

import junit.framework.*;

import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;

import java.io.IOException;


/**Just my junk folder. No need for a remote repo for this junk.
 * 
 * @author Kyle Geib
 *
 */

@SuppressWarnings("unused")

public class junk1 {

	private String word;
	
	/**
	 * @param args
	 */
	public static void main(String[] args) {
		
		new junk1();
		System.out.println("Hello world, yo!");

	}
	
	public junk1() {
		word = "Hello!";
		System.out.println("new junk1()");
	}
	
	@Before
	public void before() {
		word = "Before";
	}
	
	@BeforeClass
	static public void beforeClass() {
		System.out.println("beforeClass()");
	}
	
	@Test
	public void test01() {
		assertTrue("Permanent False!", false);
	}
	
	@Test
	public void test02() {
		assertTrue("Permanent True!", true);
	}

	
	@Test
	public void test03() {
		System.out.println("The word is: " + word);
		assertTrue("Is the world 'Hello!'?", word.equals("Hello!"));
	}
}
