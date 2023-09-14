document.addEventListener("DOMContentLoaded", function () {
    const listElement = document.getElementById("list");
    const createElementBtn = document.getElementById("create");
    const notes = [];
  
    createElementBtn.addEventListener("click", createNewNote);
  
    function createNewNote() {
      const item = {
        id: new Date().getTime(),
        text: "",
        complete: false,
      };
      notes.unshift(item);
      const { itemElement, inputElement } = createNoteElement(item);
      listElement.prepend(itemElement);
      inputElement.removeAttribute("disabled");
      inputElement.focus();
      Save();
    }
  
    function createNoteElement(item) {
      const itemElement = document.createElement("div");
      itemElement.classList.add("item");
  
      const checkbox = createInputElement("checkbox", item.complete);
      checkbox.addEventListener("change", () => {
        item.complete = checkbox.checked;
        updateItemElementState(itemElement, item);
        Save();
      });
  
      const inputElement = createInputElement("text", item.text);
      inputElement.setAttribute("disabled", "");
      inputElement.addEventListener("input", () => {
        item.text = inputElement.value;
      });
      inputElement.addEventListener("blur", () => {
        inputElement.setAttribute("disabled", "");
        Save();
      });
  
      const actionsElement = document.createElement("div");
      actionsElement.classList.add("actions");
  
      const editElementBtn = createButtonElement("edit", () => {
        inputElement.removeAttribute("disabled");
        inputElement.focus();
      });
  
      const removeElementBtn = createButtonElement("remove_circle", () => {
        removeItem(item, itemElement);
      });
  
      actionsElement.append(editElementBtn, removeElementBtn);
      itemElement.append(checkbox, inputElement, actionsElement);
  
      return { itemElement, inputElement };
    }
  
    function createInputElement(type, value) {
      const inputElement = document.createElement("input");
      inputElement.type = type;
      inputElement.value = value;
      return inputElement;
    }
  
    function createButtonElement(icon, clickHandler) {
      const button = document.createElement("button");
      button.classList.add("material-icons");
      button.innerText = icon;
      button.addEventListener("click", clickHandler);
      return button;
    }
  
    function updateItemElementState(itemElement, item) {
      if (item.complete) {
        itemElement.classList.add("complete");
      } else {
        itemElement.classList.remove("complete");
      }
    }
  
    function removeItem(item, itemElement) {
      const index = notes.findIndex((t) => t.id === item.id);
      if (index !== -1) {
        notes.splice(index, 1);
        listElement.removeChild(itemElement);
        Save();
      }
    }
  
    function DisplayNotes() {
      Load();
      notes.forEach((item) => {
        const { itemElement } = createNoteElement(item);
        listElement.append(itemElement);
      });
    }
  
    function Save() {
      const save = JSON.stringify(notes);
      localStorage.setItem("myNotes", save);
    }
  
    function Load() {
      const data = localStorage.getItem("myNotes");
      if (data) {
        const parsedNotes = JSON.parse(data);
        notes.push(...parsedNotes);
      }
    }
  
    DisplayNotes();
  });
  