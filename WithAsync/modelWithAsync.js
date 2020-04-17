var apiURL = "https://games-world.herokuapp.com";

async function getGamesList() {
    const response = await fetch(apiURL + "/games", {
        method: "GET",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    })
    const arrayOfGames = response.json();
    return arrayOfGames;
}

async function deleteGame(gameID) {
    console.log(apiURL + "/games/" + gameID)
    const r = await fetch(apiURL + "/games/" + gameID, {
        method: "DELETE"
    })
    const apiresponse = r.json();
    return apiresponse;
}

async function createGameRequest(gameObject) {

    try {
        const response = await fetch(apiURL + "/games", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: gameObject
        })
        const createdGame = response.json();
        return createdGame;
    } catch (errorMsg) {
        console.log("An error has ocuuper: ", errorMsg);
    }
}

async function updateGameRequest() {
    console.log(apiURL + "/games/");
    const response = await fetch(apiURL + "/games/" + idOfGameToBeUpdated, {
        method: "PUT",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: updatedGameObj
    })
    const updatedGame = response.json();
    return updatedGame;
}