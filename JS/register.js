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
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      // code here //
      if (data.error) {
        alert("Error Password or Username"); /*displays error message*/
      }
      if (response.status === 200) {
        alert("Вы успешно зарегистрировались");
        /*opens the target page while Id & password matches*/
      }
      if (response.status === 422) {
        alert("Переданы не верные данные");
      }
      if (response.status === 400) {
        alert("Пользователь с таким логином или почтой уже существует");
      }
    })
    .catch((err) => {
      console.log(err);
    });
});
