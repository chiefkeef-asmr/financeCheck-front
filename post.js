document.querySelector("myForm").addEventListener("submit", function (event) {
  const formData = new FormData(event.target);

  const jsonData = {};
  for (const [key, value] of formData.entries()) {
    jsonData[key] = value;
  }

  fetch("http://devapp.levus.suppgcl.ru/users/", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(jsonData),
  })
    .then(function (response) {
      if (response.ok) {
        alert("Все ок");
      } else {
        console.error("ХУЕВО ВСЕ");
      }
    })
    .catch(function (error) {
      console.error("Ошибка при выполнении запрсоа");
    });
});
