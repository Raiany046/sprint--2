const API_URL = "http://localhost:3000/noticiasNovas";

// Carregar notícias novas
async function carregarNoticias() {
  const container = document.getElementById("lista-noticias");
  if (!container) return;
  container.innerHTML = "<p>Carregando...</p>";

  try {
    const resposta = await fetch(API_URL);
    const noticias = await resposta.json();

    container.innerHTML = "";

    noticias.forEach(noticia => {
      const card = document.createElement("a");
      card.href = `noticia.html?id=${noticia.id}`;
      card.classList.add("noticia-card");

      card.innerHTML = `
        <img src="${noticia.imagem || 'https://via.placeholder.com/400x200'}" 
             alt="Imagem da notícia" 
             class="thumb">

        <div class="cetegoria">
            <p class="kicker">${noticia.categoria || ''}</p>
            <h3>${noticia.titulo || 'Sem título'}</h3>
            <p class="time">Publicado agora</p>
        </div>
      `;

      container.appendChild(card);
    });

  } catch (error) {
    container.innerHTML = "<p>Erro ao carregar notícias.</p>";
    console.error(error);
  }
}

carregarNoticias();

const API_URL_DESTAQUES = "http://localhost:3000/noticiasDestaques";

// Carregar destaques
async function carregarDestaques() {
  const container = document.getElementById("lista-destaques");
  if (!container) return;

  container.innerHTML = "<p>Carregando...</p>";

  try {
    const resposta = await fetch(API_URL_DESTAQUES);
    const destaques = await resposta.json();

    container.innerHTML = "";

    destaques.forEach((item, index) => {
      const destaque = document.createElement("a");
      destaque.href = `noticia.html?id=${item.id}`;
      destaque.classList.add("destaque-item");
      destaque.setAttribute("data-category", item.categoria);

      destaque.innerHTML = `
        <div class="numero">${index + 1}</div>
        <div class="destaque-text">${item.titulo}</div>
      `;

      container.appendChild(destaque);
    });
  } catch (error) {
    container.innerHTML = "<p>Erro ao carregar destaques.</p>";
    console.error(error);
  }
}

carregarDestaques();
