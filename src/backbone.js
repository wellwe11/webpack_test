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
export const storeInput = (input) => {
  let userInput = input.value;
  input.value = "";
  return userInput;
};

// extends storeInput & turns input to project/note
export const addInput = (input, appendToEl) => {
  if (input.value.length > 0) {
    let name = storeInput(input);
    const newChild = CreateChild(name, appendToEl);
    return newChild;
  } else {
    console.log("please input text");
  }
};

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
// A function that soley creates project, ties it to "mainContent"
// A function that soley creates notes, and ties it to a parent (project)

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
