const URL_BASE = 'https://api-fake-blog.onrender.com';

async function getPosts(grouped) {
  try {
    const response = await fetch(`${URL_BASE}/postagens`);
    const posts = await response.json();

    for (let i = 0; i < posts.length; i++) {
      posts[i].id = i;
    }

    if (!grouped) {
        return posts;
    }

    return {
      destaques: posts.slice(0, 3),
      secundarios: posts.slice(3, 5),
      auxiliares: posts.slice(5)
    };
  } catch (error) {
    console.error('Error fetching posts:', error)
  }
}

async function getPost(id) {
  try {
    const response = await fetch(`${URL_BASE}/postagem/${id}`);
    const post = await response.json();
    post.id = id;

    return post;
  } catch (error) {
    console.error('Error fetching posts:', error)
  }
}
