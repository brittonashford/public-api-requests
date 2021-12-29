const randomUserUrl = 'https://randomuser.me/api/?results=12'
const userGallery = document.getElementById('gallery');

function checkResponse(response) {
    if (response.ok) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(new Error(response.statusText));
    }
}

function generateHTML(JsonObjArr) {

    for (i = 0; i < JsonObjArr.length; i++) {
        let cardHtml = `
            <div class="card">
                <div class="card-img-container">
                    <img class="card-img" src=${JsonObjArr[i].picture.medium} alt="profile picture">
                </div>
                <div class="card-info-container">
                    <h3 id="name" class="card-name cap">${JsonObjArr[i].name.first} ${JsonObjArr[i].name.last}</h3>
                    <p class="card-text">${JsonObjArr[i].email}</p>
                    <p class="card-text cap">${JsonObjArr[i].location.city}, ${JsonObjArr[i].location.state}</p>
                </div>
            </div>
        `;

        userGallery.insertAdjacentHTML('beforeend', cardHtml);
    }
}

fetch(randomUserUrl)
    .then(response => checkResponse(response))
    .then(response => response.json())
    .then(data => generateHTML(data.results))
    .catch(error => console.log('An error has occurred.', error))