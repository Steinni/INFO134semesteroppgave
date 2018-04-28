

let map;
var url = "https://hotell.difi.no/api/json/bergen/dokart?";
let toaletter;
var xhr = new XMLHttpRequest();
xhr.open("GET", url, true);
xhr.onreadystatechange = function(){
	if(xhr.status == 200 && xhr.readyState == 4){
		 toaletter = JSON.parse(xhr.responseText).entries;
		jsonListe(toaletter);
		updateMarker();

		}
	}
xhr.send();

function jsonListe(arr){
	var output = "";
	var i;

	for (var i = 0; i < arr.length; i++){
		output += "<li>" + (i+1) + ". " + arr[i].plassering + "</li>";
	}

	document.getElementById("liste").innerHTML = output;

}

var json = [];
//var markers = [];
var infowindow;
function initialize() {


    map = new google.maps.Map(document.getElementById('map'), {
     zoom: 14,
     center: new google.maps.LatLng(60.395025, 5.325094),
		 markers: []
   });

	 for (var i = 0; i < toaletter.length; i++){
		 json = toaletter[i];
	//	 var location = new google.maps.LatLng(json.latitude, json.longitude);

		 // putMarker(map, json.id, json.plassering, location);

		 putMarker(map, json);

	 }
	 google.maps.event.addDomListener(window, 'load', initialize);
}


function putMarker(map, json){

	 let marker = new google.maps.Marker({
		position: new google.maps.LatLng(json.latitude, json.longitude),
		map: map,
		label: json.id,
		title: json.plassering

	});
	map.markers.push(marker);
	//marker.setMap(map);
	google.maps.event.addListener(marker, 'click', function(){

		if(typeof infowindow != 'undefined') infowindow.close();
		infowindow = new google.maps.InfoWindow();

		infowindow.setContent("<b>" + json.id + ". " + json.plassering + "</b>" + "<br>" + json.adresse + "</br>");
		infowindow.open(map,marker);
});
}

function removeMarker(){
	map.markers.forEach(function(marker){
		marker.setMap(null);
	});
	map.markers = [];

}

function updateMarker(){
	removeMarker();



}

		/*
			Funksjonen søker igjennom json variabelen og sjekker om et checkbox er avhuket,
			skal den filtrere json listen og genererer en ny liste basert på det som er avhuket

		*/

		function checkboxSøk(){
			json = toaletter;
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
				li.innerHTML = (i+1) + ". " + json[i].plassering;
				ol.appendChild(li);

				updateMarker();

			}

			if (liste.innerHTML == ""){
				liste.innerHTML = "Beklager, ingen treff";
			}




}
function hurtigSøk() {
	json = toaletter;
	liste.innerHTML="";
	var søkeTekst = document.getElementById("søk");
	var søkeVerdi = søkeTekst.value;
	var regEx1 = RegExp('mann|herre|gutt|');
	var regEx2 = RegExp('gratis|free');
	var regEx3 = RegExp('dame|kvinne|jente');
	var regEx4 = RegExp('stellerom|baby|stelle');
	var regEx5 = RegExp('rullestol|handicap');
	var regEx6 = RegExp('pissoir')

			if (regEx1.test(søkeVerdi) == true){
				 jason = jason.filter(toaletter => toaletter.herre != "NULL")
			}
			else if (regEx2.test(søkeVerdi) == true){
				jason = jason.filter(toaletter => toaletter.pris == "NULL" || toaletter.pris == "0")
			}
			else if (regEx3.test(søkeVerdi) == true){
				jason = jason.filter(toaletter => toaletter.dame != "NULL")
			}
			else if (regEx4.test(søkeVerdi) == true){
				jason = jason.filter(toaletter => toaletter.stellerom != "NULL")
			}
			else if (regEx5.test(søkeVerdi) == true){
				jason = jason.filter(toaletter => toaletter.rullestol != "NULL" && toaletter.rullestol != "")
			}
			else if (regEx6.test(søkeVerdi) == true){
				jason = jason.filter(toaletter => toaletter.pissoir_only != "NULL")
			}
			else{
				jason = [];
				liste.innerHTML = "Beklager, ingen treff";
			}
		for (var i = 0; i < json.length; i++){
				var li = document.createElement("LI");
				var ol = document.getElementById("liste");
				li.innerHTML = (i+1) + ". " + json[i].plassering;
				ol.appendChild(li);
			}
		}
