function toTimestamp(strDate) {
  const datum = Date.parse(strDate);
  return datum / 1000;
}

function getCookieValueReq(name) {
  const cookies = document.cookie.split(";");
  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split("=");
    if (cookieName === name) {
      return cookieValue;
    }
  }
  return null;
}

const expenseTableOption = document.getElementById("expenseTableSelect");

const incomeTableOption = document.getElementById("incomeTableSelect");

const expenseTableButton = document.querySelector("sendExpense");

const incomeTableButton = document.querySelector("sendIncome");

const incomeAmountField = document.getElementById("incomeAmount");

const expenseAmountField = document.getElementById("expenseAmount");

const expenseDateField = document.getElementById("expenseDate");

const incomeDateField = document.getElementById("incomeDate");

const expenseDesc = document.getElementById("expenseDesc");

const incomeDesc = document.getElementById("incomeDesc");

let incomeAmountValue;

let expenseAmountValue;

let expenseTimestamp;

let incomeTimestamp;

let expenseCatId;

let incomeCatId;

let expenseText;

let incomeText;

function fetchExpense() {
  if (!expenseTimestamp && !expenseAmountValue && !expenseCatId) {
    confirm("Вы не заполнили одно из обязательных полей!");
  } else {
    fetch("http://devapp.levus.suppgcl.ru/expense", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getCookieValueReq("access_token"),
      },
      body: JSON.stringify({
        date: expenseTimestamp,
        amount: expenseAmountValue,
        description: expenseText,
        category_id: expenseCatId,
      }),
    }).then((response) => {
      if (response.ok) {
        alert("Данные добавлены!");
      } else {
        alert(response.statusText);
      }
    });
  }
}

function fetchIncome() {
  if (!incomeTimestamp && !incomeAmountValue && !incomeCatId) {
    confirm("Вы не заполнили одно из обязательных полей!");
  } else {
    fetch("http://devapp.levus.suppgcl.ru/income", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getCookieValueReq("access_token"),
      },
      body: JSON.stringify({
        date: incomeTimestamp,
        amount: incomeAmountValue,
        description: incomeText,
        category_id: incomeCatId,
      }),
    }).then((response) => {
      if (response.ok) {
        alert("Данные добавлены!");
      } else {
        alert(response.statusText);
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // Ваш код, который должен выполняться после полной загрузки DOM

  expenseDateField.addEventListener("change", function (event) {
    event.preventDefault;
    const expenseDate = toTimestamp(expenseDateField.value);
    expenseTimestamp = expenseDate;
  }); //берем из экспенса и конвертим в таймстем и отдаем в глобал

  incomeDateField.addEventListener("change", function (event) {
    event.preventDefault;
    const incomeDate = toTimestamp(incomeDateField.value);
    incomeTimestamp = incomeDate;
  }); //берем из инкама и конвертим в таймстем и отдаем в глобал

  expenseAmountField.addEventListener("change", function (event) {
    event.preventDefault;
    expenseAmountValue = expenseAmountField.value;
  }); //берем стоимость из экспенса и пакуем в глобал

  incomeAmountField.addEventListener("change", function (event) {
    event.preventDefault;
    incomeAmountValue = incomeAmountField.value;
  }); //берем стоимость из инкама и пакуем в глобал

  expenseTableOption.addEventListener("click", function (event) {
    event.preventDefault;
    expenseCatId = expenseTableOption.value;
  });
  incomeTableOption.addEventListener("click", function (event) {
    event.preventDefault;
    incomeCatId = incomeTableOption.value;
  });
  expenseDesc.addEventListener("input", function (event) {
    textAreaExp = event.target.value;
    expenseText = textAreaExp;
  });

  incomeDesc.addEventListener("input", function (event) {
    textAreaInc = event.target.value;
    incomeText = textAreaInc;
  });
});
