// html elements to be used
const reset = document.getElementById("clear");
const grid = document.getElementById("grid");
const slider = document.getElementById("myRange");
const sliderValue = document.getElementById("slider-value");

// variable initialization
let mouseDown = false; // variable to check if mouse is down is set to false by default and will update to true when mouse is down later in the code
let gridSize = 32; // variable to set grid size to 32 by default
sliderValue.textContent = gridSize + " x " + gridSize; // set slider value to 32 x 32 and shows on page

/* event listeners */

// Event listener for mousedown event on the grid
grid.addEventListener("mousedown", function (event) {
    event.preventDefault();
    mouseDown = true; // Set mouseDown variable to true when mouse is pressed down
});

// Event listener for mouseup event on the grid
grid.addEventListener('mouseup', () => {
    mouseDown = false; // Set mouseDown variable to false when mouse is released
});

// Slider event listener to change grid size
slider.oninput = function() {
    gridSize = document.getElementById("myRange").value;
    sliderValue.textContent = gridSize + " x " + gridSize;
    createGrid(gridSize);
}

// Function to create the grid
function createGrid(size) {
    grid.innerHTML = '';

    let i = 0;
    let x = size * size;

    document.documentElement.style.setProperty("--columns-row", size);
    
    for (i = 0; i < x ; i++) {
        const div = document.createElement("div");
        document.getElementById("grid").appendChild(div);
        div.addEventListener("mouseenter", function () {
            // Change the background color of the div to black when the mouse is down
            if (mouseDown) {
                this.style.backgroundColor = "black";
            }
        });
    }
}

createGrid(gridSize); // Call the createGrid function with the initial gridSize value
