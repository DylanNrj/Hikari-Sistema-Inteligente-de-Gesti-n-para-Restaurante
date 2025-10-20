# 🥢 Hikari – Sistema Inteligente de Gestión para Restaurante

> Un sistema integral para restaurantes modernos: pedidos por QR, cocina en tiempo real, gestión de alérgenos y análisis de ventas — todo en una plataforma segura, escalable y fácil de usar.

[![.NET](https://img.shields.io/badge/.NET-8.0+-512BD4?logo=dotnet)](https://dotnet.microsoft.com)
[![Next.js](https://img.shields.io/badge/Next.js-14+-000000?logo=next.js&logoColor=white)](https://nextjs.org)
[![MySQL](https://img.shields.io/badge/MySQL-8.0+-4479A1?logo=mysql)](https://www.mysql.com)
[![SignalR](https://img.shields.io/badge/SignalR-Real--Time-2D7D9A?logo=signalr)](https://dotnet.microsoft.com/apps/aspnet/signalr)

---

## 🌟 Características principales

- ✅ **Pedidos por QR**: Los clientes escanean un código en la mesa y realizan su pedido directamente desde su móvil.  
- 🔔 **Notificaciones en tiempo real**: La cocina recibe alertas inmediatas; los meseros saben cuándo servir.  
- 📊 **Panel de estadísticas**: Visualiza productos más vendidos, horas pico y rotación de mesas con **Chart.js**.  
- ⚠️ **Gestión de alérgenos**: Cada plato muestra ingredientes y alerta si hay riesgo para clientes con alergias registradas.  
- 🔐 **Autenticación por roles**: Cliente (opcional), mesero, cocina y administrador.  
- 🎨 **Interfaz moderna y responsive**: Diseñada con **Next.js** y **Tailwind CSS**, optimizada para móviles, tablets y escritorio.  

---

## 🛠️ Tecnologías utilizadas

| Capa | Tecnología |
|------|-------------|
| **Backend** | .NET 8, Entity Framework Core, JWT, SignalR |
| **Frontend** | Next.js 14 (App Router), Tailwind CSS, Chart.js |
| **Base de datos** | MySQL 8 |
| **Comunicación en tiempo real** | SignalR (WebSockets) |
| **Gestión de proyecto** | PMBOK (Temas 1–10), ISO 9001 (Calidad), matriz de riesgos, plan de comunicaciones |

---

## 📂 Estructura del proyecto
hikari-restaurant-system/
├── 📁 backend/ # API REST en .NET Core
│ ├── 📁 Controllers/ # Auth, Products, Orders, etc.
│ ├── 📁 Services/ # Lógica de negocio
│ ├── 📁 Data/ # ApplicationDbContext, Migrations
│ ├── 📁 Models/ # Entidades (User, Product, Order…)
│ ├── 📁 DTOs/ # Objetos de transferencia
│ ├── 📁 Hubs/ # SignalR: KitchenHub.cs
│ └── 📄 Program.cs
│
├── 📁 frontend/ # Aplicación Next.js (multi-rol)
│ ├── 📁 app/
│ │ ├── 📁 customer/ # Vista cliente (QR)
│ │ ├── 📁 kitchen/ # Vista cocina (tiempo real)
│ │ ├── 📁 waiter/ # Vista mesero (tablet)
│ │ ├── 📁 admin/ # Panel de administración + estadísticas
│ │ └── 📁 api/ # (opcional) API routes
│ ├── 📁 public/
│ │ └── 🖼️ qrcode-sample.png
│ └── 📄 next.config.js
│
├── 📁 docs/ # Documentación de gestión (opcional)
│ ├── 📄 matriz-riesgos.md
│ ├── 📄 plan-comunicaciones.md
│ └── 📄 politica-calidad.md
│
├── 📄 .gitignore
├── 📄 README.md
├── 📄 LICENSE
└── 📄 docker-compose.yml # (opcional)

---

## 🚀 Cómo ejecutar el proyecto

### 🔧 Requisitos previos

- [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)  
- [Node.js 18+](https://nodejs.org/)  
- [MySQL 8](https://www.mysql.com/products/community/)  

---

### 1️⃣ Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/hikari-restaurant-system.git
cd hikari-restaurant-system
```
### 2️⃣ Configurar la base de datos
"ConnectionStrings": {
  "DefaultConnection": "Server=localhost;Database=hikari_db;User=root;Password=tu_contraseña;"
}

### 3️⃣ Iniciar el backend (.NET)
```bash
cd backend
dotnet restore
dotnet run
# API corriendo en http://localhost:5000
```

### 4️⃣ Iniciar el frontend (Next.js)
```bash
cd ../frontend
npm install
npm run dev
# App corriendo en http://localhost:3000
```
