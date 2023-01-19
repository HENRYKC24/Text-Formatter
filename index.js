const contentBox = document.querySelector(".contents");
const textInput = document.querySelector(".text-input");
const tipsContainer = document.querySelector(".tips");
const searchResults = document.querySelector(".search-results");

const availableHeadingRanks = ["1", "2", "3", "4", "5", "6"];
let chosenHeading = "0";

const populateSearchResults = (param) => {
  searchResults.innerHTML = "";
  if (param === "all") {
    for (let i = 0; i < availableHeadingRanks.length; i++) {
      const searchItem = `<div class="search-item">
      <div class="search-sub-item">
        <span class="icon">
          <i class="fa-solid fa-t"></i>
        </span>
        <div class="heading-shortcut">
          <h3 class="heading">Heading ${i + 1}</h3>
          <p class="shortcut">Shortcut: type <span>#${i + 1}</span> + space</p>
        </div>
      </div>
      <div class="search-sub-item">
        <span class="icon">
          <i class="fa-solid fa-t"></i>
        </span>
        <div class="heading-shortcut">
          <h3 class="heading">Expandable Heading ${i + 1}</h3>
          <p class="shortcut">Shortcut: type >>#${i + 1} + space</p>
        </div>
      </div>
      <hr />
    </div>`;
      searchResults.innerHTML += searchItem;
    }
  } else {
    const searchItem = `<div class="search-item">
      <div class="search-sub-item">
        <span class="icon">
          <i class="fa-solid fa-t"></i>
        </span>
        <div class="heading-shortcut">
          <h3 class="heading">Heading ${param}</h3>
          <p class="shortcut">Shortcut: type <span>#${param}</span> + space</p>
        </div>
      </div>
      <div class="search-sub-item">
        <span class="icon">
          <i class="fa-solid fa-t"></i>
        </span>
        <div class="heading-shortcut">
          <h3 class="heading">Expandable Heading ${param}</h3>
          <p class="shortcut">Shortcut: type >>#${param} + space</p>
        </div>
      </div>
      <hr />
    </div>`;
    searchResults.innerHTML = searchItem;
    const items = document.querySelectorAll(".search-sub-item");
    for (let i = 0; i < items.length; i++) {
      items[i].addEventListener("click", () => {
        chosenHeading = param;
        textInput.setAttribute("placeholder", `Heading ${param}`);
        textInput.value = "";
        tipsContainer.textContent = "";
      });
    }
  }
};
textInput.addEventListener("keyup", (event) => {
  populateSearchResults("3");
  if (tipsContainer.textContent !== "") {
    tipsContainer.textContent = "";
  }
  const value = event.target.value;
  const attrValue = textInput.getAttribute("placeholder");
  if (
    event.key === "Enter" &&
    value[0] === "/" &&
    availableHeadingRanks.includes(value[1]) &&
    attrValue === "Type / for blocks, @ to link docs or people"
  ) {
    textInput.setAttribute("placeholder", `Heading ${value[1]}`);
    chosenHeading = value[1];
    textInput.value = "";
  }

  if (
    event.key === "Enter" &&
    attrValue === "Type / for blocks, @ to link docs or people" &&
    (value[0] !== "/" || !availableHeadingRanks.includes(value[1]))
  ) {
    tipsContainer.textContent =
      'Please enter "/" followed by any number from 1 to 6';
    textInput.value = "";
  }

  if (event.key === "Enter" && attrValue === "Heading " + chosenHeading) {
    const element = `h${chosenHeading}`;
    const heading = document.createElement(element);
    heading.textContent = value;
    contentBox.appendChild(heading);
    textInput.setAttribute(
      "placeholder",
      "Type / for blocks, @ to link docs or people"
    );
    textInput.value = "";
  }
});
