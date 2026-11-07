// Progress bar + saved checkboxes + search

const boxes = document.querySelectorAll(".card input");
const cards = document.querySelectorAll(".card");

// load which guides were ticked before
const saved = JSON.parse(localStorage.getItem("done") || "[]");
boxes.forEach((box, i) => {
  box.checked = saved.includes(i);
  box.addEventListener("change", update);
});

// update the bar, the counter and the box colors, then save
function update() {
  const ticked = [];
  boxes.forEach((box, i) => {
    cards[i].classList.toggle("done", box.checked);
    if (box.checked) ticked.push(i);
  });

  document.getElementById("count").textContent = ticked.length + " / " + boxes.length + " completed";
  document.getElementById("bar-fill").style.width = (ticked.length / boxes.length) * 100 + "%";
  localStorage.setItem("done", JSON.stringify(ticked));
}
update();

// the search - hide cards that don't match what was typed
document.getElementById("search").addEventListener("input", (e) => {
  const word = e.target.value.toLowerCase();
  cards.forEach((card) => {
    const text = card.querySelector("h3").textContent + " " + card.querySelector("p").textContent;
    card.hidden = !text.toLowerCase().includes(word.trim());
  });
});

// reset button: untick everything (after asking first)
document.getElementById("reset").addEventListener("click", () => {
  if (!confirm("Reset all progress?")) return;
  boxes.forEach((box) => (box.checked = false));
  update();
});
