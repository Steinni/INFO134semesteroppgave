
var toaletter;
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function(){
	if(xhr.status == 200 && xhr.readyState == 4){
		toaletter = JSON.parse(xhr.response);
		for (var i = 0; i < toaletter.entries.length; i++){
			var li = document.createElement("LI");
			var ol = document.getElementById("liste");
			li.innerHTML = (i+1) + ". " + toaletter.entries[i].plassering;
			ol.appendChild(li);

		}
	}
}
xhr.open("GET", "https://hotell.difi.no/api/json/bergen/dokart?");
xhr.send();





function initialize() {


   var map = new google.maps.Map(document.getElementById('map'), {
     zoom: 14,
     center: new google.maps.LatLng(60.395025, 5.325094),

   });






	 	 /* søker igjennom json listen og henter ut posisjonen til toalettene ved
	 	 å bruke latitude og longitude keyvalues
	 	 */
	    for (var i = 0; i < toaletter.entries.length; i++) {
				var tJson = toaletter.entries[i];
	      var marker = new google.maps.Marker({
	        position: {lat: parseFloat(tJson.latitude), lng: parseFloat(tJson.longitude)},
	        map: map,
	 			 	label: tJson.id, 			// angir en label på markers med IDn til toalettene
					title: tJson.plassering

	      });


	 		 // gjør markers klikkbare og åpner et infovindu på klikk som forteller toalett ID og plassering

	 		 var infowindow = new google.maps.InfoWindow();
	      google.maps.event.addListener(marker, 'click', (function(marker, i) {
	        return function() {
	          infowindow.setContent(tJson.id + ". " + tJson.plassering);
	          infowindow.open(map, marker);
	        }
	      })(marker, i));
	    }
		}


		/*
			Funksjonen søker igjennom json variabelen og sjekker om et checkbox er avhuket,
			skal den filtrere json listen og genererer en ny liste basert på det som er avhuket

		*/
		function checkboxSøk(){
			var json = toaletter.entries;
			var liste = document.getElementById("liste");
			liste.innerHTML= "";

			if (document.getElementById("mann").checked){
				 json = json.filter(toaletter => toaletter.herre != "NULL")
			}
			if (document.getElementById("gratis").checked){
				json = json.filter(toaletter => toaletter.pris == "NULL" || toaletter.pris == "0")
			}
			if (document.getElementById("dame").checked){
				json = json.filter(toaletter => toaletter.dame != "NULL")
			}
			if (document.getElementById("stellerom").checked){
				json = json.filter(toaletter => toaletter.stellerom != "NULL")
			}
			if (document.getElementById("rullestol").checked){
				json = json.filter(toaletter => toaletter.rullestol != "NULL" && toaletter.rullestol != "")
			}
			if (document.getElementById("pissoir").checked){
				json = json.filter(toaletter => toaletter.pissoir_only != "NULL")
			}

			for (var i = 0; i < json.length; i++){
				var li = document.createElement("LI");
				var ol = document.getElementById("liste");
				li.innerHTML = (i+1) + ". " + toaletter.entries[i].plassering;
				ol.appendChild(li);


			}

			if (liste.innerHTML == ""){
				liste.innerHTML = "Beklager, ingen treff";
			}

		}
