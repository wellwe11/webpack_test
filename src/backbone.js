import { format, addYears } from "date-fns";

import { newProjBtns, childEls, addInput } from "./projectBuildBlocks";

// create generic el
export const CreateEl = (typeOfEl) => {
  const element = document.createElement(typeOfEl);

  element.addText = function (text) {
    this.textContent = text;
    return this;
  };

  element.appendTo = function (parentEl) {
    parentEl.appendChild(this);
    return this;
  };

  element.addId = function (newId) {
    this.id = newId;
    return this;
  };

  return element;
};

// add todays date if no date is entered (for new projs)
export const addDate = (date) => {
  if (date.value === "") {
    const today = new Date();
    return format(today, "MM/dd/yyyy");
  } else {
    if (date.value) {
      const otherDay = format(new Date(date.value), "MM/dd/yyyy");
      date.value = "";
      return otherDay;
    } else {
      const otherDay = format(new Date(date), "MM/dd/yyyy");
      return otherDay;
    }
  }
};

// toggles between block and none
export const ShowInput = () => {
  let isVisible = false;
  return (...elements) => {
    isVisible = !isVisible;
    elements.forEach(
      (element) => (element.style.display = isVisible ? "block" : "none")
    );
  };
};

// adds addEvent() as chainable function (CreateElEvent > CreateEl)
export const CreateElEvent = (...typeOfEls) => {
  const elObj = CreateEl(...typeOfEls);
  elObj.addEvent = (eventType, eventHandler) => {
    elObj.addEventListener(eventType, eventHandler);
    return elObj;
  };
  return elObj;
};

// adds addAttribute() as chainable function (CreateElAttribute > CreateEl)
export const CreateElAttribute = (typeOfEl) => {
  const element = CreateEl(typeOfEl);
  element.addAttribute = (type, name) => {
    element.setAttribute(type, name);
    return element;
  };
  return element;
};

// encapsulate on/off to not directly add logic to events
export const toggleOn = () => {
  let el = true;

  const methods = {
    turnFalse: () => {
      el = false;
      return;
    },

    turnTrue: () => {
      el = true;
      return;
    },

    getValue: () => {
      return el;
    },
    el,
  };
  return methods;
};

// stores general input in variable and cleans input
export const StoreInput = (input) => {
  if (input.value) {
    let userInput = input.value;
    input.value = "";
    return userInput;
  } else {
    let userInput = input;
    return userInput;
  }
};

// text-switch for elements
export const startNewProj = (element, add, newProj) => {
  if (element.textContent !== add) {
    element.textContent = add;
  } else {
    element.textContent = newProj;
  }
};

// compare with function to check value & apply boolean to each element
export const checkElements = (compareFn, showFn, hideFn, ...elements) => {
  elements.forEach((element) => {
    if (compareFn(element)) {
      showFn(element);
    } else {
      hideFn(element);
    }
  });
};

// extends checkElements > enables grid on matching key
export const checkDate = (element) => {
  const todayEl = format(new Date(), "yyyyMMdd");
  const futureDate = addYears(new Date(), 3000);
  const formattedFuture = format(futureDate, "yyyyMMdd");
  return {
    "===": element.id.replace(/^[0-9]/, "") === todayEl,
    ">": element.id.replace(/^[0-9]/, "") > todayEl,
    "<": element.id.replace(/^[0-9]/, "") < formattedFuture,
  };
};

// enable grid
export const gridOn = (...elements) => {
  return elements.forEach((element) => (element.style.display = "grid"));
};

// disable grid
export const gridOff = (...elements) => {
  return elements.forEach((element) => (element.style.display = "none"));
};

export const pushToArray = (array, ...elements) => {
  if ([...elements]) {
    array.push(...elements);
    return array;
  } else {
    console.log("no elements found");
  }
};

// encapsulates array
export const CreateArray = () => {
  return [].sort();
};

// add left, center, right container to parent
export const NewProjectDivs = (parentEl) => {
  const elLeft = CreateEl("div").appendTo(parentEl).addId("projLeft");
  const elRight = CreateEl("div").appendTo(parentEl).addId("projRight");
  return {
    elLeft,
    elRight,
  };
};

// extends CreateEl for projects
export const CreateChildDivs = (elName, containerEl) => {
  const container = NewProjectDivs(containerEl, elName);
  newProjBtns(container.elLeft, elName, containerEl);

  return {
    container,
  };
};

// sort names depending on array length & adds p to each
export const sortNames = (...elements) => {
  elements.forEach((element, index) => {
    if (!element.querySelector("p")) {
      let p = CreateEl("p");
      element.appendChild(p);
      p.textContent = childEls[index];
      return p;
    } else {
      element.querySelector("p").textContent = childEls[index];
    }
  });
  console.log(childEls);
};

// add animation
export const CreateAnimate = (element, toDo) => {
  return (element.style.animation = toDo);
};

// animate top-left buttons
export const addAnimate = (element, isTrue, animation) => {
  if (isTrue) {
    const el = CreateAnimate(element, animation);
    return el;
  } else {
    const el = CreateAnimate(element, animation);
    return el;
  }
};

// adds to sort() with a > b
export const compareFn = (a, b) => {
  return a - b;
};

// specifies compareFn for allBtn.el usecase
export const compareFnChildren = (a, b) => {
  return compareFn(a.id.slice(1, 9), b.id.slice(1, 9));
};

// returns last element in array each time it updates
export const getLastChild = (...array) => {
  return array[array.length - 1];
};

// sort projects by date (before > after)
export const sortProjects = (array, ...projects) => {
  if (array.length > 0) {
    let lastChild = getLastChild(...projects);
    array.push(lastChild);
  } else if (array.length === 0) {
    projects.forEach((project) => array.push(project));
    return;
  }
};

// to return projects first number
export let getFirstNumber = (value) => {
  if (value.id) {
    return value.id.replace(/^(.).*/, "$1");
  } else {
    return value.replace(/^(.).*/, "$1");
  }
};

// simplify
export const getId = (value) => {
  if (value.id) {
    return document.getElementById(value.id);
  } else {
    return document.getElementById(value);
  }
};

// returns projects ids
export const returnId = (value) => {
  if (value.id) {
    return value.id;
  } else {
    return value;
  }
};

export let itemArray = CreateArray();

export const populateStorage = (name, date, child) => {
  let dataObj = {};
  dataObj.text = name;
  dataObj.date = date;
  dataObj.id = child.id;

  itemArray.push(dataObj);

  localStorage.setItem("items", JSON.stringify(itemArray));
};

export let childrenArray = CreateArray();
export const populateChildren = (child, parentEl, name) => {
  let dataObj = {};
  dataObj.id = child;
  dataObj.parent = parentEl.id;
  dataObj.name = name;

  childrenArray.push(dataObj);

  localStorage.setItem("children", JSON.stringify(childrenArray));
};
