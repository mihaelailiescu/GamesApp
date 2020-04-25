getGamesList(function(arrayOfGames) {
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
                        <button class="update-btn" >Edit Game</button>`;

    container1.appendChild(gameELement);

    gameELement.setAttribute("id", gameObj._id)
    document.getElementById(`${gameObj._id}`).addEventListener("click", function(event) {
        if (event.target.classList.contains('delete-btn')) {
            deleteGame(event.target.getAttribute("id"), function(apiResponse) {
                removeDeletedElementFromDOM(event.target.parentElement);
            })
        }
        // daca este pe butonul de update, atunci in momentul in care utilizatorul apasa pe Update btn, ii apar field-urile deja populate cu detaliile jocului pe care buton da click
        if (event.target.classList.contains('update-btn')) {
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
                    event2.preventDefault();
                    //le scoatem in variabile pentru ca le folosim in 2 locuri aici in functia asta 
                    const inputTitle = form.querySelector("#gameTitleUpdated");
                    const textareaDescription = form.querySelector("#gameDescriptionUpdated");
                    const inputImageUrl = form.querySelector("#gameImageUrlUpdated");

                    let urlencoded = new URLSearchParams();
                    //luam valorile modificate de utilizator
                    urlencoded.append("title", inputTitle.value);
                    urlencoded.append("imageUrl", inputImageUrl.value);
                    urlencoded.append("description", textareaDescription.value);
                    // facem request-ul
                    updateGameRequest(event2.target.parentElement.parentElement.getAttribute("id"), urlencoded)
                        //dupa ce s-a facut update-ul, formularul dispare din pagina
                    form.style.display = "none";
                    //actualizam pagina cu noile valori modificate de utilizator
                    gameContainerDiv.querySelector("h1").innerText = inputTitle.value;
                    gameContainerDiv.querySelector("p").innerText = textareaDescription.value;
                    gameContainerDiv.querySelector("img").getAttribute("src", inputImageUrl);
                })
                // daca apasam butonul de cancel, formularul dispare din pagina
            form.querySelector("#cancelBtn").addEventListener("click", function() {
                form.style.display = "none";
            })
        }
    })
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

    const gameTitle = document.getElementById("gameTitle");
    const gameDescription = document.getElementById("gameDescription");
    const gameGenre = document.getElementById("gameGenre");
    const gamePublisher = document.getElementById("gamePublisher");
    const gameImageUrl = document.getElementById("gameImageUrl");
    const gameRelease = document.getElementById("gameRelease");

    validateFormElement(gameTitle, "The title is required!");
    validateFormElement(gameGenre, "The genre is required!");
    validateFormElement(gameImageUrl, "The image URL is required!");
    validateFormElement(gameRelease, "The release date is required!");

    validateReleaseTimestampElement(gameRelease, "The release date you provided is not a valid timestamp!");

    if (gameTitle.value !== "" && gameGenre.value !== "" && gameImageUrl.value !== "" && gameRelease.value !== "") {
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