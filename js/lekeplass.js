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
