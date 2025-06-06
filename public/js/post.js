async function loadPost(postId) {
    const post = await getPost(postId);

    document.querySelector('.post-title').innerHTML = post.title;
    document.querySelector('#data-publicacao').innerHTML = post.postDate;
    document.querySelector('.featured-image').setAttribute('src', `img/posts/post-${postId}.png`);
    document.querySelector('.featured-image').setAttribute('alt', post.thumbImageAltText);
    document.querySelector('.post-content').innerHTML = post.description;
}

async function loadPosts(excludedId) {
  let posts = await getPosts(false);
  posts = posts.filter((p) => p.id != excludedId);

  const container = document.querySelector('.recent-posts > ul');
  container.innerHTML = '';
  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];
    const postElement = createPost(post);
    container.innerHTML += postElement;
  }
}

function createPost(post) {
  return `<li><a href="post.html?id=${post.id}">${post.title}</a></li>`;
}

const params = new URLSearchParams(window.location.search);
const postId = params.get('id');

loadPost(postId);
loadPosts(postId);
