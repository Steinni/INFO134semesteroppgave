var lekeplasser;
var xhr = new XMLHttpRequest();
xhr.open("GET", "https://hotell.difi.no/api/json/bergen/lekeplasser?");
xhr.onreadystatechange = function(){
	if(xhr.status == 200 && xhr.readyState == 4){
		lekeplasser = JSON.parse(xhr.response).entries;
		for (var i = 0; i < lekeplasser.length; i++){
			var li = document.createElement("LI");
			var ol = document.getElementById("liste2");
			li.innerHTML = (i+1) + ". " + lekeplasser[i].navn;
			ol.appendChild(li);
		}
	}
}

xhr.send();

function initialize() {
	   var map = new google.maps.Map(document.getElementById('map'), {
	     zoom: 10,
	     center: new google.maps.LatLng(60.395025, 5.325094), });


   for (var i = 0; i < lekeplasser.length; i++) {
     var tJson = lekeplasser[i];
     var marker = new google.maps.Marker({
        	position: {lat: parseFloat(tJson.latitude), lng: parseFloat(tJson.longitude)},
          	map: map,
          	label: tJson.id,
          	title: tJson.navn
        });

      var infowindow = new google.maps.InfoWindow();
	 		google.maps.event.addListener(marker, 'click', (function(marker, i) {
	  		return function() {
	     	infowindow.setContent(tJson.id + ". " + tJson.navn);
	    	 infowindow.open(map, marker);
	     }
    	})(marker, i));
	}
}
