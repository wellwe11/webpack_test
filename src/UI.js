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
export const bodyContainer = CreateEl("div")
  .appendTo(document.body)
  .addId("bodyContainer");

// center container
export const bodyContainerCenter = CreateEl("div")
  .appendTo(bodyContainer.el)
  .addId("mainContent");

// left container
export const bodyContainerLeft = CreateEl("div")
  .appendTo(bodyContainer.el)
  .addId("leftContent");

export const leftContentOne = CreateEl("div")
  .appendTo(bodyContainerLeft.el)
  .addId("leftOne");

export const BtnInputProjContainer = CreateEl("span")
  .appendTo(bodyContainerCenter.el)
  .addId("BtnInputContainer");

export const newProjTodayBtn = CreateEl("button")
  .appendTo(leftContentOne.el)
  .addId("createNewProjTodayBtn")
  .addText("Add project");

export const newProjInputTodayName = CreateEl("input")
  .appendTo(leftContentOne.el)
  .addId("newProjectInputTodayName");

export const newProjectTodayInputDate = CreateElAttribute("input")
  .appendTo(leftContentOne.el)
  .addId("newProjectInputTodayDate")
  .addAttribute("type", "date");

export const todayBtn = CreateEl("button")
  .appendTo(leftContentOne.el)
  .addId("todayBtn")
  .addText("Today");

export const upcomingBtn = CreateEl("button")
  .appendTo(leftContentOne.el)
  .addId("upcomingBtn")
  .addText("Upcoming");

export const allBtn = CreateEl("button")
  .appendTo(leftContentOne.el)
  .addId("allBtn")
  .addText("All");

export const footer = CreateEl("footer")
  .appendTo(document.body)
  .addText("Footer");

export const iconDiv = CreateEl("div").appendTo(mainHeader.el).addId("iconDiv");

export const svgDiv = CreateEl("div").appendTo(iconDiv.el).addId("svgDiv");

export const iconDivNote = CreateEl("div");
