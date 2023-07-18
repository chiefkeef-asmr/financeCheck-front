const form = {
  email: document.getElementById("ma"),
  password: document.getElementById("pass"),
  submit: document.getElementById("submitButton"),
  username: document.getElementById("log"),
};
let button = form.submit.addEventListener("click", (e) => {
  e.preventDefault();
  const login = "http://devapp.levus.suppgcl.ru/users/";

  fetch(login, {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: form.email.value,
      hashed_password: form.password.value,
      username: form.username.value,
    }),
  }).then((response) => {
    if (response.status === 200) {
      alert("Пользователь успешно создан");
    }
    if (response === 400) {
      alert("Ошибка: " + response.statusText);
    }
  });
});
