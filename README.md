# Labenu | Desenvolvimento Web Full Stack

 <p align="center">
  <img src="https://i.imgur.com/xUhQLtc.png"/>
</p>

## Backend do Projeto Spotenu

 <p align="center" >
  <img width="20%" src="https://i.imgur.com/MagoMtL.png" />
</p>

<p align="center">

  <img src="https://img.shields.io/static/v1?label=redux&message=library&color=yellow&style=for-the-badge&logo=REDUX"/>
  <img src="https://img.shields.io/static/v1?label=javascript&message=language&color=green&style=for-the-badge&logo=JAVASCRIPT"/>
  <img src="https://img.shields.io/static/v1?label=typescript&message=language&color=blue&style=for-the-badge&logo=TYPESCRIPT"/>

</p>

> Status do Projeto: Em desenvolvimento :warning: 

## Descrição do Projeto

<p align="justify"> 
  Vamos finalizar o curso com chave de ouro fazendo o frontend para simular o Spotify. 
</p>
<p align="justify"> 
  O Spotenu é um projeto que visa facilitar o acesso a músicas pelo mundo. Para isso, vamos dar suporte para dois tipos de usuários: as bandas (ou músicos) e os ouvintes (usuários que consomem as músicas).
  Além disso, nós vamos montar uma operação com funcionários próprios que precisam gerenciar os dados que circulam no nosso sistema. Eles serão os nossos administradores. 
</p>

#### Usuários Músicos
<p align="justify">
  Vamos começar a explicar os usuários que são uma banda. Mesmo que haja músicos solos, nós vamos representar todos eles por uma banda, que deve possuir um nome, um nickname, uma descrição (onde se possa escrever qualquer texto de qualquer tamanho) e uma senha. 
  Quando uma banda de cadastra, ela precisa esperar que um administrador aprove o seu cadastro para pode utilizar a nossa aplicação. 
</p>
<p align="justify">
  As funcionalidades relacionadas a músicos são: criação, edição e deleção de álbuns; e criação, edição e deleção de músicas. Para criar um álbum, devemos informar o nome e relacioná-lo com um conjunto de gêneros. Um álbum pode ser de mais de um gênero musical. Na edição, é possível alterar o nome do álbum e os gêneros dele. Para criar uma música, os músicos devem informar o nome da música e o álbum a qual ela está relacionada.
Só é possível alterar o nome da música. Por fim, sobre a deleção de músicas, não há muito o que explicar, mas a de álbuns tem um comportamento importante: ao se deletar um álbum todas as músicas devem ser deletadas também.  
</p>
<p align="justify">
Para se logar, o usuário músico pode fornecer o email ou o nickname (junto com a senha). Caso ele não tenha sido aprovado ainda, ele não deve ser capaz de se logar na aplicação.
</p>

#### Usuários Ouvintes
<p align="justify">
  Os ouvintes são divididos em duas categorias: pagantes e não pagantes. 
  Os não pagantes só podem acessar a funcionalidade de busca da música, que deve fazer uma busca por termos dos nomes das músicas, com filtro de gênero opcional.
</p>
<p align="justify">
  Já os pagantes tem acesso a isso e mais: playlists próprias. Ao criar uma playlist, basta fornecer um nome. Podem ser adicionadas músicas da playlist, ou retira-las. 
  Todas as playlist são inicialmente privadas e só podem ser modificadas (ou adicionar e retirar músicas) pelo usuário criador. 
  Ele pode tornar a playlist colaborativa, permitindo que qualquer um a veja; e, então, quem for seguidor da playlist também pode a modificar.
</p>
<p align="justify">
  Um usuário ouvinte deve fornecer o nome, o email, nickname e senha no cadastro. Para logar, ele pode usar tanto o email como o nickname (junto com a senha).  
</p>

#### Usuários Administradores 

<p align="justify">
  Os usuários administradores são responsáveis pelo gerenciamento do nosso projeto. 
  Somente um usuário administrador pode cadastrar outro usuário administrador, passando as informações: nome, email, nickname e senha. 
</p>
<p align="justify">
  Eles podem aprovar os músicos (como explicado acima). Além disso, eles também são capazes de adicionar gêneros musicais, passando somente um nome.
</p>
<p align="justify">
  Por fim, há a possibilidade de bloquear qualquer usuário (que não seja um administrador). 
  Quando um usuário for bloqueado ele não pode mais logar na aplicação. 
  Para se logar, um administrador pode informar o email ou o nickname (junto com a senha)
</p>

### Funcionalidades

<br>

 :headphones: <b> 1. Tela de cadastro de usuário ouvinte </b>
 
<br>

 :headphones: <b> 2. Tela de cadastro de usuários administradores </b>

<br>

 :headphones: <b> 3. Tela de cadastro de usuários bandas </b>

<br>

:headphones: <b> 4. Tela de aprovação de bandas </b>

<br>

:headphones: <b> 5. Tela de Login </b>

<br>

:headphones: <b> 6. Tela de home </b>

<br>

:headphones: <b> 7. Tela de ver e adicionar gêneos</b>

<br>

:headphones: <b> 8. Tela de criação de álbuns</b> 

<br>

:headphones: <b> 9. Tela de criação de músicas </b>

<br>

:headphones: <b> 10. Procurar música </b>

<br>

:headphones: <b> 11. Ver detalhe da música </b>

<br>

:headphones: <b> 12. Tonar um usuário não pagante em um pagante </b>

<br>

:headphones:<b> 13. Criação de playlist </b>

<br>

:headphones: <b> 14. Adicionar música a playlist </b>

<br>

:headphones: <b> 15. Retirar música de playlist </b>

<br>

:headphones: <b> 16. Ver todas as playlists </b>

<br>

:headphones: <b> 17. Tornar playlist colaborativa </b>

<br>

:headphones: <b> 18. Seguir playlist colaborativa </b>

<br>

:headphones: <b> 19. Modificar endpoints de playlist </b>

<br>

:headphones: <b> 20. Editar perfil </b>

<br>

:headphones: <b> 21. Editar playlist</b>

<br>

:headphones: <b> 22. Editar música </b>

<br>

:headphones: <b> 23. Deletar música </b>

<br>

:headphones:<b> 24. Deletar álbum </b>

<br>

:headphones: <b> 25. Bloquear usuários ouvintes e músicos </b>

<br><br>

## Deploy

<p align="justify">
  O deploy do projeto foi realizado no firebase e encontra-se disponivel em: [spotenu-erika.surge.sh]
</p>

## Pré-requisitos

:warning: [Node](https://nodejs.org/en/download/)

:warning: [Npm](https://www.npmjs.com/)

## Como rodar a aplicação :arrow_forward:

No terminal, clone o projeto: 

```
git clone https://github.com/nauaramelo/spotenu-front.git
```
Entre no projeto e instale as dependências através do comando:
```
npm install
```
Por último, suba a aplicação: 
```
npm start
```

## Linguagens, dependencias e libs utilizadas :books:

- [Node](https://nodejs.org/en/)
- [Typescript](https://www.typescriptlang.org/)
- [Axios](https://alligator.io/react/axios-react/)
- [AWS](https://aws.google.com/)
- [express](https://expressjs.com/)
- [jwt](https://jwt.io/)
- [knex](http://knexjs.org/)
- [moment](https://momentjs.com/docs/)
- [uuid](https://www.uuidgenerator.net/)
- [bcrypt](https://www.npmjs.com/package/bcryptjs)
- [dotenv](https://www.npmjs.com/package/dotenv)

## Stack

Esse é um projeto de Backend feito utilizando NodeJS, Express, Typescript 
e MySQL. Além disso, ele segue uma arquitetura baseada em MVC, com 3 camadas 
simples:

:rocket: <b>1. Controller</b>: responsável pela comunicação com agentes externos 
(como o Frontend)</br>
:rocket: <b>2. Model</b>: responsável pela representação das nossas entidades </br>
:rocket: <b>3. Business</b>: responsável pela lógica de negócio</br>
:rocket: <b>4.DTO</b> significa Data Transfer Object,e ele representa os tipos de dados que precisam ser passados dentrode cada transação com o banco.

## Desenvolvido Por :octocat:

| [Likedin](https://www.linkedin.com/in/erika-skarda-99915488/) | 
| :---: |





