import { loadAnimation } from "./svgAnimation";
import {
  svgDiv,
  buttonDiv,
  newProjTodayBtn,
  newProjFutureBtn,
  bodyContainerCenter,
  newProjectTodayInputDate,
  newProjInputTodayName,
  newProjectFutureInputDate,
  newProjInputFutureName,
  todayBtn,
  upcomingBtn,
} from "./UI";
import {
  addInput,
  startNewProj,
  ShowInput,
  checkTodaysDate,
  checkUpComingDates,
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
  checkTodaysDate("grid", "none", ...allChildren);
  console.log(...allChildren);
  newProjTodayBtn.el.click();
});

newProjFutureBtn.el.addEventListener("click", () => {
  startNewProj(newProjFutureBtn.el, "Add", "Start new project");
  toggleVisibility(newProjInputFutureName.el, newProjectFutureInputDate.el);
  if (newProjInputFutureName.el.value) {
    addInput(
      newProjInputFutureName.el,
      newProjectFutureInputDate.el,
      bodyContainerCenter.el
    );
  } else {
    console.log("please input value");
  }
});

upcomingBtn.el.addEventListener("click", () => {
  const allChildren = document.querySelectorAll(".project");
  checkUpComingDates("grid", "none", ...allChildren);
  console.log(...allChildren);
  newProjFutureBtn.el.click();
});
