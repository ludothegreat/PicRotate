
# Project Specification: PicRotate - A Python Flask App for Rotating Images in a Browser

## Overview

The project aims to create a web application that allows users to upload images, which are then rotated on the main page at a fixed interval. The application will be built using Python's Flask framework for the backend and HTML, CSS, and JavaScript for the frontend.

## Features

1. **Image Upload**
    - Allows users to upload multiple images via a settings page.
    - Validates uploaded files to ensure they are images (JPG, JPEG, PNG).
  
2. **Image Display**
    - Displays images on the main page in a rotating manner.
    - Rotation interval is fixed at 30 seconds.

3. **Image Deletion**
    - Allows users to delete images via a settings page.
  
4. **Image Selection**
    - Users can select which images to rotate via checkboxes on the settings page.
  
5. **Settings Persistence**
    - Uses local storage to persist user settings between sessions.

## Classes, Functions, and Methods

### Backend (Python - Flask)

1. `index()`: Handles the main page and sends the list of image filenames to the frontend.
2. `settings()`: Handles the settings page, including the image upload logic.
3. `delete_image()`: Handles the deletion of an image.
4. `serve_image(filename)`: Serves images from the server to the frontend.
5. `allowed_file(filename)`: Validates if the uploaded file is an allowed image type.

### Frontend (HTML, CSS, JavaScript)

1. HTML: Two templates `index.html` and `settings.html`.
2. CSS: Styling for image display and settings (`style.css`).
3. JavaScript:
    - `rotateImages(imageList)`: Rotates the images on the main page.
    - `stopRotation()`: Stops the image rotation.
    - `updateThumbnails()`: Updates the thumbnails and checkboxes on the settings page.
  
## Non-Functional Requirements

1. **Performance**: The application should be able to handle image rotation smoothly without any lag.
2. **Usability**: The user interface should be intuitive and easy to use.
3. **Security**: Only validated and secure file types should be uploaded.

## Dependencies

- Python Libraries: Flask
- Frontend: Native HTML, CSS, and JavaScript, no external libraries needed.

## Comments

- Backend code should be commented to explain the purpose and functionality of each route and setting.
- Frontend JavaScript functions should also be commented for better understanding.

## Testing

Use `pytest` for backend testing:
1. Test image upload feature.
2. Test image deletion feature.

## Database

No database is required for this application as all data is either stored on the filesystem or in local storage.
