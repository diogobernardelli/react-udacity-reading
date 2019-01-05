# Udacity Projeto Leitura

Projeto em react-redux para a finalização do módulo `react-redux` da Udacity.

## Pré-requisitos

> node >= 8

### Servidor

> - git clone git@github.com:diogobernardelli/react-udacity-reading.git
> - cd react-udacity-reading/server
> - yarn install
> - yarn start

## Aplicação Front-End

> - cd react-udacity-reading/app
> - yarn install
> - yarn start

## Screenshots

## RootView
![alt text](https://i.ibb.co/f4SnRqJ/Captura-de-Tela-2018-12-30-a-s-04-39-14.png)

## RootView - Nova Publicação
![alt text](https://i.ibb.co/xfdpt86/Captura-de-Tela-2018-12-30-a-s-04-39-38.png)

## Detalhes da Publicação
![alt text](https://i.ibb.co/tcdMZG1/Captura-de-Tela-2018-12-31-a-s-14-39-45.png)

## Adicionar Novo Comentário
![alt text](https://i.ibb.co/2Nxm850/Captura-de-Tela-2018-12-31-a-s-14-39-58.png)

## Especificação
Funcionalidades desejadas na applicação.

### Dados
Há três tipos de objetos armazenados no servidor:

#### Categories
 - Posts
 - Comments
 - Categories

O servidor suporta um número pequeno e fixo de categorias que os usuários podem postar baseando-se. As categories são objetos simples contendo um nome um um caminho de URL (normalmente a mesma string). O servidor não possui métodos para criar/modificar/deletar essas categorias. Se você deseja adicionar categorias para o seu app, simplesmente adicione o objeto desejado à Array em categories.js no servidor fornecido.

#### Posts
As postagem são os blocos de construção de seu aplicativo. Elas incluem:

|Atributo	|Tipo	|Descrição|
|---------|-----|---------|
|id	|String	|Identificador único|
|timestamp	|Integer	|Data de criação - dados default rastreiam isto em Unix time. Você pode usar Date.now() para obter este número|
|title	|String	|Título do post|
|body	|String	|Corpo do post|
|author	|String	|Autor do post|
|category	|String	|Deve ser uma das categorias fornecidas pelo servidor|
|voteScore	|Integer	|Votos líquidos que a postagem recebeu (default: 1)|
|deleted	|Boolean	|Marcado se o post foi 'deletado' (sem acesso no front end), (default: false)|

#### Comments
Os comentários são anexados às postagens mães. Eles incluem:

|Atributo	|Tipo	|Descrição|
|---------|-----|---------|
|id	|String	|Identificador único|
|parentId	|String	|id do post pai|
|timestamp	|Integer	|Data de criação - dados default rastreiam isto em Unix time. Você pode usar Date.now() para obter este número|
body	|String	|Corpo do comentário|
author	|String	|Autor do comentário|
voteScore	|Integer	|Votos líquidos que a postagem recebeu (default: 1)|
deleted	|Boolean	|Marcado se o post foi 'deletado' (sem acesso no front end), (default: false)|
parentDeleted	|Boolean	|Marcado quando o post pai foi deletado, mas o comentário em si não foi.|

:warning: **Este aplicativo é anônimo, sem autenticação ou autorização. Não há nenhum objeto user, e comentários e postagens aceitam qualquer nome de usuário/nome para criação e edição.**

:warning: **O servidor é muito leve. Ele executa zero validações de dados para impor os tipos de dados acima. Certifique-se de que você está usando os tipos corretos quando enviar requisições ao servidor.**

### Views
Seu aplicativo deve ter, no mínimo, quatro views:

- **Padrão (Root)**
  - deve listar todas as categorias disponíveis, que devem se conectar a uma view de categoria para esta categoria
  - deve listar todas as postagens ordenadas pelo voteScore (começando pela pontuação mais alta)
  - deve ter um controle para modificar o método de ordenação da lista, incluindo, no mínimo, ordenar por voteScore e ordenar por data de criação
  - deve ter um controle para adicionar novas postagens
- **View de Categoria**
  - idêntica à view padrão, mas filtrada para incluir somente postagens com a categoria selecionada
- **View de Detalhe da Postagem**
  - deve mostrar os detalhes da postagem, incluindo: título, corpo, autor, data de criação em formato legível pelo usuário e pontuação dos votos
  - deve listar todos os comentários daquela postagem, ordenados por voteScore (começando pelo mais alto)
  - deve ter controles para editar ou remover a postagem
  - deve ter um controle para adicionar um novo comentário
  - implemente o formulário de comentários da forma que quiser (em linha, modal, etc.)
  - os comentários também devem ter controles para edição ou exclusão
- **Criar/Editar a View**
  - deve ter um formulário para criar novas postagens ou editar as existentes
  - ao editar, os dados existentes devem ser povoados no formulário
UI de Comentários/Postagens

:warning: **Postagens e comentários, em todas as views onde são exibidos, devem exibir a pontuação atual e ter controles para incrementar ou diminuir o voteScore do objeto. As postagens devem exibir o número de comentários associados a elas.**

## Docs

Informações sobre a API e como utilizá-la podem ser encontradas neste [README file](https://github.com/udacity/reactnd-project-readable-starter/blob/master/api-server/README.md).