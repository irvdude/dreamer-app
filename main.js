const form = document.querySelector("form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  showSpinner();
  const data = new FormData(form);
  const res = await fetch("http://localhost:8080/dream", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt: data.get("prompt"),
    }),
  });

  const { image } = await res.json();
  hideSpinner();

  if (res.ok) {
    const result = document.querySelector("#result");
    result.innerHTML = `<img src="${image}" width="512" />`;
  } else {
    const err = await res.error[1].message;
    alert(err);
    console.error(err);
  }

  function showSpinner() {
    const button = document.querySelector("button");
    button.disabled = true;
    button.innerHTML = `Dreaming... <span class='spinner'>🧠</span>`;
  }

  function hideSpinner() {
    const button = document.querySelector("button");
    button.disabled = false;
    button.innerHTML = `Dream`;
  }
});
