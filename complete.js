
const button = document.getElementById("complete");
const number = parseInt(location.pathname.match(/guide(\d+)\.html/)[1], 10);
const index = number - 1; 

function load() {
  try {
    return JSON.parse(localStorage.getItem("done") || "[]");
  } catch (e) {
    return [];
  }
}

function show(done) {
  button.classList.toggle("done", done);
  button.setAttribute("aria-pressed", done);
  button.textContent = done ? "✓ Completed" : "Completed";
}

show(load().includes(index));

button.addEventListener("click", () => {
  let list = load();
  const done = !list.includes(index);
  list = done ? [...list, index] : list.filter((i) => i !== index);
  localStorage.setItem("done", JSON.stringify(list));
  show(done);
});
