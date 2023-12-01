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




=====================================================================================
=================================ADIÇÕES=============================================

--PROTEÇÃO DE ROTAS
- Adicionado o CRUD de gêneros, criando-se controllers e services.

- Foi implementado uma proteção simples com auth:sanctum excetuando-se as rotas de GET dos livros, ou seja Route::apiResource('books', BookController::class)->only(['index', 'show']); foi criado fora da middleware de proteção de rotas.

- Fez-se a adição de um usuário de teste para rodar os testes em BookTest.php; os testes que estavam implementados agora estão passando. OBS: Em outro caso eu teria utilizado o JWT para as autenticações, mas não tinha certeza de quantas alterações seriam necessárias nos arquivos, mantive o auth sanctum que já estava encaminhado.

- Foram criados oito testes para autores. Estes incluem testes para criação, atualização, deleção, validação das chaves inseridas na criação e atualização e também o GET das informações para usuários autenticados e não autenticados (entendi que não haveria problema desproteger esta rota específica.)

Os testes devem aparecer exatamente assim:

✓ successfully create an author                                                                      
✓ successfully update an author                                                                     
✓ fail to update an author with invalid data                                                                       
✓ successfully delete an author                                                                     
✓ show all authors for authenticated users                                                                      
✓ show all authors for unauthenticated users                                                                      
✓ show a specific author for authenticated users                                                                      
✓ show a specific author for unauthenticated users 

- Alteração da rota de autores, expondo os métodos GET e protegendo a criação, atualização e deleção.

- Observação menor: Instalei o composer afim de utilizar o JWT mas mudei o caminho e não desfiz a instalação.

Observações importantes: 
- Entendi que não deveria mexer em relacionamento e tabelas além das especificações, então não aprofundei na proteção de rotas e nem alterei a lógica de outras etapas. Se isto era um dos objetivos apenas gostaria de saber ao receber o feedback.

- Por alguma razão, foi impossível fazer o front end funcionar dentro do container. Após inúmeras tentativas, optei pela rota de que, por ser um desafio, eu não entraria em contato com a equipe e deveria, por mim mesmo, providenciar uma solução da melhor maneira possível. Assim, iniciei um repoitório separado, copiando todas as configurações e mantendo as mesmas dependências iniciais.


RESULTADO: Não foi possível acessar o front-end da aplicação corretamente. Não parece haver problemas de configuração nos arquivos docker e nem houveram erros que deixassem claro o porque de não ser possível acessar através da url exposta que era o localhost://5173. O resultado era apenas uma página padrão de integração entre o laravel e o React. Todas as tentativas de mudança de configuração não alteraram o resultado. 

- Repositório separado:
Ao copiar os arquivos package.json e os arquivos presentes na pasta resources/js para o novo diretório, a aplicação carregou normalmente na página de login. Porém não foi possível estabelecer conexão com a base de dados. As alterações para essa tentativa de conexão foi a criação de um arquivo .env na seguinte configuração:

VITE_API_URL=http://localhost:8000/api/v1
VITE_APP_URL=http://localhost:3000


- Também alterou-se o cors.php, para efeitos de teste, permitindo credenciais

 'supports_credentials' => true,

porém essa configuração não alterou as mensagens de erro.



 - Tentei também a exposição da porta 8000 da API adicionando a seguinte linha na seção app:
 
 ports:
     - "8000:8000" 
  
sem sucesso.

- Houve algum efeito ao alterar, no diretório fora do docker, ao retirar o referer.

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
    headers: {
        'Accept': 'application/json'
        // 'Referer': import.meta.env.VITE_APP_URL,   
    },
});

Comentar o referer removeu os erros que o console mostrava relativo a não aceitação do referer que foi considerada pouco segura. Não sabendo mais como estabelecer a conexão, abro mão de tentar resolver o front end.

As modificações da aplicação dockerizada para tentar resolver o problema do front end não serão adicionadas a submissão.