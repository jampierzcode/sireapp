const emojiSelectorIcon = document.getElementById("emojiSelectorIcon");
const emojiSelectorIconEdit = document.getElementById("emojiSelectorIconEdit");
const emojiSelector = document.getElementById("emojiSelector");
const emojiSelectorEdit = document.getElementById("emojiSelectorEdit");
const emojiList = document.getElementById("emojiList");
const emojiListEdit = document.getElementById("emojiListEdit");
const emojiSearch = document.getElementById("emojiSearch");
const emojiSearchEdit = document.getElementById("emojiSearchEdit");
emojiSelectorIcon.addEventListener("click", () => {
  emojiSelector.classList.toggle("hidden");
});
emojiSelectorIconEdit.addEventListener("click", () => {
  emojiSelectorEdit.classList.toggle("hidden");
});

fetch(
  "https://emoji-api.com/emojis?access_key=3e5e44457ae0632bfce253ac984ae97930e14c1c"
)
  .then((res) => res.json())
  .then((data) => loadEmoji(data));

function loadEmoji(data) {
  data.forEach((emoji) => {
    let li = document.createElement("li");
    li.setAttribute("emoji-name", emoji.slug);
    li.textContent = emoji.character;
    emojiList.appendChild(li);
    // Clonar el nuevo elemento li y agregarlo a emojiListEdit
    let liEdit = li.cloneNode(true);
    emojiListEdit.appendChild(liEdit);
  });
}
emojiSearch.addEventListener("keyup", (e) => {
  let value = e.target.value;
  console.log(value);
  let emojis = document.querySelectorAll("#emojiList li");
  emojis.forEach((emoji) => {
    if (emoji.getAttribute("emoji-name").toLowerCase().includes(value)) {
      emoji.style.display = "flex";
    } else {
      emoji.style.display = "none";
    }
  });
});
emojiSearchEdit.addEventListener("keyup", (e) => {
  let value = e.target.value;
  console.log(value);
  let emojis = document.querySelectorAll("#emojiListEdit li");
  emojis.forEach((emoji) => {
    if (emoji.getAttribute("emoji-name").toLowerCase().includes(value)) {
      emoji.style.display = "flex";
    } else {
      emoji.style.display = "none";
    }
  });
});
