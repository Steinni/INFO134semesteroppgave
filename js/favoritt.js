var lekeplass;
var url = "https://hotell.difi.no/api/json/bergen/lekeplasser?";
var xhr = new XMLHttpRequest();
xhr.open("GET", url, true);
xhr.onreadystatechange = function(){
	if(xhr.status == 200 && xhr.readyState == 4){
			lekeplass = JSON.parse(xhr.responseText).entries;
			jsonOption(lekeplass);
	}
}
xhr.send()

var option = document.getElementById("lekeplassoption");
function jsonOption(arr) {
	var option = document.getElementById("lekeplassoption");
	for(var i = 0; i < arr.length; i++){
		option.innerHTML = option.innerHTML + '<option value"' + arr[i].id + '">' + arr[i].navn + '</option>';
	}
}

function myoption(){
	var selected = document.getElementById("lekeplassoption").value;
	document.getElementById("favoritt").innerHTML = "Din valgte lekeplassen: " + selected;


}


function calcDistance(lat1, long1, lat2, long2) {
x = Math.pow(lat2 - lat1, 2);
y = Math.pow(long2 - long1, 2);
d = x + y;
return Math.sqrt(d);
}
