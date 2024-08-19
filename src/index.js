import "./cssReset.css";
import "./styles.css";
import { loadAnimation } from "./svgAnimation";

// create generic el
const CreateEl = (typeOfEl) => {
  const el = document.createElement(typeOfEl);

  const addText = (text) => {
    el.textContent = text;
  };

  const appendTo = (parentEl) => {
    parentEl.appendChild(el);
  };

  const addId = (newId) => {
    el.id = newId;
  };

  return {
    el,
    addText,
    appendTo,
    addId,
  };
};

export const mainHeader = CreateEl("header");
mainHeader.appendTo(document.body);

const buttonDiv = CreateEl("div");
buttonDiv.appendTo(mainHeader.el);
buttonDiv.addId("buttonDiv");

const homeBtn = CreateEl("button");
homeBtn.appendTo(buttonDiv.el);
homeBtn.addText("Home");

const infoBtn = CreateEl("button");
infoBtn.appendTo(buttonDiv.el);
infoBtn.addText("Info");

const faqBtn = CreateEl("button");
faqBtn.appendTo(buttonDiv.el);
faqBtn.addText("Faq");

export const svgDiv = CreateEl("div");
mainHeader.el.appendChild(svgDiv.el);
svgDiv.addId("svgDiv");

const { startFrame, endFrame } = loadAnimation();

let isOpen = true;

svgDiv.el.addEventListener("click", () => {
  if (!isOpen) {
    endFrame();
    isOpen = true;
    buttonDiv.el.style.animation = "menuDisappear 1s ease-in forwards";
  } else {
    startFrame();
    isOpen = false;
    buttonDiv.el.style.animation = "menuBarAppear 1s ease-in forwards";
  }
});
