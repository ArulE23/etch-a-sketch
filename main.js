const sketchGrid = document.querySelector("#sketch-grid");

function initGrid(size) {
  for (let i = 0; i < size; i++) {
    const row = document.createElement("div");
    row.style.display = "flex";
    row.style.flex = "1";
    sketchGrid.appendChild(row);
    console.log(i);
  }
  for (child of document.querySelectorAll("#sketch-grid > div")) {
    for (let i = 0; i < size; i++) {
      const cell = document.createElement("div");
      cell.style.flex = "1";
      cell.style.border = "1px solid grey";
      child.appendChild(cell);
    }
  }
}

initGrid(16);