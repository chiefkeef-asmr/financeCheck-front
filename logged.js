function toLogginPage() {
  const adminLogin = document.getElementById("login").value;
  if (adminLogin == null || !adminLogin)
    return (window.location.href = "./index.html") && alert("ТЫ ЧЕ АХУЕЛ?");
}
