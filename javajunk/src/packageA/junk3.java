package packageA;

import java.net.MalformedURLException;
import java.net.URL;

import org.sikuli.webdriver.ImageElement;
import org.sikuli.webdriver.SikuliFirefoxDriver;

public class junk3 {

	SikuliFirefoxDriver _driver;
	
	public junk3() {
		System.out.println("Hey!");
		
		_driver = new SikuliFirefoxDriver();
		_driver.get("http://devel.streamate.com/cam/BRANNDY/");
		
		try {
			ImageElement image1 = _driver.findImageElement(
					new URL("https://dl.dropbox.com/u/12507913/SIKULI/FMS_IMG/generic_LaraCroft.PNG"));
			image1.click();
			System.out.println("click 1!");
			
			Thread.sleep(1000);
			
			ImageElement image2 = _driver.findImageElement(
					new URL("https://dl.dropbox.com/u/12507913/SIKULI/FMS_IMG/client_button_gold_give.PNG"));
			image2.click();
			System.out.println("click 2!");
		
		} catch (MalformedURLException | InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}
	
	
	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub

		
		new junk3();
	}

}
