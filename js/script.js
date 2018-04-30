
//Oppgave 2

// var url;
// function request(url, callback){
// var xhr = new XMLHttpRequest();
// xhr.open("GET", url, true);
// xhr.onreadystatechange = function(){
//   if(xhr.readyState ==4){
//     if(xhr.status == 200){
//       var responseJSON = JSON.parse(xhr.responseText);
//       callback(responseJSON);
//     }else{
//       callback(null);
//     }
//   }
//
//     }
//     xhr.send();
//   }
var toaletter;
function requestJSON(url, callback){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function(){
      if(xhr.readyState == 4 && xhr.status == 200){
        responseJSON = JSON.parse(xhr.response);
      }
      callback(responseJSON);
    }else{
      callback(null);
    }
  }
    xhr.send();
<<<<<<< HEAD
=======
  }

function googleMaps(json) {

     this.json = toaletter.entries;
     	var map = new google.maps.Map(document.getElementById('map'), {
         zoom: 14,
         center: new google.maps.LatLng(60.395025, 5.325094), });

     for (var i = 0; i < json.length; i++) {
      	var tJson = toaletter.entries[i];
     	 var marker = new google.maps.Marker({
          position: {lat: parseFloat(tJson.latitude), lng: parseFloat(tJson.longitude)},
          map: map,
          label: tJson.id,
          title: tJson.plassering
        });

      var infowindow = new google.maps.InfoWindow();
	   google.maps.event.addListener(marker, 'click', (function(marker, i) {
	     return function() {
	     infowindow.setContent(tJson.id + ". " + tJson.plassering);
	     infowindow.open(map, marker);
	      }
    })(marker, i));
}
}
