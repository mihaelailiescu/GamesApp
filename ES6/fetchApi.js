class FetchGame {
    constructor(apiURL) {
        this.apiURL = apiURL;
    }
    buildCreateGameUrl(game) {
        let urlencoded = new URLSearchParams();
        urlencoded.append("title", game.getTitle());
        urlencoded.append("releaseDate", game.getReleaseDate());
        urlencoded.append("genre", game.getGenre());
        urlencoded.append("publisher", game.getPublisher());
        urlencoded.append("imageUrl", game.getImageUrl());
        urlencoded.append("description", game.getDescription());
        return urlencoded;
    }
    buildUpdateGameUrl(game) {
        let urlencoded = new URLSearchParams();
        urlencoded.append("title", game.getTitle());
        urlencoded.append("imageUrl", game.getImageUrl());
        urlencoded.append("description", game.getDescription());
        return urlencoded;
    }
    getGamesList(callbackFunction) {
        fetch(this.apiURL + "/games", {
            method: "GET",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then(function(response) {
            return response.json();
        }).then(function(arrayOfGames) {
            callbackFunction(arrayOfGames);
        });
    }
    deleteGame(gameID, callbackFunction) {
        console.log(this.apiURL + "/games/" + gameID);
        fetch(apiURL + "/games/" + gameID, {
            method: "DELETE"
        }).then(function(r) {
            return r.text();
        }).then(function(apiresponse) {
            callbackFunction(apiresponse);
        });
    }
    createGameRequest(gameObject, callbackCreateGame) {
        let urlencoded = this.buildCreateGameUrl(gameObject);
        fetch(this.apiURL + "/games", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: urlencoded
        }).then(function(response) {
            return response.json();
        }).then(function(createdGame) {
            console.log(createdGame);
            callbackCreateGame(createdGame);
        });
    }
    updateGameRequest(idOfGameToBeUpdated, updatedGameObj) {
        let urlencoded = this.buildUpdateGameUrl(updatedGameObj);
        console.log(apiURL + "/games/");
        fetch(this.apiURL + "/games/" + idOfGameToBeUpdated, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: urlencoded
            }).then(function(response) {
                console.log("response received");
                let respJson = response.json();
                return respJson;
            }).then(function(updatedGame) {})
            .catch(error => { console.log('request failed', error); });
    }
}