/**
Oppgave 10
Ideen er å hente ut et dataset fra Nasjonal Turbase,
men da den ikke er tilgjengelig for henting via URL,
ble det valgt å lagre rundt 30 turer ut av litt over 12000
i et JSON format, og åpne og lese dokumentet med XMLHttpRequest
Videre er planen for at presentasjonen skal oppnå en
ikke-triviell interaksjon skal brukeren kunne sortere turene
etter hva slags tur det er.
*/


let turer;

function readJSON(file, callback){
	var rawData = new XMLHttpRequest();
	rawData.open("GET", file, true);
	rawData.onreadystatechange = function(){
		if (rawData.readyState == 4 && rawData.status == 200){
			turer = JSON.parse(rawData.responseText).documents;
			callback(turer);

		}
	}
	rawData.send(null);
}

readJSON("json/turer.json", function(text){
	turer = text;

	console.log(turer);
	lagListe(turer);


	turer.forEach(function(entry){
	//	console.log(entry.tags);

	});

});


function lagListe(obj){
	for (var i = 0; i < obj.length; i++){
		var liste = document.getElementById("liste");
		var ul = document.createElement("ul");
		ul.innerHTML = (i+1) + ". " + obj[i].navn;
		liste.appendChild(ul);
	}
}



function sortList(){

	var liste = document.getElementById("liste");
	liste.innerHTML= "";







}
