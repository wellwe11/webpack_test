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
  addAnimate,
  checkElements,
  checkDate,
  toggleOn,
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
      "addProjAppear 0.3s ease forwards"
    );

    addAnimate(
      newProjectTodayInputDate.el,
      inputOpen.getValue(),
      "addProjAppearDate 0.3s ease forwards"
    );
    inputOpen.turnFalse();
  } else {
    addAnimate(
      newProjInputTodayName.el,
      inputOpen.getValue(),
      "addProjDis 0.3s ease forwards"
    );

    addAnimate(
      newProjectTodayInputDate.el,
      inputOpen.getValue(),
      "addProjDisDate 0.3s ease forwards"
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

allBtn.el.addEventListener("click", () => {
  whichDay = "all";
  const allChildren = document.querySelectorAll(".project");
  gridOn(...allChildren);
});
