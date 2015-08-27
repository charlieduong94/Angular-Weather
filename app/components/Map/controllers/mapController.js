angular.module("WeatherMap").controller("MapController", function($scope, $modal, GeolocationService){
  var map; 
  // open layer maps
  var precipitationLayer = new ol.layer.Tile({
    preload : Infinity,
    opacity : 0.5,
    source: new ol.source.XYZ({
      url : "http://precipitation.tile.openweathermap.org/map/precipitation/{z}/{x}/{y}.png"
    })
  });
  var cloudLayer = new ol.layer.Tile({
    preload : Infinity,
    opacity : 0.5,
    source : new ol.source.XYZ({
      url : "http://clouds.tile.openweathermap.org/map/clouds/{z}/{x}/{y}.png"
    })
  });
  var pressureLayer = new ol.layer.Tile({
    preload : Infinity,
    opacity : 0.5,
    source : new ol.source.XYZ({
      url : "http://pressure.tile.openweathermap.org/map/pressure/{z}/{x}/{y}.png"
    })
  });
  var snowLayer = new ol.layer.Tile({
    preload : Infinity,
    opacity : 0.5,
    source : new ol.source.XYZ({
      url : "http://snow.tile.openweathermap.org/map/snow/{z}/{x}/{y}.png"
    })
  });
  var tempLayer = new ol.layer.Tile({
    preload : Infinity,
    opacity : 0.5,
    source : new ol.source.XYZ({
      url : "http://temp.tile.openweathermap.org/map/temp/{z}/{x}/{y}.png"
    })
  });
  var satLayerGroup = new ol.layer.Group({
    preload : Infinity,
    layers : [
      new ol.layer.Tile({
        source : new ol.source.MapQuest({layer: 'sat'})
      }), precipitationLayer, cloudLayer, pressureLayer, snowLayer, tempLayer
    ]
  });
  
  var osmLayerGroup = new ol.layer.Group({
    preload : Infinity,
    layers : [
      new ol.layer.Tile({
        source : new ol.source.MapQuest({layer : "osm"})    
      }), precipitationLayer, cloudLayer, pressureLayer, snowLayer, tempLayer
    ]
  });
  var hybLayerGroup = new ol.layer.Group({
    preload : Infinity,
    layers : [
      new ol.layer.Tile({
        source : new ol.source.MapQuest({layer : "hyb"})    
      }), precipitationLayer, cloudLayer, pressureLayer, snowLayer, tempLayer
    ]
  });
  precipitationLayer.setVisible(false);
  cloudLayer.setVisible(false);
  pressureLayer.setVisible(false);
  snowLayer.setVisible(false);
  tempLayer.setVisible(false);
  var baseLayerGroups = {sat : satLayerGroup, osm : osmLayerGroup, hyb : hybLayerGroup};
  $scope.mapRadioModel = 'osm';
  $scope.mapRadioModelIsActive = function(map){
    if($scope.mapRadioModel === map){
      return true;
    }
    return false;
  };
  $scope.layerModel = {
    precipitation : false,
    clouds : false,
    pressure : false,
    snow : false,
    temp : false
  };
  $scope.switchMap = function(mapType){
    $scope.mapRadioModel=mapType;
     switch(mapType){
       case "osm":
          map.setLayerGroup(osmLayerGroup);
          break;
        case "sat":
          map.setLayerGroup(satLayerGroup);
          break;
        case "hyb":
          map.setLayerGroup(hybLayerGroup);
          break;
     }
  };
  $scope.switchLayer = function(layer){
    switch(layer){
      case "precipitation":
        if($scope.layerModel.precipitation === true){
          precipitationLayer.setVisible(false);
          
        }
        else{
          precipitationLayer.setVisible(true);
        }
        break;
      case "clouds":
        if($scope.layerModel.clouds === true){
          cloudLayer.setVisible(false);
        }
        else{
          cloudLayer.setVisible(true);
        }
        break;
      case "pressure":
        if($scope.layerModel.pressure === true){
          pressureLayer.setVisible(false);
        }
        else{
          pressureLayer.setVisible(true);
        }
        break;
      case "snow":
        if($scope.layerModel.snow === true){
          snowLayer.setVisible(false);
        }
        else{
          snowLayer.setVisible(true);
        }
        break;
      case "temp":
        if($scope.layerModel.temp === true){
          tempLayer.setVisible(false);
        }
        else{
          tempLayer.setVisible(true);
        }
        break;
    }
  };
  
  GeolocationService.getLocation().then(function(data){
    map = new ol.Map({
      target: 'map',
      loadTilesWhileAnimating : true,
      loadTilesWhileInteracting : true,
      view: new ol.View({
        center: ol.proj.transform([data.lon,data.lat], 'EPSG:4326','EPSG:3857'),
        zoom: 6
      })
    });
    map.setLayerGroup(osmLayerGroup);
  });
  $scope.moreInfo = function(){
    $modal.open({
        animation: true,
        templateUrl: 'mapModal.html',
        size: 'sm',
        controller : "MapModalController",
        backdrop: 'static',
        keyboard: false
    });
  }
});