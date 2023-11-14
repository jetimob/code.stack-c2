# Code.Stack desafio 2 (code.stack-c2)

<!-- TOC -->
* [Code.Stack desafio 2 (code.stack-c2)](#codestack-desafio-2-codestack-c2)
  * [Visão Geral do Projeto 🌟](#visão-geral-do-projeto-)
  * [Tecnologias Utilizadas 🚀](#tecnologias-utilizadas-)
  * [Objetivos do Desafio 🎯](#objetivos-do-desafio-)
  * [Requisitos do Desafio ✅](#requisitos-do-desafio-)
    * [Front-end de Gêneros](#front-end-de-gêneros)
    * [Testes para Autores](#testes-para-autores)
    * [Implementação e Correção de Rotas](#implementação-e-correção-de-rotas)
    * [Bônus](#bônus)
  * [Como Submeter 📝](#como-submeter-)
  * [Considerações Finais 📌](#considerações-finais-)
  * [Instruções para executar o projeto 💿](#instruções-para-executar-o-projeto-)
  * [Dúvidas](#dúvidas)
<!-- TOC -->

## Visão Geral do Projeto 🌟
Este projeto é uma biblioteca particular onde os usuários podem adicionar, visualizar e gerenciar livros, autores e
gêneros. Cada livro no sistema possui uma avaliação e está vinculado a um autor e um gênero específico.

## Tecnologias Utilizadas 🚀
- Laravel
- React
- Docker
- PostgreSQL

## Objetivos do Desafio 🎯
O desafio consiste em implementar e aperfeiçoar a parte de gêneros no sistema, além de outros componentes fundamentais.
Isso inclui:

- Implementação Front-end de Gêneros 🖥️: Visualização, edição e listagem de gêneros.
- Desenvolvimento de Testes para Autores 🔍: Implementar testes em PHP para a funcionalidade de autores.
- Implementação das Rotas de Gêneros 🚏: Desenvolver as rotas de visualização, criação, edição e remoção de gêneros.
- Correção de Bug 🐛: Identificar e corrigir um bug na ordenação padrão na página de gêneros.
- Segurança de Rotas 🔐: Proteger as rotas dos recursos, como http://localhost/api/v1/authors, que atualmente estão desprotegidas.

## Requisitos do Desafio ✅
### Front-end de Gêneros
- Utilize os padrões de código já implementados para livros e autores. 📘👩‍💻
- As funções incluem visualizar, adicionar, editar e excluir gêneros. 🖼️✍️🗑️

### Testes para Autores
- Desenvolva testes em PHP focados na funcionalidade dos autores. 🧪
- Baseie-se nos testes existentes para os livros.

### Implementação e Correção de Rotas
- Implemente as rotas de CRUD para gêneros. ➕🔄❌
- Corrija o bug de ordenação na página de gêneros. 🐞🛠️
- Assegure a segurança de todas as rotas de API. 🛡️

### Bônus
- Implemente filtros adicionais na listagem de livros. 🔍📚

### Desafio Extra

> Para aqueles que desejam ir além, há a opção de implementar a funcionalidade de editoras:

- Front-end: Desenvolver a interface para adicionar, visualizar, editar e excluir editoras.
- Back-end: Implementar a lógica de negócios para gerenciar editoras.
- Testes: Criar testes robustos para a funcionalidade de editoras.
- Migração de Dados: Desenvolver as migrações necessárias para suportar editoras no banco de dados.
- Vínculo com Livros: Assegurar que cada livro possa ser associado a uma editora.

*(Esta é uma funcionalidade opcional, destinada a candidatos que desejam demonstrar habilidades extras)*

### Desafio Extra 2 (Avançado) 

- Front-end: Desenvolver a interface para adicionar, visualizar, editar, excluir empréstimos e gerenciar pessoas.
- Back-end: Implementar a lógica de negócios para gerenciar empréstimos e pessoas.
- Testes: Criar testes robustos para a funcionalidade de empréstimos e pessoas.
- Migração de Dados: Desenvolver as migrações necessárias para suportar empréstimos e pessoas no banco de dados.
- Vínculo com Livros: Assegurar que cada livro possa ser associado a um empréstimo.
- Regras de negócio:
   - Uma pessoa pode ter no máximo 3 empréstimos em aberto.
   - Um livro não pode ser emprestado se já estiver emprestado.
   - Um livro não pode ser emprestado se estiver atrasado.
   - O prazo de devolução é de 7 dias.
   - O histórico de empréstimos deve ser mantido.
   - O histórico de empréstimos deve ser exibido para cada livro (na página de visualização de um livro).
   - O histórico de empréstimos deve ser exibido para cada pessoa (na página de visualização de uma pessoa).
   - Deve haver uma página dedicada para gerenciar empréstimos e consultar o histórico.
   - Deve haver uma página dedicada para gerenciar pessoas e consultar o histórico de empréstimos de cada pessoa.
   - Deve haver uma página dedicada para visualizar empréstimos atrasados.
   - Na listagem de empréstimos, livros atrasados devem ser destacados e exibidos no topo da lista.

*(Esta é uma funcionalidade opcional, destinada a candidatos que desejam demonstrar habilidades extras)*

## Como Submeter 📝
1. Fork o Repositório: Inicie criando um fork do projeto. 🍴
2. Clone o Seu Fork: Trabalhe localmente em sua máquina. 💻
3. Desenvolvimento: Siga as regras acima para desenvolver as funcionalidades e correções. 🛠️👨‍💻
4. Documente suas Mudanças: Descreva todas as implementações e correções no Pull Request. 📝
5. Pull Request: Envie um Pull Request para o repositório original detalhando suas mudanças e implementações. 📤 

## Considerações Finais 📌
- Mantenha o código limpo e siga as práticas de codificação padrão. 🧼👍
- Teste suas implementações cuidadosamente. 🧐📊
- Documente qualquer nova funcionalidade ou correção no Pull Request. 📄🖊️

## Instruções para executar o projeto 💿

> [!NOTE]
> Para instalar o docker e o docker-compose, siga as instruções em https://docs.docker.com/get-docker/

1. Clone o repositório
2. Navegue até raíz do projeto
3. Execute o comando `docker run --rm -v $(pwd):/app composer install` para instalar as dependências do PHP
    1. No windows, execute `docker run --rm -v %cd%:/app composer install` 
4. Execute `docker compose up -d` para iniciar as dependências do projeto
5. Execute `docker exec -it code.stack-app php artisan migrate --seed` para criar as tabelas no banco de dados e popular as tabelas
6. Acesse o endereço `http://localhost`
7. Divirta-se!

## Instruções para executar os testes 🐞

Execute `docker container exec -it code.stack-app php artisan test --testsuite Feature `

> [!NOTE]
> Para executar os testes, é necessário que o projeto esteja rodando. Siga as instruções acima para executar o projeto.\
> Ao executar os testes, os dados do banco de dados serão apagados.\
> Execute `docker exec -it code.stack-app php artisan db:seed` para popular o banco de dados novamente.

## Dúvidas

Caso tenha alguma dúvida, crie uma issue neste repositório para que todos possam acompanhar a discussão e a solução.

> [!WARNING]
> Este é um projeto exemplo! **NUNCA** compartilhe o arquivo `.env` com ninguém, muito menos em um repositório público.
