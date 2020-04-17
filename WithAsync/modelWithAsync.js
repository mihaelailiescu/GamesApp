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

// function getGamesList(callbackFunction) {
//     fetch(apiURL + "/games", {
//         method: "GET",
//         headers: {
//             "Content-Type": "application/x-www-form-urlencoded"
//         }
//     }).then(function(response) {
//         return response.json();
//     }).then(function(arrayOfGames) {
//         callbackFunction(arrayOfGames);
//     });
// }


// function deleteGame(gameID, callbackFunction) {
//     console.log(apiURL + "/games/" + gameID)
//     fetch(apiURL + "/games/" + gameID, {
//         method: "DELETE"
//     }).then(function(r) {
//         return r.text();
//     }).then(function(apiresponse) {
//         callbackFunction(apiresponse);
//     });

// }

async function deleteGame() {
    console.log(apiURL + "/games/" + gameID)
    const r = await fetch(apiURL + "/games/" + gameID, {
        method: "DELETE"
    })
    const apiresponse = response.json();
    return apiresponse;
}

// function createGameRequest(gameObject, callbackCreateGame) {
//     fetch(apiURL + "/games", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/x-www-form-urlencoded"
//         },
//         body: gameObject
//     }).then(function(response) {
//         return response.json();
//     }).then(function(createdGame) {
//         console.log(createdGame);
//         callbackCreateGame(createdGame);
//     });
// }

async function createGameRequest() {
    const response = await fetch(apiURL + "/games", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: gameObject
    })
    const createdGame = response.json();
    return createdGame;
}

// function updateGameRequest(idOfGameToBeUpdated, updatedGameObj) {
//     console.log(apiURL + "/games/");
//     fetch(apiURL + "/games/" + idOfGameToBeUpdated, {
//             method: "PUT",
//             headers: {
//                 "Content-Type": "application/x-www-form-urlencoded"
//             },
//             body: updatedGameObj
//         }).then(function(response) {
//             console.log("response received")
//             var respJson = response.json();
//             console.log(respJson);

//             return respJson;
//         }).then(function(updatedGame) {
//             // console.log("update finished");
//             // callbackUpdateGame();
//         })
//         .catch(error => { console.log('request failed', error); });
// }

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