var url = "https://hotell.difi.no/api/json/bergen/dokart?";
let toaletter;
var xhr = new XMLHttpRequest();
xhr.open("GET", url, true);
xhr.onreadystatechange = function(){
	if(xhr.status == 200 && xhr.readyState == 4){
		 toaletter = JSON.parse(xhr.responseText);
		jsonListe(toaletter);
		updateMarker();

		}
	}
xhr.send();


function jsonListe(arr){
	var output = "";
	var i;

	for (var i = 0; i < arr.entries.length; i++){
		output += "<li>" + (i+1) + ". " + arr.entries[i].plassering + "</li>";
	}

	document.getElementById("liste").innerHTML = output;

}
var tJson;
var map;
var infowindow;
function initialize() {


    map = new google.maps.Map(document.getElementById('map'), {
     zoom: 14,
     center: new google.maps.LatLng(60.395025, 5.325094),

   });

	 for (var i = 0; i < toaletter.entries.length; i++){
		 tJson = toaletter.entries[i];
		 var location = new google.maps.LatLng(tJson.latitude, tJson.longitude);

		  putMarker(map, tJson.id, tJson.plassering, location);

	 }
	 google.maps.event.addDomListener(window, 'load', initialize);
}
var markers = [];
function putMarker(map, id, plassering, location){
	let marker = new google.maps.Marker({
		position: location,
		map: map,
		label: id,
		title: plassering
	});
	markers.push(marker);

	google.maps.event.addListener(marker, 'click', function(){
		if(typeof infowindow != 'undefined') infowindow.close();
		infowindow = new google.maps.InfoWindow();
		infowindow.setContent(id + ". " + plassering);
		infowindow.open(map,marker);
	});
}

function removeMarker(){
	markers.forEach(function(marker){
		marker.setMap(null);
	});
}

function updateMarker(){
	removeMarker();


}

	 	 /* søker igjennom json listen og henter ut posisjonen til toalettene ved
	 	 å bruke latitude og longitude keyvalues
	 	 */




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

				updateMarker();

			}

			if (liste.innerHTML == ""){
				liste.innerHTML = "Beklager, ingen treff";
			}




}
