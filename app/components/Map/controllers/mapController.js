angular.module("WeatherMap").controller("MapController", function($scope, GeolocationService){
  
  var map; 
  // open layer maps
  GeolocationService.getLocation().then(function(data){
    
    map = new ol.Map({
      target: 'map',
      layers: [
        new ol.layer.Tile({
          source: new ol.source.MapQuest({layer: 'osm'})
        }),
        
      ],
      view: new ol.View({
        center: ol.proj.transform([data.lon,data.lat], 'EPSG:4326', 'EPSG:3857'),
        zoom: 5
      })
    });
    map.addControl(new ol.control.FullScreen({label : "FullScreen", labelActive : true}));
    
  });
  var precipitationLayer = new ol.layer.Tile({
    source: new ol.source.XYZ({
      url : "http://precipitation.tile.openweathermap.org/map/precipitation/{z}/{x}/{y}.png"
    })
  });
  var cloudLayer = new ol.layer.Tile({
    source : new ol.source.XYZ({
      url : "http://clouds.tile.openweathermap.org/map/clouds/{z}/{x}/{y}.png"
    })
  });
  var tempLayer = new ol.layer.Tile({
    source : new ol.source.XYZ({
      url : "http://temp.title.openweathermap.org/map/temp/{z}/{x}/{y}.png"
    })
  });
  $scope.layerModel = {
    precipitation : false,
    clouds : false,
    temp : false
  };
  $scope.getLayers = function(){
     return map.getLayers();
  };
  $scope.switchLayer = function(layer){
    switch(layer){
      case "precipitation":
        if($scope.layerModel.precipitation === true){
          map.removeLayer(precipitationLayer);
        }
        else{
          map.addLayer(precipitationLayer);
        }
        break;
        
    }
  };
  
  
});