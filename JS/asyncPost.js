const postIncomeInput = {
  name: document.getElementById("post-category-expense"),
  id: 6,
};

const postExpenseInput = {
  name: document.getElementById("post-category-income"),
  id: 6,
};

async function postIncomeExpense() {
  if (postIncomeInput.name.value && postExpenseInput.name.value) {
    // Оба поля заполнены, отправляем только первое поле
    const postIncome = await fetch(
      "http://devapp.levus.suppgcl.ru/category/expense/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: postIncomeInput.name.value,
          created_by: 6,
        }),
      }
    );
    const incomeJson = await postIncome.json();
    return [null, incomeJson];
  } else if (postIncomeInput.name.value) {
    // Только первое поле заполнено, отправляем его
    const postIncome = await fetch(
      "http://devapp.levus.suppgcl.ru/category/expense/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: postIncomeInput.name.value,
          created_by: 6,
        }),
      }
    );
    const incomeJson = await postIncome.json();
    return [null, incomeJson];
  } else if (postExpenseInput.name.value) {
    // Только второе поле заполнено, отправляем его
    const postExpense = await fetch(
      "http://devapp.levus.suppgcl.ru/category/income/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: postExpenseInput.name.value,
          created_by: 6,
        }),
      }
    );
    const expenseJson = await postExpense.json();
    return [expenseJson, null];
  } else {
    alert("Заполните хотя бы одно поле перед отправкой.");
  }
}

const expenseButton = document.getElementById("post-expense");

const incomeButton = document.getElementById("post-income");

expenseButton.addEventListener("click", postIncomeExpense);

incomeButton.addEventListener("click", postIncomeExpense);
