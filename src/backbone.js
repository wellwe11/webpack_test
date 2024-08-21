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

// extends CreateEl for buttons
const CreateBtn = (element, buttonText, id) => {
  const elBtn = CreateEl("button")
    .addText(buttonText)
    .appendTo(element)
    .addId(id);
  return elBtn;
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

// creates btns & bints to event
const btnEvent = (element, name, noteEl, container) => {
  //   const buttons = projBtns(element, name);
  const btn = CreateBtn(element, "edit", `${name}Btn`);
  const addNote = CreateBtn(element, "Add note", "addBtn");
  const deleteProj = CreateBtn(element, "Delete project", "delBtn");
  const changeDueDate = CreateBtn(element, "Change Date", "changeBtn");

  const toggleVisibility = ShowInput();

  btn.el.addEventListener("click", () => {
    toggleVisibility(addNote.el, deleteProj.el, changeDueDate.el);
  });
  addNote.el.addEventListener("click", () => {
    createNote(noteEl, `${name}'s child`);
  });
  deleteProj.el.addEventListener("click", () => {
    container.remove();
  });
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
export const CreateChild = (elName, parentEl) => {
  const element = CreateEl("div")
    .addText(elName)
    .addId(`${elName}`)
    .appendTo(parentEl);

  const container = NewProjectDivs(element.el);

  btnEvent(container.elRight.el, elName, container.elLeft.el, element.el);
  return {
    element,
    container,
  };
};

const createNote = (parentEl, id) => {
  const note = CreateEl("div").appendTo(parentEl).addId(id).addText(`${id}`);
  note.el.setAttribute("data-child", `child`);
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
  const newChild = CreateChild(name, appendToEl);
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
// - Project contains notes, buttons
// -- Notes contain:
// ---- Title, date, edit button, summery of text
// ----- edit note enables delete note, change text, change color
// -- Project buttons are:
// --- Edit project
// ---- Edit project enables:
// ----- Add note, delete project, change date
//

// left side-pannel contains buttons
// button 1: create new project
// button 2: today's notes
// button 3: upcoming

// create factory function that adds notes which specifically has
// some values & appends to same element.
// has remove button, "done" button, edit button etc.

// home shows todays todos
// ToDo's show all todos
// Faq will be changed

// add general information & settings to left sidebar
// add random notes to right or something
