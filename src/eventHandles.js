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
  compareFnChildren,
  sortProjects,
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
        buttonDiv,
        isOpen.getValue(),
        "menuDisappear 0.3s ease forwards"
      );
    } else {
      startFrame();
      isOpen.turnFalse();
      addAnimate(
        buttonDiv,
        isOpen.getValue(),
        "menuBarAppear 0.3s ease forwards"
      );
    }
  }
};
svgDiv.addEventListener("mousedown", clickEvent);

// mouse leave top left container
buttonDiv.addEventListener("mouseleave", (event) => {
  if (!isOpen.getValue() && event) {
    setTimeout(() => {
      endFrame();
      isOpen.turnTrue();
      addAnimate(
        buttonDiv,
        isOpen.getValue(),
        "menuDisappear 0.3s ease forwards"
      );
    }, 400);
  }
});

let whichDay;

newProjTodayBtn.addEventListener("click", () => {
  startNewProj(newProjTodayBtn, "Add", "Add project");
  if (newProjInputTodayName.value) {
    addInput(
      newProjInputTodayName,
      newProjectTodayInputDate,
      bodyContainerCenter
    );

    // enable/disable grid to match current tab active
    if (whichDay === "today") {
      todayBtn.click();
    } else if (whichDay === "future") {
      upcomingBtn.click();
    } else {
      allBtn.click();
    }
  } else {
    console.log("please input value");
  }

  if (inputOpen.getValue()) {
    addAnimate(
      newProjInputTodayName,
      inputOpen.getValue(),
      "addProjAppear ease 0.18s forwards"
    );

    addAnimate(
      newProjectTodayInputDate,
      inputOpen.getValue(),
      "addProjAppearDate ease 0.18s forwards"
    );
    inputOpen.turnFalse();
  } else {
    addAnimate(
      newProjInputTodayName,
      inputOpen.getValue(),
      "addProjDis 0.2s ease forwards"
    );

    addAnimate(
      newProjectTodayInputDate,
      inputOpen.getValue(),
      "addProjDisDate 0.2s ease forwards"
    );
    inputOpen.turnTrue();
  }
});

todayBtn.addEventListener("click", () => {
  whichDay = "today";
  const allChildren = document.querySelectorAll(".project");
  checkElements(
    (element) => checkDate(element)["==="],
    gridOn,
    gridOff,
    ...allChildren
  );
});

upcomingBtn.addEventListener("click", () => {
  whichDay = "future";
  const allChildren = document.querySelectorAll(".project");
  checkElements(
    (element) => checkDate(element)[">"],
    gridOn,
    gridOff,
    ...allChildren
  );
  sortProjects(projectArr, ...allChildren);
  projectArr.sort(compareFnChildren);
  projectArr.forEach((child, index) => (child.style.gridRow = index + 1));
});

let projectArr = CreateArray();

allBtn.addEventListener("click", () => {
  whichDay = "all";
  const allChildren = document.querySelectorAll(".project");
  checkElements(
    (element) => checkDate(element)["<"],
    gridOn,
    gridOff,
    ...allChildren
  );
  sortProjects(projectArr, ...allChildren);
  projectArr.sort(compareFnChildren);
  projectArr.forEach((child, index) => (child.style.gridRow = index + 1));

  return;
});
