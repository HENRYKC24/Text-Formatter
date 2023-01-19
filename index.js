const contentBox = document.querySelector(".contents");
const textInput = document.querySelector(".text-input");
const tipsContainer = document.querySelector(".tips");

const availableHeadingRanks = ["1", "2", "3", "4", "5", "6"];
let chosenHeading = "0";

textInput.addEventListener("keyup", (event) => {
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
    (value[0] !== "/" ||
    !availableHeadingRanks.includes(value[1]))
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
