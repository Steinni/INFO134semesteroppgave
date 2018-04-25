
//Oppgave 2

var url;
function request(url, callback){
var xhr = new XMLHttpRequest();
xhr.open("GET", url, true);
xhr.onreadystatechange = function(){
  if(xhr.readyState ==4){
    if(xhr.status == 200){
      var responseJSON = JSON.parse(xhr.responseText);
      callback(responseJSON);
    }else{
      callback(null);
    }
  }

    }
    xhr.send();
  }
}
