
//Oppgave 2

var url;
function request(url, callback){
var xhr = new XMLHttpRequest();

xhr.onreadystatechange = function(e){
  if(xhr.readyState ==4){
    if(xhr.status == 200){
      callback(xhr.response)
    }else{
      callback(null)
    }
  }

    }
    xhr.onload = request;
    xhr.open("GET", url, true);
    xhr.send();
  }
}
