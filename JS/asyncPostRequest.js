const postIncomeInput = document.getElementById("post-category-income");

const postExpenseInput = document.getElementById("post-category-expense");

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

function postExpense() {
  if (postExpenseInput.value !== "") {
    fetch("http://devapp.levus.suppgcl.ru/category/expense", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getCookieValueReq("access_token"),
      },
      body: JSON.stringify({
        name: postExpenseInput.value,
      }),
    }).then((response) => {
      if (response.status === 200 || response.status === 201) {
        alert("Категория добавлена!");
      } else {
        alert("Ошибка: " + response.statusText);
      }
    });
  }
}

function postIncom() {
  if (postIncomeInput.value !== "") {
    fetch("http://devapp.levus.suppgcl.ru/category/income", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getCookieValueReq("access_token"),
      },
      body: JSON.stringify({
        name: postIncomeInput.value,
      }),
    }).then((response) => {
      if (response.status === 200 || response.status === 201) {
        alert("Категория добавлена!");
      } else {
        alert("Ошибка: " + response.statusText);
      }
    });
  }
}

const expenseButton = document.getElementById("post-expense");
const incomeButton = document.getElementById("post-income");

expenseButton.addEventListener("click", postExpense);

incomeButton.addEventListener("click", postIncom);
