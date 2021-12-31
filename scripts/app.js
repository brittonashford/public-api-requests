const randomUserUrl = 'https://randomuser.me/api/?results=12'
const userGallery = document.getElementById('gallery');

function checkResponse(response) {
    if (response.ok) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(new Error(response.statusText));
    }
}

function generateCardHTML(JsonObjArr) {

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

//function generateModalHTML(userData) {
//    let modalHTML = `
//    <div class="modal-container">
//        <div class="modal">
//            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
//            <div class="modal-info-container">
//                <img class="modal-img" src="https://placehold.it/125x125" alt="profile picture">
//                    <h3 id="name" class="modal-name cap">name</h3>
//                    <p class="modal-text">email</p>
//                    <p class="modal-text cap">city</p>
//                    <hr>
//                        <p class="modal-text">(555) 555-5555</p>
//                        <p class="modal-text">123 Portland Ave., Portland, OR 97204</p>
//                        <p class="modal-text">Birthday: 10/21/2015</p>
//                    </div>
//                </div>
//                <div class="modal-btn-container">
//                    <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
//                    <button type="button" id="modal-next" class="modal-next btn">Next</button>
//                </div>
//            </div>
//    `;
//}


fetch(randomUserUrl)
    .then(response => checkResponse(response))
    .then(response => response.json())
    .then(data => generateCardHTML(data.results))
    .catch(error => console.log('An error has occurred.', error))

const cards = document.querySelectorAll('.card');  //card elements don't exist yet when this is called?
console.log(cards);

cards.forEach(card => {
    card.addEventListener('click', e => {
        console.log(e.target);
    })
})
