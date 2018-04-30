var turer;
var xhr = new XMLHttpRequest();
xhr.open("GET", "http://api.nasjonalturbase.no/turer/?limit=100");
xhr.onreadystatechange = function(){
	if(xhr.status == 200 && xhr.readyState == 4){
		turer = JSON.parse(xhr.response);
		for (var i = 0; i < lekeplasser.entries.length; i++){
			var li = document.createElement("LI");
			var ol = document.getElementById("turliste");
			li.innerHTML = (i+1) + ". " + lekeplasser.entries[i].navn;
			ol.appendChild(li);
		}
	}
}

xhr.send();
