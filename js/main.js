// Inherit and instance from TodayJS
const today = new TodayJS();

/* Todo app */
var todo = new Vue({
   el: "#todo-app",

   /* Data */
   data: {
      // Date data
      monthDay: today.day("month"),
      weekDay: today.day("week"),
      month: today.month().substr(0, 3),
      year: today.year(),
      msg: "I don't know",

      // todos section data
      todoList: null,
      todoChecked: [],
      renderTodo: false,

      // add input data
      input: "",
   },

   /* Methods */
   methods: {
      // todos section methods
      deleteTodo: function (e) {
         chrome.storage.local.get(["todos"], function (data) {
            // Deletes the clicked todo
            data["todos"].splice(
               data["todos"].indexOf(e.target.textContent),
               1
            );

            // Saves the new todos
            chrome.storage.local.set(data, function () {
               todo.todoList = data["todos"];
               return "Todo Deleted!";
            });
         });
      },
      addChecked: function (check) {
         chrome.storage.local.get(function (data) {
            if (
               data["checked"] !== "undefined" &&
               data["checked"] instanceof Array
            ) {
               if (!data["checked"].includes(check)) {
                  data["checked"].push(check);
               }
            } else {
               data["checked"] = [check];
            }

            chrome.storage.local.set(data, function () {
               todo.todoChecked = data["checked"];

               return "Todo checked!";
            });
         });
      },
      removeChecked: function (check) {
         chrome.storage.local.get(function (data) {
            data["checked"].splice(data["checked"].indexOf(check), 1);

            chrome.storage.local.set(data, function () {
               todo.todoChecked = data["checked"];

               return "Todo unchecked!";
            });
         });
      },
      checkTodo: function (e, scope) {
         let checked, unchecked;

         if (scope === "in") {
            // Checks whether the todo is already checked or not
            if (!e.classList.contains("checked")) {
               e.classList.add("checked");
               e.previousElementSibling.classList.add("done");

               checked = e.previousElementSibling.textContent;
            } else {
               e.classList.remove("checked");
               e.previousElementSibling.classList.remove("done");

               unchecked = e.previousElementSibling.textContent;
            }

            if (checked) {
               todo.addChecked(checked);
            } else if (unchecked) {
               todo.removeChecked(unchecked);
            }
         } else {
            // Checks whether the todo is already checked or not
            if (!e.target.classList.contains("checked")) {
               e.target.classList.add("checked");
               e.target.previousElementSibling.classList.add("done");

               checked = e.target.previousElementSibling.textContent;
            } else {
               e.target.classList.remove("checked");
               e.target.previousElementSibling.classList.remove("done");

               unchecked = e.target.previousElementSibling.textContent;
            }

            if (checked) {
               todo.addChecked(checked);
            } else if (unchecked) {
               todo.removeChecked(unchecked);
            }
         }
      },

      // add button methods
      showAddInput: function (e) {
         e.target.style.display = "none";

         document.querySelector("#add-input").style.display = "block";
         document.querySelector("#add-input").children[0].focus();
      },

      // add input methods
      hideAddInput: function (e) {
         e.target.style.display = "none";
         document.querySelector("#add-btn").style.display = "block";
      },
      addTodo: function (e) {
         if (this.input.trim() !== "") {
            this.saveTodo(this.input);
         }

         // Empties the field
         this.input = "";

         // calls hideAddInput method
         this.hideAddInput(e);
      },
      saveTodo: function (todoV) {
         chrome.storage.local.get(function (data) {
            if (
               data["todos"] !== "undefined" &&
               data["todos"] instanceof Array
            ) {
               data["todos"].push(todoV);
            } else {
               data["todos"] = [todoV];
            }

            chrome.storage.local.set(data, function () {
               todo.todoList = data["todos"];

               return "Todo saved!";
            });
         });
      },
      loadTodos: function () {
         chrome.storage.local.get(function (data) {
            todo.todoList = data["todos"];
            todo.renderTodo = true;

            return "Todos loaded!";
         });
      },
      loadChecked: function () {
         chrome.storage.local.get(function (data) {
            if (
               data["todos"] !== "undefined" &&
               data["todos"] instanceof Array &&
               data["checked"] !== "undefined" &&
               data["checked"] instanceof Array
            ) {
               data["todos"].forEach((v, i, arr) => {
                  data["checked"].forEach((vB, iB, arrB) => {
                     if (v === vB) {
                        todo.checkTodo(
                           document.getElementById(
                              `todo_${v.replaceAll(" ", "")}`
                           ),
                           "in"
                        );
                     }
                  });
               });

               return "Checked loaded!";
            }
         });
      },
   },

   /* Lifecycle Hooks */
   ready() {
      // Loads the todos once the instance is ready
      this.loadTodos();
      this.loadChecked();
   },
});
