document.addEventListener('DOMContentLoaded', function() {
  const token = sessionStorage.getItem('token');
  if (token == null) {
    location.replace('/login.html');
    return;
  }

  const COFFEE_API = 'http://localhost:8080/posts';

  const $main = document.getElementById('main');
  const $logout = document.getElementById('logout');

  fetch(COFFEE_API, {
    headers: {
      'Authorization': token
    }
  }).then(function(response) {
    return response.json();
  }).then(function(posts) {
    const postsHtml = posts.map(function (post) {
      return `
        <article class="card">
          <p><strong>${post.user.username}</strong></p>
          <p>${post.content}</p>
        </article>
      `;
    });
    $main.innerHTML = postsHtml.join('');
  });

  $logout.addEventListener('click', function() {
    sessionStorage.removeItem('token');
    location.replace('/login.html');
  });

});
