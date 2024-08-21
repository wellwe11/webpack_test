import { loadAnimation } from "./svgAnimation";
import {
  svgDiv,
  buttonDiv,
  newProjBtn,
  newProjInput,
  bodyContainerCenter,
  startNewProject,
} from "./UI";
import { addInput, startNewProj, ShowInput } from "./backbone";
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

newProjBtn.el.addEventListener("click", () => {
  startNewProj(newProjBtn.el, "Add", "Start new project");
  toggleVisibility(newProjInput.el);
  if (newProjInput.el.value) {
    addInput(newProjInput.el, bodyContainerCenter.el);
  } else {
    console.log("please input value");
  }
});
