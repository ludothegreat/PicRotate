let images = [];
let selectedImages = [];
let currentIndex = 0;
let rotationInterval;
let rotationTime = localStorage.getItem('rotationTime') || 30000; // Default to 30 seconds


// Function to handle image rotation
const rotateImages = (imageList) => {
    rotationTime = localStorage.getItem('rotationTime') || 30000;
    console.log("Testing image rotation");
    if (imageList.length === 0) {
        alert('No images selected.');
        return;
    }

    // Clear any existing rotation
    clearInterval(rotationInterval);

    // Start rotation
    rotationInterval = setInterval(function () {
        const imgElement = document.createElement('img');
        imgElement.src = '/images/' + imageList[currentIndex];
        console.log("Image URL:", imgElement.src);
        document.getElementById('imageContainer').innerHTML = '';
        document.getElementById('imageContainer').appendChild(imgElement);

        currentIndex = (currentIndex + 1) % imageList.length;
    }, rotationTime);
};

// Function to stop image rotation
const stopRotation = () => {
    clearInterval(rotationInterval);
};

// Function to update thumbnails and checkboxes
const updateThumbnails = () => {
    console.log("Running updateThumbnails");
    const checkboxes = document.querySelectorAll('.image-checkbox');
    checkboxes.forEach((checkbox, index) => {
        const imageName = checkbox.getAttribute('data-image-name');
        checkbox.checked = selectedImages.includes(imageName);

        checkbox.addEventListener('change', function () {
            if (this.checked) {
                selectedImages.push(imageName);
            } else {
                selectedImages = selectedImages.filter(name => name !== imageName);
            }
            localStorage.setItem('selectedImages', JSON.stringify(selectedImages));
            console.log("Set local storage for selected images");
        });
    });
};

// Initialize thumbnails and checkboxes
window.addEventListener('DOMContentLoaded', (event) => {
    // initializing selected images
    selectedImages = JSON.parse(localStorage.getItem('selectedImages') || '[]');
    console.log("Initial selected images from local storage:", selectedImages);
    updateThumbnails();

    // code for settings.html page
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
        document.getElementById('uploadBtn').addEventListener('click', function () {
            const files = fileInput.files;
            images = [];

            for (let i = 0; i < files.length; i++) {
                if (files[i].type === "image/jpeg") {
                    const reader = new FileReader();
                    reader.onload = function (e) {
                        images.push(e.target.result);
                        updateThumbnails();
                    }
                    reader.readAsDataURL(files[i]);
                }
            }
        });

        document.getElementById('startBtn').addEventListener('click', function () {
            rotateImages(selectedImages.map(i => images[i]));
        });

        document.getElementById('stopBtn').addEventListener('click', stopRotation);
    }

    // code for Save Button
    const saveButton = document.getElementById('saveBtn');
    if (saveButton) {
        saveButton.addEventListener('click', function () {
            // Existing code for saving image selection
            console.log("Save button clicked");
            localStorage.setItem('selectedImages', JSON.stringify(selectedImages));
            console.log("Local storage set on Save button click:", localStorage.getItem('selectedImages'));

            // New code for saving rotation time
            const inputTime = parseInt(document.getElementById('rotationTime').value, 10);
            if (!isNaN(inputTime) && inputTime > 0) {
                rotationTime = inputTime;
                localStorage.setItem('rotationTime', rotationTime);
                console.log("Rotation time saved:", rotationTime);
            } else {
                alert('Please enter a valid time in milliseconds.');
            }

            alert('Selection and rotation time saved.');
        });
    }

    // code for index.html page
    if (document.getElementById('imageContainer')) {
        console.log("Image rotation logic for index.html is being executed...");
        const savedImages = JSON.parse(localStorage.getItem('selectedImages') || '[]');
        console.log(`Saved images from local storage: ${JSON.stringify(savedImages)}`);

        if (savedImages.length > 0) {
            console.log(`Full image paths: ${JSON.stringify(savedImages)}`);
            rotateImages(savedImages);
        } else {
            console.log("No saved images found in local storage.");
        }
    }

});


// Code to handle the delete button click
const deleteButtons = document.querySelectorAll('.delete-button');
deleteButtons.forEach((button) => {
    button.addEventListener('click', function () {
        const imageName = button.getAttribute('data-image-name');

        // Confirm deletion
        const isConfirmed = window.confirm(`Are you sure you want to delete ${imageName}?`);

        if (isConfirmed) {
            fetch(`/delete_image?filename=${imageName}`, {
                method: 'DELETE',
            })
                .then(response => response.json())
                .then(data => {
                    if (data.status === 'success') {
                        // Remove the image item from the DOM
                        button.parentElement.remove();
                    } else {
                        alert('Failed to delete image.');
                    }
                });
        }
    });
});