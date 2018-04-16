var lekeplasser;
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function(){
	if(xhr.status == 200 && xhr.readyState == 4){
		lekeplasser = JSON.parse(xhr.response);
		for (var i = 0; i < lekeplasser.entries.length; i++){
			var li = document.createElement("LI");
			var ol = document.getElementById("liste");
			li.innerHTML = (i+1) + ". " + lekeplasser.entries[i].navn;
			ol.appendChild(li);
		}
	}
}
xhr.open("GET", "https://hotell.difi.no/api/json/bergen/lekeplasser?");
xhr.send();
