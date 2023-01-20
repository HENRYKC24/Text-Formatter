
/**
 * @param {Object} param
 * @param {string} param.keyPressed
 * @param {string} param.attrValue
 * @param {string} param.value
 * @param {string} param.heading
 * @param {Array<string>} param.headingRanks
 * @returns
 */

export const getAction = ({
    keyPressed,
    attrValue,
    value,
    heading,
    headingRanks,
  }) => {
    if (keyPressed === ' ' && attrValue[0] === 'T') {
      return actions.shortcut;
    }
    if (value === '/' && attrValue[0] === 'T' && keyPressed !== 'Enter') {
      return actions.showAllBlockTypes;
    }
    if (keyPressed === 'Enter' && value[0] === '/' && headingRanks.includes(value[1]) && attrValue[0] === 'T') {
      return actions.textMode;
    }
    if (value[0] === '/' && headingRanks.includes(value[1]) && attrValue[0] === 'T') {
      return actions.showFilteredBlockTypes;
    }
    if (value === '' && attrValue[0] === 'T') {
      return actions.hideSearchResult;
    }
    if (keyPressed === "Enter" &&
    attrValue[0] === "T" &&
    (value === '/' || value[0] !== "/" || !availableHeadingRanks.includes(value[1]))) {
      return actions.blockCommandError;
    }
    if (keyPressed === 'Enter' && attrValue === `Heading ${heading}`) {
      return actions.reset;
    }
    if (keyPressed === 'escape') {
      return actions.escape;
    }
  };

  export const actions = {
    shortcut: 'shortcut',
    showAllBlockTypes: 'block types all',
    showFilteredBlockTypes: 'block types filtered',
    hideSearchResult: 'hide search result',
    textMode: 'text mode',
    blockCommandError: 'command error block',
    reset: 'reset',
    escape: 'escape',
  };
