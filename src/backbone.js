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

const createEvent = (el, event) => {
  el.addEventListener("click", event);
};

// creates btns & binds to event; project.
const newProjBtns = (appendEl, name, container) => {
  const btn = CreateEl("button")
    .appendTo(appendEl)
    .addText("edit")
    .addId(`${name}Btn`);
  const addNote = CreateEl("button")
    .appendTo(appendEl)
    .addText("Add note")
    .addId("addBtn");
  const deleteProj = CreateEl("button")
    .appendTo(appendEl)
    .addText("Delete project")
    .addId("delBtn");
  const changeDueDate = CreateEl("button")
    .appendTo(appendEl)
    .addText("Change Date")
    .addId("changeBtn");

  const toggleVisibility = ShowInput();
  createEvent(btn.el, () =>
    toggleVisibility(addNote.el, deleteProj.el, changeDueDate.el)
  );
  createEvent(addNote.el, () => createNote(`${name}'s child`, container));
  createEvent(deleteProj.el, () => container.remove());
};

// creates btns & binds to event;
const newNotesBtns = (appendEl, name, container) => {
  const btn = CreateEl("button")
    .appendTo(appendEl)
    .addText("edit")
    .addId(`${name}Btn`);
  const deleteProj = CreateEl("button")
    .appendTo(appendEl)
    .addText("Delete project")
    .addId("delBtn");
  const changeDueTime = CreateEl("button")
    .appendTo(appendEl)
    .addText("Change Date")
    .addId("changeBtn");

  const toggleVisibility = ShowInput();
  createEvent(btn.el, () => toggleVisibility(deleteProj.el, changeDueTime.el));
  createEvent(deleteProj.el, () => container.remove());
};

const NewProjectDivs = (element) => {
  const elLeft = CreateEl("div")
    .appendTo(element)
    .addText("Left")
    .addId("projLeft");
  const elCenter = CreateEl("div")
    .appendTo(element)
    .addText("Center")
    .addId("projCenter");
  const elRight = CreateEl("div")
    .appendTo(element)
    .addText("Right")
    .addId("projRight");

  return {
    elLeft,
    elCenter,
    elRight,
  };
};

// extends CreateEl for projects
export const CreateChildDivs = (elName, element) => {
  const container = NewProjectDivs(element);
  newProjBtns(container.elCenter.el, elName, element);
  return {
    container,
  };
};

const createNote = (elName, parentEl) => {
  const note = CreateEl("div").appendTo(parentEl).addId(elName).addText(elName);
  note.el.setAttribute("data-child", `child`);
  const container = NewProjectDivs(note.el);
  newNotesBtns(container.elCenter.el, `${elName}btn`, note.el);
  return note;
};

// stores general input in variable
export const StoreInput = (input) => {
  let userInput = input.value;
  input.value = "";
  return userInput;
};

// extends storeInput & turns input to project/note
export const addInput = (input, appendToEl) => {
  let name = StoreInput(input);
  const newChild = CreateEl("div")
    .addText(name)
    .addId(name)
    .appendTo(appendToEl);
  CreateChildDivs(name, newChild.el);
  return newChild;
};
// start new project & enable css attributes
export const startNewProj = (element, add, newProj) => {
  if (element.textContent !== add) {
    element.textContent = add;
  } else {
    element.textContent = newProj;
  }
};

// Function for new projects
// - Project contains notes; buttons, date, title
// -- Notes contain:
// ---- Title, date, edit button, summery of text
// ----- edit note enables delete note, change text, change color
// -- Project buttons are:
// --- Edit project
// ---- Edit project enables:
// ----- Add note, delete project, change date

// left side-pannel contains buttons
// button 1: create new project
// - Projects background-color, projects date,
// button 2: today's notes
// button 3: upcoming
// -- upcoming: sort notes by date (first to last)
// --- add a button to sort by importance

// create factory function that adds notes which specifically has
// some values & appends to same element.
// has remove button, "done" button, edit button etc.

// home shows todays todos
// ToDo's show all todos
// Faq will be changed

// add general information & settings to left sidebar
// add random notes to right or something
