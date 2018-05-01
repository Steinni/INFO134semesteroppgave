
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

// Kode for å se om toaletter.entries er åpne
function splitNparse(string) {								// Funksjon til å splitte og parse toaletter.entries[i].tid_.... 
    var tidString = string; 								//Tar en json entry string
    var splitString = tidString.split(/[.-]+/); 			//Splitter string til ny array f.eks
    var numbers = [];										//"09.00 - 21.00" blir "09", "00", "21", "00"

    	for(i = 0; i < splitString.length; i++) {			//itererer gjennom ny array og parse string til int
    	var num = parseInt(splitString[i], 10);				//f. eks 9, 0, 21, 0 (dobbel null er unødvendig som int)
    	numbers.push(num);
    
    	}
    console.log(splitString);								//consolelogger string så man kan se det er rett.
    return numbers;											//returnerer int array.
}

function isOpen(toalett) {									//	Funksjon for å se om toaletter.entries er åpne
	var toilet = toalett;									//Tar et json objekt
	var date = new Date();									//Bruker date funksjonen for å hente ut verdier
	var day = date.getDay();								//Dager; man = 1, tir = 2 ... søn = 0
	var hour = date.getHours();								//Timer
	var minute = date.getMinutes();							//Minutter
	var open = false;										//Binær variabel som tilsvarer open og stengt.
		
		if (day.value = 6) {										
			var q = splitNparse(toilet.tid_lordag);
			console.log(q); // open = true;
		}
		if (day.value = 0) {
			var q = splitNparse(toilet.tid_sondag);
			console.log(q); // open = true;
		}
		else if (day.value <= 5 && day.value > 0) {
			var q = splitNparse(toilet.tid_hverdag);
			console.log(q); // open = true;
		}
		

}
