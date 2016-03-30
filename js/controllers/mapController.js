gnarApp.controller("mapController", ['MapFactory', 'apiFactory', 'chosenLocationService', 'GnarlometerFactory',
  'MarineApiFactory', 'markersFactory', 'locations', function(MapFactory, apiFactory, chosenLocationService,
    GnarlometerFactory, MarineApiFactory, markersFactory, locations) {

  var self = this;

  self.locations = locations.data;
  markersFactory.assignIds(self.locations);
  self.ids = markersFactory.allIds;

  self.mapFactory = new MapFactory();

  self.getWeather = function(id, coords) {
    MarineApiFactory.getMarineInfo(coords.latitude, coords.longitude).then(function(response){
      for(i=0; i < self.ids.length; i++) {
        if(self.ids[i].id === id) {
          self.beachName = self.ids[i].name;
          self.beachId = self.ids[i].id;
          self.temp = response[0].hourly[2].tempC;
          self.windSpeed = response[0].hourly[2].windspeedMiles;
          self.swellFeet = response[0].hourly[2].swellHeight_ft;
          self.swellPeriod = response[0].hourly[2].swellPeriod_secs;
        }
      }
      self.gnarLevel = GnarlometerFactory.calculateGnar(self.windSpeed, self.swellFeet, self.swellPeriod);
    });
  };

  self.storeLocation = function(id) {
    debugger
    for(i = 0; i < self.locations.length; i++){
      if(self.locations[i].id === id) {
        chosenLocationService.selectedLocation = self.locations[i];
      }
    }
  };

  self.isLoaded = function() {
    return (typeof self.temp !== 'undefined' );
  };


}]);
