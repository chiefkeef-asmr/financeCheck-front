const form = document.getElementById("myForm");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const formData = new FormData(form);

  const formDataStr = JSON.stringify(formData);

  fetch("http://devapp.levus.suppgcl.ru/users/", {
    method: "POST",
    body: formDataStr,
  })
    .then(function (response) {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Ошибка какая то: " + response.status);
    })
    .then(function (data) {})
    .catch(function (error) {});

  succRegBlock();
});

function succRegBlock() {
  const myBlock = document.getElementById("visible");
  myBlock.style.display = "none";
}
