package packageA;

import static org.junit.Assert.assertTrue;

public class junk2 {

	private enum junkenum 
	{
		fetishes_Smoking, fetishes_Anal
	}
	
	public junk2() 
	{
		things(0, 35);
		//gridTravel( 20, 1, 20 );
	}
	
	public void gridTravel( int cols, int rows, int tests ) 
	{
		int targCol = 1;
		int targRow = 1;
		int targetCount = cols*rows;
		
		if ( tests > targetCount )
			tests = targetCount;	// Cap the number of tests!
		
		int step = targetCount / tests;
		
		for ( int x = 1; x <= tests; ++x )
		{
			System.out.println( "Test # " + x + ", " +
					"Checking row[" + (targRow) + "] col[" + (targCol) + "]" );
			
			if ( ( step + targCol ) > cols )	// Need to change rows
			{
				targRow += ( step + targCol ) / cols;	// Which row do we go to?
				targCol = ( step + targCol ) % cols;	// Where to start on next row.
			}
			else
			{
				targCol += step;	// No need to change rows
			}
		}
		
		
	}
	
	private void things( int low, int high )
	{
		for (int x = low; x <= high; ++x )
			System.out.println("@Test\npublic void testCategory_"+x+"()\n{\n	Enums.Category category = Enums.Category.values()["+x+"];\n	assertTrue( \"Category \" + category, execute( category ) );\n}\n");

	}
	
	/**
	 * @param args
	 */
	public static void main(String[] args) {
		System.out.println("Heyo junk2!");
		
		new junk2();
	}

}
