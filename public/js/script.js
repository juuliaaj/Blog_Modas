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

  setTimeout(() => {
    makeCardsExpandable();
    addCardAnimations();
  }, 100);
}

function createPostDestaque(post) {
  return `
    <div class="col-lg-4 col-md-6 col-sm-12">
      <div class="card mb-5">
        <img src="./img/posts/post-${post.id}.png" class="card-img-top" alt="${post.thumbImageAltText}">
        <div class="card-body" style="background: linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 245, 248, 0.9) 100%);">
          <h5 class="card-title">${post.title}</h5>
          <p class="card-text">${post.description}</p>
          <p class="card-text"><small class="text-muted">${post.postDate}</small></p>
          <a href="post.html?id=${post.id}" class="btn btn-light">Ver Post</a>
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
            <a href="post.html?id=${post.id}" class="btn btn-secondary">Ver Post</a>
          </div>
        </div>
      </div>
    </div>
  `;
}

function createPostAuxiliar(post) {
  return `
    <li class="card">
      <a href="post.html?id=${post.id}" class="row g-0" style="color: inherit;">
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

function makeCardsExpandable() {
  const cards = document.querySelectorAll('.main-posts-container .card');
  
  cards.forEach((card, index) => {
    const cardBody = card.querySelector('.card-body');
    const cardText = card.querySelector('.card-text');
    
    card.style.animationDelay = `${index * 0.1}s`;
    
    if (cardText && cardText.scrollHeight > cardText.clientHeight) {
      const expandIndicator = document.createElement('div');
      expandIndicator.className = 'expand-indicator';
      expandIndicator.innerHTML = 'Clique para ver mais';
      cardBody.appendChild(expandIndicator);
    }
    
    card.addEventListener('click', function(e) {
      if (e.target.classList.contains('btn') || e.target.closest('.btn')) {
        return;
      }
      
      const isExpanded = cardBody.classList.contains('expanded');
      
      cards.forEach(otherCard => {
        if (otherCard !== card) {
          otherCard.classList.remove('expanded');
          otherCard.querySelector('.card-body').classList.remove('expanded');
        }
      });
      
      if (!isExpanded) {
        card.classList.add('expanded');
        cardBody.classList.add('expanded');
        
        card.style.animation = 'none';
        card.offsetHeight; 
        card.style.animation = 'pulse 0.3s ease-in-out';
        
        setTimeout(() => {
          card.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
          });
        }, 300);
      } else {
        card.classList.remove('expanded');
        cardBody.classList.remove('expanded');
      }
    });
  });
}

function addCardAnimations() {
  const cards = document.querySelectorAll('.card');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  cards.forEach((card) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease-out';
    observer.observe(card);
  });
}

function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = '';
  
  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  
  type();
}

function enhanceSearchBar() {
  const searchInput = document.querySelector('.navbar input');
  
  if (searchInput) {
    searchInput.addEventListener('focus', function() {
      this.style.transform = 'scale(1.05)';
      this.style.boxShadow = '0 0 20px rgba(233, 30, 99, 0.2)';
    });
    
    searchInput.addEventListener('blur', function() {
      this.style.transform = 'scale(1)';
      this.style.boxShadow = '0 0 0 3px rgba(233, 30, 99, 0.1)';
    });
    
    const placeholders = [
      'Busque no blog...',
      'Procure por moda...',
      'Encontre inspiração...',
      'Descubra tendências...'
    ];
    
    let currentPlaceholder = 0;
    
    setInterval(() => {
      if (!searchInput.value && document.activeElement !== searchInput) {
        searchInput.placeholder = placeholders[currentPlaceholder];
        currentPlaceholder = (currentPlaceholder + 1) % placeholders.length;
      }
    }, 3000);
  }
}

function createFloatingElements() {
  const container = document.body;
  
  for (let i = 0; i < 5; i++) {
    const element = document.createElement('div');
    element.style.cssText = `
      position: fixed;
      width: 4px;
      height: 4px;
      background: linear-gradient(45deg, #e91e63, #9c27b0);
      border-radius: 50%;
      pointer-events: none;`
  }
}

let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  if (scrollTop > lastScrollTop) {
    
    navbar.style.transform = 'translateY(-100%)';
  } else {
 
    navbar.style.transform = 'translateY(0)';
  }
  
  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;

  if (scrollTop > 50) {
    navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    navbar.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.1)';
  } else {
    navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.05)';
  }
}, false);

loadPosts();
