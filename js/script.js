async function loadPosts() {
  const posts = await getPosts(true);

  const destaqueContainer = document.querySelector('.main-posts-container > .row');
  destaqueContainer.innerHTML = '';
  for (let i = 0; i < posts.destaques.length; i++) {
    const post = posts.destaques[i];
    const postElement = createPostDestaque(post);
    destaqueContainer.innerHTML += postElement;
  }

  const secundariosContainer = document.querySelector('.secondary-posts > .col-lg-9');
  secundariosContainer.innerHTML = '';
  for (let i = 0; i < posts.secundarios.length; i++) {
    const post = posts.secundarios[i];
    const postElement = createPostSecundario(post);
    secundariosContainer.innerHTML += postElement;
  }

  const auxiliaresContainer = document.querySelector('.recent-posts-list');
  auxiliaresContainer.innerHTML = '';
  for (let i = 0; i < posts.auxiliares.length; i++) {
    const post = posts.auxiliares[i];
    const postElement = createPostAuxiliar(post);
    auxiliaresContainer.innerHTML += postElement;
  }
}

function createPostDestaque(post) {
  return `
    <div class="col-lg-4 col-md-6 col-sm-12">
      <div class="card mb-5">
        <img src="./img/posts/post-${post.id}.png" class="card-img-top" alt="${post.thumbImageAltText}">
        <div class="card-body" style="background: #ffc0cb66;">
          <h5 class="card-title">${post.title}</h5>
          <p class="card-text">${post.description}</p>
          <p class="card-text"><small class="text-muted">${post.postDate}</small></p>
          <a href="/post.html?id=${post.id}" class="btn btn-light">Ver Post</a>
        </div>
      </div>
    </div>
  `;
}

function createPostSecundario(post) {
  return `
    <div class="card mb-3">
      <div class="row g-0">
        <div class="col-md-4">
          <img src="img/posts/post-${post.id}.png" class="img-fluid rounded-start h-100" style="object-fit: cover;" alt="${post.thumbImageAltText}">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">${post.title}</h5>
            <p class="card-text">${post.description}</p>
            <p class="card-text"><small class="text-muted">${post.postDate}</small></p>
            <a href="/post.html?id=${post.id}" class="btn btn-secondary">Ver Post</a>
          </div>
        </div>
      </div>
    </div>
  `;
}

function createPostAuxiliar(post) {
  return `
    <li class="card">
      <a href="/post.html?id=${post.id}" class="row g-0" style="color: inherit;">
        <div class="col-lg-4 col">
          <img src="img/posts/post-${post.id}.png" alt="${post.thumbImageAltText}">
        </div>
        <div class="col-lg-8 col-10">
          <div class="card-body">
            <h5 class="card-title">${post.title}</h5>
            <p class="card-text"><small class="text-muted">${post.postDate}</small></p>
          </div>
        </div>
      </a>
    </li>
  `;
}

loadPosts();

const backToTopButton = document.querySelector('#backToTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTopButton.style.display = 'block';
  } else {
    backToTopButton.style.display = 'none';
  }
});

backToTopButton.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
