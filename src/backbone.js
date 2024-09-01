import { format } from "date-fns";
import { newProjBtns, childEls } from "./projectBuildBlocks";

// create generic el
export const CreateEl = (typeOfEl) => {
  const el = document.createElement(typeOfEl);

  const methods = {
    addText: (text) => {
      el.textContent = text;
      return methods;
    },

    appendTo: (parentEl) => {
      parentEl.appendChild(el);
      return methods;
    },

    addId: (newId) => {
      el.id = newId;
      return methods;
    },
    el,
  };

  return methods;
};

// add todays date if no date is entered (for new projs)
export const addDate = (date) => {
  if (date.value === "") {
    const today = new Date();
    return format(today, "MM/dd/yyyy");
  } else {
    const otherDay = format(new Date(date.value), "MM/dd/yyyy");
    date.value = "";
    return otherDay;
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
    elObj.el.addEventListener(eventType, eventHandler);
    return elObj;
  };
  return elObj;
};

// adds addAttribute() as chainable function (CreateElAttribute > CreateEl)
export const CreateElAttribute = (typeOfEl) => {
  const element = CreateEl(typeOfEl);
  element.addAttribute = (type, name) => {
    element.el.setAttribute(type, name);
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
  let userInput = input.value;
  input.value = "";
  return userInput;
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
  return {
    "===": element.id.replace(/^[0-9]/, "") === todayEl,
    ">": element.id.replace(/^[0-9]/, "") > todayEl,
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
  array.push(...elements);
  return array;
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
  newProjBtns(container.elLeft.el, elName, containerEl);
  return {
    container,
  };
};

// sort names depending on array length & adds p to each
export const sortNames = (...elements) => {
  elements.forEach((element, index) => {
    if (!element.querySelector("p")) {
      let p = CreateEl("p");
      element.appendChild(p.el);
      p.el.textContent = childEls[index];
      return p.el;
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

// Need to's:

// fix:
// on new projects: add-note sometimes actives delete & change note button too
