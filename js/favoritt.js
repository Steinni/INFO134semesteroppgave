var lekeplass, toaletter;

function requestJSON(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.onreadystatechange = function() {
    if(xhr.readyState === 4 && xhr.status === 200) {
			var appJson = "application/json";
			var contentType = xhr.getResponseHeader("Content-Type");
      if(contentType.match(appJson)) {
        let jres = JSON.parse(xhr.response).entries;
        callback(jres);
      } else {
        callback(null);
      }
    }
  };
  xhr.send();
}

window.onload = function() {

  requestJSON("https://hotell.difi.no/api/json/bergen/lekeplasser?", function(res) {
    lekeplass = res;

  requestJSON("https://hotell.difi.no/api/json/bergen/dokart?", function(res){
    toaletter = res;
  });

		jsonOption();
  });

}



function jsonOption() {
	var option = document.getElementById("lekeplassoption");
	for(var i = 0; i < lekeplass.length; i++){
		option.innerHTML = option.innerHTML + '<option value"' + lekeplass[i].id + '">' + lekeplass[i].navn + '</option>';
	}
}

function myoption(){
	var selected = document.getElementById("lekeplassoption").value;


	document.getElementById("favoritt").innerHTML = "Din valgte lekeplass: " + selected + "<br>" +
  "Nærmeste toalett: ";



}
}

function calcDistance(lat1, lat2, long1, long2) {
  var x = Math.pow(lat1 - lat2, 2);
  var y = Math.pow(long1 - long2, 2);
	var d = x + y;
 return Math.sqrt(d);
}
