export const likeBtn = () => {
  const likeButton = document.getElementById("likeButton") as HTMLButtonElement;
  const likeCount = document.getElementById("likeCount") as HTMLElement;

  let liked = false;

  likeButton.addEventListener("click", () => {
    if (!liked) {
      likeCount.innerText = (parseInt(likeCount.innerText) + 1).toString();
      liked = true;
    } else {
      likeCount.innerText = (parseInt(likeCount.innerText) - 1).toString();
      liked = false;
    }
  });
};
