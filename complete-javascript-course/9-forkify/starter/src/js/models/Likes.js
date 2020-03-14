export default class Likes {
    constructor() {
        this.likes = [];
    }

    addLike(id, title,author, img) {
        const like = { id, title, author, img };
        this.likes.push(like);
        return like;
    }

    deleteLike(id) {
        const index = this.likes.findIndex(el => el.id === id);
        this.likes.splice(index, 1);
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
}