function register() {
  let signUpLogin = document.getElementById("login-reg").value;
  let signUpPassword = document.getElementById("password-reg").value;
  if (!signUpLogin || !signUpPassword) return alert("Вы не ввели ничего");
  else alert("Вы зарегались"), succRegBlock();
}

function validate() {
  let signInLogin = document.getElementById("login").value;

  let signInPassword = document.getElementById("password").value;

  let signUpLogin = document.getElementById("login-reg").value;

  let signUpPassword = document.getElementById("password-reg").value;

  if (!signInLogin || !signInPassword) return alert("Вы не ввели ничего");
  if (signInLogin == signUpLogin && signInPassword == signUpPassword)
    return (
      (window.location.href = "profile.html") &&
      alert("Добро пожаловать " + signInLogin)
    );
  else signInLogin !== signUpLogin || signInPassword !== signUpPassword;
  return alert("Неверный логин или пароль");
}

function showBlock() {
  const myBlock = document.getElementById("visible");
  myBlock.style.display = "block";
}

//const showPasswordButton = document.getElementById("showPassBtn");

//const maskedPassword = document.getElementById("password-reg");

//showPasswordButton.addEventListener("click", function () {
// if (maskedPassword.type === "password") {
// maskedPassword.type = "text";
// } else maskedPassword.type === "text";
//maskedPassword.type = "password";
//});
