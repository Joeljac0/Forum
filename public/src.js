const messageField = document.getElementById("forum")
const inputField = document.getElementById("text")
const loginField = document.getElementById("user")
const server = "http://10.0.227.209:3001"

/*http://10.0.83.34:3001*/

let hours
let minutes

latestArrayLength = 0

function getText() {
    xmlhttp = new XMLHttpRequest()

    xmlhttp.open("GET", `${server}/text`, true)

    xmlhttp.onload = () => {
        array = JSON.parse(xmlhttp.responseText)
        if (array.length > latestArrayLength){
            for (i = latestArrayLength; i < array.length; i++) {
                messageField.innerHTML += `<h2>${array[i][1]}</h2>`
                messageField.innerHTML += `<p>${array[i][0]}</p>`
                messageField.innerHTML += `<h3>${array[i][2]}:${array[i][3]}</h3>`
            }
            latestArrayLength = array.length
        } 
    }
    xmlhttp.send();
}

function Post() {
    hours = new Date().getHours();
    minutes = new Date().getMinutes();

    if (hours < 10) {
        hours = "0" + hours
    }

    if (minutes < 10) {
        hours = "0" + hours
    }

    let xhr = new XMLHttpRequest();
    xhr.open("post", `${server}/send` , true);
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send(JSON.stringify({
        post: inputField.value,
        username: loginField.value,
        hours: hours,
        minutes: minutes
    }));

    inputField.value = ""
}

document.getElementById('text').addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        Post()
    }
  });

const interval = setInterval(function() {
    getText()
}, 1000)