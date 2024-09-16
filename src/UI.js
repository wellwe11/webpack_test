import { CreateEl, CreateElAttribute } from "./backbone.js";

export const mainHeader = CreateEl("header")
  .appendTo(document.body)
  .addText("The ultimate ToDo List - I gave up on styling this project");

export const buttonDiv = CreateEl("div")
  .appendTo(mainHeader)
  .addId("buttonDiv");

export const homeBtn = CreateEl("button").appendTo(buttonDiv).addText("Home");

export const infoBtn = CreateEl("button").appendTo(buttonDiv).addText("ToDo's");

export const faqBtn = CreateEl("button").appendTo(buttonDiv).addText("Faq");

// main-body container
export const bodyContainer = CreateEl("div")
  .appendTo(document.body)
  .addId("bodyContainer");

// center container
export const bodyContainerCenter = CreateEl("div")
  .appendTo(bodyContainer)
  .addId("mainContent");

// left container
export const bodyContainerLeft = CreateEl("div")
  .appendTo(bodyContainer)
  .addId("leftContent");

export const leftContentOne = CreateEl("div")
  .appendTo(bodyContainerLeft)
  .addId("leftOne");

export const BtnInputProjContainer = CreateEl("span")
  .appendTo(bodyContainerCenter)
  .addId("BtnInputContainer");

export const newProjTodayBtn = CreateEl("button")
  .appendTo(leftContentOne)
  .addId("createNewProjTodayBtn")
  .addText("Add project");

export const newProjInputTodayName = CreateEl("input")
  .appendTo(leftContentOne)
  .addId("newProjectInputTodayName");

export const newProjectTodayInputDate = CreateElAttribute("input")
  .appendTo(leftContentOne)
  .addId("newProjectInputTodayDate")
  .addAttribute("type", "date");

export const todayBtn = CreateEl("button")
  .appendTo(leftContentOne)
  .addId("todayBtn")
  .addText("Today");

export const upcomingBtn = CreateEl("button")
  .appendTo(leftContentOne)
  .addId("upcomingBtn")
  .addText("Upcoming");

export const allBtn = CreateEl("button")
  .appendTo(leftContentOne)
  .addId("allBtn")
  .addText("All");

export const footer = CreateEl("footer")
  .appendTo(document.body)
  .addText("Footer");

export const iconDiv = CreateEl("div").appendTo(mainHeader).addId("iconDiv");

export const svgDiv = CreateEl("div").appendTo(iconDiv).addId("svgDiv");

export const iconDivNote = CreateEl("div");
