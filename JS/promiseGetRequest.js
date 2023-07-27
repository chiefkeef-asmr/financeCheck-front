const incomeSelect = document.getElementById("category-selector-income");

const expenseSelect = document.getElementById("category-selector");

const expenseTable = document.getElementById("expenseTableSelect");

const incomeTable = document.getElementById("incomeTableSelect");

function getCookieValueCategory(name) {
  const cookies = document.cookie.split(";");
  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split("=");
    if (cookieName === name) {
      return cookieValue;
    }
  }
  return null;
}

const getCategoryExpenses = fetch(
  "http://devapp.levus.suppgcl.ru/category/expense/all",
  {
    method: "GET",
    headers: {
      Authorization: "Bearer " + getCookieValueCategory("access_token"),
    },
  }
).then((response) => {
  if (!response.ok) {
    throw new Error("Ошибка" + response.status);
  }
  return response.json();
});

const getCategoryIncomes = fetch(
  "http://devapp.levus.suppgcl.ru/category/income/all",
  {
    method: "GET",
    headers: {
      Authorization: "Bearer " + getCookieValueCategory("access_token"),
    },
  }
).then((response) => {
  if (!response.ok) {
    throw new Error("Ошибка" + response.status);
  }
  return response.json();
});

Promise.all([getCategoryExpenses, getCategoryIncomes])
  .then(([expensesData, incomesData]) => {
    const incomeResp = incomesData;
    const expenseResp = expensesData;

    incomeResp.forEach((item) => {
      const incomeOption = document.createElement("option");

      incomeOption.value = item.id;

      incomeOption.text = item.name;

      incomeSelect.appendChild(incomeOption);
    });

    // Здесь вы можете обращаться к данным, полученным из обоих запросов.

    expenseResp.forEach((item) => {
      const expenseOption = document.createElement("option");

      expenseOption.value = item.id;

      expenseOption.text = item.name;

      expenseSelect.appendChild(expenseOption);
    });
    expenseResp.forEach((item) => {
      const expenseOptionTable = document.createElement("option");

      expenseOptionTable.value = item.id;

      expenseOptionTable.text = item.name;

      expenseTable.appendChild(expenseOptionTable);
    });

    incomeResp.forEach((item) => {
      const incomeOptionTable = document.createElement("option");

      incomeOptionTable.value = item.id;

      incomeOptionTable.text = item.name;

      incomeTable.appendChild(incomeOptionTable);
    });
  })
  .catch((error) => {
    // Обработка ошибок, если что-то пошло не так при выполнении запросов.
    console.error("Ошибка при выполнении запросов:", error);
  });

const deleteIncome = document.getElementById("del-income");

const deleteExpense = document.getElementById("del-expense");

deleteIncome.addEventListener("click", () => {
  const selectedOptionIdIncome = incomeSelect.value;
  fetch(
    `http://devapp.levus.suppgcl.ru/category/income/delete/${selectedOptionIdIncome}`,
    {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + getCookieValueCategory("access_token"),
      },
    }
  ).then((resp) => {
    if (resp.status === 204) {
      alert("Категория удалена");
      window.location.reload();
    }
  });
});

deleteExpense.addEventListener("click", () => {
  const selectedOptionIdExpense = expenseSelect.value;
  fetch(
    `http://devapp.levus.suppgcl.ru/category/expense/delete/${selectedOptionIdExpense}`,
    {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + getCookieValueCategory("access_token"),
      },
    }
  ).then((resp) => {
    if (resp.status === 204) {
      alert("Категория удалена");
      window.location.reload();
    }
  });
});
