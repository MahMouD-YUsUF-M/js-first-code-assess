const STORGE_KEY = "expense-tracker:user-expenses";

export const saveExpenses = (expenses) => {
    try{
    localStorage.setItem(STORGE_KEY, JSON.stringify(expenses));
    } catch (error) {
        console.warn("Failed to save expenses to localStorage:", error);
    }
}

export const loadExpenses = () => {
    const expenses = localStorage.getItem(STORGE_KEY);
    if(!expenses) return [];
    try{
        const parsedExpenses = JSON.parse(expenses);
        return Array.isArray(parsedExpenses) ? parsedExpenses : [];
    }
    catch (error) {
        console.warn("Failed to load expenses from localStorage:", error);
        return [];
    }

}