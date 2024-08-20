import { loadAnimation } from "./svgAnimation";
import {
  svgDiv,
  buttonDiv,
  newProjBtn,
  newProjInput,
  bodyContainerCenter,
} from "./UI";
import { addInput } from "./backbone";

const { startFrame, endFrame } = loadAnimation();

let isOpen = true;

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

buttonDiv.el.addEventListener("mouseleave", (event) => {
  if (!isOpen && event) {
    setTimeout(() => {
      endFrame();
      isOpen = true;
      buttonDiv.el.style.animation = "menuDisappear 0.3s ease forwards";
    }, 400);
  }
});

newProjBtn.el.addEventListener("click", () => {
  addInput(newProjInput.el, bodyContainerCenter.el);
});
