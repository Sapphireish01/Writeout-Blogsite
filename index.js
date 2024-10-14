const postSection = document.querySelector(".post");
const title = document.querySelector(".title");
const textSection = document.querySelector(".text");
const submitBtn = document.querySelector(".icon");

function showNotes() {
    postSection.innerHTML= localStorage.getItem ("notes") || '';
    attachDeleteEventListeners();
    attachReactEventListeners();
}

showNotes();

function updateStorage() {
    localStorage.setItem("notes", postSection.innerHTML);
    let posts = [];
    document.querySelectorAll('.select').forEach(post => {
        const postTitle = post.querySelector('h3').innerText;
        const postContent = post.querySelector('div').innerText;
        posts.push({ title: postTitle, content: postContent });
    });
    localStorage.setItem('posts', JSON.stringify(posts));
}

function attachDeleteEventListeners() {

    const deleteBtns = document.querySelectorAll('.delete-button');
    deleteBtns.forEach(button => {
        button.onclick = function() {
            button.parentElement.remove();
            updateStorage();
        };
    });
}

function attachReactEventListeners() {
    const reactBtns = document.querySelectorAll('.fa-hands-clapping');
    reactBtns.forEach(button => {
        button.onclick = function() {
            react(button);
        };
    });
}
function savePost(title, content) {
    let posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts.push({ title: title, content: content });
    localStorage.setItem('posts', JSON.stringify(posts));
}

submitBtn.addEventListener('click', (event) => {
    event.preventDefault();

    const titleText = title.value;
    const bodyText = textSection.value;

    savePost(titleText, bodyText);

    const newTitle = document.createElement('h3');
    const newBody = document.createElement('div');
    const bodyDiv = document.createElement('div');
    
    bodyDiv.className = "select";
    newBody.textContent = bodyText;
    newTitle.textContent = titleText;

    bodyDiv.appendChild(newTitle);
    bodyDiv.appendChild(newBody);

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-button';
    deleteBtn.style.cursor = 'pointer';
    const deleteIcon = document.createElement('i');
    deleteIcon.className = 'fa-regular fa-trash-can';
    deleteBtn.appendChild(deleteIcon);    
    deleteBtn.onclick = function() {
        bodyDiv.remove();
        updateStorage();
    };
    bodyDiv.appendChild(deleteBtn);

    const reactBtn = document.createElement('button');
    reactBtn.className = 'rxt-btn';
    reactBtn.innerHTML = ' 👏 <span class="react-count">0</span>';
    reactBtn.onclick = function() {
        react(reactBtn);
    };
    bodyDiv.appendChild(reactBtn);

    postSection.appendChild(bodyDiv);

    title.value = '';
    textSection.value = '';

    updateStorage();
    attachDeleteEventListeners();
    attachReactEventListeners();
});

function react(button) {
    const reactCountSpan = button.querySelector('.react-count');
    let currentCount = parseInt(reactCountSpan.innerText);
    reactCountSpan.innerText = currentCount + 1;
    const postId = button.closest('.select').dataset.postId;
    localStorage.setItem(`reactCount-${postId}`, currentCount + 1);
}

showNotes();

console.log("JavaScript loaded and running");
