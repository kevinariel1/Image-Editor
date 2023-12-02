// Get the canvas, file input, and button elements
const canvas = document.getElementById('imageCanvas');
const imageInput = document.getElementById('imageInput');
const selectImageButton = document.getElementById('selectImageButton');
const clearFiltersButton = document.getElementById('clearFiltersButton');
const tabsContainer = document.getElementById('tabs-container');
const inverseButton = document.getElementById('inverseButton');
const grayscaleButton = document.getElementById('grayscaleButton');
const gaussianButton = document.getElementById('gaussianButton');
const binaryButton = document.getElementById('binaryButton');
const thresholdButton = document.getElementById('thresholdButton'); 
const contrastInput = document.getElementById('contrastInput');

// Add an event listener to handle button click and trigger file selection
selectImageButton.addEventListener('click', function () {
    // Trigger the click event of the hidden file input
    imageInput.click();
});

// Function to create a pop-up for the image name and type
function createPopup(imageName, imageType) {
    // Create a pop-up container
    const popup = document.createElement('div');
    popup.className = 'popup-container';

    // Create a smaller pill-shaped pop-up
    const pill = document.createElement('div');
    pill.className = 'popup-pill';

    // Create a smaller title element in the pop-up
    const popupTitle = document.createElement('h2');
    popupTitle.textContent = `${imageName}.${imageType}`;

    // Create a close button in the pop-up
    const closeButton = document.createElement('button');
    closeButton.className = 'close-button';
    closeButton.innerHTML = '✖'; // The 'x' symbol
    closeButton.addEventListener('click', function () {
        // Remove the pop-up and clear the canvas
        popup.remove();
        clearCanvas();
        
        // Set the brightness slider to 100% and update its position
        brightnessInput.value = 100;
        updateSliderPosition();

        // Set the contrast slider to 100% and update its position
        contrastInput.value = 100;
        updateSliderPositionTwo();
        
        // Update the brightness percentage display
        updateBrightnessPercentage(100);
        updateContrastPercentage(100);
    });

    // Append elements to the smaller pop-up

    pill.appendChild(popupTitle);
    pill.appendChild(closeButton);
    popup.appendChild(pill);

    // Append the smaller pop-up to the correct container ('popups-container')
    const popupsContainer = document.getElementById('tabs-container');
    popupsContainer.appendChild(popup);
}

// Add an event listener to handle file selection
imageInput.addEventListener('change', function (event) {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
        const reader = new FileReader();

        reader.onload = function (e) {
            const img = new Image();
            img.onload = function () {
                const context = canvas.getContext('2d');
                context.clearRect(0, 0, canvas.width, canvas.height);
                context.drawImage(img, 0, 0, canvas.width, canvas.height);

                // Hide the "Select Image" button
                selectImageButton.style.display = 'none';

                // Set the brightness slider to 100% and update its position
                brightnessInput.value = 100;
                updateSliderPosition();
                
                // Update the brightness percentage display
                updateBrightnessPercentage(100);

                // Set the contrast slider to 100% and update its position
                contrastInput.value = 100;
                updateSliderPosition();
                
                // Update the contrast percentage display
                updateContrastPercentage(100);

                // Extract file name and type
                const fileName = selectedFile.name.split('.').slice(0, -1).join('.');
                const fileType = selectedFile.name.split('.').pop();

                // Create a pop-up with the image name and type
                createPopup(fileName, fileType);
            };

            img.src = e.target.result;

            // Reset the value of the file input to allow selecting the same file again
            event.target.value = null;
        };

        reader.readAsDataURL(selectedFile);
    } else {
        // If no image is selected, draw the checkered pattern
        drawCheckeredPattern();

        // Set the brightness slider to 100% and update its position
        brightnessInput.value = 100;
        updateSliderPosition();
    }
});

// Store the original image data and other filter-specific data
let originalImageData;  

// Call the drawCheckeredPattern function initially to draw the pattern on page load
drawCheckeredPattern();

// Function to draw a checkered pattern on the canvas
function drawCheckeredPattern() {
    const context = canvas.getContext('2d');
    const squareSize = 20; // Adjust the size of each square in the pattern

    for (let x = 0; x < canvas.width; x += squareSize) {
        for (let y = 0; y < canvas.height; y += squareSize) {
            // Use XOR to alternate colors for a checkered pattern
            context.fillStyle = (x / squareSize + y / squareSize) % 2 === 0 ? '#333' : '#555';
            context.fillRect(x, y, squareSize, squareSize);
        }
    }
}

// Function to clear the canvas and reset tabs
function clearCanvas() {
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the checkered pattern on the canvas
    drawCheckeredPattern();

    // Show the "Select Image" button
    selectImageButton.style.display = 'block';

    // Reset the value of the file input to allow selecting the same file again
    imageInput.value = null;

    // Clear the original image data
    originalImageData = null;
}

// Get the brightness input and adjust button elements
const brightnessInput = document.getElementById('brightnessInput');

// Modify brightnessInput event listener
brightnessInput.addEventListener('input', function () {
    // Get the canvas context
    const context = canvas.getContext('2d');

    // Check if the canvas is empty (contains the checkered pattern)
    const isCanvasEmpty = isCheckeredPattern(context);

    // Get the brightness value from the input
    const brightnessValue = parseFloat(brightnessInput.value);

    // Update the left position of the slider thumb
    updateSliderPosition();

    // Update the brightness percentage display
    updateBrightnessPercentage(brightnessValue);

});

// Modify contrastInput event listener
contrastInput.addEventListener('input', function () {
    // Get the canvas context
    const context = canvas.getContext('2d');

    // Check if the canvas is empty (contains the checkered pattern)
    const isCanvasEmpty = isCheckeredPattern(context);

    // Get the brightness value from the input
    const contrastValue = parseFloat(contrastInput.value);

    // Update the left position of the slider thumb
    updateSliderPosition();

    // Update the brightness percentage display
    updateContrastPercentage(contrastValue);
});

// Function to update the left position of the slider thumb
function updateSliderPosition() {
    // Get the brightness value from the input
    const brightnessValue = parseFloat(brightnessInput.value);

    // Update the left position of the slider thumb
    brightnessInput.style.setProperty('--webkit-slider-thumb-left', `${50 + brightnessValue}%`);
}

// Function to update the brightness percentage display
function updateBrightnessPercentage(brightnessValue) {
    const brightnessPercentage = document.getElementById('brightnessPercentage');
    brightnessPercentage.textContent = `${brightnessValue}%`;
}

// Function to update the left position of the slider thumb
function updateSliderPositionTwo() {
    // Get the contrast value from the input
    const contrastValue = parseFloat(contrastInput.value);

    // Update the left position of the slider thumb
    contrastInput.style.setProperty('--webkit-slider-thumb-left', `${50 + contrastValue}%`);
}

// Function to update the contrast percentage display
function updateContrastPercentage(contrastValue) {
    const contrastPercentage = document.getElementById('contrastPercentage');
    contrastPercentage.textContent = `${contrastValue}%`;
}

// Helper function to check if the canvas is in an empty state (checkered pattern)
function isCheckeredPattern(context) {
    const checkeredPatternData = createCheckeredPatternData(context.canvas.width, context.canvas.height);
    const canvasData = context.getImageData(0, 0, context.canvas.width, context.canvas.height).data;

    // Compare the canvas data with the checkered pattern data
    for (let i = 0; i < canvasData.length; i++) {
        if (canvasData[i] !== checkeredPatternData[i]) {
            return false;
        }
    }

    return true;
}

// Helper function to create checkered pattern data
function createCheckeredPatternData(width, height) {
    const squareSize = 20;
    const patternData = new Uint8ClampedArray(width * height * 4);

    for (let x = 0; x < width; x += squareSize) {
        for (let y = 0; y < height; y += squareSize) {
            const color = (x / squareSize + y / squareSize) % 2 === 0 ? 51 : 85;
            const startIndex = (y * width + x) * 4;

            // Set the RGBA values for each square
            for (let i = 0; i < squareSize; i++) {
                for (let j = 0; j < squareSize; j++) {
                    const index = startIndex + (i * width + j) * 4;
                    patternData[index] = color;
                    patternData[index + 1] = color;
                    patternData[index + 2] = color;
                    patternData[index + 3] = 255; // Alpha channel
                }
            }
        }
    }

    return patternData;
}