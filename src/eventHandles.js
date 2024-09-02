import { loadAnimation } from "./svgAnimation";
import { addInput } from "./projectBuildBlocks";
import {
  svgDiv,
  buttonDiv,
  newProjTodayBtn,
  bodyContainerCenter,
  newProjectTodayInputDate,
  newProjInputTodayName,
  todayBtn,
  upcomingBtn,
  allBtn,
} from "./UI";
import {
  startNewProj,
  gridOn,
  gridOff,
  addAnimate,
  checkElements,
  checkDate,
  toggleOn,
  CreateArray,
} from "./backbone";
import "./sidePannel.css";

const { startFrame, endFrame } = loadAnimation();

const isOpen = toggleOn();
const inputOpen = toggleOn();

// open top left menu
const clickEvent = (event) => {
  if (event.button === 0) {
    if (!isOpen.getValue()) {
      endFrame();
      isOpen.turnTrue();
      addAnimate(
        buttonDiv.el,
        isOpen.getValue(),
        "menuDisappear 0.3s ease forwards"
      );
    } else {
      startFrame();
      isOpen.turnFalse();
      addAnimate(
        buttonDiv.el,
        isOpen.getValue(),
        "menuBarAppear 0.3s ease forwards"
      );
    }
  }
};
svgDiv.el.addEventListener("mousedown", clickEvent);

// mouse leave top left container
buttonDiv.el.addEventListener("mouseleave", (event) => {
  if (!isOpen.getValue() && event) {
    setTimeout(() => {
      endFrame();
      isOpen.turnTrue();
      addAnimate(
        buttonDiv.el,
        isOpen.getValue(),
        "menuDisappear 0.3s ease forwards"
      );
    }, 400);
  }
});

let whichDay;

newProjTodayBtn.el.addEventListener("click", () => {
  startNewProj(newProjTodayBtn.el, "Add", "Add project");
  if (newProjInputTodayName.el.value) {
    addInput(
      newProjInputTodayName.el,
      newProjectTodayInputDate.el,
      bodyContainerCenter.el
    );

    // enable/disable grid to match current tab active
    if (whichDay === "today") {
      todayBtn.el.click();
    } else if (whichDay === "future") {
      upcomingBtn.el.click();
    } else {
      allBtn.el.click();
    }
  } else {
    console.log("please input value");
  }

  if (inputOpen.getValue()) {
    addAnimate(
      newProjInputTodayName.el,
      inputOpen.getValue(),
      "addProjAppear ease 0.18s forwards"
    );

    addAnimate(
      newProjectTodayInputDate.el,
      inputOpen.getValue(),
      "addProjAppearDate ease 0.18s forwards"
    );
    inputOpen.turnFalse();
  } else {
    addAnimate(
      newProjInputTodayName.el,
      inputOpen.getValue(),
      "addProjDis 0.2s ease forwards"
    );

    addAnimate(
      newProjectTodayInputDate.el,
      inputOpen.getValue(),
      "addProjDisDate 0.2s ease forwards"
    );
    inputOpen.turnTrue();
  }
});

todayBtn.el.addEventListener("click", () => {
  whichDay = "today";
  const allChildren = document.querySelectorAll(".project");
  checkElements(
    (element) => checkDate(element)["==="],
    gridOn,
    gridOff,
    ...allChildren
  );
});

upcomingBtn.el.addEventListener("click", () => {
  whichDay = "future";
  const allChildren = document.querySelectorAll(".project");
  checkElements(
    (element) => checkDate(element)[">"],
    gridOn,
    gridOff,
    ...allChildren
  );
});

let projectArr = CreateArray();

allBtn.el.addEventListener("click", () => {
  whichDay = "all";
  const allChildren = document.querySelectorAll(".project");
  // gridOn(...allChildren);

  checkElements(
    (element) => checkDate(element)["<"],
    gridOn,
    gridOff,
    ...allChildren
  );

  const compareFn = (a, b) => {
    return a.id.slice(1, 9) - b.id.slice(1, 9);
  };

  let lastChild = allChildren[allChildren.length - 1];
  projectArr.push(lastChild);
  projectArr.sort(compareFn);
  projectArr.forEach((child, index) => (child.style.gridRow = index + 1));
  console.log(projectArr);

  return;
});
