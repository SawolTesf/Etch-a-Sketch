// html elements to be used
const grid = document.getElementById("grid");
//const defaultMode = document.getElementById("default-mode");
const colorInput = document.getElementById("color");
const randomMode = document.getElementById("random-mode");
const toggleLines = document.getElementById("toggle-lines");
const eraser = document.getElementById("eraser");
const reset = document.getElementById("reset");
const slider = document.getElementById("myRange");
const sliderValue = document.getElementById("slider-value");

// variable initialization
let mouseDown = false; // variable to check if mouse is down is set to false by default and will update to true when mouse is down later in the code

let gridSize = 32; // variable to set grid size to 32 by default

sliderValue.textContent = gridSize + " x " + gridSize; // set slider value to 32 x 32 and shows on page

let colorMode = "default"; // variable to set color mode to defaultColorMode by default

let selectedColor = "black"; // variable to set selected color to black by default

let lines = true; // variable to set lines to true by default

/* event listeners */

// Event listener for mousedown event on the grid

// Add event listener for page load
window.addEventListener("load", function () {
    // Reset value of color input to default value
    const colorInput = document.getElementById("color");
    colorInput.value = "#000000";
});

grid.addEventListener("mousedown", function (event) {
    event.preventDefault();
    mouseDown = true; // Set mouseDown variable to true when mouse is pressed down
});

// Event listener for mouseup event on the grid

grid.addEventListener('mouseup', () => {
    mouseDown = false; // Set mouseDown variable to false when mouse is released
});

/*defaultMode.addEventListener("click", function () {
    colorMode = "default";
});*/
colorInput.addEventListener("input", function () {
    selectedColor = colorInput.value;
    colorMode = "default";
});

function toggleColorMode(button, mode) {
    if (colorMode === "default") {
        colorMode = mode;
        button.style.backgroundColor = "lightblue"; // Change color of button when mode is active
    } else {
        colorMode = "default";
        button.style.backgroundColor = ""; // Reset color of button when default mode is active
    }
}

// Example usage for randomMode button
randomMode.addEventListener("click", function () {
    toggleColorMode(randomMode, "random");
});



toggleLines.addEventListener("click", toggleDivLines);

function toggleDivLines(){
    const cells = document.querySelectorAll("#grid > div");
    if (lines) {
        cells.forEach(cell => {
            cell.style.border = "none";
        });
        lines = false;
    }
    else {
        cells.forEach(cell => {
            cell.style.border = "1px solid black";
        });
        lines = true;
    }
}

eraser.addEventListener("click", function () {
    toggleColorMode(eraser, "eraser");
});


reset.addEventListener("click", function () {
    createGrid(gridSize);
});

// Slider event listener to change grid size
slider.oninput = function() {
    gridSize = document.getElementById("myRange").value;
    sliderValue.textContent = gridSize + " x " + gridSize;
    createGrid(gridSize);
}

// This function controls what each color mode does

function setColor(mode, div) {
    if(mode == "default") {
        div.style.backgroundColor = selectedColor;
    }
    else if(mode == "random") {
        div.style.backgroundColor = getRandomColor();
    }
    else if(mode == "eraser") {
        div.style.backgroundColor = "white";
    }
}

// Function to create the grid
// Function to create the grid
function createGrid(size) {
    grid.innerHTML = '';

    let i = 0;
    let x = size * size;

    document.documentElement.style.setProperty("--columns-row", size);
    
    for (i = 0; i < x ; i++) {
        const div = document.createElement("div");

        // Set border style based on value of lines variable
        if (lines) {
            div.style.border = "1px solid black";
        } else {
            div.style.border = "none";
        }

        document.getElementById("grid").appendChild(div);
        
        div.addEventListener("mouseenter", function () {
            // Change the background color of the div to black when the mouse is down
            if (mouseDown) {
                setColor(colorMode, div);
            }
        });
    }
}


createGrid(gridSize); // Call the createGrid function with the initial gridSize value

// Function to toggle grid lines

function toggleDivLines(){
    const cells = document.querySelectorAll("#grid > div");
    if (lines) {
        cells.forEach(cell => {
            cell.style.border = "none";
        });
        lines = false;
    }
    else {
        cells.forEach(cell => {
            cell.style.border = "1px solid black";
        });
        lines = true;
    }
}

// Function to generate random color

function getRandomColor() {
    return '#' + Math.floor(Math.random()*16777215).toString(16);
}