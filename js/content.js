document.addEventListener('DOMContentLoaded', function () {
    const burgerButton = document.querySelector('.burger-button');
    const menuList = document.querySelector('.menu-list');
    const uploadButton = document.querySelector('.upload-button');
    const uploadModal = document.querySelector('.upload-modal');
    const closeModal = document.querySelector('.close-modal');
    const fileInput = document.querySelector('.file-input');
    const fileText = document.querySelector('.file-text');
    const contentPreview = document.querySelector('.content-preview');
    const uploadForm = document.querySelector('#upload-form');
    const titleInput = document.querySelector('#title-input');
    const descriptionInput = document.querySelector('#description-input');

    if (burgerButton && menuList) {
        burgerButton.addEventListener('click', function () {
            menuList.classList.toggle('visible');
        });
    }

    if (uploadButton && uploadModal) {
        uploadButton.addEventListener('click', function () {
            // Close the menu-list if it's visible
            if (menuList && menuList.classList.contains('visible')) {
                menuList.classList.remove('visible');
            }
            uploadModal.classList.remove('hidden');
        });
    }

    if (closeModal && uploadModal) {
        closeModal.addEventListener('click', function () {
            uploadModal.classList.add('hidden');
        });
    }

    // Update file name and preview content
    if (fileInput && fileText) {
        fileInput.addEventListener('change', function () {
            // Clear any previous content in the preview section
            contentPreview.innerHTML = '';

            const file = fileInput.files[0]; // Get the selected file
            if (file) {
                // Update the file-text element with the file name
                fileText.textContent = file.name;

                // Show a preview if the file is an image or a GIF
                if (file.type.startsWith('image/')) {
                    const img = document.createElement('img');
                    img.src = URL.createObjectURL(file);
                    img.style.maxWidth = '100%';
                    img.style.maxHeight = '100%';
                    img.alt = 'Preview of uploaded image';
                    contentPreview.appendChild(img);
                } else {
                    const message = document.createElement('p');
                    message.textContent = 'Preview not available for this file type.';
                    message.style.color = 'white';
                    contentPreview.appendChild(message);
                }
            } else {
                // Reset to default text if no file is selected
                fileText.textContent = 'No file chosen';
            }
        });
    }

    // Handle form submission and create a new content page
    if (uploadForm) {
        uploadForm.addEventListener('submit', function (event) {
            event.preventDefault(); // Prevent default form submission

            const title = titleInput.value.trim();
            const description = descriptionInput.value.trim();
            const file = fileInput.files[0];

            if (!title || !file) {
                alert('Please provide a title and upload a file!');
                return;
            }

            // Create a new "content page" dynamically
            const contentPage = `
                <!DOCTYPE html>
                <html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <!-- Google fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@700&family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">
    <!-- modern-normalize -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/modern-normalize/2.0.0/modern-normalize.min.css">
    <link rel="stylesheet" href="./css/style.css">
</head>
<script src="js/content.js"></script>
<body>
    <header>
        <div class="container header">
            <nav class="main-navigation">
                <a href="index.html" class="logo-menu">
                    <svg class="menu-open-button-svg" width="32px" height="32px">
                        <use href="./images/sprite.svg#icon-dragon"></use>
                    </svg>
                </a>
            </nav>
            <form class="search-form">
                <input type="text" placeholder="Search..." class="search-input">
                <button type="submit" class="search-button">
                    <svg width="16px" height="16px">
                        <use href="./images/sprite.svg#icon-search"></use>
                    </svg>
                </button>
            </form>
            <button type="button" class="burger-button">
                <svg class="menu-open-button-svg" width="32px" height="32px">
                    <use href="./images/sprite.svg#icon-burger"></use>
                </svg>
            </button>
            <ul class="menu-list">
                <li class="menu-item"><a href="#">Profile</a></li>
                <li class="menu-item"><a href="#">Favorite</a></li>
                <li class="menu-item"><a href="#">Sign Out</a></li>
                <li class="menu-item">
                    <button type="button" class="upload-button">Upload</button>
                </li>
            </ul>
        </div>
    </header>
    <main>
    <section class="main-section">
        <div class="container content-display">
            <h1>${title}</h1>
            <img src="${URL.createObjectURL(file)}" alt="${title}" style="max-width: 100%; height: auto;">
            <p>${description || ''}</p>
            <div class="buttons">
                <button class="content-interaction like">
                    <svg width="28px" height="28px">
                        <use href="./images/sprite.svg#icon-like"></use>
                    </svg>
                    <p>Like</p>
                </button>
                <button class="content-interaction download">
                    <svg width="28px" height="28px">
                        <use href="./images/sprite.svg#icon-download"></use>
                    </svg>
                    <p>Download</p>
                </button>
            </div>
            <div class="comments-section">
                <p>Comments (0) - Be the first to comment!</p>
                <div class="comment-box">
                    <div class="profile-image">
                        <img src="./images/interface/avatar-icon.jpg" alt="Profile Image">
                    </div>
                    <textarea placeholder="Write a Comment"></textarea>
                </div>
            </div>
        </div>
    </section>
</main>
    <footer>
        <div class="container footer">
            <a href="" class="discord-link">
                <svg width="32px" height="32px">
                    <use href="./images/sprite.svg#icon-discord"></use>
                </svg> 
            </a>
        </div>
    </footer>
    <div class="upload-modal hidden">
        <form id="upload-form" class="upload-form">
            <h2 class="form-title">Upload Content</h2>
            <label class="content-input">
                Title:
                <input type="text" id="title-input" name="title" class="title-input" placeholder="Enter title" required>
            </label>
            <label class="content-input">
                Description:
                <textarea id="description-input" name="description" class="description-input" placeholder="Enter description"></textarea>
            </label>
            <div id="content-preview" class="content-preview">
            </div>
            <label class="content-input file-label">
                Upload File:
                <div class="file-wrapper">
                    <input type="file" id="file-input" name="file" class="file-input" required>
                    <span class="file-button">Choose File</span>
                    <span id="file-text" class="file-text">No file chosen</span>
                </div>
            </label>            
            <button type="submit" class="upload-content-button">Upload</button>
            <button type="button" class="close-modal">
                <svg class="menu-open-button-svg" width="20px" height="20px">
                    <use href="./images/sprite.svg#icon-close"></use>
                </svg>
            </button>
        </form>
    </div>  
    <script src="content.js"></script>
</body>
</html>
            `;

            // Simulate creating and redirecting to a new page
            const newWindow = window.open();
            newWindow.document.write(contentPage);
            newWindow.document.close();
        });
    }
});

// Simulating the number of comments
let commentCount = 0;

function updateComments() {
    const commentsText = document.querySelector('.comments-header');
    if (commentCount === 0) {
        commentsText.textContent = 'Comments (0) - Be the first to comment!';
    } else if (commentCount === 1) {
        commentsText.textContent = 'Comments (1) - Leave a comment!';
    } else {
        commentsText.textContent = `Comments (${commentCount}) - Join the discussion!`;
    }
}

// Call this function whenever the comment count changes
updateComments();



// Enable downloading the content when the "Download" button is clicked
document.addEventListener('click', function (event) {
    const downloadButton = event.target.closest('.download'); // Check if the clicked element is the Download button
    if (downloadButton) {
        const img = document.querySelector('.content-display img'); // Find the image in the content page
        if (img) {
            const downloadLink = document.createElement('a'); // Create a temporary link
            downloadLink.href = img.src; // Set the href to the image source
            downloadLink.download = img.alt || 'download'; // Set the filename to the image alt text or a default name
            document.body.appendChild(downloadLink); // Append the link to the body
            downloadLink.click(); // Programmatically click the link to trigger the download
            document.body.removeChild(downloadLink); // Remove the link from the DOM
        } else {
            alert('No downloadable content found!');
        }
    }
});
