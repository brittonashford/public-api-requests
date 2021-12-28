$.ajax({
    url: 'https://randomuser.me/api/',
    dataType: 'json',
    success: function (data) {
        console.log(data.results[0]);
    }
});

const randomUserUrl = 'https://randomuser.me/api/'
const xhr = new XMLHttpRequest;
xhr.onreadystatechange = function() {
    if (this.readyState === 4) {
        if (xhr.status === 200) {
            console.log(xhr.responseText);
        } else {
            console.log(Error('something went wrong'));
        }
    }
}
xhr.open('GET', randomUserUrl);
xhr.send();

fetch(randomUserUrl)
    .then(response => response.json())
    .then(data => console.log(data))
