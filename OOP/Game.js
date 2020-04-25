function Game() {
    this.title = "";
    this.description = "";
    this.publisher = "";
    this.publisher = "";
    this.imageUrl = "";
    this.releaseDate = "";
}

function Game(title, description, genre, publisher, imageUrl, releaseDate) {
    this.title = title;
    this.description = description;
    this.genre = genre;
    this.publisher = publisher;
    this.imageUrl = imageUrl;
    this.releaseDate = releaseDate;
}

Game.prototype.getTitle = function() {
    return this.title;
}

Game.prototype.setTitle = function(newTitle) {
    this.title = newTitle;
}

Game.prototype.getDescription = function() {
    return this.description;
}

Game.prototype.setDescription = function(newDescription) {
    this.description = newDescription;
}

Game.prototype.getGenre = function() {
    return this.genre;
}

Game.prototype.setGenre = function(newGenre) {
    this.genre = newGenre;
}

Game.prototype.getPublisher = function() {
    return this.publisher;
}

Game.prototype.setPublisher = function(newPublisher) {
    this.publisher = newPublisher;
}

Game.prototype.getImageUrl = function() {
    return this.imageUrl;
}

Game.prototype.setImageUrl = function(newImageUrl) {
    this.imageUrl = newImageUrl;
}

Game.prototype.getReleaseDate = function() {
    return this.releaseDate;
}

Game.prototype.setReleaseDate = function(newReleaseDate) {
    this.releaseDate = newReleaseDate;
}