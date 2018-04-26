
//Oppgave 2

var url;
function request(url, callback){
var xhr = new XMLHttpRequest();
xhr.open("GET", url, true);
xhr.onreadystatechange = function(){
  if(xhr.readyState ==4){
    if(xhr.status == 200){
      var responseJSON = JSON.parse(xhr.responseText);
      callback(responseJSON);
    }else{
      callback(null);
    }
  }

    }
    xhr.send();
  }

// i bunnen av checkboc søk. OPS kan mangle } bracket.
var map = new google.maps.Map(document.getElementById('map'), {
    			 zoom: 14,
    			 center: new google.maps.LatLng(60.395025, 5.325094),
		 });

	    	for (var i = 0; i < json.length; i++) {
				var tJson = toaletter.entries[i];
	    	  	var marker = new google.maps.Marker({
	        	position: {lat: parseFloat(tJson.latitude), lng: parseFloat(tJson.longitude)},
	        	map: map,
	 				 	label: tJson.id, 			// angir en label på markers med IDn til toalettene
						title: tJson.plassering

	      });
	 }
