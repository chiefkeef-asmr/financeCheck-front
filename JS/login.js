const url = "http://devapp.levus.suppgcl.ru/login/";

function loginForm() {
  const userLogin = document.getElementById("login").value;
  const userPassword = document.getElementById("password").value;

  const string = `username=${userLogin}&password=${userPassword}`;
  fetch(url, {
    method: "POST",
    body: string,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  }).then((response) => {
    if (response.status === 200) {
      alert(`Здравсвуйте ${userLogin}`);
      document.cookie = response;
      // window.location.href = "./profile.html";
    }

    if (response.status === 400) {
      alert("Вы ввели неверный логин или пароль");
    }
    if (response.status === 422) {
      alert("Неприемлемый тип данных");
    }
  });
  return response;
}
