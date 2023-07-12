const profile = "http://devapp.levus.suppgcl.ru/users/6";
const login = document.getElementById("profile-login");
const mail = document.getElementById("profile-mail");
const dateReg = document.getElementById("profile-date");

fetch(profile).then(function (response) {
  if (response.ok) {
    response.json().then(function (json) {
      login.value = json.username;
      mail.value = json.email;
      dateReg.value = json.created_at;
    });
  } else {
    alert("Ошибка: " + response.status);
  }
});
