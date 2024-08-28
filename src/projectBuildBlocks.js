import {
  CreateEl,
  addDate,
  ShowInput,
  CreateElEvent,
  CreateElAttribute,
  StoreInput,
  pushToArray,
  CreateArray,
  NewProjectDivs,
  CreateChildDivs,
  sortNames,
  toggleOn,
  animateNoteDiv,
} from "./backbone";
import { format } from "date-fns";

// array to store notes (sort() will sort them by time (early > late))
export let childEls = CreateArray();

// Adds buttons to >projects<
export const newProjBtns = (appendEl, name, containerEl) => {
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
        createNote(`${timeEl.el.value} - ${ToDo.el.value}`, containerEl);
        toggleInput(timeEl.el, ToDo.el);
        timeEl.el.value = "";
        ToDo.el.value = "";
        const allChildren = document.querySelectorAll('[data-child="child"]');
        sortNames(...allChildren);
      }
    });

  return btn;
};

// add buttons to >notes<
export const newNotesBtns = (parentEl, name, containerEl) => {
  const elRightID = document.getElementById(`${containerEl.id}`);
  const elRight = elRightID.querySelector(
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
      const allChildren = document.querySelectorAll('[data-child="child"] p');
      childEls = childEls.filter((element) =>
        allChildren.forEach((child) => element !== child)
      );
      containerEl.remove();
    });

  const changeColor = CreateElEvent("button")
    .appendTo(parentEl)
    .addText("Change color")
    .addId("clrBtn")
    .addEvent("click", () => console.log("hi"));

  let isOpen = toggleOn();
  btn.el.addEventListener("click", () => {
    if (!isOpen.getValue()) {
      animateNoteDiv(elRight, isOpen.getValue());
      isOpen.turnTrue();
    } else {
      animateNoteDiv(elRight, isOpen.getValue());
      isOpen.turnFalse();
    }
  });

  return btn;
};

export const createNote = (elName, parentEl) => {
  const elNameClean = elName.replace(/btn|\s|-|\d+|:/g, ""); // for child-animation
  const elNameNumbers = elName.replace(/[a-zA-Z]|\s|-|:/g, ""); // plain numbers to help sort names
  const parentElFirstDigit = parentEl.id.replace(/^(.).*/, "$1");
  if (
    !childEls.includes(
      `${parentElFirstDigit} - ${elNameNumbers} - ${elNameClean}`
    )
  ) {
    const note = CreateElAttribute("div")
      .appendTo(parentEl)
      .addAttribute("data-child", `child`)
      .addId(`${parentEl.id} - ${elNameNumbers}`);
    const container = NewProjectDivs(note.el, elName);
    container.elRight.el.classList.add(elNameClean);
    newNotesBtns(container.elLeft.el, `${elName}btn`, note.el);
    pushToArray(
      childEls,
      `${parentElFirstDigit} - ${elNameNumbers} - ${elNameClean}`
    );
    childEls.sort();
    console.log(childEls);
    return {
      note,
    };
  } else {
    console.log("wrong input");
  }
};

// n value will be first letter in id for projects
let n = 0;
// extends storeInput & turns input to project/note
export const addInput = (input, date, appendToEl) => {
  n++;
  let elName = StoreInput(input);
  let elDate = addDate(date);
  const elDateClean = format(new Date(elDate), "yyyyMMdd"); // ALlow clean IDS & keeping projNames
  const newChild = CreateEl("div")
    .addText(`${elName} ${elDate}`)
    .addId(`${n}${elDateClean}`) // do not change
    .appendTo(appendToEl);
  newChild.el.classList.add("project");
  CreateChildDivs(elName, newChild.el);

  return {
    newChild,
  };
};
