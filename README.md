# TFC - Trybe Futebol Clube

## Sobre o projeto:

Esse projeto foi desenvolvimento a fim de fixar os conteúdos aprendidos no módulo de Back-End na Trybe:
 - Docker;
 - MySQL;
 - NodeJs;
 - Express;
 - Arquitetura de software (MSC);
 - Sequelize: ORM (Object-Relational Mapper);
 - JSON Web Token (JWT);
 - Testes de integração;
 - TypeScript;
 - Programação Orientada a Objetos (POO);
 - Princípios SOLID.
 
Consiste em uma aplicação Full-Stack, onde o Front-End foi fornecido pela a Trybe, sendo minha responsabilidade o desenvolvimento de todo o Back-End. Em relação a este, foi desenvolvido uma `API Rest` utilizando `Node Js`, `Express` e `TypeScript`, por meio da arquitetura de software `MSC`. Ainda, foram adotados na construção o `POO`, `SOLID` e `Testes de integração` das rotas com as ferramentas `Mocha`, `Chai` e `Sinon`.

Foi utilizado o `MySQL` como sistema de gerenciamento de banco de dados e, além disso, para criar o banco de dados e as tabelas, bem como, manipular os dados do database através de operações de `CRUD`, foi utlizado o `Sequelize` como `OMR`.
Por fim, a API criada atua no gerenciamento de dados sobre partidas e classificações de times de futebol, vinculada ao Front-End fornecido pela Trybe.

## Orientações para a Execução:

<details>
  <summary><strong>Com Docker</strong></summary><br />
  
  - Execute os containers com o comando `npm run compose:up`.

  A aplicação Front-End estará disponível no endereço `http://localhost:3000` no seu navegador.
  
  A aplicalção Back-end estará disponível na porta `3001`.
  
  O MySQL estará disponível na porta `3002`.
</details>

<details>
  <summary><strong>Localmente</strong></summary><br />
  
  - Primeiramente, acesse o caminho `./app/backend` e execute os comandos:
    - `npm install` para instalar as dependências;
    - `npm start` para iniciar o projeto;
    
  - No caminho `./app/frontend` execute os comandos:
    - `npm install` para instalar as dependências;
    - `npm start` para iniciar o projeto;
    
  É necessário possuir o MySQL ativo na máquina local e inserir as credenciais de conexão no arquivo localizado em `./app/backend/.env.example` e em seguida renomeá-lo para `.env`.
  
  O Front-End estará disponível no endereço `http://localhost:3000` no seu navegador.
  
  A aplicação Back-End estará disponível na porta informada na variável de ambiente `APP_PORT` do arquivo `.env`.
</details>

