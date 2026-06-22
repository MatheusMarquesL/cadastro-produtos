# Documentação do Projeto: Catálogo de Produtos
## Autor: Matheus Marques Larréa
### Descrição do Projeto

Este é um aplicativo mobile de catálogo de produtos desenvolvido em React Native com Expo. O objetivo da atividade é consumir dados de uma API externa e sincronizá-los em um banco de dados local utilizando o SQLite, garantindo que o aplicativo funcione mesmo quando o dispositivo estiver sem conexão com a internet (Offline-First).
Funcionalidades

    Listagem de Produtos: Exibe todos os itens armazenados localmente no dispositivo.

    Sincronização (Sync): Busca os produtos da API e os salva no banco SQLite local sempre que a tela inicial é aberta.

    Modo Offline: Caso a API fique indisponível ou o aparelho perca a conexão, o aplicativo busca e exibe os dados salvos no SQLite.

    Cadastro de Produtos: Envia novos itens para a API e os armazena de forma imediata no banco local.

    Exclusão de Produtos: Apaga os registros simultaneamente na API e no SQLite.

### Tecnologias Utilizadas

    React Native

    Expo

    Expo Router

    TypeScript

    SQLite (expo-sqlite)

    Axios

    Shopify FlashList

### Estrutura do Projeto

    app/_layout.tsx: Configura a navegação em pilha (Stack) e inicializa o banco de dados SQLite.

    app/index.tsx: Tela principal contendo a listagem de produtos com FlashList e o botão para cadastrar.

    app/produtos.tsx: Tela do formulário para adicionar novos produtos.

    src/components/ProdutoItem.tsx: Componente visual do card que exibe as informações de cada produto na lista.

    src/database/database.ts: Configuração do banco de dados e execução dos comandos SQL puros (CREATE, INSERT, SELECT, DELETE).

    src/services/api.ts: Configuração do Axios para comunicação com a API REST.

    src/services/sync.ts: Lógica responsável por baixar os dados da API e salvá-los no SQLite.

    src/types/Produto.ts: Definição dos campos e tipos que estruturam o objeto de um produto.

### Instruções para Execução

    Instale todas as dependências do projeto executando o comando:
   

    npm install

    Configure a URL da sua API no arquivo src/services/api.ts.

    Inicie o servidor de desenvolvimento do Expo com o comando:
 

    npx expo start

    Abra o aplicativo Expo Go no seu celular e escaneie o código QR exibido no terminal.
