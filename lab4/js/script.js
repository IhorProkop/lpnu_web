function getAnimals() {
  return JSON.parse(localStorage.getItem("animals")) || [];
}
function saveAnimals(animals) {
  localStorage.setItem("animals", JSON.stringify(animals));
}

const typeImages = {
  cat: "img/cat.jpg",
  dog: "img/dog.jpg",
  parrot: "img/parrot.jpg",
  hamster: "img/hamster.jpg",
  turtle: "img/turtle.jpg",
};

function validateAnimalForm(form) {
  const title = (form.title?.value ?? "").trim();
  const description = (form.description?.value ?? "").trim();
  const expenseRaw = (form.expense?.value ?? "").trim();
  const type = form.type?.value ?? "";

  const missing = [];
  if (!title) missing.push("Title");
  if (!description) missing.push("Description");
  if (!expenseRaw) missing.push("Daily expense ($)");
  if (!type) missing.push("Animal type");

  if (missing.length) {
    alert("Будь ласка, заповніть поля: " + missing.join(", "));
    const first = missing[0];
    if (first === "Title") form.title.focus();
    else if (first === "Description") form.description.focus();
    else if (first === "Daily expense ($)") form.expense.focus();
    else if (first === "Animal type") form.type.focus();
    return false;
  }

  const expense = parseFloat(expenseRaw.replace(",", "."));
  if (!Number.isFinite(expense) || expense < 0) {
    alert('Поле "Daily expense ($)" має бути числом ≥ 0.');
    form.expense.focus();
    return false;
  }

  if (!form.checkValidity()) {
    form.reportValidity();
    return false;
  }

  return true;
}

function renderAnimals(filterText = "", sortExpensive = false) {
  const list = document.querySelector(".animals__list");
  if (!list) return;

  let animals = getAnimals();

  if (filterText) {
    const q = filterText.toLowerCase();
    animals = animals.filter((a) => (a.title || "").toLowerCase().includes(q));
  }

  if (sortExpensive) {
    animals.sort((a, b) => Number(b.expense || 0) - Number(a.expense || 0));
  }

  list.innerHTML = "";

  animals.forEach((animal) => {
    const li = document.createElement("li");
    li.className = "animals__item animal-card";
    li.innerHTML = `
      <img src="${animal.img}" alt="${animal.title}" class="animal-card__img" />
      <div class="animal-card__body">
        <div class="animal-card__content">
          <h2 class="animal-card__title">${animal.title}</h2>
          <p class="animal-card__description">${animal.description}</p>
          <time class="animal-card__last-update">
            Last updated recently
          </time>
          <p class="animal-card__expense" data-expense="${animal.expense}">
            Daily expense: $${Number(animal.expense || 0)}
          </p>
        </div>
        <div class="animal-card__buttons">
          <button class="animal-card__button animal-card__button--edit" data-id="${
            animal.id
          }">Edit</button>
          <button class="animal-card__button animal-card__button--remove" data-id="${
            animal.id
          }">Remove</button>
        </div>
      </div>
    `;
    list.appendChild(li);
  });

  document.querySelectorAll(".animal-card__button--remove").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = e.currentTarget.dataset.id;
      if (!confirm("Remove this animal?")) return;
      const animals = getAnimals().filter((a) => String(a.id) !== String(id));
      saveAnimals(animals);
      const searchInput = document.querySelector(".search-form__input");
      const sortCheckbox = document.getElementById("sortByExpense");
      renderAnimals(
        searchInput ? searchInput.value : "",
        sortCheckbox ? sortCheckbox.checked : false
      );
    });
  });

  document.querySelectorAll(".animal-card__button--edit").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = e.currentTarget.dataset.id;
      localStorage.setItem("editId", id);
      window.location.href = "edit-animal.html";
    });
  });
}

function countExpenses() {
  const animals = getAnimals();
  const total = animals.reduce((sum, a) => sum + Number(a.expense || 0), 0);
  const value = document.querySelector(".controls__total-value");
  if (value) value.textContent = `$${total}`;
}

function handleCreateForm() {
  const form = document.querySelector(".animals-form");
  if (!form || !/create-animal\.html$/i.test(location.pathname)) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!validateAnimalForm(form)) return;

    const safeExpense = parseFloat(form.expense.value.replace(",", "."));

    const newAnimal = {
      title: (form.title.value ?? "").trim(),
      description: (form.description.value ?? "").trim(),
      expense: safeExpense,
      type: form.type.value,
      img: typeImages[form.type.value] || "img/default.png",
    };

    const animals = getAnimals();
    animals.unshift(newAnimal);
    saveAnimals(animals);
    alert("Animal created!");
    window.location.href = "index.html";
  });
}

function handleEditForm() {
  const form = document.querySelector(".animals-form");
  if (!form || !/edit-animal\.html$/i.test(location.pathname)) return;

  const id = localStorage.getItem("editId");
  if (!id) {
    alert("Nothing to edit. Returning to list.");
    window.location.href = "index.html";
    return;
  }

  let animals = getAnimals();
  let animal = animals.find((a) => String(a.id) === String(id));
  if (!animal) {
    alert("Animal not found.");
    window.location.href = "index.html";
    return;
  }

  form.title.value = animal.title ?? "";
  form.description.value = animal.description ?? "";
  form.expense.value = animal.expense ?? "";
  form.type.value = animal.type ?? "";

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!validateAnimalForm(form)) return;

    const safeExpense = parseFloat(form.expense.value.replace(",", "."));

    animals = animals.map((a) =>
      String(a.id) === String(id)
        ? {
            ...a,
            title: (form.title.value ?? "").trim(),
            description: (form.description.value ?? "").trim(),
            expense: safeExpense,
            type: form.type.value,
            img: typeImages[form.type.value] || "img/default.png",
          }
        : a
    );
    saveAnimals(animals);
    localStorage.removeItem("editId");
    alert("Animal updated!");
    window.location.href = "index.html";
  });
}

function handleIndexControls() {
  const searchForm = document.querySelector(".search-form");
  const sortCheckbox = document.getElementById("sortByExpense");
  const countButton = document.querySelector(".controls__button");

  if (searchForm) {
    searchForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const searchInput = searchForm.querySelector(".search-form__input").value;
      renderAnimals(searchInput, sortCheckbox ? sortCheckbox.checked : false);
    });

    searchForm.addEventListener("reset", () => {
      renderAnimals("", sortCheckbox ? sortCheckbox.checked : false);
    });
  }

  if (sortCheckbox) {
    sortCheckbox.addEventListener("change", () => {
      const searchInput =
        searchForm && searchForm.querySelector(".search-form__input")
          ? searchForm.querySelector(".search-form__input").value
          : "";
      renderAnimals(searchInput, sortCheckbox.checked);
    });
  }

  if (countButton) {
    countButton.addEventListener("click", () => countExpenses());
  }

  renderAnimals("", sortCheckbox ? sortCheckbox.checked : false);
}

document.addEventListener("DOMContentLoaded", () => {
  handleIndexControls();
  handleCreateForm();
  handleEditForm();
});
