var apiURL = "https://games-world.herokuapp.com";

function getGamesList() {
    return new Promise((resolve, reject) => {
        fetch(apiURL + "/games", {
                method: "GET",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            })
            .then(function(response) {
                return resolve(response.json());
            })
            .catch((errorMsg) => {
                console.log("An error has occured: ", errorMsg);
                return reject(errorMsg);
            });
    })
}

function deleteGame(gameID) {
    return new Promise((resolve, reject) => {
        fetch(apiURL + "/games/" + gameID, {
                method: "DELETE"
            })
            .then(function(r) {
                return resolve(r.text());
            }).catch((errorMsg) => {
                console.log("An error has ocuuper: ", errorMsg);
                return reject(errorMsg);
            });
    })
}

function createGameRequest(gameObject) {
    return new Promise((resolve, reject) => {
        fetch(apiURL + "/games", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: gameObject
            })
            .then(function(response) {
                return resolve(response.json());
            })
            .catch((errorMsg) => {
                console.log("An error has occured: ", errorMsg);
                return reject(errorMsg);
            })
    })
}

function updateGameRequest(idOfGameToBeUpdated, updatedGameObj) {
    return new Promise((resolve, reject) => {
        fetch(apiURL + "/games/" + idOfGameToBeUpdated, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: updatedGameObj
            })
            .then(function(response) {
                var respJson = response.json();
                return resolve(respJson);
            })
            .catch(error => {
                console.log('request failed', error);
                return reject(errorMsg);
            });
    })

}