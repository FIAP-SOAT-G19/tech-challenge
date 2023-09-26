# 💬 Tech Challenge

## ✳️ Sobre
O **Tech Challenge** é um projeto de um sistema de autoatendimento de fast food, que é composto por uma série de dispositivos e interfaces que permitem aos clientes selecionar e fazer pedidos sem precisar interagir com um atendente.

---

## 🛠 Ferramentas Utilizadas
- [Node](https://nodejs.dev)
- [Express](https://expressjs.com/pt-br/)
- [PostgreSQL](https://www.postgresql.org/)
- [Prisma](https://www.prisma.io/)
- [Jest](https://jestjs.io)

---
## 💻 Configurando o Ambiente

- Instale o [NVM](https://github.com/nvm-sh/nvm) (Gerenciador de versão do Node)
  
---

## 💻 Clonando o repositório

- Clone o projeto

  ```bash
  git clone https://github.com/FIAP-SOAT-G19/tech-challenge.git
  ````
---

## 🏠 Adicionando variáveis de ambiente (.env.local)
Existe o arquivo `.env` com todas as variáveis utilizadas para rodar o sistema. Para desenvolvimento local, é preciso criar o arquivo `.env.local` na raiz do projeto e adicionar algumas variáveis, conforme abaixo:

> Adicione as seguintes variáveis para login como admin no sistema:
> - USER=\<user>
> - PASSWORD=\<senha-qualquer>

---

## ▶️ Executando o projeto
- inicie o banco de dados via **docker compose**
  ```bash
  docker-compose up <comando>
  ```
- Instale as dependências **npm i**:
  ```bash
  npm i
  ```

- Se necessário, rode a migração do banco de dados
  ```bash
  npm run <comando>
  ```

- Inicie o [**Express**](https://expressjs.com/pt-br/) em modo de desenvolvimento
  ```bash
  npm run start:dev
  ```

- O Backend iniciará em [http://localhost:3000](http://localhost:3000)

---

## 🧩 Swagger
É possível acessar a documentação da API pelo [Swagger da API](http://localhost:3000/api) e simular os endpoints

---

## 🎲 Migrações de banco de dados
- Ao alterar uma entidade é necessário gerar nova migração para o banco de dados
  ```bash
  npm run <comando>
  ```

- Rodar as migrações para efetivar alterações no banco
  ```bash
  npm run <comando>
  ```
---

## 🧪 Testes:
- Rodar todos os testes
  ```bash
  npm run test
  ```
- Rodar apenas testes unitários
  ```bash
  npm run test:unit
  ```
- Rodar apenas testes de integração
  ```bash
  npm run test:integration
  ```
---

## 🚀 Commits no projeto

O projeto possui [husky](https://github.com/typicode/husky) para verificar alguns passos antes de autorizar o commit.

1. Aplicar correções relacionadas à **Lint**;
3. Validação da mensagem de commit conforme as regras do [conventional-commits](https://www.conventionalcommits.org/en/v1.0.0/);
  - Padrão no desenvolvimento de um card:
  > tipo(#numero_do_card): descrição em inglês (em letras minúsculas)
  - Padrão de desenvolvimento não relacionado a cards
  > tipo(escopo): descrição em inglês (em letras minúsculas)

Exemplos de tipos:
  - feat: introduz uma nova funcionalidade à base de código;
  - fix: correção de um bug na base de código;
  - build: Introduz uma mudança que afeta o build do sistema ou alguma dependência externa (exemplos de escopos: gulp, broccoli, npm);
  - chore: atualização de ferramentas, configurações e bibliotecas 
  - ci: Introduz uma mudança aos arquivos e scripts de configuração do CI/CD (exemplos de escopos: Travis, Circle, BrowserStack, SauceLabs)
  - docs: Alterações na documentação 
  - style: Introduz uma mudança que não afeta o significado do código (remoção de espaços em branco, formatação, ponto e virgula faltando, etc)
  - refactor: Uma mudança no código que nem corrige um bug nem adiciona uma nova funcionalidade
  - perf: Um mundança no código que melhora a performance
  - test: Adicionar testes faltando ou corrigir testes existentes

Exemplos de commits válidos:
  ```bash
  git commit -m "feat(#300): creating auth service"
  git commit -m "fix(#30): correcting product type"
  git commit -m "style(lint): removing some lint warnings"
  git commit -m "docs(readme): removing deploy section from readme"
  ```
---

## 🔗	 Ambiente de desenvolvimento ###

Os ambientes de desenvolvimentos seguem os links abaixo:

| Backend                                  | Swagger                                  | 
|------------------------------------------|-------------------------------------------|
| [Backend](http://localhost:3000)| [Swagger](http://localhost:3000/api)|  

---
