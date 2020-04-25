var apiURL = "https://games-app-siit.herokuapp.com";
let gameFetcher = new FetchGame(apiURL);
gameFetcher.getGamesList(function(arrayOfGames) {
    for (var i = 0; i < arrayOfGames.length; i++) {
        createDomElement(arrayOfGames[i]);

    }
});

function createDomElement(gameObj) {
    var container1 = document.querySelector('.container');

    const gameELement = document.createElement("div");
    gameELement.innerHTML = `<h1>${gameObj.title}</h1> 
                        <img src="${gameObj.imageUrl}" />
                        <p>${gameObj.description}</p> 
                        <button class="delete-btn" id="${gameObj._id}">Delete Game</button>
                        <button class="update-btn" id="${gameObj._id}">Edit Game</button>`;

    container1.appendChild(gameELement);

    gameELement.setAttribute("id", gameObj._id)
    document.getElementById(`${gameObj._id}`).addEventListener("click", function(event) {
        console.log(event.target);
        if (event.target.classList.contains('delete-btn')) {
            gameFetcher.deleteGame(event.target.getAttribute("id"), function(apiResponse) {
                removeDeletedElementFromDOM(event.target.parentElement);
            })
        }
        // daca este pe butonul de update, atunci in momentul in care utilizatorul apasa de Update btn, ii apar field-urile deja populate cu detaliile jocului pe care buton da click
        if (event.target.classList.contains('update-btn')) {

            var form = document.querySelector('#updateForm');
            gameELement.appendChild(form);

            showForm();
            let gameTitle;
            gameTitle = `${gameObj.title}`;
            document.getElementById("gameTitleUpdated").value = gameTitle;

            let gameDescription;
            gameDescription = `${gameObj.description}`;
            document.getElementById("gameDescriptionUpdated").value = gameDescription;

            let gameImage;
            gameImage = `${gameObj.imageUrl}`;
            document.getElementById("gameImageUrlUpdated").value = gameImage;

            // container1.appendChild("updateForm");

        }

        document.getElementById("saveBtn").addEventListener("click", function(event) {
            const newUpdatedGame = new Game();

            newUpdatedGame.setTitle(document.getElementById("gameTitleUpdated").value);
            newUpdatedGame.setDescription(document.getElementById("gameDescriptionUpdated").value);
            newUpdatedGame.setImageUrl(document.getElementById("gameImageUrlUpdated").value);
            gameFetcher.updateGameRequest(gameObj._id, newUpdatedGame)

            //dupa ce s-a facut update-ul, formularul dispare din pagina

            hideForm();
        })
    })

    // daca apasam butonul de cancel, formularul dispare din pagina
    document.getElementById("cancelBtn").addEventListener("click", function() {
        hideForm();
    })
}

function makeVisible(objectID) {
    document.getElementById(objectID).style.display = "initial";
}

function showForm() {

    makeVisible("updateForm");
    makeVisible("labelforUpdatedTitle");
    makeVisible("gameTitleUpdated");
    makeVisible("labelForUpdatedDescription");
    makeVisible("gameDescriptionUpdated");
    makeVisible("labelForUpdatedImage");
    makeVisible("gameImageUrlUpdated");
    makeVisible("saveBtn");
    makeVisible("cancelBtn");
}

function makeInvisible(objectID) {
    document.getElementById(objectID).style.display = "none";
}

function hideForm() {
    makeInvisible("updateForm");
    makeInvisible("labelforUpdatedTitle");
    makeInvisible("gameTitleUpdated");
    makeInvisible("labelForUpdatedDescription");
    makeInvisible("gameDescriptionUpdated");
    makeInvisible("labelForUpdatedImage");
    makeInvisible("gameImageUrlUpdated");
    makeInvisible("saveBtn");
    makeInvisible("cancelBtn");

}

function removeDeletedElementFromDOM(domElement) {
    domElement.remove();
}

function validateFormElement(inputElement, errorMessage) {
    if (inputElement.value === "") {
        if (!document.querySelector('[rel="' + inputElement.id + '"]')) {
            buildErrorMessage(inputElement, errorMessage);
        }
    } else {
        if (document.querySelector('[rel="' + inputElement.id + '"]')) {
            console.log("the error is erased!");
            document.querySelector('[rel="' + inputElement.id + '"]').remove();
            inputElement.classList.remove("inputError");
        }
    }
}

function validateReleaseTimestampElement(inputElement, errorMessage) {
    if (isNaN(inputElement.value) && inputElement.value !== "") {
        buildErrorMessage(inputElement, errorMessage);
    }
}

function buildErrorMessage(inputEl, errosMsg) {
    inputEl.classList.add("inputError");
    const errorMsgElement = document.createElement("span");
    errorMsgElement.setAttribute("rel", inputEl.id);
    errorMsgElement.classList.add("errorMsg");
    errorMsgElement.innerHTML = errosMsg;
    inputEl.after(errorMsgElement);
}


document.querySelector(".submitBtn").addEventListener("click", function(event) {
    event.preventDefault();

    let newGame = new Game();

    newGame.setTitle(document.getElementById("gameTitle").value);
    newGame.setDescription(document.getElementById("gameDescription").value);
    newGame.setGenre(document.getElementById("gameGenre").value);
    newGame.setPublisher(document.getElementById("gamePublisher").value);
    newGame.setImageUrl(document.getElementById("gameImageUrl").value);
    newGame.setReleaseDate(document.getElementById("gameRelease").value);

    const gameTitle = document.getElementById("gameTitle");
    const gameGenre = document.getElementById("gameGenre");
    const gameImageUrl = document.getElementById("gameImageUrl");
    const gameRelease = document.getElementById("gameRelease");

    validateFormElement(gameTitle, "The title is required!");
    validateFormElement(gameGenre, "The genre is required!");
    validateFormElement(gameImageUrl, "The image URL is required!");
    validateFormElement(gameRelease, "The release date is required!");

    validateReleaseTimestampElement(gameRelease, "The release date you provided is not a valid timestamp!");

    if (gameTitle.value !== "" && gameGenre.value !== "" && gameImageUrl.value !== "" && gameRelease.value !== "") {
        gameFetcher.createGameRequest(newGame, createDomElement);
    }
})