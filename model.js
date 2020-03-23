var apiURL = "https://games-world.herokuapp.com";

fetch(apiURL + "/games", {
    method: "GET",
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    }
}).then(function(response) {
    return response.json();
}).then(function(arrayOfGames) {
    // console.log("the response ", arrayOfGames);

    var container = document.querySelector('.container');
    console.log(container);

    // for (var i = 0; i < arrayOfGames.length; i++) {
    //     // console.log(arrayOfGames[i]);
    //     const h1 = document.createElement("h1");
    //     const p = document.createElement("p");
    //     const img = document.createElement("img");

    //     h1.innerHTML = arrayOfGames[i].title;
    //     p.innerHTML = arrayOfGames[i].description;

    //     img.setAttribute("src", arrayOfGames[i].imageUrl);

    //     container.appendChild(h1);
    //     container.appendChild(img);
    //     container.appendChild(p);

    // }

    let gameElements = "";

    for (var i = 0; i < arrayOfGames.length; i++) {

        gameElements += "<h1>" + arrayOfGames[i].title + "</h1>" +
            "<img src='" + arrayOfGames[i].imageUrl + "' />" +
            "<p>" + arrayOfGames[i].description + "</p>" +
            "<button class='deleteBtn' id='" +
            " onclick=\"deleteGame('" + arrayOfGames[i]._id + "')\">Delete</button>";

    }

    container.innerHTML = gameElements;



});

function deleteGame(gameID) {
    // console.log("delete the game ", gameID);

    fetch(apiURL + "/game/" + gameID, {
        method: "DELETE"
    }).then(function(r) {
        return r.text();
    }).then(function(apiresponse) {
        console.log(apiresponse);
    });
}

var deleteBtns = document.getElementsByClassName("deleteBtn")