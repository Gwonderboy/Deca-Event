"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dislikeBtn = void 0;
const dislikeBtn = () => {
    const dislikeButton = document.getElementById("dislikeButton");
    const dislikeCount = document.getElementById("dislikeCount");
    let disliked = false;
    dislikeButton.addEventListener("click", () => {
        if (!disliked) {
            dislikeCount.innerText = (parseInt(dislikeCount.innerText) + 1).toString();
            disliked = true;
        }
        else {
            dislikeCount.innerText = (parseInt(dislikeCount.innerText) - 1).toString();
            disliked = false;
        }
    });
};
exports.dislikeBtn = dislikeBtn;
