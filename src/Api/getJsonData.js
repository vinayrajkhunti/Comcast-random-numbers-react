export default function getJSONData(callback, number) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', "https://www.random.org/integers/?num=" + number + "&min=-100&max=100&col=1&base=10&format=plain&rnd=new");

    xhr.onload = function () {
        callback(xhr.response)
    };

    xhr.onerror = function () {
        console.log("error");
    };

    xhr.send();
}
