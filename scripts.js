// Objeto do usuário
const usuario = { nome: "Raphael", matricula: "123456", pendencia: false, acessibilidade: true };

// Lista de objetos de armários
const armarios = [
  { id: 1, formato: "padrao", status: true, acessivel: false },
  { id: 2, formato: "padrao", status: true, acessivel: false },
  { id: 3, formato: "padrao", status: true, acessivel: false },
  { id: 4, formato: "padrao", status: false, acessivel: true },
  { id: 5, formato: "padrao", status: false, acessivel: true },
  { id: 6, formato: "duplo", status: true, acessivel: true },
  { id: 7, formato: "duplo", status: false, acessivel: true },
  { id: 8, formato: "duplo", status: false, acessivel: true },  
];

// Lista de eventos do Inatel
const eventos = [
    {
        id: 1,
        title: 'Semana do Software 2025',
        date: '12/05',
        time: '10:00',
        location: 'Salão de Eventos',
        type: 'tech',
        description: 'Uma semana inteira dedicada à tecnologia e inovação, com palestras, workshops e hackathons.',
        image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800&h=400'
    },
    {
        id: 2,
        title: 'Workshop de IoT',
        date: '12/01',
        time: '08:00',
        location: 'Laboratório CS&I',
        type: 'tech',
        description: 'Workshop prático sobre Internet das Coisas e suas aplicações na indústria 4.0.',
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800&h=400'
    },
    {
        id: 3,
        title: 'Festa dos Alunos 2025',
        date: '18/05',
        time: '19:00',
        location: 'Área Esportiva do Inatel',
        type: 'cultural',
        description: 'Venha comemorar a melhor Festa dos Alunos de todos os tempos!',
        image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=800&h=400'
    },
    {
        id: 4,
        title: 'Feira de Oportunidades',
        date: '04/05',
        time: '10:00',
        location: 'Salão de Eventos',
        type: 'academic',
        description: 'Venha conhecer empresas e projetos com destaque na área da engenharia.',
        image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800&h=400'
    }
];

// Função para carregar os eventos no carrossel
function carregarEventos() {
    const carousel = document.getElementById("carousel");
    carousel.innerHTML = ""; 

    eventos.forEach((evento) => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <img src="${evento.image}" alt="${evento.title}">
            <div class="info">
                <h3>${evento.title}</h3>
                <p>${evento.description}</p>
                <p><span class="material-symbols-outlined icon">event</span> ${evento.date} às ${evento.time} <span class="material-symbols-outlined icon">pin_drop</span> ${evento.location}</p>
            </div>
        `;

        carousel.appendChild(card);
    });
}

// Função para reserva do armário
function reservarArmario() {
    // Obter tipo de armário selecionado pelo usuário no HTML.
    let tipoSelecionado = document.getElementById("tipoArmario").value;
    
    // Filtrar apenas os armários disponíveis e acessíveis ao usuário.
    let armariosDisponiveis = armarios.filter(a => a.formato === tipoSelecionado && a.status === true && usuario.acessibilidade === a.acessivel);
    
    // Caso não exista armário disponível, retorna mensagem ao usuário.
    if (armariosDisponiveis.length === 0) {
        document.getElementById("resultado").innerText = `Olá, ${usuario.nome}! Nenhum armário disponível para o tipo selecionado.`;
        return;
    }
    
    // Selecionar aleatoriamente um armário disponível.
    let armarioSorteado = armariosDisponiveis[Math.floor(Math.random() * armariosDisponiveis.length)];
    
    // Localizar o armário na lista e modificar suas propriedades corretamente.
    let armarioEmprestado = armarios.find(armario => armario.id === armarioSorteado.id);
    armarioEmprestado.status = false;

    // Registrar data e hora de reserva.
    let dataReser = new Date();
    let diaReserva = dataReser.toLocaleDateString();
    let horaReserva = dataReser.toLocaleTimeString();
    armarioEmprestado.dataReser = dataReser;
    armarioEmprestado.diaReserva = diaReserva;
    armarioEmprestado.horaReserva = horaReserva;

    // Calcular a data e hora para entrega da chave (24 horas depois).
    let dataEntre = new Date(dataReser);
    dataEntre.setHours(dataEntre.getHours() + 24);
    let diaEntrega = dataEntre.toLocaleDateString();
    let horaEntrega = dataEntre.toLocaleTimeString();
    armarioEmprestado.dataEntre = dataEntre;
    armarioEmprestado.diaEntrega = diaEntrega;
    armarioEmprestado.horaEntrega = horaEntrega;
    
    // Atualizar a pendência do usuário para verdadeira.
    usuario.pendencia = true;
    
    // Exibir mensagem de reserva para o usuário.
    document.getElementById("resultado").innerText = `Olá, ${usuario.nome}! O armário ${armarioSorteado.id} foi reservado com sucesso!\nData da reserva: ${diaReserva} às ${horaReserva}\nData para devolução da chave: ${diaEntrega} às ${horaEntrega}`;
    
    console.log(usuario);
    console.log(armarios);
}

// Carregar os eventos ao carregar a página
window.onload = function () {
    carregarEventos(); // Carrega os eventos no carrossel
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);
};

// Script para o carrossel
const carousel = document.querySelector(".carousel");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
let currentIndex = 0;

nextBtn.addEventListener("click", () => {
    if (currentIndex < eventos.length - 1) {
        currentIndex++;
    } else {
        currentIndex = 0;
    }
    updateCarousel();
});

prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
        currentIndex--;
    } else {
        currentIndex = eventos.length - 1;
    }
    updateCarousel();
});

function updateCarousel() {
    const offset = -currentIndex * 100;
    carousel.style.transform = `translateX(${offset}%)`;
}