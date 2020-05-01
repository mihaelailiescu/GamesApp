class Game {
    constructor() {
        this.title = "";
        this.description = "";
        this.genre = "";
        this.publisher = "";
        this.imageUrl = "";
        this.releaseDate = "";
    }
    getTitle() {
        return this.title;
    }
    setTitle(newTitle) {
        this.title = newTitle;
    }
    getDescription() {
        return this.description;
    }
    setDescription(newDescription) {
        this.description = newDescription;
    }
    getGenre() {
        return this.genre;
    }
    setGenre(newGenre) {
        this.genre = newGenre;
    }
    getPublisher() {
        return this.publisher;
    }
    setPublisher(newPublisher) {
        this.publisher = newPublisher;
    }
    getImageUrl() {
        return this.imageUrl;
    }
    setImageUrl(newImageUrl) {
        this.imageUrl = newImageUrl;
    }
    getReleaseDate() {
        return this.releaseDate;
    }
    setReleaseDate(newReleaseDate) {
        this.releaseDate = newReleaseDate;
    }
}