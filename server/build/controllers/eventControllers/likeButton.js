"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.likeBtn = void 0;
const likeBtn = () => {
    const likeButton = document.getElementById("likeButton");
    const likeCount = document.getElementById("likeCount");
    let liked = false;
    likeButton.addEventListener("click", () => {
        if (!liked) {
            likeCount.innerText = (parseInt(likeCount.innerText) + 1).toString();
            liked = true;
        }
        else {
            likeCount.innerText = (parseInt(likeCount.innerText) - 1).toString();
            liked = false;
        }
    });
};
exports.likeBtn = likeBtn;
