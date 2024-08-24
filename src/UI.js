import { CreateEl, CreateElAttribute } from "./backbone.js";

export const mainHeader = CreateEl("header")
  .appendTo(document.body)
  .addText("The ultimate ToDo List");

export const buttonDiv = CreateEl("div")
  .appendTo(mainHeader.el)
  .addId("buttonDiv");

export const homeBtn = CreateEl("button")
  .appendTo(buttonDiv.el)
  .addText("Home");

export const infoBtn = CreateEl("button")
  .appendTo(buttonDiv.el)
  .addText("ToDo's");

export const faqBtn = CreateEl("button").appendTo(buttonDiv.el).addText("Faq");

// main-body container
const bodyContainer = CreateEl("div")
  .appendTo(document.body)
  .addId("bodyContainer");

// center container
export const bodyContainerCenter = CreateEl("div")
  .appendTo(bodyContainer.el)
  .addId("mainContent");

// left container
const bodyContainerLeft = CreateEl("div")
  .appendTo(bodyContainer.el)
  .addId("leftContent");

const leftContentOne = CreateEl("div")
  .appendTo(bodyContainerLeft.el)
  .addId("leftOne");

const BtnInputProjContainer = CreateEl("span")
  .appendTo(bodyContainerCenter.el)
  .addId("BtnInputContainer");

export const newProjBtn = CreateEl("button")
  .appendTo(leftContentOne.el)
  .addId("createNewProjBtn")
  .addText("+ Add task");

export const newProjInputName = CreateEl("input")
  .appendTo(leftContentOne.el)
  .addId("newProjectInputName");

export const newProjectInputDate = CreateElAttribute("input")
  .appendTo(leftContentOne.el)
  .addId("newProjectInputDate")
  .addAttribute("type", "date");

export const todayBtn = CreateEl("button")
  .appendTo(leftContentOne.el)
  .addId("todayBtn")
  .addText("Today");

export const upcomingBtn = CreateEl("button")
  .appendTo(leftContentOne.el)
  .addId("upcomingBtn")
  .addText("Upcoming");

// left side-pannel contains buttons
// button 1: create new project
// button 2: today's notes
// button 3: upcoming

export const footer = CreateEl("footer")
  .appendTo(document.body)
  .addText("Footer");

export const iconDiv = CreateEl("div").appendTo(mainHeader.el).addId("iconDiv");

export const svgDiv = CreateEl("div").appendTo(iconDiv.el).addId("svgDiv");
