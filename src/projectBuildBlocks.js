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
  addAnimate,
  populateStorage,
  itemArray,
  populateChildren,
  getFirstNumber,
  getId,
  childrenArray,
  returnId,
} from "./backbone";
import { format } from "date-fns";

import plusIcon from "./Icons/plusIcon.png";
import deleteIcon from "./icons/deleteIcon.png";
import editIcon from "./icons/editIcon.png";
import { allBtn } from "./UI";

// array to store notes (sort() will sort them by time (early > late))
export let childEls = CreateArray();

export let dates = CreateArray();

// Adds buttons to >projects<
export const newProjBtns = (appendEl, name, containerEl) => {
  const elRightID = document.getElementById(`${containerEl.id}`);
  const elRight = elRightID.querySelector(`#projRight`);

  const toggleInput = ShowInput();
  let isOpen = toggleOn();
  const btn = CreateElEvent("button")
    .appendTo(appendEl)
    .addId(`${name}Btn`)
    .addEvent("click", () => {
      if (!isOpen.getValue()) {
        deleteProj.style.display = "flex";
        addAnimate(
          elRight,
          isOpen.getValue(),
          "childEditDis 0.2s ease forwards"
        );
        isOpen.turnTrue();
      } else {
        addAnimate(
          elRight,
          isOpen.getValue(),
          "childEditAppear 0.2s ease forwards"
        );
        isOpen.turnFalse();
      }
    });

  const addNote = CreateElEvent("button")
    .appendTo(appendEl)
    .addId("addBtn")
    .addEvent("click", () => {
      toggleInput(timeEl, ToDo);
      if (!isOpen.getValue()) {
        deleteProj.style.display = "none";
        addAnimate(
          elRight,
          isOpen.getValue(),
          "childEditExtend 0.3s ease forwards"
        );
        isOpen.turnTrue();
      } else {
        addAnimate(
          elRight,
          isOpen.getValue(),
          "childEditCollapse 0.3s ease forwards"
        );
        deleteProj.style.display = "flex";
        isOpen.turnFalse();
      }
    });

  const deleteProj = CreateElEvent("button")
    .appendTo(appendEl)
    .addId("delBtn")
    .addEvent("click", () => {
      containerEl.remove();

      let items = JSON.parse(localStorage.getItem("items"));

      // removes item from itemArray
      itemArray.forEach((item, index) => {
        if (item.id === containerEl.id) {
          itemArray.splice(index, 1);
        }
      });

      // removes item from localStorage
      for (let i = 0; items.length; i++) {
        if (items[i].id == containerEl.id) {
          items.splice(i, 1);
          break;
        }
      }

      // "re-shapes" storage with updated items
      items = JSON.stringify(items);
      localStorage.setItem("items", items);
    });

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
        ToDo.value.length > 0 &&
        timeEl.value.length > 0
      ) {
        addNote.style.display = "flex";
        deleteProj.style.display = "flex";
        addAnimate(
          elRight,
          isOpen.getValue(),
          "childElReset 0.1s ease forwards"
        );
        createNote(`${timeEl.value} - ${ToDo.value}`, containerEl);
        toggleInput(timeEl, ToDo);
        timeEl.value = "";
        ToDo.value = "";
        const allChildren = document.querySelectorAll('[data-child="child"]');
        sortNames(...allChildren);
      }
    });

  const plusIconEl = CreateEl("img").appendTo(addNote).addId("plusBtnIcon");
  plusIconEl.src = plusIcon;
  plusIconEl.alt = "Plus Icon";

  const delIconEl = CreateEl("img").appendTo(deleteProj).addId("delBtnIcon");
  delIconEl.src = deleteIcon;
  delIconEl.alt = "Delete Icon";

  const editIconEl = CreateEl("img").appendTo(btn).addId("editBtnEl");
  editIconEl.src = editIcon;
  editIconEl.alt = "Edit icon";

  return btn;
};

// add buttons to >notes<
export const newNotesBtns = (parentEl, name, containerEl) => {
  const elRightID = document.getElementById(`${containerEl.id}`);
  const elRight = elRightID.querySelector(
    `.${name.replace(/btn|\s|-|\d+|:/g, "")}`
  );

  let isOpen = toggleOn();

  const btn = CreateElEvent("button").appendTo(parentEl).addId(`${name}Btn`);

  const deleteProj = CreateElEvent("button")
    .appendTo(parentEl)
    .addId("delBtnTwo");

  deleteProj.addEventListener("click", () => {
    let text = containerEl.querySelector("p");
    childEls = childEls.filter((el) => el !== text.textContent);

    console.log("new:", childEls);
    containerEl.remove();

    let children = JSON.parse(localStorage.getItem("children"));

    // removes item from children-Array
    childrenArray.forEach((item, index) => {
      if (item.id === containerEl.id) {
        childrenArray.splice(index, 1);
      }
    });

    // removes item from localStorage
    for (let i = 0; children.length; i++) {
      if (children[i].id === containerEl.id) {
        console.log(children[i].id);
        children.splice(i, 1);
        break;
      }
    }

    // "re-shapes" storage with updated items
    children = JSON.stringify(children);
    localStorage.setItem("children", children);
  });

  const changeColor = CreateElEvent("button")
    .appendTo(parentEl)
    .addText("#")
    .addId("clrBtn")
    .addEvent("click", () => console.log("hi"));

  btn.addEventListener("click", () => {
    if (!isOpen.getValue()) {
      addAnimate(elRight, isOpen.getValue(), "childEditDis 0.1s ease forwards");
      isOpen.turnTrue();
    } else {
      addAnimate(
        elRight,
        isOpen.getValue(),
        "childEditAppear 0.2s ease forwards"
      );
      isOpen.turnFalse();
    }
  });

  const editIconEl = CreateEl("img").appendTo(btn).addId("plusBtnIcon");
  editIconEl.src = editIcon;
  editIconEl.alt = "Edit icon";

  const delIconEl = CreateEl("img").appendTo(deleteProj).addId("delBtnIcon");
  delIconEl.src = deleteIcon;
  delIconEl.alt = "Delete Icon";

  return btn;
};

export const createNote = (elName, parentEl) => {
  const elNameClean = elName.replace(/btn|\s|-|\d+|:/g, ""); // for child-animation
  const elNameNumbers = elName.replace(/[a-zA-Z]|\s|-/g, ""); // plain numbers to help sort names
  const parentElFirstDigit = getFirstNumber(parentEl);
  const parentId = returnId(parentEl);
  if (
    !childEls.includes(
      `${parentElFirstDigit} - ${elNameNumbers} - ${elNameClean}`
    )
  ) {
    const parentElement = getId(parentEl);
    const note = CreateElAttribute("div")
      .appendTo(parentElement)
      .addAttribute("data-child", `child`)
      .addId(`${parentId} - ${elNameNumbers}`);

    const container = NewProjectDivs(note);
    container.elRight.classList.add(elNameClean);
    newNotesBtns(container.elLeft, `${elName}btn`, note);
    pushToArray(
      childEls,
      `${parentElFirstDigit}${elNameNumbers} - ${elNameClean}`
    );
    childEls.sort();

    populateChildren(`${note.id}`, parentElement, elName);

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
  let today = format(new Date(), "dd/MM/yyyy");
  let elName = StoreInput(input);
  let elDate = addDate(date);
  let elDateLogic = format(elDate, "dd/MM/yyyy");
  let titleDate;

  n++;
  if (elDateLogic === today) {
    titleDate = "Today";
  } else {
    titleDate = elDateLogic;
  }
  const elDateClean = format(new Date(elDate), "yyyyMMdd"); // ALlow clean IDS & keeping projNames
  const newChild = CreateEl("div")
    .addText(`${titleDate} - ${elName}`)
    .addId(`${n}${elDateClean}`) // do not change
    .appendTo(appendToEl);
  newChild.classList.add("project");
  CreateChildDivs(elName, newChild);

  populateStorage(elName, elDate, newChild);
  return {
    newChild,
  };
};

window.addEventListener("DOMContentLoaded", () => {
  if (localStorage.length > 1) {
    const items = JSON.parse(localStorage.getItem("items"));

    items.forEach((child) => {
      addInput(child.text, child.date, document.getElementById("mainContent"));
    });

    const childItems = JSON.parse(localStorage.getItem("children"));

    childItems.forEach((child) => {
      createNote(child.name, child.parent);
      const allChildren = document.querySelectorAll('[data-child="child"]');
      sortNames(...allChildren);
    });
  }

  allBtn.click();
});
