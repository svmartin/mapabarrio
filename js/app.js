var map;
// Create a new blank array for all the listing markers.
var markers = [];
function initMap() {
  // Constructor creates a new map - only center and zoom are required.
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 44.9689133, lng: -93.21455600000002},
    zoom: 13,
    // style from SnazzyMaps: https://snazzymaps.com/style/25/blue-water
    styles: [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#46bcec"},{"visibility":"on"}]}]

  });
  // These are the real estate listings that will be shown to the user.
  // Normally we'd have these in a database instead.
  let locations = [
    {
      title: "J. Selby's",
      location: { lat: 44.9464775, lng: -93.13660099999998 }
    },

    {
      title: "Hard Times Cafe",
      location: { lat: 44.969589, lng: -93.24622699999998 }
    },

    {
      title: "Black Sheep Pizza",
      location: { lat: 44.95574329999999, lng: -93.2781048 }
    },

    {
      title: "Ginger Hop Restaurant",
      location: { lat: 44.9877183, lng: -93.25765769999998}
    },

    {
      title: "French Meadow Bakery and Cafe",
      location: { lat: 44.95499, lng: -93.288477 }
    },

    {
      title: "Milk Jam Creamery",
      location: { lat: 44.9523874, lng: -93.28780699999999 }
    },

    {
      title: "The Herbivorous Butcher",
      location: { lat: 44.99041930000001, lng: -93.25398469999999 }
    },

    {
      title: "World Street Kitchen",
      location: { lat: 44.9525952, lng: -93.2878359 }
    },

    {
      title: "Pizza Nea",
      location: { lat: 44.98802449999999, lng: -93.25587080000003 }
    },

    {
      title: "Cucumbers",
      location: { lat: 44.8672419, lng: -93.32654789999998}
    },

    {
      title: "The LowBrow",
      location: { lat: 44.9254441, lng: -93.27812349999999 }
    },

  ];
  var largeInfowindow = new google.maps.InfoWindow();
  var bounds = new google.maps.LatLngBounds();
  // The following group uses the location array to create an array of markers on initialize.
  for (var i = 0; i < locations.length; i++) {
    // Get the position from the location array.
    var position = locations[i].location;
    var title = locations[i].title;
    // Create a marker per location, and put into markers array.
    var marker = new google.maps.Marker({
      map: map,
      position: position,
      title: title,
      animation: google.maps.Animation.DROP,
      id: i
    });
    // Push the marker to our array of markers.
    markers.push(marker);
    // Create an onclick event to open an infowindow at each marker.
    marker.addListener('click', function() {
      populateInfoWindow(this, largeInfowindow);
    });
    bounds.extend(markers[i].position);
  }
  // Extend the boundaries of the map for each marker
  map.fitBounds(bounds);
}
// This function populates the infowindow when the marker is clicked. We'll only allow
// one infowindow which will open at the marker that is clicked, and populate based
// on that markers position.
function populateInfoWindow(marker, infowindow) {
  // Check to make sure the infowindow is not already opened on this marker.
  if (infowindow.marker != marker) {
    infowindow.marker = marker;
    infowindow.setContent('<div>' + marker.title + '</div>');
    infowindow.open(map, marker);
    // Make sure the marker property is cleared if the infowindow is closed.
    infowindow.addListener('closeclick',function(){
      infowindow.setMarker = null;
    });
  }
}
