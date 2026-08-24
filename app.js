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
        
    }

}
