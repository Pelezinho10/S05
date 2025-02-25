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
  armarioEmprestado.dataReser = dataReser;
  armarioEmprestado.diaReserva = diaReserva;

  // Calcular a data e hora para entrega da chave (24 horas depois).
  let dataEntre = new Date(dataReser);
  dataEntre.setHours(dataEntre.getHours() + 24);
  let diaEntrega = dataEntre.toLocaleDateString();
  armarioEmprestado.dataEntre = dataEntre;
  armarioEmprestado.diaEntrega = diaEntrega;
  
  // Atualizar a pendência do usuário para verdadeira.
  usuario.pendencia = true;
  
  // Exibir mensagem de reserva para o usuário.
  document.getElementById("resultado").innerText = `Olá, ${usuario.nome}! O armário ${armarioSorteado.id} foi reservado com sucesso!\nData da reserva: ${diaReserva}\nData para devolução da chave: ${diaEntrega}`;
  
  console.log(armarios);
}