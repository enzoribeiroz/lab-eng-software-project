# VLibras Plugin / Widget

**DEV Guide** *fev/2021*

------------------------------------------------------------------------

## I. Introdução

Esse documento é um guia de desenvolvimento para entender melhor as
ferramentas VLibras Plugin e VLibras Widget.

## II. Breve descrição

O VLibras Plugin e Widget são ferramentas desenvolvidas em Javascript
para uso de tradução automática de português para LIBRAS em páginas web,
tornando-as acessíveis.

### Principais diferenças

-   **Plugin**: instalado no navegador e ativado por seleção de texto +
    clique direito.
-   **Widget**: embarcado diretamente no site e aberto por ícone.

### Personalização

-   Arquivo JSON com aparência do avatar.
-   Opacidade configurável (0--1).
-   Suporte aos avatares Ícaro e Hozana.

## III. Arquitetura

Fluxo:

1.  Usuário seleciona texto.
2.  Widget/Plugin envia requisição à API.
3.  Texto traduzido em glosa.
4.  Player Unity/WebGL recebe ação.
5.  Avatar reproduz sinais em LIBRAS.
6.  Barra de progresso acompanha a animação.

### Repositórios

`vlibras-player-webjs` - Middleware entre frontend e Player Unity.

`vlibras-web-browsers` - Interface, componentes e lógica Widget/Plugin.

## IV. Manual de Testes

### Instalação

``` bash
npm install
npm run build
```

### Build Widget

``` bash
npm run gulp build:widget
```

### Build Safari

``` bash
npm run gulp build:safari
```

### Build WebExtensions

``` bash
npm run gulp build:webextensions
```

### Build completa

``` bash
npm run gulp build
```

### Executar Widget

``` bash
npm run gulp run:widget
```

Abrir: `http://localhost:8080/`

### Teste Plugin

1.  Abrir tela de extensões.
2.  Ativar modo desenvolvedor.
3.  Carregar pasta `webextensions`.
4.  Selecionar texto → Traduzir para LIBRAS.

Contato: suanny@lavid.ufpb.br
