import { loadAnimation } from "./svgAnimation";
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
  addInput,
  startNewProj,
  ShowInput,
  checkElements,
  checkDate,
  gridOn,
  gridOff,
} from "./backbone";
import "./sidePannel.css";

const { startFrame, endFrame } = loadAnimation();

let isOpen = true;

// open top left menu
const clickEvent = (event) => {
  if (event.button === 0) {
    if (!isOpen) {
      endFrame();
      isOpen = true;
      buttonDiv.el.style.animation = "menuDisappear 0.3s ease forwards";
    } else {
      startFrame();
      isOpen = false;
      buttonDiv.el.style.animation = "menuBarAppear 0.3s ease forwards";
    }
  }
};
svgDiv.el.addEventListener("mousedown", clickEvent);

// mouse leave top left container
buttonDiv.el.addEventListener("mouseleave", (event) => {
  if (!isOpen && event) {
    setTimeout(() => {
      endFrame();
      isOpen = true;
      buttonDiv.el.style.animation = "menuDisappear 0.3s ease forwards";
    }, 400);
  }
});

const toggleVisibility = ShowInput();

newProjTodayBtn.el.addEventListener("click", () => {
  startNewProj(newProjTodayBtn.el, "Add", "Start new project");
  toggleVisibility(newProjInputTodayName.el, newProjectTodayInputDate.el);
  if (newProjInputTodayName.el.value) {
    addInput(
      newProjInputTodayName.el,
      newProjectTodayInputDate.el,
      bodyContainerCenter.el
    );
  } else {
    console.log("please input value");
  }
});

todayBtn.el.addEventListener("click", () => {
  const allChildren = document.querySelectorAll(".project");
  // checkTodaysDate("grid", "none", ...allChildren);
  checkElements(
    (element) => checkDate(element)["==="],
    gridOn,
    gridOff,
    ...allChildren
  );
  console.log(...allChildren);
});

upcomingBtn.el.addEventListener("click", () => {
  const allChildren = document.querySelectorAll(".project");
  checkElements(
    (element) => checkDate(element)[">"],
    gridOn,
    gridOff,
    ...allChildren
  );
  console.log(...allChildren);
});

allBtn.el.addEventListener("click", () => {
  const allChildren = document.querySelectorAll(".project");
  gridOn(...allChildren);
});
