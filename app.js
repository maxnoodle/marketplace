let currentUser = null;
let courses = [];

// Funzione per effettuare il login
function login() {
    const usernameInput = document.getElementById('username');
    const username = usernameInput.value.trim();

    if (username !== "") {
        currentUser = username;
        toggleLoginLogoutDisplay(); // Aggiorna il display di login/logout nella navbar
        updateUsernameButton(); // Aggiorna il pulsante "Username"
        closeModal(); // Chiudi la finestra modale
        createCourse({
            title: "Default Course",
            description: "This is a default course",
            srcImage: "default-image.jpg",
            categories: ["Default Category"]
        });
        displayCourses();
    } else {
        alert("Please enter a valid username.");
    }
}

// Funzione per effettuare il logout
function logout() {
    currentUser = null; // Resetta l'utente corrente
    toggleLoginLogoutDisplay(); // Aggiorna il display di login/logout nella navbar
}

// Funzione per aggiornare il testo di "Login/Logout" nella navbar
function updateLoginLogoutText() {
    const loginLogoutOption = document.querySelector('.nav-item-login-logout');
    if (currentUser) {
        loginLogoutOption.textContent = 'Logout';
    } else {
        loginLogoutOption.textContent = 'Login';
    }
}

// Funzione per aggiornare il testo del pulsante "Username"
function updateUsernameButton() {
    const usernameButton = document.getElementById('username-btn');
    if (currentUser) {
        usernameButton.textContent = currentUser;
    }
}

function openModal() {
    document.getElementById('modal').style.display = 'block';
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

function openEditModalWithId(id) {
    const course = courses.find(course => course.id === id);
    const editModalContent = document.getElementById('edit-course-details-container');
    editModalContent.innerHTML = `
        <form onsubmit="saveEditedCourse(${course.id}); return false;">
            <label for="edit-title">Title:</label>
            <input type="text" id="edit-title" value="${course.title}" required>
            <label for="edit-description">Description:</label>
            <textarea id="edit-description" required>${course.description}</textarea>
            <button type="submit">Save Changes</button>
        </form>
    `;
    document.getElementById('edit-modal').style.display = 'block';
}

function closeEditModal() {
    document.getElementById('edit-modal').style.display = 'none';
}

function openEditModalWithoutId() {
    document.getElementById('edit-modal').style.display = 'block';
}

function saveEditedCourse(id) {
    const editedTitle = document.getElementById('edit-title').value;
    const editedDescription = document.getElementById('edit-description').value;

    if (editedTitle.trim() === "" || editedDescription.trim() === "") {
        alert("Title and description cannot be empty.");
        return;
    }

    editCourse({ id, title: editedTitle, description: editedDescription });
    closeEditModal();
}

function displayCourseDetails(id) {
    const course = courses.find(course => course.id === id);
    const modalContent = document.getElementById('course-details-container');
    modalContent.innerHTML = `
        <h2>${course.title}</h2>
        <p>${course.description}</p>
        <p>Author: ${course.author}</p>
        <button onclick="editCourse(${course.id})">Edit Course</button>
        <button onclick="deleteCourse(${course.id})">Delete Course</button>
    `;
    openModal();
}

function detailCourse(id) {
    displayCourseDetails(id);
}

function displayCourses() {
    const courseListContainer = document.getElementById('course-list-container');
    courseListContainer.innerHTML = '';

    courses.forEach(course => {
        const courseItem = document.createElement('div');
        courseItem.classList.add('course-item');
        courseItem.innerHTML = `
            <img src="${course.srcImg}" alt="${course.title}" class="course-image">
            <h2>${course.title}</h2>
            <p>${course.description}</p>
            <p>Author: ${course.author}</p>
            <button onclick="detailCourse(${course.id})">Details</button>
        `;
        courseListContainer.appendChild(courseItem);
    });
}

function createCourse({ title, description, srcImage, categories }) {
    if (currentUser) {
        const newCourse = {
            id: courses.length + 1,
            srcImg: srcImage,
            title: title,
            description: description,
            categories: categories,
            author: currentUser
        };
        courses.push(newCourse);
        displayCourses();
    } else {
        alert("Please log in to create a new course.");
    }
}

function editCourse({ id, title, description, author, srcImage, categories }) {
    if (currentUser === author) {
        const index = courses.findIndex(course => course.id === id);
        courses[index] = { id, title, description, author, srcImg: srcImage, categories };
        displayCourses();
    } else {
        alert("You are not authorized to edit this course.");
    }
}

function deleteCourse(id) {
    if (currentUser) {
        const index = courses.findIndex(course => course.id === id);
        courses.splice(index, 1);
        displayCourses();
    } else {
        alert("Please log in to delete a course.");
    }
}

function toggleLoginLogoutDisplay() {
    updateLoginLogoutText();
}

function toggleAdd() {
    openModal();
}

function toggleLoginLogout() {
    if (currentUser) {
        logout();
    } else {
        openModal();
    }
}

displayCourses();
