//global variables
const randomUserUrl = 'https://randomuser.me/api/?results=12&nat=us'
const employeeGallery = document.getElementById('gallery');
const body = document.querySelector('body');
let employeeArr;
let modalContainer;

//checks the status of the fetch API request and handles accordingly
function checkResponse(response) {
    if (response.ok) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(new Error(response.statusText));
    }
}

//loops through the random "employees" retrieved from the API and creates cards for them
function generateCardHTML(JsonObjArr) {
    employeeArr = JsonObjArr;

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

//creates event listener for each of the user cards that will dynamically generate a modal view of the given user
function addCardListeners() {
    const cards = document.querySelectorAll('.card'); 

    cards.forEach(function(card, index){
        card.addEventListener('click', e => {
            generateModalHTML(index);
        })
    })
}

//generates modal content/view, appends it to the body, and calls method to generate close functionality
function generateModalHTML(index) {
    const bday = new Date(employeeArr[index].dob.date);
    const formattedBday = ((bday.getMonth() + 1) + '/' + bday.getDate()) + '/' + bday.getFullYear();

    let modalHTML = `
    <div class="modal-container">
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn btn"><strong>X</strong></button>
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
        </div>   
    </div>
    `;

    body.insertAdjacentHTML('beforeend', modalHTML);
    modalContainer = document.querySelector('.modal-container');
    addCloseListeners();
}

//these listeners close the modal view when the user click the "X" button or clicks away from the modal
function addCloseListeners() {
    const closeBtn = document.getElementById('modal-close-btn');
    const prevBtn = document.getElementById('modal-prev');
    const nextBtn = document.getElementById('modal-next');

    closeBtn.addEventListener('click', e => {
        modalContainer.remove();
    })

    modalContainer.addEventListener('click', e => {
        let target = e.target;
        if (e.target === modalContainer) {
            modalContainer.remove();
        }
    });
}

//fetch API used to retrieve random fictitious "employee" data from randomuser.me API
fetch(randomUserUrl)
    .then(response => checkResponse(response))
    .then(response => response.json())
    .then(data => generateCardHTML(data.results))
    .then(cards => addCardListeners())
    .catch(error => console.log('An error has occurred.', error))