const sketchGrid = document.querySelector("#sketch-grid");

const colourCellBlack = (event) => {
  event.target.style.backgroundColor = "black";
}

function initGrid(size) {
  sketchGrid.replaceChildren();
  for (let i = 0; i < size; i++) {
    const row = document.createElement("div");
    row.style.display = "flex";
    row.style.flex = "1";
    sketchGrid.appendChild(row);
  }
  for (child of document.querySelectorAll("#sketch-grid > div")) {
    for (let i = 0; i < size; i++) {
      const cell = document.createElement("div");
      cell.style.flex = "1";
      cell.style.border = "0.5px solid grey";
      child.appendChild(cell);
      cell.addEventListener("mouseover", colourCellBlack);
    }
  }
}

initGrid(16);