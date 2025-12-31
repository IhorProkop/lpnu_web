const API = {
  async list({ search = '', sortExpensive = false } = {}) {
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (sortExpensive) params.set('sort', 'expensive');
    const res = await fetch(`/api/animals?${params.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch animals');
    return res.json(); // array
  },
  async get(id) {
    const res = await fetch(`/api/animals/${id}`);
    if (!res.ok) throw new Error('Not found');
    return res.json();
  },
  async create(data) {
    const res = await fetch('/api/animals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) {
      const msg = await res.text();
      throw new Error(msg || 'Create failed');
    }
    return res.json();
  },
  async update(id, data) {
    const res = await fetch(`/api/animals/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Update failed');
    return res.json();
  },
  async remove(id) {
    const res = await fetch(`/api/animals/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Delete failed');
  }
};

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

async function renderAnimals(filterText = "", sortExpensive = false) {
  const list = document.querySelector(".animals__list");
  if (!list) return;

  const animals = await API.list({ search: filterText, sortExpensive });

  list.innerHTML = "";
  animals.forEach((animal) => {
    const li = document.createElement("li");
    li.className = "animals__item animal-card";
    li.innerHTML = `
      <img src="${animal.img || typeImages[animal.type] || 'img/default.png'}" alt="${animal.title}" class="animal-card__img" />
      <div class="animal-card__body">
        <div class="animal-card__content">
          <h2 class="animal-card__title">${animal.title}</h2>
          <p class="animal-card__description">${animal.description}</p>
          <time class="animal-card__last-update">
            Last updated: ${animal.updatedAt ? new Date(animal.updatedAt).toLocaleString() : '—'}
          </time>
          <p class="animal-card__expense" data-expense="${animal.expense}">
            Daily expense: $${Number(animal.expense || 0)}
          </p>
        </div>
        <div class="animal-card__buttons">
          <button class="animal-card__button animal-card__button--edit" data-id="${animal.id}">Edit</button>
          <button class="animal-card__button animal-card__button--remove" data-id="${animal.id}">Remove</button>
        </div>
      </div>
    `;
    list.appendChild(li);
  });

  document.querySelectorAll(".animal-card__button--remove").forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      const id = e.currentTarget.dataset.id;
      if (!confirm("Remove this animal?")) return;
      await API.remove(id);
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

async function countExpenses() {
  const animals = await API.list();
  const total = animals.reduce((sum, a) => sum + Number(a.expense || 0), 0);
  const value = document.querySelector(".controls__total-value");
  if (value) value.textContent = `$${total}`;
}

function handleCreateForm() {
  const form = document.querySelector(".animals-form");
  if (!form || !/create-animal\.html$/i.test(location.pathname)) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!validateAnimalForm(form)) return;

    const safeExpense = parseFloat(form.expense.value.replace(",", "."));
    const payload = {
      title: (form.title.value ?? "").trim(),
      description: (form.description.value ?? "").trim(),
      expense: safeExpense,
      type: form.type.value
    };

    await API.create(payload);
    alert("Animal created!");
    window.location.href = "index.html";
  });
}

async function handleEditForm() {
  const form = document.querySelector(".animals-form");
  if (!form || !/edit-animal\.html$/i.test(location.pathname)) return;

  const id = localStorage.getItem("editId");
  if (!id) {
    alert("Nothing to edit. Returning to list.");
    window.location.href = "index.html";
    return;
  }

  try {
    const animal = await API.get(id);
    form.title.value = animal.title ?? "";
    form.description.value = animal.description ?? "";
    form.expense.value = animal.expense ?? "";
    form.type.value = animal.type ?? "";
  } catch {
    alert("Animal not found.");
    window.location.href = "index.html";
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!validateAnimalForm(form)) return;

    const safeExpense = parseFloat(form.expense.value.replace(",", "."));
    await API.update(id, {
      title: (form.title.value ?? "").trim(),
      description: (form.description.value ?? "").trim(),
      expense: safeExpense,
      type: form.type.value
    });
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
