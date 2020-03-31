getGamesList(function(arrayOfGames) {

    for (var i = 0; i < arrayOfGames.length; i++) {
        createDomElement(arrayOfGames[i]);
    }
});

function createDomElement(gameObj) {
    var container1 = document.querySelector('.container');
    const gameElement = document.createElement("div");

    gameElement.innerHTML = `<h1>${gameObj.title} </h1>
            <img src="${gameObj.imageUrl}"/>
            <p>${gameObj.description} </p> 
            <button class="deleteBtn" id="${gameObj._id}">Delete Game</button>
            <button class="updateBtn" id="${gameObj._id}">Edit Game</button>`;

    container1.appendChild(gameElement);

    document.getElementById(`${gameObj._id}`).addEventListener("click", function(event) {
        deleteGame(event.target.getAttribute("id"), function(apiResponse) {
            console.log(apiResponse);
            removeDeletedElementFromDOM(event.target.parentElement);
        })
    });
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

function buidErrorMessage(inputEl, errorMsg) {
    inputEl.classList.add("inputError");
    const errorMsgElement = document.createElement("span");
    errorMsgElement.setAttribute("rel", inputEl.id);
    errorMsgElement.classList.add("errorMsg");
    errorMsgElement.innerHTML = errorMsg;
    inputEl.after(errorMsgElement);
}

document.querySelector(".submit-btn").addEventListener("click", function(event) {
    event.preventDefault();

    const gameTitle = document.getElementById("gameTitle");
    const gameDescription = document.getElementById("gameDescription");
    const gameGenre = document.getElementById("gameGenre");
    const gamePublisher = document.getElementById("gamePublisher");
    const gameImageURl = document.getElementById("gameImageUrl");
    const gameRelease = document.getElementById("gameRelease");


    validateFormElement(gameTitle, "The title is required!");
    validateFormElement(gameGenre, "The genre is required!");
    validateFormElement(gameImageURl, "The image URL is required!");
    validateFormElement(gameRelease, "The Release is required!");

    validateReleaseTimestampElement(gameRelease, "The release date you provideiis not a valid timestamp!");

    if (gameTitle.value !== "" && gameGenre.value === "" && gameImageURl.value === "" && gameRelease.value === "") {
        var urlencoded = new URLSearchParams();
        urlencoded.append("title", gameTitle.value);
        urlencoded.append("releaseDate", gameRelease.value);
        urlencoded.append("genre", gameGenre.value);
        urlencoded.append("publisher", gamePublisher.value);
        urlencoded.append("imageUrl", gameImageUrl.value);
        urlencoded.append("description", gameDescription.value);

        createGameRequest(urlencoded, createDomElement);


    }
})