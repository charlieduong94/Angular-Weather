$(document).ready(function(){
    $("[data-toggle='tooltip']").tooltip({'placement': 'bottom'});
    $('body').on('click', 'a', function(){
        chrome.tabs.create({url: $(this).attr('href')});
        return false;
    });
});
angular.module("WeatherApp", ["ui.bootstrap", "SharedElements", "WeatherMap", "Forecast", "ngAnimate"]).config( [
    '$compileProvider',
    function( $compileProvider )
    {
        $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension):/);
        // Angular before v1.2 uses $compileProvider.urlSanitizationWhitelist(...)
    }
]);

