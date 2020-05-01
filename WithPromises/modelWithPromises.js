var apiURL = "https://games-app-siit.herokuapp.com";

function getGamesList() {
    return fetch(apiURL + "/games", {
            method: "GET",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })
        .then(function(response) {
            return response.json();
        })
}

function deleteGame(gameID) {
    return fetch(apiURL + "/games/" + gameID, {
            method: "DELETE"
        })
        .then(function(r) {
            return r.text();
        })
}

function createGameRequest(gameObject) {
    return fetch(apiURL + "/games", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: gameObject
        })
        .then(function(response) {
            return resolve(response.json());
        })
}

function updateGameRequest(idOfGameToBeUpdated, updatedGameObj) {
    return fetch(apiURL + "/games/" + idOfGameToBeUpdated, {
            method: "PUT",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: updatedGameObj
        })
        .then(function(response) {
            var respJson = response.json();
            return respJson;
        })
}