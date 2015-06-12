
angular.module("WeatherApp", ["ui.bootstrap", "SharedElements", "Forecast", "ngAnimate"]).config( [
    '$compileProvider',
    function( $compileProvider )
    {   
        $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension):/);
        // Angular before v1.2 uses $compileProvider.urlSanitizationWhitelist(...)
    }
]);

