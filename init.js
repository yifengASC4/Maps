var map, infoWindow, marker, myLocation;
function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 18,
        center: { lat: 40.73059628255506, lng: -73.99152517318726 },
        mapTypeId: 'terrain'
    });
    var geocoder = new google.maps.Geocoder();
    document.getElementById('submit').addEventListener('click', function () {
        geocodeAddress(geocoder, map);
    });
    var trafficLayer = new google.maps.TrafficLayer();
    trafficLayer.setMap(map);
    infoWindow = new google.maps.InfoWindow;
    // Try HTML5 geolocation.
    // if (navigator.geolocation) {
    //     navigator.geolocation.getCurrentPosition(function (position) {
    //         var pos = {
    //             lat: position.coords.latitude,
    //             lng: position.coords.longitude
    //         };
    //         mylocation = marker;
    //         marker = new google.maps.Marker({
    //             position: map.getCenter(),
    //             animation: google.maps.Animation.DROP,
    //             icon: {
    //                 path: google.maps.SymbolPath.CIRCLE,
    //                 scale: 10,
    //                 strokeColor: 'steelblue'
    //             },

    //             map: map
    //         });
    //         marker.addListener('click', toggleBounce);
    //         function toggleBounce() {
    //             if (marker.getAnimation() !== null) {
    //                 marker.setAnimation(null);
    //             } else {
    //                 marker.setAnimation(google.maps.Animation.BOUNCE);
    //             }
    //         }
    //         // infoWindow.setPosition(pos);
    //         // infoWindow.setContent('You are here');
    //         // infoWindow.open(map);
    //         // map.setCenter(pos);
    //     }, function () {
    //         handleLocationError(true, infoWindow, map.getCenter());
    //     });
    // } else {
    //     // Browser doesn't support Geolocation
    //     handleLocationError(false, infoWindow, map.getCenter());
    // }

    poly = new google.maps.Polyline({
        strokeColor: '#000000',
        strokeOpacity: 1.0,
        strokeWeight: 3
    });
    poly.setMap(map);
}
function geocodeAddress(geocoder, resultsMap) {
    var address = document.getElementById('address').value;
    geocoder.geocode({ 'address': address }, function (results, status) {
        if (status === 'OK') {
            resultsMap.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
                map: resultsMap,
                position: results[0].geometry.location,
                animation: google.maps.Animation.DROP,
                label: '=)'

            });
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}