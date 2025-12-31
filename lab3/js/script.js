let originalOrder = [];

function renderAnimals(filterText = "", sortExpensive = false) {
  const list = document.querySelector(".animals__list");
  if (!list) return;

  if (originalOrder.length === 0) {
    originalOrder = Array.from(list.querySelectorAll(".animal-card"));
  }

  let animals = Array.from(list.querySelectorAll(".animal-card"));

  animals.forEach((card) => {
    const title = card
      .querySelector(".animal-card__title")
      .textContent.toLowerCase();
    card.style.display = title.includes(filterText.toLowerCase()) ? "" : "none";
  });

  if (sortExpensive) {
    let visibleAnimals = animals.filter(
      (card) => card.style.display !== "none"
    );

    visibleAnimals.sort((a, b) => {
      const expenseA = Number(
        a.querySelector(".animal-card__expense").dataset.expense
      );
      const expenseB = Number(
        b.querySelector(".animal-card__expense").dataset.expense
      );
      return expenseB - expenseA;
    });

    visibleAnimals.forEach((card) => list.appendChild(card));
  } else {
    originalOrder.forEach((card) => list.appendChild(card));
  }
}

function countExpenses() {
  const expenses = document.querySelectorAll(".animal-card__expense");
  let total = 0;

  expenses.forEach((el) => {
    if (el.closest(".animal-card").style.display !== "none") {
      total += Number(el.dataset.expense);
    }
  });

  const value = document.querySelector(".controls__total-value");
  if (value) value.textContent = `$${total}`;
}

function handleIndexControls() {
  const searchForm = document.querySelector(".search-form");
  const sortCheckbox = document.getElementById("sortByExpense");
  const countButton = document.querySelector(".controls__button");

  if (searchForm) {
    searchForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const searchInput = searchForm.querySelector(".search-form__input").value;
      renderAnimals(searchInput, sortCheckbox.checked);
    });

    searchForm.addEventListener("reset", () => {
      renderAnimals("", sortCheckbox.checked);
    });
  }

  if (sortCheckbox) {
    sortCheckbox.addEventListener("change", () => {
      const searchInput = searchForm.querySelector(".search-form__input").value;
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
});
