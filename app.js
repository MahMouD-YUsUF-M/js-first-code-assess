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

