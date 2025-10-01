document.addEventListener("DOMContentLoaded", () => {
    const addNoteButton = document.querySelector(".btn-addnewnote");
    const searchButton = document.querySelector(".btn-search");
    const searchInput = document.querySelector(".search-input");
    const notesList = document.querySelector(".notes-list");
    const tagElements = document.querySelectorAll(".wrapper__menu h3");
  
    let notes = [
      { text: "Купить молоко", tags: ["Список покупок"] },
      { text: "Сделать проект", tags: ["Работа"] },
      { text: "Написать идею для стартапа", tags: ["Идеи"] },
      { text: "Позвонить другу", tags: ["Личное"] },
    ];
  
    let activeTag = "Все";
  
    function renderNotes() {
      notesList.innerHTML = "";
  
      let filteredNotes = notes.filter(note => {
        let matchesTag =
          activeTag === "Все" || note.tags.includes(activeTag);
  
        let matchesSearch =
          note.text.toLowerCase().includes(searchInput.value.toLowerCase());
  
        return matchesTag && matchesSearch;
      });
  
      if (filteredNotes.length === 0) {
        notesList.innerHTML = "<p>Нет заметок</p>";
        return;
      }
  
      filteredNotes.forEach(note => {
        const noteDiv = document.createElement("div");
        noteDiv.classList.add("note");
  
        noteDiv.innerHTML = `
          <p>${note.text}</p>
          <div class="note-tags">Теги: ${note.tags.join(", ")}</div>
        `;
  
        notesList.appendChild(noteDiv);
      });
    }
  
    // Добавление новой заметки (просто prompt для примера)
    addNoteButton.addEventListener("click", () => {
      const text = prompt("Введите текст заметки:");
      const tag = prompt("Введите тег (Идеи, Личное, Работа, Список покупок):", "Личное");
  
      if (text) {
        notes.push({ text, tags: [tag] });
        renderNotes();
      }
    });
  
    // Поиск
    searchButton.addEventListener("click", () => {
      renderNotes();
    });
  
    // Поиск по Enter
    searchInput.addEventListener("keyup", e => {
      if (e.key === "Enter") renderNotes();
    });
  
    // Клик по тегу
    tagElements.forEach(tagEl => {
      tagEl.style.cursor = "pointer";
      tagEl.addEventListener("click", () => {
        activeTag = tagEl.textContent;
        renderNotes();
      });
    });
  
    // Первый рендер
    renderNotes();
  });