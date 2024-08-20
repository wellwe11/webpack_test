import { CreateChild } from "./backbone";
import { bodyContainerCenter } from "./UI";

const projectOne = CreateChild("projectOne", bodyContainerCenter.el);

const noteOne = CreateChild("NoteOne", projectOne.el);
const noteTwo = CreateChild("NoteTwo", projectOne.el);
