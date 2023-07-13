const postIncomeInput = {
  name: document.getElementById("post-category-expense"),
  id: 6,
};

const postExpenseInput = {
  name: document.getElementById("post-category-income"),
  id: 6,
};

async function postIncomeExpense() {
  const [postExpense, postIncome] = await Promise.all([
    fetch("http://devapp.levus.suppgcl.ru/category/expense/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: postIncomeInput.name.value,
        created_by: 6,
      }),
    }),
    fetch("http://devapp.levus.suppgcl.ru/category/income/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: postExpenseInput.name.value,
        created_by: 6,
      }),
    }),
  ]);
  const expenseJson = await postExpense.json();
  const incomeJson = await postIncome.json();
  return [expenseJson, incomeJson];
}

const expenseButton = document.getElementById("post-expense");

const incomeButton = document.getElementById("post-income");

expenseButton.addEventListener("click", postIncomeExpense());

incomeButton.addEventListener("click", postIncomeExpense());
