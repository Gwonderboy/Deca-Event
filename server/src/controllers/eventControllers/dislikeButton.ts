export const dislikeBtn = () => {
  const dislikeButton = document.getElementById(
    "dislikeButton"
  ) as HTMLButtonElement;
  const dislikeCount = document.getElementById("dislikeCount") as HTMLElement;

  let disliked = false;

  dislikeButton.addEventListener("click", () => {
    if (!disliked) {
      dislikeCount.innerText = (
        parseInt(dislikeCount.innerText) + 1
      ).toString();
      disliked = true;
    } else {
      dislikeCount.innerText = (
        parseInt(dislikeCount.innerText) - 1
      ).toString();
      disliked = false;
    }
  });
};
