angular.module("WeatherMap").controller("MapController", function($scope, GeolocationService){
  
  var map; 
  // open layer maps
  var satBaseLayer = new ol.layer.Group({
    layers : [
      new ol.layer.Tile({
        source : new ol.source.MapQuest({layer: 'sat'})
      })
    ]
  });
  
  var osmBaseLayer = new ol.layer.Group({
    layers : [
      new ol.layer.Tile({
        source : new ol.source.MapQuest({layer : "osm"})    
      })
    ]
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
    precipitation : true,
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
  
  GeolocationService.getLocation().then(function(data){
    
    map = new ol.Map({
      target: 'map',
      //controls: ol.control.defaults().extend([
      //  new ol.control.FullScreen()
      //]),
      view: new ol.View({
        center: ol.proj.transform([data.lon,data.lat], 'EPSG:4326', 'EPSG:3857'),
        zoom: 4
      })
    });
    map.setLayerGroup(osmBaseLayer);
    map.addLayer(precipitationLayer);
  });
});