const randomUserUrl = 'https://randomuser.me/api/?results=12&nat=us'
const employeeGallery = document.getElementById('gallery');
let employeeArr;
const modal = document.getElementById('modal');
const body = document.querySelector('body');

function checkResponse(response) {
    if (response.ok) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(new Error(response.statusText));
    }
}

function generateCardHTML(JsonObjArr) {
    employeeArr = JsonObjArr;
    console.log(employeeArr);

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

        employeeGallery.insertAdjacentHTML('beforeend', cardHtml);
    }
}


function addListeners() {
    const cards = document.querySelectorAll('.card'); 

    cards.forEach(function(card, index){
        card.addEventListener('click', e => {
            generateModalHTML(index);
        })
    })
}

function generateModalHTML(index) {
    console.log(index);
    console.log(employeeArr[index]);

    const formattedBday = new Date(employeeArr[index].dob.date).toLocaleDateString;

    let modalHTML = `
    <div class="modal-container">
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src=${employeeArr[index].picture.large} alt="profile picture">
                <h3 id="name" class="modal-name cap">${employeeArr[index].name.first} ${employeeArr[index].name.last}</h3>
                <p class="modal-text">${employeeArr[index].email}</p>
                <p class="modal-text cap">${employeeArr[index].location.city}</p>
                <hr>
                <p class="modal-text">${employeeArr[index].phone}</p>
                <p class="modal-text">${employeeArr[index].location.street.number} ${employeeArr[index].location.street.name} ${employeeArr[index].location.city}, ${employeeArr[index].location.state} ${employeeArr[index].location.postcode}</p>
                <p class="modal-text">Birthday: ${formattedBday}</p>
            </div>
        <div class="modal-btn-container">
            <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
            <button type="button" id="modal-next" class="modal-next btn">Next</button>
        </div>
    </div>   
    </div>
    `;

    body.insertAdjacentHTML('beforeend', modalHTML);
}


fetch(randomUserUrl)
    .then(response => checkResponse(response))
    .then(response => response.json())
    .then(data => generateCardHTML(data.results))
    .then(cards => addListeners())
    .catch(error => console.log('An error has occurred.', error))


