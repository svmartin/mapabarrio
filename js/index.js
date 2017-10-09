let map;
   function initMap() {
     // create a new map
     map = new google.maps.Map(document.getElementById('map'), {
       center: { lat: 44.9465, lng: 93.1366 },
       zoom: 13
     });
   }
