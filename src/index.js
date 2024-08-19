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

// create factory function that adds notes which specifically has
// some values & appends to same element.
// has remove button, "done" button, edit button etc.

// home shows top notes
// ToDo's show all notes
// Faq will be changed

// add general information & settings to left sidebar
// add random notes to right or something

export const mainHeader = CreateEl("header");
mainHeader.appendTo(document.body);
mainHeader.addText("The ultimate ToDo List");

const buttonDiv = CreateEl("div");
buttonDiv.appendTo(mainHeader.el);
buttonDiv.addId("buttonDiv");

const homeBtn = CreateEl("button");
homeBtn.appendTo(buttonDiv.el);
homeBtn.addText("Home");

const infoBtn = CreateEl("button");
infoBtn.appendTo(buttonDiv.el);
infoBtn.addText("ToDo's");

const faqBtn = CreateEl("button");
faqBtn.appendTo(buttonDiv.el);
faqBtn.addText("Faq");

// main-body container
const bodyContainer = CreateEl("div");
bodyContainer.appendTo(document.body);
bodyContainer.addId("bodyContainer");

// right container
const bodyContainerRight = CreateEl("div");
bodyContainerRight.appendTo(bodyContainer.el);
bodyContainerRight.addId("rightContent");

const rightContentOne = CreateEl("div");
rightContentOne.appendTo(bodyContainerRight.el);
rightContentOne.addId("rightOne");

const rightContentTwo = CreateEl("div");
rightContentTwo.appendTo(bodyContainerRight.el);
rightContentTwo.addId("rightTwo");

const rightContentThree = CreateEl("div");
rightContentThree.appendTo(bodyContainerRight.el);
rightContentThree.addId("rightThree");

// center container
const bodyContainerCenter = CreateEl("div");
bodyContainerCenter.appendTo(bodyContainer.el);
bodyContainerCenter.addId("mainContent");

// left container
const bodyContainerLeft = CreateEl("div");
bodyContainerLeft.appendTo(bodyContainer.el);
bodyContainerLeft.addId("leftContent");

const leftContentOne = CreateEl("div");
leftContentOne.appendTo(bodyContainerLeft.el);
leftContentOne.addId("leftOne");

const footer = CreateEl("footer");
footer.appendTo(document.body);
footer.addText("Footer");

// --------------- // --------------- v svg v --------------- // --------------- // --------------- //
// might export to seperate file

const iconDiv = CreateEl("div");
iconDiv.appendTo(mainHeader.el);
iconDiv.addId("iconDiv");

export const svgDiv = CreateEl("div");
svgDiv.appendTo(iconDiv.el);
svgDiv.addId("svgDiv");

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

buttonDiv.el.addEventListener("mouseleave", () => {
  if (!isOpen) {
    setTimeout(() => {
      endFrame();
      isOpen = true;
      buttonDiv.el.style.animation = "menuDisappear 0.3s ease forwards";
    }, 900);
  }
});

// --------------- // --------------- // --------------- // --------------- // --------------- //
