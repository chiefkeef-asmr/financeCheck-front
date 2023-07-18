const profile = "http://devapp.levus.suppgcl.ru/users/me";
const login = document.getElementById("profile-login");
const mail = document.getElementById("profile-mail");
const dateReg = document.getElementById("profile-date");

function getCookieValue(name) {
  const cookies = document.cookie.split(";");
  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split("=");
    if (cookieName === name) {
      return cookieValue;
    }
  }
  return null;
}

const cookieValue = getCookieValue("access_token");

fetch(profile, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + getCookieValue("access_token"),
  },

  credentials: "include",
}).then(function (response) {
  if (response.ok) {
    response.json().then(function (json) {
      login.value = json.username;
      mail.value = json.email;
      dateReg.value = json.created_at;
    });
  } else {
    alert("Ошибка: " + response.status);
    window.location.href = "index.html";
  }
});
