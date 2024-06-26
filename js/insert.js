import { renderRepeatToCalendarView, renderTodoListBox } from "./dashboard.js";
import * as util from "./date_utils.js"
import { saveTodoList, loadTodoList } from "./localStorage.js";

let dateNow = new Date();
const todayYear = dateNow.getFullYear();
const todayMonth = dateNow.getMonth() + 1;
const todayDate = dateNow.getDate();
const todayDay = dateNow.getDay();

const insert = (obj) => {
	let todoList = loadTodoList();
	const time = obj.time !== "기한 없음" ? util.getDateInfoFromText(obj.time) : {
		year: todayYear,
		month: todayMonth,
		date: todayDate,
		day: todayDay,
	};
	todoList.push({
		id: todoList.length + 1,
		title: obj.title,
		time,
		repeat : obj.repeat,
		done: false,
	});
	saveTodoList(todoList);
	renderRepeatToCalendarView(todoList);
	if (window.location.pathname === "/index.html") {
		renderTodoListBox(document.querySelector(".weekly .date-container .date-box"));
	}
}

export { insert };