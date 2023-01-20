import { actions, getAction } from './actions.js';
import './assets/style.css';

const button = document.querySelector('.clear');
const contentBox = document.querySelector('.contents');
const textInput = document.querySelector('.text-input');
const tipsContainer = document.querySelector('.tips');
const searchBox = document.querySelector('.search-box');
const searchResults = document.querySelector('.search-results');
const keywordContainer = document.querySelector('span.keyword');

const availableHeadingRanks = ['1', '2', '3', '4', '5', '6'];
let chosenHeading = '0';

const clearHeadings = () => {
  contentBox.innerHTML = '';
  button.style.display = 'none';
}

const getSearchLink = (param) => `
<div class='search-item'>
  <div class='search-sub-item'>
    <span class='icon'>
      <i class='fa-solid fa-t'></i>
    </span>
    <div class='heading-shortcut'>
      <h3 class='heading'>Heading ${param}</h3>
      <p class='shortcut'>Shortcut: type <span>#${param}</span> + space</p>
    </div>
  </div>
  <div class='search-sub-item'>
    <span class='icon'>
      <i class='fa-solid fa-t'></i>
    </span>
    <div class='heading-shortcut'>
      <h3 class='heading'>Expandable Heading ${param}</h3>
      <p class='shortcut'>Shortcut: type >>#${param} + space</p>
    </div>
  </div>
  <hr />
</div>`;

const attachClickHandlers = (items, param) => items.forEach((item, i) => {
  item.addEventListener('click', () => {
    chosenHeading = param || `${i + 1}`;
    textInput.setAttribute('placeholder', `Heading ${param || (i + 1)}`);
    textInput.value = '';
    textInput.value = '';
    textInput.focus();
    searchBox.classList.remove('show-search-results');
  });
});

const populateSearchResults = (param) => {
  searchResults.innerHTML = '';
  if (param === 'all') {
    searchResults.innerHTML = availableHeadingRanks.reduce(
      (prev, i) => `${prev}${getSearchLink(i)}`,
      '',
    );
    attachClickHandlers(document.querySelectorAll('.search-item'));
  } else {
    searchResults.innerHTML = getSearchLink(param);
    attachClickHandlers(document.querySelectorAll('.search-sub-item'), param);
  }
};

const handleShortcut = (value) => {
  const val = value.trim();
  const prev = val.slice(0, -1);
  const last = val.slice(-1);
  if (availableHeadingRanks.includes(last) && (prev === '>>#' || '#' || '/>>#' || '/#')) {
    chosenHeading = last;
    textInput.setAttribute('placeholder', `Heading ${last}`);
    textInput.value = '';
    textInput.focus();
    textInput.value = '';
    searchBox.classList.remove('show-search-results');
    return true;
  }

  return false;
};

const setTextMode = (value) => {
  textInput.setAttribute('placeholder', `Heading ${value[1]}`);
  chosenHeading = value[1];
  textInput.value = '';
  searchBox.classList.remove('show-search-results');
};

const handleKeyUp = ({ key: keyPressed, target: { value } }) => {
  if (tipsContainer.textContent !== '') {
    tipsContainer.textContent = '';
  }

  const attrValue = textInput.getAttribute('placeholder');

  const action = getAction({
    keyPressed,
    attrValue,
    value,
    heading: chosenHeading,
    headingRanks: availableHeadingRanks
  });

  switch (action) {
    case actions.shortcut:
      handleShortcut(value);
      return;
    case actions.showAllBlockTypes:
      searchBox.classList.add('show-search-results');
      keywordContainer.textContent = '';
      populateSearchResults('all');
      return;
    case actions.showFilteredBlockTypes:
      searchBox.classList.add('show-search-results');
      keywordContainer.textContent = value[1];
      populateSearchResults(`${value[1]}`);
      return;
    case actions.hideSearchResult:
      searchBox.classList.remove('show-search-results');
      return;
    case actions.textMode:
      textInput.setAttribute('placeholder', `Heading ${value[1]}`);
      chosenHeading = value[1];
      textInput.value = '';
      searchBox.classList.remove('show-search-results');
      return;
    case actions.blockCommandError:
      tipsContainer.textContent = "Please enter '/' followed by any number from 1 to 6";
      textInput.value = '';
      searchBox.classList.remove('show-search-results');
      return;
    case actions.reset:
      const element = `h${chosenHeading}`;
      const heading = document.createElement(element);
      heading.textContent = value;
      contentBox.appendChild(heading);
      button.style.display = 'inline-block';
      textInput.setAttribute(
        'placeholder',
        'Type / for blocks, @ to link docs or people',
      );
      textInput.value = '';
      return;
    case actions.escape:
      searchBox.classList.remove('show-search-results');
      return;
  }
};

textInput.addEventListener('keyup', handleKeyUp);
button.addEventListener('click', clearHeadings);

module.exports = {getAction};
