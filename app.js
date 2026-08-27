import { fetchCategories,fetchInitialExpenses } from "./data";
import { saveExpenses, loadExpenses } from "./storage";

let categories = [];
let seedExpenses = [];
let userExpenses = [];
let activeCatogery = 'All';

const loadingEl = document.getElementById('loading');
const errorEl = document.getElementById('error');
const appEl = document.getElementById('app');
const retryBtn = document.getElementById('retry-btn');
 
const formEl = document.getElementById('expense-form');
const descInput = document.getElementById('description-input');
const descError = document.getElementById('description-error');
const amountInput = document.getElementById('amount-input');
const amountError = document.getElementById('amount-error');
const categorySelect = document.getElementById('category-input');
 
const filtersEl = document.getElementById('category-filters');
const summaryEl = document.getElementById('summary');
const listEl = document.getElementById('expense-list');

async function start() {
    loadingEl.hidden = false;
    errorEl.hidden = true;
    appEl.hidden = true;

    try {
        const[loadedCategories, loadedExpenses] = await Promise.all([
            fetchCategories(),
            fetchInitialExpenses()
        ]);
        categories = loadedCategories;
        seedExpenses = loadedExpenses;
        userExpenses = loadExpenses();

        buildCategoryOptions();
        buildCategoryFilters();
        render();
        
    }
    catch (error) {
        console.error("Error loading data:", error);
        errorEl.hidden = false;
        loadingEl.hidden = true;
    }
}

    function buildCategoryOptions() {
        for (const category of categories) {
            const optionEl = document.createElement('option');
            opttionEl.value = category;
            optionEl.textContent = category;
            categorySelect.appendChild(optionEl);
        }
    }

    function buildCategoryFilters() {
        for (const category of categories) {
            const buttonEl = document.createElement('button');
            buttonEl.type = 'button';
            buttonEl.textContent = category;
            buttonEl.dataset.category = category;
            filtersEl.appendChild(buttonEl);
    }

    function render() {
  const all = [...userExpenses, ...seedExpenses];
  const visible = activeCategory === 'All'
    ? all
    : all.filter(expense => expense.category === activeCategory);
 
  listEl.textContent = '';
  for (const expense of visible) {
    const li = document.createElement('li');
 
    const text = document.createElement('span');
    text.textContent =
      `${expense.description} — ${money.format(expense.amount)} (${expense.category}, ${expense.date})`;
 
    const deleteBtn = document.createElement('button');
    deleteBtn.type = 'button';
    deleteBtn.textContent = 'Delete';
    deleteBtn.dataset.deleteId = expense.id;
 
    li.appendChild(text);
    li.appendChild(deleteBtn);
    listEl.appendChild(li);
  }
 
  const total = visible.reduce((sum, expense) => sum + expense.amount, 0);
  summaryEl.textContent = `Total: ${money.format(total)} across ${visible.length} expense(s)`;
 
  for (const btn of filtersEl.querySelectorAll('button')) {
    btn.style.fontWeight = btn.dataset.category === activeCategory ? 'bold' : 'normal';
  }
}
 
filtersEl.addEventListener('click', (event) => {
  const btn = event.target.closest('button[data-category]');
  if (!btn) return;
  activeCategory = btn.dataset.category;
  render();
});
 
listEl.addEventListener('click', (event) => {
  const btn = event.target.closest('button[data-delete-id]');
  if (!btn) return;
  const id = btn.dataset.deleteId;
  userExpenses = userExpenses.filter(expense => expense.id !== id);
  seedExpenses = seedExpenses.filter(expense => expense.id !== id);
  saveExpenses(userExpenses);
  render();
});
 
formEl.addEventListener('submit', (event) => {
  event.preventDefault();
 
  const description = descInput.value.trim();
  const amount = Number(amountInput.value);
  let valid = true;
 
  descError.textContent = '';
  amountError.textContent = '';
 
  if (description === '') {
    descError.textContent = 'Description must not be blank.';
    valid = false;
  }
  if (!(amount > 0)) {
    amountError.textContent = 'Amount must be a positive number.';
    valid = false;
  }
  if (!valid) return;
 
  userExpenses.push({
    id: 'u-' + Date.now(),
    description,
    amount,
    category: categorySelect.value,
    date: new Date().toISOString().slice(0, 10),
  });
 
  saveExpenses(userExpenses);
  formEl.reset();
  render();
});
 
retryBtn.addEventListener('click', start);
 
start();


}
