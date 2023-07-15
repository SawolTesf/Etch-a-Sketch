// HTML elements to be used
const grid = document.getElementById("grid");
const colorInput = document.getElementById("color");
const randomMode = document.getElementById("random-mode");
const toggleLines = document.getElementById("toggle-lines");
const eraser = document.getElementById("eraser");
const reset = document.getElementById("reset");
const slider = document.getElementById("myRange");
const sliderValue = document.getElementById("slider-value");

// Variable initialization
let mouseDown = false; // Variable to check if mouse is down is set to false by default and will update to true when mouse is down later in the code
let gridSize = 32; // Variable to set grid size to 32 by default
sliderValue.textContent = gridSize + " x " + gridSize; // Set slider value to 32 x 32 and shows on page
let colorMode = "default"; // Variable to set color mode to defaultColorMode by default
let selectedColor = "black"; // Variable to set selected color to black by default
let lines = true; // Variable to set lines to true by default

/* Event listeners */

// Add event listener for page load
window.addEventListener("load", function () {
    // Reset value of color input to default value
    const colorInput = document.getElementById("color");
    colorInput.value = "#000000";
});

// Event listener for mousedown event on the grid
grid.addEventListener("mousedown", function (event) {
    event.preventDefault();
    mouseDown = true; // Set mouseDown variable to true when mouse is pressed down
});

// Event listener for mouseup event on the grid
grid.addEventListener('mouseup', () => {
    mouseDown = false; // Set mouseDown variable to false when mouse is released
});

// Event listener for color input change
colorInput.addEventListener("input", function () {
    selectedColor = colorInput.value;
    colorMode = "default";
    colorInput.style.backgroundColor = selectedColor; // Set background color of color input element
    toggleColorMode(colorInput, "default");
});

// Function to toggle color mode
function toggleColorMode(button, mode) {
    // Reset background color of all buttons
    const buttons = [randomMode, eraser, colorInput]; // Add buttons to array
    buttons.forEach(function (btn) {
        btn.style.backgroundColor = ""; // Reset background color
        btn.style.color = ""; // Reset text color 
    });

    if (colorMode === mode) {
        colorMode = "default";
        button.style.cssText = ""; // Reset color of clicked button when mode is not active
    } 
    else {
        colorMode = mode;
        button.style.cssText = "color: white; background-color: black"; // Change color of clicked button when mode is active
    }
}

// Example usage for randomMode button
randomMode.addEventListener("click", function () {
    toggleColorMode(randomMode, "random");
});

// Event listener for toggleLines button
toggleLines.addEventListener("click", toggleDivLines);

// Event listener for eraser button
eraser.addEventListener("click", function () {
    toggleColorMode(eraser, "eraser");
});

// Event listener for reset button
reset.addEventListener("click", function () {
    createGrid(gridSize);
});

// Slider event listener to change grid size
slider.oninput = function() {
    gridSize = document.getElementById("myRange").value;
    sliderValue.textContent = gridSize + " x " + gridSize;
    createGrid(gridSize);
}

// Function to set color based on color mode
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
function createGrid(size) {
    grid.innerHTML = '';

    let i = 0;
    let x = size * size;

    document.documentElement.style.setProperty("--columns-row", size);
    
    for (i = 0; i < x ; i++) {
        const div = document.createElement("div");
        div.style.backgroundColor = "white";
        // Set border style based on value of lines variable
        if (lines) {
            div.style.border = "1px solid black";
        } 
        else {
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