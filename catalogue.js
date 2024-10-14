document.addEventListener('DOMContentLoaded', () => {
    const postSection = document.querySelector(".post");

    function loadPosts() {
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        posts.forEach(post => {
            const bodyDiv = document.createElement('div');
            bodyDiv.className = 'select';
            const newTitle = document.createElement('h3');
            newTitle.textContent = post.title;
            const newBody = document.createElement('div');
            newBody.textContent = post.content;

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
        });
    }

    function updateStorage() {
        const posts = [];
        document.querySelectorAll('.select').forEach(post => {
            const postTitle = post.querySelector('h3').innerText;
            const postContent = post.querySelector('div').innerText;
            posts.push({ title: postTitle, content: postContent });
        });
        localStorage.setItem('posts', JSON.stringify(posts));
    }

    function react(button) {
        const reactCountSpan = button.querySelector('.react-count');
        let currentCount = parseInt(reactCountSpan.innerText);
        reactCountSpan.innerText = currentCount + 1;
        const postId = button.closest('.select').dataset.postId;
        localStorage.setItem(`reactCount-${postId}`, currentCount + 1);
    }

    loadPosts();
});
