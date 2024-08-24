import { compareAsc, format } from "date-fns";

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

export const addDate = (date) => {
  if (date.value === "") {
    const today = new Date();
    return format(today, "- EEEE, MMMM do, yyyy");
  } else {
    const otherDay = format(new Date(date.value), "EEEE, MMMM do, yyyy");
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
const CreateElEvent = (typeOfEl) => {
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

// Adds buttons to >projects<
const newProjBtns = (appendEl, name, containerEl) => {
  const toggleVisibility = ShowInput();
  const toggleInput = ShowInput();

  const btn = CreateElEvent("button")
    .appendTo(appendEl)
    .addText("edit")
    .addId(`${name}Btn`)
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

  const ToDo = CreateElAttribute("input").appendTo(appendEl).addId("toDoInput");

  ToDo.el.addEventListener("keydown", (event) => {
    if (
      event.key === "Enter" &&
      ToDo.el.value.length > 0 &&
      timeEl.el.value.length > 0
    ) {
      toggleInput(timeEl.el, ToDo.el);
      createNote(`${timeEl.el.value} - ${ToDo.el.value}`, containerEl);
      timeEl.el.value = "";
      ToDo.el.value = "";
    }
  });

  return btn;
};

const noteNames = [];

// add buttons to >notes<
const newNotesBtns = (parentEl, name, container) => {
  const elRight = document.querySelector(
    `.${name.replace(/btn|\s|-|\d+|:/g, "")}`
  );
  const index = noteNames.indexOf(elRight);

  const btn = CreateElEvent("button")
    .appendTo(parentEl)
    .addText("edit")
    .addId(`${name}Btn`);

  const deleteProj = CreateElEvent("button")
    .appendTo(parentEl)
    .addText("Delete project")
    .addId("delBtnTwo")
    .addEvent("click", () => {
      noteNames.splice(index, 1);
      container.remove();
    });

  const changeColor = CreateElEvent("button")
    .appendTo(parentEl)
    .addText("Change color")
    .addId("clrBtn")
    .addEvent("click", () => console.log("hi"));

  console.log(elRight);
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

const createNote = (elName, parentEl) => {
  const elNameClean = elName.replace(/btn|\s|-|\d+|:/g, "");
  if (!noteNames.includes(elNameClean)) {
    const note = CreateElAttribute("div")
      .appendTo(parentEl)
      .addId(`${elName}`)
      .addText(`${elName}`)
      .addAttribute("data-child", `child`);
    const container = NewProjectDivs(note.el, elName);
    container.elRight.el.classList.add(elNameClean);
    newNotesBtns(container.elLeft.el, `${elName}btn`, note.el);

    noteNames.push(elNameClean);
    console.log(noteNames);

    return {
      note,
    };
  } else {
    console.log("Please input new name");
    console.log("name already exists:", projNames);
  }
};

const projNames = [];

// extends storeInput & turns input to project/note
export const addInput = (input, date, appendToEl) => {
  let elName = StoreInput(input);
  let elDate = addDate(date);
  projNames.push(elName);
  const newChild = CreateEl("div")
    .addText(`${elName} ${elDate}`)
    .addId(elName) // do not change
    .appendTo(appendToEl);
  CreateChildDivs(elName, newChild.el);
  console.log(projNames);
  return newChild;
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

// Enforce adding project with date.
// Enforce actual date in future. (dd/mm/yyyy)
