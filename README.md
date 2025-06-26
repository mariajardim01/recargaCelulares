

---

# 📱 Recarga Celulares - API

Esta é uma API para realizar recargas de celulares, construída com **Node.js**, **Express**, **TypeScript** e integrada com **PostgreSQL** para persistência de dados. O projeto fornece endpoints para realizar operações de recarga e consulta de registros.

## 🌐 API Deployada

👉 Acesse em: [https://recargacelulares.onrender.com](https://recargacelulares.onrender.com)

---

## 🚀 Tecnologias Utilizadas

* **Node.js** e **Express** para a camada de servidor
* **TypeScript** para tipagem e qualidade de código
* **PostgreSQL** para o armazenamento dos dados
* **Joi** para validação de dados de entrada
* **Dotenv** para gestão de variáveis de ambiente
* **Node-Postgres (pg)** para integração com o banco de dados

---

## 📋 Pré-requisitos

Antes de rodar, garanta que tem instalados:

* Node.js (versão 18 ou superior recomendada)
* PostgreSQL e uma database criada
* npm ou yarn para gerenciamento de dependências

---

## ⚡️ Instalação e Configuração

### Clone o repositório

```bash
git clone https://github.com/mariajardim01/recargaCelulares.git
cd recargaCelulares
```

### Instale as dependências

```bash
npm install
```

### Configure as variáveis de ambiente (.env)

Exemplo:

```env
DATABASE_URL=postgres://user:password@host:port/database
PORT=3000
```

---

## 🔥 Scripts para Rodar o Projeto

### Compilar o TypeScript

```bash
npm run build
```

### Iniciar o Servidor

```bash
npm run start
```

### Modo desenvolvimento (usando ts-node-dev)

```bash
npm run dev
```

---

## 📱 REST API Documentation

### 🩺 Health Check

#### GET `/health`

Verifica se o servidor está ativo.

Exemplo:

```
GET https://postman-rest-api-learner.glitch.me//health
```

**Respostas**:

* `200 OK` – Retorna detalhes básicos de status.

---

### 📞 Phones

#### GET – Consulta um telefone por CPF

Recupera as informações de um telefone específico.

**Endpoint**:

```
GET https://postman-rest-api-learner.glitch.me//phones/{cpf}
```

Exemplo:

```
GET https://postman-rest-api-learner.glitch.me//phones/34135112449
```

**Respostas**:

* `200 OK` – Retorna dados do telefone.
* `404 Not Found` – Não encontrado.

#### POST – Cadastra um telefone

Cadastra um novo telefone no sistema.

**Endpoint**:

```
POST https://postman-rest-api-learner.glitch.me//phones
```

Exemplo de corpo (JSON):

```json
{
  "cpf": "34135112449",
  "name": "Maria",
  "description": "...",
  "number": "21112512231",
  "carrier": "Vivo"
}
```

**Respostas**:

* `201 Created` – Telefone registrado com sucesso.
* `400 Bad Request` – Dados ausentes ou incorretos.

---

### 💳 Recharge (Recarga)

#### POST – Realiza uma nova recarga

Efetua uma nova recarga para uma linha cadastrada.

**Endpoint**:

```
POST https://postman-rest-api-learner.glitch.me//recharges
```

Exemplo de Corpo (JSON):

```json
{
  "id_number": 1,
  "value": 100
}
```

**Respostas**:

* `201 Created` – Recarga efetuada com sucesso.
* `400 Bad Request` – Parâmetros ausentes ou incorretos.

#### GET – Consulta recargas por número

Recupera todas as recargas associadas a um número específico.

**Endpoint**:

```
GET https://postman-rest-api-learner.glitch.me//recharges/{phone_number}
```

Exemplo:

```
GET https://postman-rest-api-learner.glitch.me//recharges/21112212231
```

**Respostas**:

* `200 OK` – Retorna todas as recargas do número informado.
* `404 Not Found` – Nenhuma recarga encontrada para o número informado.

---

### 📋 Summary

#### GET – Consulta o resumo

Recupera o histórico e detalhes para um CPF específico.

**Endpoint**:

```
GET https://postman-rest-api-learner.glitch.me//summary/{cpf}
```

Exemplo:

```
GET https://postman-rest-api-learner.glitch.me//summary/34135112443
```

**Respostas**:

* `200 OK` – Retorna detalhes do histórico e saldo associado ao CPF.
* `404 Not Found` – Nenhuma informação encontrada para o CPF especificado.

---


## 🔥 Exemplo de Uso

Realização de Recarga:

**Requisição**:

```
POST https://recargacelulares.onrender.com/recharge
Content-Type: application/json
```

Corpo:

```json
{
  "phone": "11988887777",
  "amount": 30
}
```

**Resultado esperado**:

```json
{
  "id": 1,
  "phone": "11988887777",
  "amount": 30,
  "status": "success",
  "timestamp": "2025-06-26T10:00:00.000Z"
}
```

---

## ⚡️ Deploy

Esta API está atualmente publicada no Render e pode ser acessada através do link:

👉 [https://recargacelulares.onrender.com](https://recargacelulares.onrender.com)

---


