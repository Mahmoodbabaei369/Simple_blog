document.addEventListener('DOMContentLoaded', function() {
    const postsContainer = document.getElementById('posts');

    // Load existing posts from local storage
    const posts = JSON.parse(localStorage.getItem('posts')) || [];

    // Display posts
    function displayPosts() {
        postsContainer.innerHTML = '';
        posts.forEach((post, index) => {
            const listItem = document.createElement('a');
            listItem.href = 'post.html?id=' + index;
            listItem.className = 'list-group-item list-group-item-action';
            listItem.innerHTML = `<h5>${post.title}</h5><p>${post.content.substring(0, 100)}...</p>`;
            postsContainer.appendChild(listItem);
        });
    }
    
    displayPosts();
    
    const postForm = document.getElementById('postForm');
    if (postForm) {
        postForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const title = document.getElementById('title').value;
            const content = document.getElementById('content').value;
            
            // Save new post
            posts.push({ title, content });
            localStorage.setItem('posts', JSON.stringify(posts));
            window.location.href = 'index.html';
        });
    }
    
    // Display single post
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');
    if (postId !== null) {
        const post = posts[postId];
        if (post) {
            document.getElementById('title').value = post.title;
            document.getElementById('content').value = post.content;
        }
    }
});
