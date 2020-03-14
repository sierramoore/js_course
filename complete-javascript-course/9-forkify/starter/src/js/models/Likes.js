export default class Likes {
    constructor() {
        this.likes = [];
    }

    addLike(id, title,author, img) {
        const like = { id, title, author, img };
        this.likes.push(like);

        // Persist data in local storage
        this.persistData();

        return like;
    }

    deleteLike(id) {
        const index = this.likes.findIndex(el => el.id === id);
        this.likes.splice(index, 1);

        // Persist data in local storage
        this.persistData();
    }

    isLiked(id) {
        // if no likes
        // if cant find matched id will be set to -1
        // if -1 it is not a match
        return this.likes.findIndex(el => el.id === id) !== -1;
    }

    getNumLikes() {
        return this.likes.length;
    }

    persistData() {
        localStorage.setItem('likes', JSON.stringify(this.likes));
    }

    readStorage() {
        // convert back to array with JSON.parse
        const storage = JSON.parse(localStorage.getItem('likes'));

        // retore likes from local storage
        if (storage) this.likes = storage;
    }
}