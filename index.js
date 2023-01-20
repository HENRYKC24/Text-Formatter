const contentBox = document.querySelector(".contents");
const textInput = document.querySelector(".text-input");
const tipsContainer = document.querySelector(".tips");
const searchBox = document.querySelector(".search-box");
const searchResults = document.querySelector(".search-results");
const keywordContainer = document.querySelector("span.keyword");

const availableHeadingRanks = ["1", "2", "3", "4", "5", "6"];
let chosenHeading = "0";
let showSearchBox = false;

const populateSearchResults = (param) => {
  searchResults.innerHTML = "";
  if (param === "all") {
    for (let i = 0; i < availableHeadingRanks.length; i++) {
      const searchItems = `<div class="search-item">
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
      searchResults.innerHTML += searchItems;
    }

    const items = document.querySelectorAll(".search-item");

    for (let i = 0; i < items.length; i++) {
      items[i].addEventListener("click", () => {
        chosenHeading = `${i + 1}`;
        textInput.setAttribute("placeholder", `Heading ${i + 1}`);
        textInput.value = "";
        textInput.value = "";
        textInput.focus();
        searchBox.classList.remove("show-search-results");
      });
    }
  } else {
    const searchItems = `<div class="search-item">
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

    searchResults.innerHTML = searchItems;
    const items = document.querySelectorAll(".search-sub-item");

    for (let i = 0; i < items.length; i++) {
      items[i].addEventListener("click", () => {
        chosenHeading = param;
        textInput.setAttribute("placeholder", `Heading ${param}`);
        textInput.value = "";
        textInput.focus();
        textInput.value = "";
        searchBox.classList.remove("show-search-results");
      });
    }
  }
};

textInput.addEventListener("keyup", (event) => {
  if (tipsContainer.textContent !== "") {
    tipsContainer.textContent = "";
  }

  const value = event.target.value;
  const keyPressed = event.key;
  const attrValue = textInput.getAttribute("placeholder");
  console.log(keyPressed);
  if (keyPressed === " " && attrValue[0] === "T") {
    const val = value.trim();
    const prev = val.slice(0, -1);
    const last = val.slice(-1);
    if (availableHeadingRanks.includes(last) && (prev === '>>#' || '#' || '/>>#' || '/#')) {
      console.log('That is a shortcut');
      chosenHeading = last;
        textInput.setAttribute("placeholder", `Heading ${last}`);
        textInput.value = "";
        textInput.focus();
        textInput.value = "";
        searchBox.classList.remove("show-search-results");
    }
  }


  if (
    value === "/" &&
    attrValue[0] === "T"
  ) {
    searchBox.classList.add("show-search-results");
    keywordContainer.textContent = "";
    populateSearchResults("all");
  }

  if (
    value[0] === "/" &&
    availableHeadingRanks.includes(value[1]) &&
    attrValue[0] === "T"
  ) {
    searchBox.classList.add("show-search-results");
    keywordContainer.textContent = value[1];
    populateSearchResults(`${value[1]}`);
  }

  if (
    value === "" &&
    attrValue[0] === "T"
  ) {
    searchBox.classList.remove("show-search-results");
  }

  if (
    keyPressed === "Enter" &&
    value[0] === "/" &&
    availableHeadingRanks.includes(value[1]) &&
    attrValue[0] === "T"
  ) {
    textInput.setAttribute("placeholder", `Heading ${value[1]}`);
    chosenHeading = value[1];
    textInput.value = "";
    searchBox.classList.remove("show-search-results");
  }

  if (
    keyPressed === "Enter" &&
    attrValue[0] === "T" &&
    (value[0] !== "/" || !availableHeadingRanks.includes(value[1]))
  ) {
    tipsContainer.textContent =
      'Please enter "/" followed by any number from 1 to 6';
    textInput.value = "";
    searchBox.classList.remove("show-search-results");
  }

  if (keyPressed === "Enter" && attrValue === "Heading " + chosenHeading) {
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

  if (keyPressed === "Escape") {
    searchBox.classList.remove("show-search-results");
  }
});
