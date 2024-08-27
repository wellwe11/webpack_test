import { format } from "date-fns";

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
export const CreateElEvent = (typeOfEl) => {
  const elObj = CreateEl(typeOfEl);
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

// Adds buttons to >projects<
const newProjBtns = (appendEl, name, containerEl) => {
  const toggleVisibility = ShowInput();
  const toggleInput = ShowInput();

  const btn = CreateElEvent("button")
    .appendTo(appendEl)
    .addId(`${name}Btn`)
    .addText("edit")
    .addEvent("click", () => {
      if (
        timeEl.el.style.display !== "block" &&
        ToDo.el.style.display !== "block"
      )
        toggleVisibility(addNote.el, deleteProj.el, changeDueDate.el);
    });
  const addNote = CreateElEvent("button")
    .appendTo(appendEl)
    .addText("Add note")
    .addId("addBtn")
    .addEvent("click", () => {
      toggleVisibility(deleteProj.el, changeDueDate.el);
      toggleInput(timeEl.el, ToDo.el);

      // createNote(`${name}'s child`, containerEl);
    });

  const deleteProj = CreateElEvent("button")
    .appendTo(appendEl)
    .addText("Delete project")
    .addId("delBtn")
    .addEvent("click", () => containerEl.remove());

  const changeDueDate = CreateElEvent("button")
    .appendTo(appendEl)
    .addText("Change Date")
    .addId("changeBtn");

  const timeEl = CreateElAttribute("input")
    .appendTo(appendEl)
    .addId("timeInput")
    .addAttribute("type", "time");

  const ToDo = CreateElEvent("input")
    .appendTo(appendEl)
    .addId("toDoInput")
    .addEvent("keydown", (event) => {
      if (
        event.key === "Enter" &&
        ToDo.el.value.length > 0 &&
        timeEl.el.value.length > 0
      ) {
        toggleInput(timeEl.el, ToDo.el);
        createNote(`${timeEl.el.value} - ${ToDo.el.value}`, containerEl);
        timeEl.el.value = "";
        ToDo.el.value = "";
        const allChildren = document.querySelectorAll('[data-child="child"]');
        sortNames(...allChildren);
      }
    });

  return btn;
};

// add buttons to >notes<
const newNotesBtns = (parentEl, name, container) => {
  const elRight = document.querySelector(
    `.${name.replace(/btn|\s|-|\d+|:/g, "")}`
  );

  const btn = CreateElEvent("button")
    .appendTo(parentEl)
    .addText("edit")
    .addId(`${name}Btn`);

  const deleteProj = CreateElEvent("button")
    .appendTo(parentEl)
    .addText("Delete project")
    .addId("delBtnTwo")
    .addEvent("click", () => {
      container.remove();
    });

  const changeColor = CreateElEvent("button")
    .appendTo(parentEl)
    .addText("Change color")
    .addId("clrBtn")
    .addEvent("click", () => console.log("hi"));

  let isOpen = true;

  btn.el.addEventListener("click", () => {
    if (!isOpen) {
      elRight.style.animation = "childEditDis 0.3s ease forwards";
      isOpen = true;
    } else {
      elRight.style.animation = "childEditAppear 0.3s ease forwards";
      isOpen = false;
    }
  });

  return btn;
};

// add left, center, right container to parent
const NewProjectDivs = (parentEl) => {
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
const childEls = [];

const createNote = (elName, parentEl) => {
  const elNameClean = elName.replace(/btn|\s|-|\d+|:/g, ""); // for child-animation
  const elNameNumbers = elName.replace(/[a-zA-Z]|\s|-|:/g, ""); // plain numbers to help sort names

  const note = CreateElAttribute("div")
    .appendTo(parentEl)
    .addAttribute("data-child", `child`)
    .addId(elNameNumbers);
  const container = NewProjectDivs(note.el, elName);
  container.elRight.el.classList.add(elNameClean);
  newNotesBtns(container.elLeft.el, `${elName}btn`, note.el);
  childEls.push(
    `${parentEl.id.replace(/^(.).*/, "$1")} - ${elNameNumbers} - ${elNameClean}`
  );
  childEls.sort();
  console.log(childEls);
  return {
    note,
  };
};

export const sortNames = (...elements) => {
  elements.forEach((element, index) => {
    const p = CreateEl("p");
    element.appendChild(p.el);
    p.el.textContent = childEls[index];
    console.log(p);
  });
};

let nr = 1;

// extends storeInput & turns input to project/note
export const addInput = (input, date, appendToEl) => {
  let newNr = nr++;
  let elName = StoreInput(input);
  let elDate = addDate(date);
  const elDateClean = format(new Date(elDate), "yyyyMMdd"); // ALlow clean IDS & keeping projNames
  const newChild = CreateEl("div")
    .addText(`${elName} ${elDate}`)
    .addId(`${newNr}${elDateClean}`) // do not change
    .appendTo(appendToEl);
  newChild.el.classList.add("project");
  CreateChildDivs(elName, newChild.el);

  return {
    newChild,
    newNr,
  };
};

// Need to's:

// Add sidebar buttons:
// -- >!todays events!<
// --- add functionality to get todays date, and display matching events
// ----- example:
// ----- const todaysDate = someFunctionToGetDate
// ----- if (project.date ==== todaysDate)
// ----- display projects.
// ------ make todays projects default
// -- >!upcoming events!<
// --- display all projects in order (closest dates first)

// addNote below project

// make function to add time to note
// add time to note
// sort items by time in name
