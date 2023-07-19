async function fetchIncomeAndExpense() {
  const [expenseResponse, incomeResponse] = await Promise.all([
    fetch("http://devapp.levus.suppgcl.ru/category/expense"),
    fetch("http://devapp.levus.suppgcl.ru/category/income"),
  ]);
  const expense = await expenseResponse.json();
  const income = await incomeResponse.json();
  return [expense, income];
}

fetchIncomeAndExpense().then(([expense, income]) => {
  const incomeSelect = document.getElementById("category-selector-income");
  const expenseSelect = document.getElementById("category-selector");

  const incomeJson = expense;
  const expenseJson = income;
  incomeSelect.innerHTML = "";
  expenseSelect.innerHTML = "";

  const optionElementIncome = document.createElement("option");
  optionElementIncome.value = incomeJson.name;
  optionElementIncome.textContent = incomeJson.name;
  incomeSelect.appendChild(optionElementIncome);

  const optionElementExpense = document.createElement("option");
  optionElementExpense.value = expenseJson.name;
  optionElementExpense.textContent = expenseJson.name;
  expenseSelect.appendChild(optionElementExpense);
});
