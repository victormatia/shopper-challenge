# Aplicação de Transporte Particular 🚗

## Descrição
Este projeto é um teste técnico para a criação de uma aplicação full-stack de transporte particular. A aplicação permite solicitar viagens entre dois pontos, escolher motoristas com base em preço e histórico, e listar viagens anteriores.

## Tecnologias Utilizadas
- **Backend:** Node.js com TypeScript
- **Frontend:** React com TypeScript
- **Banco de Dados:** Modelagem básica conforme especificações
- **Docker:** Para containerização
- **Git:** Versionamento de código
- **API Externa:** Google Maps API (Routes)

---

## Estrutura do Projeto
- `/backend`: API REST com endpoints para estimativa, confirmação e histórico de viagens.
- `/frontend`: SPA com telas para solicitação, visualização de opções e histórico.
- `docker-compose.yml`: Configuração para subir o projeto completo em containers.

---

## Requisitos Funcionais

### ✅ Backend:
- **API REST em Node.js com TypeScript**
  - **Endpoints:**

#### 1. `POST /ride/estimate`
  - **Descrição:** Calcula a estimativa da viagem entre dois pontos.
  - **Request Body:**
    ```json
    {
      "customer_id": "string",
      "origin": "string",
      "destination": "string"
    }
    ```
  - **Respostas:**
    - **200 OK:**
      ```json
      {
        "origin": { "latitude": number, "longitude": number },
        "destination": { "latitude": number, "longitude": number },
        "distance": number,
        "duration": "string",
        "options": [
          {
            "id": number,
            "name": "string",
            "description": "string",
            "vehicle": "string",
            "review": { "rating": number, "comment": "string" },
            "value": number
          }
        ],
        "routeResponse": { ... }
      }
      ```
    - **400 Bad Request:**
      ```json
      {
        "error_code": "INVALID_DATA",
        "error_description": "string"
      }
      ```

#### 2. `PATCH /ride/confirm`
  - **Descrição:** Confirma a viagem e salva no banco de dados.
  - **Request Body:**
    ```json
    {
      "customer_id": "string",
      "origin": "string",
      "destination": "string",
      "distance": number,
      "duration": "string",
      "driver": {
        "id": number,
        "name": "string"
      },
      "value": number
    }
    ```
  - **Respostas:**
    - **200 OK:**
      ```json
      {
        "success": true
      }
      ```
    - **400 Bad Request:**
      ```json
      {
        "error_code": "INVALID_DATA",
        "error_description": "string"
      }
      ```
    - **404 Not Found:**
      ```json
      {
        "error_code": "DRIVER_NOT_FOUND",
        "error_description": "string"
      }
      ```
    - **406 Not Acceptable:**
      ```json
      {
        "error_code": "INVALID_DISTANCE",
        "error_description": "string"
      }
      ```

#### 3. `GET /ride/{customer_id}?driver_id={id}`
  - **Descrição:** Lista o histórico de viagens realizadas por um usuário.
  - **Respostas:**
    - **200 OK:**
      ```json
      {
        "customer_id": "string",
        "rides": [
          {
            "id": number,
            "date": "datetime",
            "origin": "string",
            "destination": "string",
            "distance": number,
            "duration": "string",
            "driver": {
              "id": number,
              "name": "string"
            },
            "value": number
          }
        ]
      }
      ```
    - **400 Bad Request:**
      ```json
      {
        "error_code": "INVALID_DRIVER",
        "error_description": "string"
      }
      ```
    - **404 Not Found:**
      ```json
      {
        "error_code": "NO_RIDES_FOUND",
        "error_description": "string"
      }
      ```

---

### ✅ Frontend:
- [ ] **SPA em React e TypeScript**
  - Telas:
    - [ ] Solicitação de Viagem
    - [ ] Opções de Viagem
    - [ ] Histórico de Viagens
  - Funcionalidades:
    - [ ] Formulário de solicitação com origem e destino.
    - [ ] Exibir opções de motoristas com informações detalhadas.
    - [ ] Mostrar histórico de viagens filtrado por motorista.
    - [ ] Tratamento de erros visíveis ao usuário.

### ✅ Docker:
- [ ] Backend exposto na porta 8080.
- [ ] Frontend exposto na porta 80.
- [ ] Arquivo `docker-compose.yml` funcional.
- [ ] Variável de ambiente `GOOGLE_API_KEY`.