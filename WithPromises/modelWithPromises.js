var apiURL = "https://games-world.herokuapp.com";

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

function getGamesList() {
    return new Promise((resolve, reject) => {
        fetch(apiURL + "/games", {
            method: "GET",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })
        const error = false;
    })
    if (!error) {
        resolve(response)
        return response.json();

    } else {
        reject('Something went wrong');
    }
}

function deleteGame(gameID, callbackFunction) {
    console.log(apiURL + "/games/" + gameID)
    fetch(apiURL + "/games/" + gameID, {
        method: "DELETE"
    }).then(function(r) {
        return r.text();
    }).then(function(apiresponse) {
        callbackFunction(apiresponse);
    });

}

function createGameRequest(gameObject, callbackCreateGame) {
    fetch(apiURL + "/games", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: gameObject
    }).then(function(response) {
        return response.json();
    }).then(function(createdGame) {
        console.log(createdGame);
        callbackCreateGame(createdGame);
    });
}


function updateGameRequest(idOfGameToBeUpdated, updatedGameObj) {
    console.log(apiURL + "/games/");


    fetch(apiURL + "/games/" + idOfGameToBeUpdated, {
            method: "PUT",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: updatedGameObj
        }).then(function(response) {
            console.log("response received")
            var respJson = response.json();
            console.log(respJson);

            return respJson;
        }).then(function(updatedGame) {
            // console.log("update finished");
            // callbackUpdateGame();
        })
        .catch(error => { console.log('request failed', error); });
}


// "application/json"
// {"cheie": "valoare", "cheie2": "valoare2"}

//application/x-www-form-urlencoded
// cheie=valoare&cheie2=valoare2