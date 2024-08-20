import { CreateEl } from "./backbone.js";

export const mainHeader = CreateEl("header");
mainHeader.appendTo(document.body);
mainHeader.addText("The ultimate ToDo List");

export const buttonDiv = CreateEl("div");
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

// center container
export const bodyContainerCenter = CreateEl("div");
bodyContainerCenter.appendTo(bodyContainer.el);
bodyContainerCenter.addId("mainContent");

// left container
const bodyContainerLeft = CreateEl("div");
bodyContainerLeft.appendTo(bodyContainer.el);
bodyContainerLeft.addId("leftContent");

const leftContentOne = CreateEl("div");
leftContentOne.appendTo(bodyContainerLeft.el);
leftContentOne.addId("leftOne");

export const newProjBtn = CreateEl("button");
newProjBtn.appendTo(leftContentOne.el);
newProjBtn.addId("newProjectButton");
newProjBtn.addText("Add new project");

export const newProjInput = CreateEl("input");
newProjInput.appendTo(leftContentOne.el);
newProjInput.addId("newProjectInput");

// left side-pannel contains buttons
// button 1: create new project
// button 2: today's notes
// button 3: upcoming

const footer = CreateEl("footer");
footer.appendTo(document.body);
footer.addText("Footer");

export const iconDiv = CreateEl("div");
iconDiv.appendTo(mainHeader.el);
iconDiv.addId("iconDiv");

export const svgDiv = CreateEl("div");
svgDiv.appendTo(iconDiv.el);
svgDiv.addId("svgDiv");
