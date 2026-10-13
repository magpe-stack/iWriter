let verbetes = [];
const cardContent = document.getElementById('card-content');
const nextBtn = document.getElementById('next-btn');
const copyBtn = document.getElementById('copy-btn');
const themeToggle = document.getElementById('theme-toggle');
const toast = document.getElementById('toast');

// Carregar verbetes do JSON
async function loadVerbetes() {
  try {
    const response = await fetch('verbetes.json');
    verbetes = await response.json();
    exibirVerbeteAleatorio();
  } catch (error) {
    cardContent.textContent = 'Erro ao carregar os conselhos. Verifique a conexão.';
    console.error(error);
  }
}

function exibirVerbeteAleatorio() {
  if (verbetes.length === 0) return;
  const randomIndex = Math.floor(Math.random() * verbetes.length);
  cardContent.textContent = verbetes[randomIndex];
}

// Botão Próximo
nextBtn.addEventListener('click', exibirVerbeteAleatorio);

// Botão Copiar com feedback visual (Toast)
copyBtn.addEventListener('click', () => {
  const textToCopy = cardContent.textContent;
  navigator.clipboard.writeText(textToCopy).then(() => {
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2000);
  });
});

// Alternância de Tema Claro/Escuro
function setTheme(theme) {
  if (theme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.removeAttribute('data-theme');
    localStorage.setItem('theme', 'light');
  }
}

themeToggle.addEventListener('click', () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  setTheme(currentTheme === 'dark' ? 'light' : 'dark');
});

// Inicializar Tema preferido
const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
setTheme(savedTheme);

// Inicializar aplicativo
loadVerbetes();
