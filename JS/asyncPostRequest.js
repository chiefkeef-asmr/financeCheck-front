const postIncomeInput = {
  name: document.getElementById("post-category-income"),
  id: 6,
};

const postExpenseInput = {
  name: document.getElementById("post-category-expense"),
  id: 6,
};

function postExpense() {
  if (postExpenseInput.name.value !== "") {
    fetch("http://devapp.levus.suppgcl.ru/category/expense/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: postExpenseInput.name.value,
        created_by: 6,
      }),
    }).then((response) => {
      responseExpense = response.json();
    });
    if (responseExpense.status === 200) {
      alert("Категория добавлена!");
    } else {
      alert("Ошибка: " + response.statusText);
    }
  }
}

function postIncom() {
  if (postIncomeInput.name.value !== "") {
    fetch("http://devapp.levus.suppgcl.ru/category/income/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: postIncomeInput.name.value,
        created_by: 6,
      }),
    }).then((response) => {
      responseIncome = response.json();
    });
    if (responseIncome.status === 200) {
      alert("Категория добавлена!");
    } else {
      alert("Ошибка" + response.statusText);
    }
  }
}

const expenseButton = document.getElementById("post-expense");
const incomeButton = document.getElementById("post-income");

expenseButton.addEventListener("click", postExpense);

incomeButton.addEventListener("click", postIncom);
