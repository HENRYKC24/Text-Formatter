import { getAction, actions } from "../src/actions";

test("Pressing the spacebar returns shortcuts action type", () => {
  expect(
    getAction({
      keyPressed: " ",
      attrValue: "Type / for blocks, @ to link docs or people",
      value: "/3",
      heading: "3",
      headingRanks: ["1", "2", "3", "4", "5", "6"],
    })
  ).toBe(actions.shortcut);
});

test("Pressing the slash key return showAllBlocksTypes action type", () => {
  expect(
    getAction({
      keyPressed: "/",
      attrValue: "Type / for blocks, @ to link docs or people",
      value: "/",
      heading: "",
      headingRanks: ["1", "2", "3", "4", "5", "6"],
    })
  ).toBe(actions.showAllBlockTypes);
});

test("Pressing the slash key followed by the number from 1 to 6 and Enter key return textMode action type", () => {
  expect(
    getAction({
      keyPressed: "Enter",
      attrValue: "Type / for blocks, @ to link docs or people",
      value: "/3",
      heading: "3",
      headingRanks: ["1", "2", "3", "4", "5", "6"],
    })
  ).toBe(actions.textMode);
});

test("Pressing the slash key followed by the number from 1 to 6 returns showFilteredBlockTypes action type.", () => {
  expect(
    getAction({
      keyPressed: "",
      attrValue: "Type / for blocks, @ to link docs or people",
      value: "/3",
      heading: "3",
      headingRanks: ["1", "2", "3", "4", "5", "6"],
    })
  ).toBe(actions.showFilteredBlockTypes);
});

test("Clearing the command input field returns hideSearchResult action type.", () => {
  expect(
    getAction({
      keyPressed: "",
      attrValue: "Type / for blocks, @ to link docs or people",
      value: "",
      heading: "",
      headingRanks: ["1", "2", "3", "4", "5", "6"],
    })
  ).toBe(actions.hideSearchResult);
});

test("Pressing the Enter key with the wrong input command returns blockCommandError action type.", () => {
  expect(
    getAction({
      keyPressed: "Enter",
      attrValue: "Type / for blocks, @ to link docs or people",
      value: "/xbu",
      heading: "",
      headingRanks: ["1", "2", "3", "4", "5", "6"],
    })
  ).toBe(actions.blockCommandError);
});

test("Pressing the Enter key after typing text for formatting returns reset action type.", () => {
  expect(
    getAction({
      keyPressed: "Enter",
      attrValue: "Heading 2",
      value: "Text to format",
      heading: "2",
      headingRanks: ["1", "2", "3", "4", "5", "6"],
    })
  ).toBe(actions.reset);
});
