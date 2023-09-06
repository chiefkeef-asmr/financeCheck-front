function getCookieValue(name) {
  const cookies = document.cookie.split(";");
  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split("=");
    if (cookieName === name) {
      return cookieValue;
    } else {
      alert("Досвидания Код: " + response.status);
      window.location.href = "index.html";
    }
  }
  return null;
}

function toTimestamp(strDate) {
  const datum = Date.parse(strDate);
  return datum / 1000;
}

function generateExpUrl(from, to) {
  const Url = `http://devapp.levus.suppgcl.ru/expense?from_date=${from}&to_date=${to}`;
  return Url;
}

function generateIncUrl(from, to) {
  const Url = `http://devapp.levus.suppgcl.ru/income?from_date=${from}&to_date=${to}`;
  return Url;
}

const expenseDateValueStart = document.getElementById("startDateExpense");
const expenseDateValueEnd = document.getElementById("endDateExpense");

const incomeDateValueStart = document.getElementById("startDateIncome");
const incomeDateValueEnd = document.getElementById("endDateIncome");

const expenseConfirm = document.getElementById("expensePeriodBtn");
const incomeConfirm = document.getElementById("incomePeriodBtn");

let expenseFrom;
let expenseTo;

let incomeFrom;
let incomeTo;

let expenseCategory;

let incomeCategory;

let expenseNameData;

let incomeNameData;

let clickCountExp = 0;

let clickCountInc = 0;

//Функция обновления дока

document.addEventListener("DOMContentLoaded", function () {
  expenseDateValueStart.addEventListener("change", function () {
    const expenseStartStamp = toTimestamp(expenseDateValueStart.value);
    expenseFrom = expenseStartStamp;
  });
  expenseDateValueEnd.addEventListener("change", function () {
    const expenseEndStamp = toTimestamp(expenseDateValueEnd.value);
    expenseTo = expenseEndStamp;
  });

  incomeDateValueStart.addEventListener("change", function () {
    const incomeStartStamp = toTimestamp(incomeDateValueStart.value);
    incomeFrom = incomeStartStamp;
  });

  incomeDateValueEnd.addEventListener("change", function () {
    const incomeEndStamp = toTimestamp(incomeDateValueEnd.value);
    incomeTo = incomeEndStamp;
  });

  //Фетчим Расходы
  function fetchExpense() {
    if (!expenseFrom && !expenseTo) {
      alert("Выберите период!");
      return;
    }

    fetch(generateExpUrl(expenseFrom, expenseTo), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getCookieValue("access_token"),
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Ошибка: " + response.statusText);
        }
        return response.json();
      })
      .then((response) => {
        const expenseCategoryName = document.getElementById("expenseName");
        const expenseCategorySum = document.getElementById("expenseSum");
        expenseCategoryName.innerHTML = "";
        expenseCategorySum.innerHTML = "";
        if (
          expenseCategorySum &&
          expenseCategoryName &&
          response &&
          response.length > 0
        ) {
          console.log(response);
          response.forEach((expenseName) => {
            const expCatName = document.createElement("h4");
            const expCatSum = document.createElement("h4");
            expCatName.textContent = expenseName.category_name;
            expenseCategoryName.appendChild(expCatName);
            expCatSum.textContent = expenseName.total_amount;
            expenseCategorySum.appendChild(expCatSum);
          });
          alert(`Вы загрузили период с ${expenseDateValueStart.value}`);
        } else {
          alert("Нет данных о расходах");
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  // нейронка дополнила
  //фетчим доходы
  function fetchIncome() {
    if (!incomeFrom && !incomeTo) {
      alert("Выберите период!");
    } else {
      fetch(generateIncUrl(incomeFrom, incomeTo), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + getCookieValue("access_token"),
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Ошибка: " + response.statusText);
          }
          return response.json();
        })

        .then((response) => {
          const incomeCategoryName = document.getElementById("incomeName");
          const incomeCategorySum = document.getElementById("incomeSum");
          incomeCategoryName.innerHTML = "";
          incomeCategorySum.innerHTML = "";
          if (incomeCategoryName && response && response.length > 0) {
            console.log(response);
            response.forEach((incomeName) => {
              const incCatName = document.createElement("h4");
              const incCatSum = document.createElement("h4");
              incCatName.textContent = incomeName.category_name;
              incomeCategoryName.appendChild(incCatName);
              incCatSum.textContent = incomeName.total_amount;
              incomeCategorySum.appendChild(incCatSum);
            });
            alert(`Вы загрузили период с ${incomeDateValueStart.value}`);
          } else {
            alert("Нет данных о расходах");
          }
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  }

  //слушаем кнопку при клике делаем функцию феча
  expenseConfirm.addEventListener("click", fetchExpense);

  incomeConfirm.addEventListener("click", fetchIncome);

  //Все происходит если документ прогружен
});
