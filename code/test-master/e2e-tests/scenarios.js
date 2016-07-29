'use strict';

describe('my app', function() {


  it('should automatically redirect to /geolocation when location hash/fragment is empty', function() {
    browser.get('index.html');
    expect(browser.getLocationAbsUrl()).toMatch("/geolocation");
  });


  describe('Test geolocation', function() {

    beforeEach(function() {
      browser.get('index.html#!/geolocation');
    });


    it('should render view1 when user navigates to /geolocation', function() {
      var myLocationButton = element(by.css('[ng-click="getMyLocation()"]'));
      var location = element(by.id('location_regionName'));

      myLocationButton.click();
      browser.sleep(2000);
      expect(location.getText()).toBe("California");
      browser.sleep(2000);
      element(by.id('webSiteDomainTF')).click();
      browser.sleep(3000);
      element(by.id('webSiteDomainTF')).sendKeys("www.colorado.com");
      element(by.css('[ng-click="onClicked()"]')).click();
      browser.sleep(3000);
      myLocationButton.click();
      browser.sleep(3000);
    });

  });

});