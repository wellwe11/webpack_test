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

// extends CreateEl for projects and notes
export const CreateChild = (elName, parentEl) => {
  const element = CreateEl("div")
    .addText(elName)
    .addId(`${elName}Div`)
    .appendTo(parentEl);
  return element;
};

//stores general input in variable
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
export const startNewProj = (element) => {
  if (element.textContent !== "Add") {
    element.textContent = "Add";
  } else {
    element.textContent = "Create new project";
  }
};

export const ShowInput = () => {
  let isVisible = false;

  return (element) => {
    isVisible = !isVisible;
    element.style.display = isVisible ? "block" : "none";
  };
};

export const toggleVisibility = ShowInput();

// function that creates a button that appends to parent
// (this usecase is for creating buttons for the newProject)

// export const createNewProject = () => {
//     const project
// }

// Function for new projects
// - Project contains notes, buttons
// -- Notes contain:
// ---- Title, date, edit button, summery of text
// ----- edit button enables delete note, change text, change color
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
