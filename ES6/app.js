var apiURL = "https://games-app-siit.herokuapp.com";
let gameFetcher = new FetchGame(apiURL);
gameFetcher.getGamesList((arrayOfGames) => { showGames(arrayOfGames) });

function showGames(arrayOfGames) {
    for (var i = 0; i < arrayOfGames.length; i++) {
        createGameDom(arrayOfGames[i]);
    }
}

function createGameDiv(gameObj) {
    const gameELement = document.createElement("div");
    gameELement.innerHTML = `<h1>${gameObj.title}</h1> 
                        <img src="${gameObj.imageUrl}" />
                        <p>${gameObj.description}</p> 
                        <button class="delete-btn" id="${gameObj._id}">Delete Game</button>
                        <button class="update-btn" >Edit Game</button>`;
    return gameELement;
}

function createGameDom(gameObj) {
    var container1 = document.querySelector('.container');

    //game div
    const gameDiv = createGameDiv(gameObj);
    container1.appendChild(gameDiv);
    gameDiv.setAttribute("id", gameObj._id)

    document.getElementById(`${gameObj._id}`).addEventListener("click", function(event) {
        if (event.target.classList.contains('delete-btn')) {
            gameFetcher.deleteGame(event.target.getAttribute("id"), function(apiResponse) {
                removeDeletedElementFromDOM(event.target.parentElement);
            })
        }
        // daca este pe butonul de update, atunci in momentul in care utilizatorul apasa de Update btn, ii apar field-urile deja populate cu detaliile jocului pe care buton da click
        if (event.target.classList.contains('update-btn')) {
            onUpdateHandler(event);
        }
    })
}

function onUpdateHandler(event) {
    var form = document.querySelector('#updateForm');
    form.reset(); //facem reset, ca sa ii stergem continutul - daca cumva are
    event.target.parentElement.appendChild(form);
    form.style.display = "initial"; //afisam formularul

    const gameContainerDiv = event.target.parentElement;
    //punem in inputuri valorile afisate deja in pagina
    form.querySelector("#gameTitleUpdated").value = gameContainerDiv.querySelector("h1").innerText;
    form.querySelector("#gameDescriptionUpdated").value = gameContainerDiv.querySelector("p").innerText;
    form.querySelector("#gameImageUrlUpdated").value = gameContainerDiv.querySelector("img").getAttribute("src");

    form.querySelector("#saveBtn").addEventListener("click", function(event2) {
            onSaveHandler(event2, gameContainerDiv);
            //dupa ce s-a facut update-ul, formularul dispare din pagina
            form.style.display = "none";
        })
        // daca apasam butonul de cancel, formularul dispare din pagina
    form.querySelector("#cancelBtn").addEventListener("click", function() {
        form.style.display = "none";
    })
}

function onSaveHandler(event, gameContainerDiv) {
    event.preventDefault();
    newUpdatedGame = createUpdateGame();
    // facem request-ul
    gameFetcher.updateGameRequest(event.target.parentElement.parentElement.getAttribute("id"), newUpdatedGame)
    addNewUpdatedFields(gameContainerDiv);
}

function createUpdateGame() {
    //luam valorile modificate de utilizator
    const newUpdatedGame = new Game();
    newUpdatedGame.setTitle(document.getElementById("gameTitleUpdated").value);
    newUpdatedGame.setDescription(document.getElementById("gameDescriptionUpdated").value);
    newUpdatedGame.setImageUrl(document.getElementById("gameImageUrlUpdated").value);

    return newUpdatedGame;
}

function addNewUpdatedFields(gameContainerDiv) {
    var form = document.querySelector('#updateForm');
    const inputTitle = form.querySelector("#gameTitleUpdated");
    const textareaDescription = form.querySelector("#gameDescriptionUpdated");
    const inputImageUrl = form.querySelector("#gameImageUrlUpdated");

    //actualizam pagina cu noile valori modificate de utilizator
    gameContainerDiv.querySelector("h1").innerText = inputTitle.value;
    gameContainerDiv.querySelector("p").innerText = textareaDescription.value;
    gameContainerDiv.querySelector("img").getAttribute("src", inputImageUrl);

}

function removeDeletedElementFromDOM(domElement) {
    domElement.remove();
}

function validateFormElement(inputElement, errorMessage) {
    let inputInvalid = (inputElement.value === "");
    if (inputInvalid) {
        if (!document.querySelector('[rel="' + inputElement.id + '"]')) {
            buildErrorMessage(inputElement, errorMessage);
        }
    } else {
        if (document.querySelector('[rel="' + inputElement.id + '"]')) {
            document.querySelector('[rel="' + inputElement.id + '"]').remove();
            inputElement.classList.remove("inputError");
        }
    }
    return !inputInvalid;
}

function validateReleaseTimestampElement(inputElement, errorMessage) {
    let inputInvalid = (isNaN(inputElement.value) && inputElement.value !== "");
    if (inputInvalid) {
        buildErrorMessage(inputElement, errorMessage);
    }
    return !inputInvalid;
}

function buildErrorMessage(inputEl, errosMsg) {
    inputEl.classList.add("inputError");
    const errorMsgElement = document.createElement("span");
    errorMsgElement.setAttribute("rel", inputEl.id);
    errorMsgElement.classList.add("errorMsg");
    errorMsgElement.innerHTML = errosMsg;
    inputEl.after(errorMsgElement);
}

function validateGameFields(gameTitle, gameGenre, gameImageUrl, gameRelease) {
    let valid = validateFormElement(gameTitle, "The title is required!");
    valid = (valid && validateFormElement(gameGenre, "The genre is required!"));
    valid = (valid && validateFormElement(gameImageUrl, "The image URL is required!"));
    valid = (valid && validateFormElement(gameRelease, "The release date is required!"));
    valid = (valid && validateReleaseTimestampElement(gameRelease, "The release date you provided is not a valid timestamp!"));
    return valid;
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

    if (validateGameFields(gameTitle, gameGenre, gameImageUrl, gameRelease)) {
        gameFetcher.createGameRequest(newGame, createGameDom);
    }

})