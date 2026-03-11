# Products API

API REST para cadastro e gerenciamento de produtos.

## Tecnologias utilizadas

- Node.js
- TypeScript
- Express
- Prisma ORM
- PostgreSQL
- Docker
- JWT (autenticação)
- Multer (upload de imagem)

## Rotas da API

### Autenticação

**POST /auth/register**

Cria um novo usuário.

Body:
```json
{
  "name": "Nome",
  "email": "email@email.com",
  "password": "123456"
}
````

---

**POST /auth/login**

Realiza login e retorna um token JWT.

Body:

```json
{
  "email": "email@email.com",
  "password": "123456"
}
```

---

### Produtos

**GET /products**

Lista todos os produtos.
Rota pública.

---

**POST /products**

Cria um novo produto.
Requer autenticação.

Body (multipart/form-data):

* codigo_produto
* descricao_produto
* foto (opcional)

Header:

```
Authorization: Bearer TOKEN
```

---

**PUT /products/:id**

Atualiza um produto existente.
Requer autenticação.

Header:

```
Authorization: Bearer TOKEN
```

---

**DELETE /products/:id**

Remove um produto.
Requer autenticação.

Header:

```
Authorization: Bearer TOKEN
```

---

## Banco de dados

PostgreSQL rodando em Docker.

Connection string utilizada:

```
postgresql://admin:admin@localhost:5432/produtos
```
