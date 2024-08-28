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
  ShowInput,
  startNewProj,
  gridOn,
  gridOff,
  animateIcon,
  checkElements,
  checkDate,
  toggleOn,
} from "./backbone";
import "./sidePannel.css";

const { startFrame, endFrame } = loadAnimation();

const isOpen = toggleOn();

// open top left menu
const clickEvent = (event) => {
  if (event.button === 0) {
    if (!isOpen.getValue()) {
      endFrame();
      isOpen.turnTrue();
      animateIcon(buttonDiv.el, isOpen.getValue());
    } else {
      startFrame();
      isOpen.turnFalse();
      animateIcon(buttonDiv.el, isOpen.getValue());
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
      animateIcon(buttonDiv.el, isOpen.getValue());
    }, 400);
  }
});

const toggleVisibility = ShowInput();

let whichDay;

newProjTodayBtn.el.addEventListener("click", () => {
  startNewProj(newProjTodayBtn.el, "Add", "Start new project");
  toggleVisibility(newProjInputTodayName.el, newProjectTodayInputDate.el);
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

allBtn.el.addEventListener("click", () => {
  whichDay = "all";
  const allChildren = document.querySelectorAll(".project");
  gridOn(...allChildren);
});
