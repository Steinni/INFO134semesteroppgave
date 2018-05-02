var turer;

function readJSON(file, callback){
	var rawData = new XMLHttpRequest();
	rawData.open("GET", file, true);
	rawData.onreadystatechange = function(){
		if (rawData.readyState == 4 && rawData.status == 200){
			callback(rawData.responseText);

		}
	}
	rawData.send(null);
}
tagsArr = [];
readJSON("json/turer.json", function(text){
	 turer = JSON.parse(text).documents;

	console.log(turer);
	lagListe(turer);
	for (var i = 0; i < turer.length; i++){
		for (var j = 0; j < turer[i].tags.length; j++){
		//	console.log(turer[i].tags);
		//	console.log(turer[i].tags[j]);
			tagsArr.push(turer[i].tags[j]);
			console.log(turer[i].tags[j]);
		}

		// var uniqueTags = tagsArr.filter(function(elem, pos){
		// 	return tagsArr.indexOf(elem) == pos;
		// });
		// console.log(uniqueTags);


}
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
	var json = turer;
	var liste = document.getElementById("liste");
	liste.innerHTML= "";





	if (document.getElementById("fottur").checked){
		 json = turer.filter(json=> turer.tags == "fottur")
	}
	if (document.getElementById("skogstur").checked){
		json = json.filter(json => turer.tags == "skogstur")
	}
	if (document.getElementById("hyttetur").checked){
		json = json.filter(json => turer.tags == "hyttetur")
	}
	if (document.getElementById("trilletur").checked){
		json = json.filter(json => turer.tags == "trilletur")
	}
	if (document.getElementById("padletur").checked){
		json = json.filter(json => turer.tags == "padletur")
	}
	if (document.getElementById("skitur").checked){
		json = json.filter(json => turer.tags == "skitur")
	}
	if (document.getElementById("topptur").checked){
		json = json.filter(json => turer.tags == "topptur")
	}
	if (document.getElementById("bærtur").checked){
		json = json.filter(json => turer.tags == "bærtur")
	}
	if (document.getElementById("fjelltur").checked){
		json = json.filter(json => turer.tags == "fjelltur")
	}
	if (document.getElementById("sykkeltur").checked){
		json = json.filter(json => turer.tags == "sykkeltur")
	}
	for (var i = 0; i < json.length; i++){
		liste.innerHTML += "<ul>" + (i+1) + ". " + json[i].navn + "</ul>";
	}
	if (liste.innerHTML == ""){
		liste.innerHTML = "Beklager, ingen treff";
	}
}
