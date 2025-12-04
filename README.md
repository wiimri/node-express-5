# 💎 Desafío 5: Tienda de Joyas  
API RESTful con Node.js, Express y PostgreSQL

Este proyecto corresponde al Desafío 5 del módulo.  
Consiste en construir una API que permita consultar diferentes joyas, filtrar, paginar resultados y registrar logs de cada solicitud.

---

## 🚀 Tecnologías utilizadas

- Node.js
- Express.js
- PostgreSQL
- pg (driver oficial para PostgreSQL)
- Morgan / Logger Middleware personalizado
- Dotenv para variables de entorno
- Thunder Client / Postman para pruebas
- Manejo de errores centralizado (middleware)

---

# 📦 Instalación y configuración

## 1️⃣ Clonar el repositorio

```bash
git clone https://github.com/wiimri/node-express-5.git
cd node-express-5
```

## 2️⃣ Instalar dependencias
npm install

## 3️⃣ Crear la base de datos en PostgreSQL
CREATE DATABASE joyas;

CREATE TABLE joyas (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(200),
  categoria VARCHAR(100),
  metal VARCHAR(100),
  precio INT,
  stock INT,
  descripcion TEXT
);

## 4️⃣ Configurar variables de entorno
.env

Con el contenido:
PGUSER=postgres
PGPASSWORD=tu_password
PGHOST=localhost
PGPORT=5432
PGDATABASE=joyas

## 5️⃣ Ejecutar el servidor
npm start

La API estara disponible en:
http://localhost:3000

📚 Documentación de la API

A continuación se listan todas las rutas disponibles.

🔍 1) Obtener listado de joyas
GET /joyas

Permite obtener todas las joyas disponibles.

Ejemplo de respuesta:
[
  {
    "id": 1,
    "nombre": "Anillo Plata 950",
    "categoria": "anillos",
    "metal": "plata",
    "precio": 42000,
    "stock": 3
  }
]

🔎 2) Filtrar joyas
GET /joyas/filtros

Parámetros disponibles:

Parámetro	Tipo	Descripción
precio_min	number	Filtra por precio mínimo
precio_max	number	Filtra por precio máximo
categoria	string	Filtra por categoría
metal	string	Filtra por metal

Ejemplo:

GET /joyas/filtros?categoria=anillos&precio_max=50000

📄 3) Paginación
GET /joyas?page=1&limit=5

Permite obtener joyas por página.

📘 4) Obtener una joya por ID
GET /joyas/:id
✨ 5) Agregar una nueva joya
POST /joyas

Body:
{
  "nombre": "Cadena Oro 18K",
  "categoria": "cadenas",
  "metal": "oro",
  "precio": 350000,
  "stock": 5,
  "descripcion": "Cadena fina 45 cm oro 18 kilates"
}


✏️ 6) Actualizar una joya
PUT /joyas/:id

❌ 7) Eliminar una joya
DELETE /joyas/:id

🛡️ Middleware utilizados
1️⃣ Logger Middleware

Registra:
método HTTP
ruta
fecha y hora
tiempo de respuesta

Ejemplo en consola:
[2025-11-30 12:45:21] GET /joyas - 15ms

2️⃣ Error Middleware
Captura errores y devuelve:
{
  "message": "Error procesando la solicitud"
}

📂 Estructura del proyecto
src/
 ├── app.js
 ├── server.js
 ├── controllers/
 │     └── joyas.controller.js
 ├── routes/
 │     └── joyas.routes.js
 ├── models/
 │     └── joyas.model.js
 ├── middleware/
 │     ├── logger.middleware.js
 │     └── error.middleware.js
 └── database/
       └── connection.js

package.json
README.md

🧪 Testing con Thunder Client

GET /joyas

GET /joyas/filtros

GET /joyas?page=1&limit=5

POST /joyas

PUT /joyas/:id

DELETE /joyas/:id

Todos probados manualmente con códigos 200, 201, 400, 404 según corresponda.



👤 Autor

Williams Arias
Ingenieria Industrial & Administracion
Ingeniería en Redes & Comunicación
Desafío Latam 












