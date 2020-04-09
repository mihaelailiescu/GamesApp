getGamesList(function(arrayOfGames) {

    for (var i = 0; i < arrayOfGames.length; i++) {
        createDomElement(arrayOfGames[i]);
    }
});

function createDomElement(gameObj) {
    var container1 = document.querySelector('.container');
    const gameElement = document.createElement("div");
    const gameElementUpdated = document.createElement("div");
    const deleteID = gameObj._id + "_delete";
    const updateID = gameObj._id + "_update";
    const updateTitleLabelID = gameObj._id + "_titleLabelUpdate";
    const updateTitleID = gameObj._id + "_titleUpdate";
    const updateDescriptionLabelID = gameObj._id + "_descriptionLabelUpdate";
    const updateDescriptionID = gameObj._id + "_descriptionUpdate";
    const updatelabelForImageUrlID = gameObj._id + "_imageUrlLabelUpdate";
    const updateImageUrlID = gameObj._id + "_imageUrlUpdate";
    const saveChangesBtn = gameObj._id + "_saveChanges";
    const cancelBtn = gameObj._id + "_cancelBtn";

    gameElement.innerHTML = `<h1 >${gameObj.title} </h1>
            <img src="${gameObj.imageUrl}" />
            <p>${gameObj.description} </p> 
            <button class="deleteBtn" id=${deleteID} gameId="${gameObj._id}">Delete Game</button>
            <button class="updateBtn" id=${updateID} gameId=${gameObj._id} gameTitle="${gameObj.title}" gameDescription="${gameObj.description}" gameImageUrl="${gameObj.imageUrl}" >Edit Game</button>`;

    container1.appendChild(gameElement);

    gameElementUpdated.innerHTML = `<label id=${updateTitleLabelID}> Title: </label>
    <input type="text" value="" name="updatedTitle" id=${updateTitleID} />
    <label id=${updateDescriptionLabelID}>Description: </label>
    <textarea type="text" value="" name="updatedDescription" id=${updateDescriptionID} > </textarea>
    <label id=${updatelabelForImageUrlID}>Image URL: </label>
    <input type="text" value="" name="updatedImage" id=${updateImageUrlID} />
    <button class="saveChangesBtn" id=${saveChangesBtn}>Save Changes</button>
    <button class="cancelBtn" id=${cancelBtn}>Cancel</button>`

    container1.appendChild(gameElementUpdated);

    document.getElementById(`${updateTitleLabelID}`).style.display = "none";
    document.getElementById(`${updateTitleID}`).style.display = "none";
    document.getElementById(`${updateDescriptionLabelID}`).style.display = "none";
    document.getElementById(`${updatelabelForImageUrlID}`).style.display = "none";
    document.getElementById(`${updateDescriptionID}`).style.display = "none";
    document.getElementById(`${updateImageUrlID}`).style.display = "none";
    document.getElementById(`${saveChangesBtn}`).style.display = "none";
    document.getElementById(`${cancelBtn}`).style.display = "none";

    document.getElementById(`${deleteID}`).addEventListener("click", function(event) {
        console.log("delete pressed");
        console.log(event.target.getAttribute("gameId"));
        deleteGame(event.target.getAttribute("gameId"), function(apiResponse) {
            console.log(apiResponse);
            removeDeletedElementFromDOM(event.target.parentElement);
        })
    });

    document.getElementById(`${updateID}`).addEventListener("click", function(event) {

        document.getElementById(`${updateTitleLabelID}`).style.display = "initial";
        document.getElementById(`${updateTitleID}`).style.display = "initial";
        document.getElementById(`${updateDescriptionLabelID}`).style.display = "initial";
        document.getElementById(`${updatelabelForImageUrlID}`).style.display = "initial";
        document.getElementById(`${updateDescriptionID}`).style.display = "initial";
        document.getElementById(`${updateImageUrlID}`).style.display = "initial";
        document.getElementById(`${saveChangesBtn}`).style.display = "initial";
        document.getElementById(`${cancelBtn}`).style.display = "initial";

        const gameTitle = event.target.getAttribute("gameTitle");
        console.log(gameTitle);
        document.getElementById(`${updateTitleID}`).value = gameTitle;

        const gameDescription = event.target.getAttribute("gameDescription");
        document.getElementById(`${updateDescriptionID}`).value = gameDescription;

        const gameImageUrl = event.target.getAttribute("gameImageUrl");
        document.getElementById(`${updateImageUrlID}`).value = gameImageUrl;
    });

    document.getElementById(`${saveChangesBtn}`).addEventListener("click", function(event) {

        var urlencoded = new URLSearchParams();
        console.log(`${updateTitleID}`);
        console.log(gameObj._id);
        urlencoded.append("title", document.getElementById(`${updateTitleID}`).value);
        urlencoded.append("imageUrl", document.getElementById(`${updateImageUrlID}`).value);
        urlencoded.append("description", document.getElementById(`${updateDescriptionID}`).value);

        updateGameRequest(gameObj._id, urlencoded)
    })

    document.getElementById(`${cancelBtn}`).addEventListener("click", function() {
        document.getElementById(`${updateTitleLabelID}`).style.display = "none";
        document.getElementById(`${updateTitleID}`).style.display = "none";
        document.getElementById(`${updateDescriptionLabelID}`).style.display = "none";
        document.getElementById(`${updatelabelForImageUrlID}`).style.display = "none";
        document.getElementById(`${updateDescriptionID}`).style.display = "none";
        document.getElementById(`${updateImageUrlID}`).style.display = "none";
        document.getElementById(`${saveChangesBtn}`).style.display = "none";
        document.getElementById(`${cancelBtn}`).style.display = "none";
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

function buildErrorMessage(inputEl, errorMsg) {
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