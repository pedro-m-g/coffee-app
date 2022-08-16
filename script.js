document.addEventListener('DOMContentLoaded', function() {

  const COFFEE_API = 'http://localhost:8080/posts';

  const $main = document.getElementById('main');

  fetch(COFFEE_API)
    .then(function(response) {
      return response.json();
    }).then(function(posts) {
      const postsHtml = posts.map(function (post) {
        return `
          <article class="card">
            <p>${post.content}</p>
          </article>
        `;
      });
      $main.innerHTML = postsHtml.join('');
    })

});
