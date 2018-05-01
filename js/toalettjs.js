var toaletter;
let map;

/**
 oppgave 2

 Funksjonen requestJSON henter JSON fra url
 som blir angitt.
 Dataen blir tolket og returnerer til en callback
 hvor den sjekker om requesten ble godkjent eller ikke.
*/

function requestJSON(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if(xhr.readyState == 4 && xhr.status == 200) {
      var appJson = "application/json";
      var contentType = xhr.getResponseHeader("Content-Type");
        if(contentType.match(appJson)){
        var jres = JSON.parse(xhr.response).entries;
        callback(jres);
      } else {
        callback(null);
      }
  }
}
  xhr.open('GET', url, true);
  xhr.send();
}

/**
Oppgave 3
Bruker funksjonen fra oppgave 2 til å laste ned og tolke datasettet
dokart i Bergen.
Bruker funksjonen fra oppgave 4 til å generere nummerert liste for dokart
*/
requestJSON("https://hotell.difi.no/api/json/bergen/dokart?", function(res){
	toaletter = res;
		jsonListe(toaletter);
    updateMarker();
});

/**
Oppgave 4
Funksjon som genererer en nummerert liste, hvor den tar inn et object
som parameter.
*/

function jsonListe(obj){
  for (var i = 0; i < obj.length; i++){
    var liste = document.getElementById("liste");
    var ul = document.createElement("ul");
    ul.innerHTML = (i+1) + ".  " + obj[i].plassering;
    liste.appendChild(ul);
  }
}
// Globale variabler
var json;
var markers = [];
var InfoWindow;


/**
Funksjon som initialiserer Google maps.
Bruker funksjon putMarker til å generere markers på kartet
*/
function initialize() {


    map = new google.maps.Map(document.getElementById('map'), {
     zoom: 14,
     center: new google.maps.LatLng(60.395025, 5.325094),
   });




     json = toaletter;
     putMarker(json);

	 google.maps.event.addDomListener(window, 'load', initialize);
}

/**
Funksjon som legger til markers på kartet, og tar inn en parameter
som bevarer koordinater, og putter dette inn i et markers array.
Bruker funksjon removeMarker() til å tømme 'markers' array før nye markers blir satt
*/
function putMarker(json){
  removeMarker();
  json.forEach(function(tjson, i){

	  let marker = new google.maps.Marker({
	  position: {lat: parseFloat(tjson.latitude), lng: parseFloat(tjson.longitude)},
		map: map,
		label: tjson.id,
		title: tjson.plassering

	});
	markers.push(marker); // legger markers inn i en liste.
	marker.setMap(map);

/**
Legger til infovindu på markers.
Sjekker om hvis et infovindu er åpen, lukker den infovinduet når man trykker på en ny marker,
og åpner infovinduet for den klikte marker.
*/
infowindow = new google.maps.InfoWindow();
  marker.addListener( 'click', (function(marker, i){
    return function(){
    if (typeof infowindow != 'undefined') infowindow.close();
    infowindow.setContent("<b>" + (i+1) + ". " + tjson.plassering + "</b>" + "<br>" + tjson.adresse + "</br>");
    infowindow.open(map, marker);
  }
  })(marker, i));
});
}


/**
Funksjon som fjerner markers fra kartet, og tømmer listen 'markers'.
*/
function removeMarker(){
	markers.forEach(function(marker){
		marker.setMap(null);
	});
	markers = [];

}

/**
Funksjon som oppdaterer kartet med nye markers.
Bruker removeMarker() funksjon til å fjerne markers og tømme 'markers' listen,
og putMarker() som tar json som et parameter for å oppdatere kartet med nye markers.

*/
function updateMarker(){
	removeMarker();

  putMarker(json);


}



/**
Funksjon som søker igjennom json variabelen og sjekker om et checkbox er avhuket,
skal den så filtrere json listen og genererer en ny liste basert på det som er avhuket
og oppdaterer kartet med nye markers.
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
				liste.innerHTML += "<ul>" + (i+1) + ". " + json[i].plassering + "</ul>";
			}

		     updateMarker();



			if (liste.innerHTML == ""){
				liste.innerHTML = "Beklager, ingen treff";
			}
}


/**

*/

function hurtigSøk() {
	 json = toaletter;
	liste.innerHTML="";
	var søkeTekst = document.getElementById("søk");
	var søkeVerdi = søkeTekst.value;
	var regEx1 = RegExp('mann|herre|gutt');
	var regEx2 = RegExp('gratis|free');
	var regEx3 = RegExp('dame|kvinne|jente');
	var regEx4 = RegExp('stellerom|baby|stelle');
	var regEx5 = RegExp('rullestol|handicap|rulle');
	var regEx6 = RegExp('pissoir')

			if (søkeVerdi == "") {
				json;
			}

			else if (regEx1.test(søkeVerdi.toLowerCase()) == true){
				 json = json.filter(toaletter => toaletter.herre != "NULL")
			}
			else if (regEx2.test(søkeVerdi.toLowerCase()) == true){
				json = json.filter(toaletter => toaletter.pris == "NULL" || toaletter.pris == "0")
			}
			else if (regEx3.test(søkeVerdi.toLowerCase()) == true){
				json = json.filter(toaletter => toaletter.dame != "NULL")
			}
			else if (regEx4.test(søkeVerdi.toLowerCase()) == true){
				json = json.filter(toaletter => toaletter.stellerom != "NULL")
			}
			else if (regEx5.test(søkeVerdi.toLowerCase()) == true){
				json = json.filter(toaletter => toaletter.rullestol != "NULL" && toaletter.rullestol != "")
			}
			else if (regEx6.test(søkeVerdi.toLowerCase()) == true){
				json = json.filter(toaletter => toaletter.pissoir_only != "NULL")
			}
			else {
				json = [];
				liste.innerHTML = "Beklager, ingen treff";
			}


		for (var i = 0; i < json.length; i++){
				var ul = document.createElement("ul");
				var ol = document.getElementById("liste");
				ul.innerHTML = (i+1) + ". " + json[i].plassering;
				ol.appendChild(ul);
			}
      updateMarker();
}
