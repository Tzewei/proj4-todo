$(document).ready(function() {

    console.log("ready!");

    var $btn = $('#request');
    var $bio = $('#bio');
    var $weather = $('#weather');
    var $textInput = $("#myText");
    var $loader = $('.loader');

    var result = 0;

    function convert(fa) {
        return (((fa-32)*5)/9).toFixed(1);
    }



    $loader.hide();
result = convert(81);
console.log('Result' + result );




//Yahoo Weather API
    $.ajax({
       // where the data live
        url: 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22singapore%2Csg%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys',

       type: 'GET',
       // what is their type
       dataType: 'JSON',
       // show the loader before making the request
       beforeSend: function(xhr) {
         $loader.show();
       },

     }).done(successFunction)
       .fail(failFunction);
     //.always(alwaysFunction);


     function successFunction(data) {
       $loader.hide();
// console.log(data);
// console.log('1st: ' + data.query.results.channel.location.city + ',' + data.query.results.channel.location.region);
// console.log('Wind Speed: '+data.query.results.channel.wind.speed);
// console.log('Sunset: '+data.query.results.channel.astronomy.sunset);
// console.log('Temperature: '+ convert(data.query.results.channel.item.condition.temp));
// console.log('Temperature Hi: '+data.query.results.channel.item.condition.temp);
// console.log('Temperature Lo: '+data.query.results.channel.item.condition.temp);
// console.log('Condition: '+data.query.results.channel.item.condition.text);
// console.log('Other: '+data.query.results.channel.item.description);

$('<br><br><p1>Today ' + data.query.results.channel.item.forecast[0].date + '</p1>').appendTo($weather);
$('<p2><br>'+'Weather for ' + data.query.results.channel.location.city + ',' + data.query.results.channel.location.region + '</p2>').appendTo($weather);
$('<p3><br>' + convert(data.query.results.channel.item.condition.temp) + ' C</p3>').appendTo($weather);
$('<p4><br> High: ' + convert(data.query.results.channel.item.forecast[0].high) + ' C</p4>').appendTo($weather);
$('<p4>  |  Low: ' + convert(data.query.results.channel.item.forecast[0].low) + ' C</p4>').appendTo($weather);
$('<p4><br>' + data.query.results.channel.item.condition.text + ' </p4>').appendTo($weather);
$('<p4><br>Humidity: ' + data.query.results.channel.atmosphere.humidity + ' %</p4>').appendTo($weather);
// $('<p>Sunrise: ' + data.query.results.channel.astronomy.sunrise + '</p>').appendTo($weather);
// $('<p>Sunset: ' + data.query.results.channel.astronomy.sunset + '</p>').appendTo($weather);
$('<h5><br>Temperature last updated on ' + data.query.results.channel.item.condition.date + ' </h5>').appendTo($weather);


//
// $('<p>' + data.query.results.channel.item.forecast[1].date +' '+ data.query.results.channel.item.forecast[1].day+ '</p>').appendTo($weather);
// $('<p>Temperature Low: ' + data.query.results.channel.item.forecast[1].low + ' Celsius</p>').appendTo($weather);
// $('<p>Temperature Hi: ' + data.query.results.channel.item.forecast[1].high + ' Celsius</p>').appendTo($weather);
// $('<p>Condition: ' + data.query.results.channel.item.forecast[1].text + ' </p>').appendTo($weather);
// $('<p>Today Temperature Low: ' + data.query.results.channel.item.forecast[1].low + ' Celsius</p>').appendTo($weather);
//
//
//
//
//        $('<h3>' + data.query.results.channel.location.city + ',' + data.query.results.channel.location.region + '</h3>').appendTo($weather);
//        $('<p>Wind Speed: ' + data.query.results.channel.wind.speed + 'mph</p>').appendTo($weather);







      //  $('<p>humidity: ' + data.query.results.channel.item.description + ' </p>').appendTo($weather);


     }

     function failFunction(request, textStatus, errorThrown) {
       // hide the list and show the corresponding message
       $weather.html('An error occurred during your request: ' + request.status + ' ' + textStatus + ' ' + errorThrown);
     }



});//jquery closing()
