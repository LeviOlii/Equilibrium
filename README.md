# Equilibrium

![Equilibrium](https://github.com/user-attachments/assets/0a19e049-a198-4b5d-85a4-6315f36bd8d4)

O **Equilibrium** é um pequeno projeto em plataforma web simplificado, cuja ideia principal é ser um site direcionado a pessoas com baixo poder aquisitivo que desejam suporte emocional e profissionais dispostos a oferecer seus serviços gratuitamente ou por preços acessíveis. A proposta é de inclusão social no setor de atendimento terapêutico, cujos serviços costumam ser inacessíveis para pessoas com pouca condição financeira.


**Programa Capacita Brasil/C-Jovem**
- Equipe 2
- Turma: FSN3
- Professora: Fernanda Nascimento
- Facilitador: Gabriel Bezerra

## Funcionalidades:

- **Cadastro e login de usuários**: Permite que os usuários se registrem e façam login de forma segura para acessar as funcionalidades da plataforma. Há anamnese básica e filtro de informações relevantes, como se o usuário é paciente ou especialista.
- **Painel do administrador**: Tela para o administrador gerenciar cadastros e monitorar a plataforma.
- **Comunidades de apoio (mockados)**: Grupos de apoio sobre questões de saúde mental.
- **Depoimentos (mockados)**: Depoimentos de usuários.
- **Busca por filtros**: É possível buscar profissionais com base na região, especialidade e faixa etária de atendimento.
- **Perfil de usuário**: O usuário consegue visualizar suas informações.

## Tecnologias Utilizadas:

- **Frontend**:
  - React.js
  - JavaScript
  - CSS
  - HTML
  - Tailwind CSS (para componentes e layout responsivo)
 
- **Backend**:
  - Node.js
  - Express.js
  - Prisma
  - PostgreSQL
  - Axios
  - Insomnia

## Membros da equipe e suas funções:
  - Levi Oliveira: Criação da estrutura e estilização da página inicial / Criação da API de Usuários / Criação das API de agendamento de sessões
  - Eduarda Alves: Estilização, organização de tarefas, criação da página de login, página de perfil do paciente/profissional
  - Samuel Oliveira: Criação das telas de login e cadastro para paciente e profissional com formulário de anamnese básica
  - Ricardo Teixeira: Criação do sistema de cadastro, login e perfis. Implementação de autorização / autenticação com JWT e criação de middlewares
  - Gustavo Rodrigues: Criação da tela de busca de profissional, implementação da API para requisição dos dados dos profissionais
  - David Cavalcante: Criação da API de depoimentos dos usuarios
## Como Rodar o Projeto

### **Pré-requisitos**
Antes de rodar o projeto, certifique-se de ter instalado:
1. **Node.js** e **npm**
2. **PostgreSQL** (banco de dados deve estar rodando)
3. **Prisma** precisa ser instalado dentro da pasta api (npm install @prisma/client).

### **Rodando o Backend**
1. Instale as dependências:
   ```sh
   npm install
   ```
2. Configure o banco de dados no PostgreSQL e crie um arquivo `.env` baseado no seguinte modelo:
   ```env
   DATABASE_URL="postgresql://USUARIO:SENHA@localhost:5432/NOME_DO_BANCO"
   SECRET_KEY="chave_super_secreta"
   ```
3. Execute as migrações do Prisma:
   ```sh
   npx prisma migrate dev
   ```
4. Inicie o servidor:
   ```sh
   npm run dev
   ```

### **Rodando o Frontend**
1. Vá até a pasta `frontend`:
   ```sh
   cd frontend
   ```
2. Instale as dependências:
   ```sh
   npm install
   ```
3. Inicie o projeto:
   ```sh
   npm run dev
   ```

Agora o projeto estará rodando e pronto para ser utilizado!


O projeto estará rodando no navegador em `http://localhost:5173/` (ou outra porta indicada pelo Vite).

## 📜 Licença

Este projeto é de uso acadêmico e não possui licença comercial.

## Créditos

A landing page do projeto foi baseada no design disponibilizado no Figma:
[🔗 DoctorCare - Figma Community](https://www.figma.com/community/file/1102912263666619803/doctorcare)

