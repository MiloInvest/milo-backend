# ▶️ Como Rodar o Projeto

Você pode rodar o backend de duas maneiras: utilizando Docker (método recomendado para simplicidade) ou configurando o ambiente localmente.

### Método 1: Com Docker (Recomendado)

Esta é a forma mais rápida de ter a aplicação e o banco de dados rodando sem precisar instalar nada além do Docker.

1.  **Pré-requisitos:**
    * [Docker](https://www.docker.com/products/docker-desktop/) instalado e em execução.

2.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/milo-invest/milo-backend.git](https://github.com/milo-invest/milo-backend.git)
    cd milo-backend
    ```

3.  **Variáveis de Ambiente:**
    Crie um arquivo `.env` na raiz do projeto, baseado no arquivo de exemplo `.env.example`.
    ```bash
    cp .env.example .env
    ```
    *Ajuste as variáveis no arquivo `.env` se necessário. As configurações padrão já devem funcionar com o `docker-compose`.*

4.  **Inicie os contêineres:**
    Use o Docker Compose para construir as imagens e iniciar os serviços da API e do banco de dados.
    ```bash
    docker-compose up --build
    ```
    A API estará disponível em `http://localhost:3000`.

### Método 2: Ambiente Local

Siga estes passos se preferir rodar a aplicação diretamente na sua máquina.

1.  **Pré-requisitos:**
    * [Node.js](https://nodejs.org/) (versão 16 ou superior)
    * [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
    * Uma instância do **PostgreSQL** rodando localmente ou em um contêiner.

2.  **Clone o repositório e instale as dependências:**
    ```bash
    git clone [https://github.com/milo-invest/milo-backend.git](https://github.com/milo-invest/milo-backend.git)
    cd milo-backend
    npm install
    ```

3.  **Variáveis de Ambiente:**
    Crie o arquivo `.env` (usando `cp .env.example .env`) e configure a variável `DATABASE_URL` para apontar para a sua instância do PostgreSQL.

4.  **Rode as Migrations (se aplicável):**
    Para criar as tabelas no banco de dados, execute:
    ```bash
    npm run prisma:migrate # (Exemplo, ajuste para o seu comando de migration)
    ```

5.  **Inicie a aplicação em modo de desenvolvimento:**
    ```bash
    npm run start:dev
    ```
    O servidor iniciará com hot-reloading em `http://localhost:3000`.

## 🧪 Rodando os Testes

A qualidade do código é fundamental. O projeto possui uma suíte de testes para garantir a estabilidade e o correto funcionamento da lógica de negócio.

Para executar os testes, utilize os seguintes comandos:

```bash
# Rodar testes unitários
npm run test

# Rodar testes de integração (end-to-end)
npm run test:e2e

# Gerar o relatório de cobertura de testes
npm run test:cov
```
