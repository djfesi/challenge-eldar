![Challenge Angular](src/assets/logos/logo.png)

# **Challenge Angular | ELDAR** - Descripción General

Este proyecto es una **aplicación web de autenticación con manejo de roles** para administrar publicaciones, desarrollada en Angular 17, utilizando NgRx para la gestión de estados globales y PrimeNG para la interfaz de usuario.

---

## 📋 **Tabla de Contenidos**

- [📋 Tabla de Contenidos](#-tabla-de-contenidos)
- [🔧 Características Principales](#-características-principales)
- [🎨 Estilo y Colores](#-estilo-y-colores)
- [🛠️ Requisitos](#️-requisitos)
- [🚀 Instalación](#-instalación)
- [💻 Uso y Ejecución](#-uso-y-ejecución)
- [💻 Compilar Imagen Docker](#-docker)
- [🧑‍💻 Datos de Usuarios de Prueba](#-usuarios)
- [🔄 Estado Global con NgRx](#-estado-global-con-ngrx)
- [🖥️ Tecnología Utilizada](#️-tecnología-utilizada)
- [📚 Documentación Adicional](#-documentación-adicional)
- [👤 Sobre Mí](#-sobre-mí)

---

## 🔧 **Características Principales**

- **Autenticación** con roles diferenciados (`admin` y `user`).
- **Protección de rutas** con `AuthGuard` y `LoginGuard` basado en el estado y validez del token.
- **Gestión del estado** con NgRx.
- **Interfaz de usuario** moderna y reactiva utilizando PrimeNG.
- **Persistencia del token** en localStorage con sincronización NgRx.
- **Login con validación** de credenciales.
- **Componentes escalables** siguiendo las mejores prácticas de Angular 17.

---

## 🎨 **Estilo y Colores**

A continuación, se describen los colores utilizados en la aplicación:
🔵 Azul Primario | `#498fcc` | Color principal de ELDAR
⚫️ Negro background | `#1a1a19` | Color de fondo en pagina web de ELDAR

---

## 🛠️ **Requisitos**

Antes de instalar y ejecutar este proyecto, asegúrate de tener lo siguiente instalado en tu máquina:

- **Node.js** v14 o superior
- **npm** o **yarn**
- **Angular CLI** (versión 17)
- **Git** para clonar el repositorio

---

## 🚀 **Instalación**

1. Clona este repositorio en tu máquina local:
   ```bash
   git clone https://github.com/djfesi/challenge-eldar.git
   ```

2. Navega al directorio del proyecto:
   ```bash
   cd challenge-eldar
   ```

3. Instala las dependencias necesarias:
   ```bash
   npm install
   ```

---

## 💻 **Uso y Ejecución**

### Compilar y ejecutar la aplicación en modo desarrollo:

```bash
ng serve -o
```

O también:
```bash
ng serve
```
Y abre [http://localhost:4200](http://localhost:4200) en tu navegador para ver la aplicación.

## 💻 **Compilar Imagen Docker**

### Compilar y levantar imagen en docker:

```bash
docker build -t challenge .
```

Correr la imagen:
```bash
docker run -p 4200:4200 challenge
```

Una vez que este corriendo abrir: [http://localhost:4200](http://localhost:4200) en tu navegador para ver la aplicación.

## 🧑‍💻 **Datos de Usuarios de Prueba**

Para ingresar a la aplicación puedes utilizar los siguientes usuarios de prueba:

### Credenciales

- **Administrador (admin)**:

  - **Correo**: admin@gmail.com
  - **Contraseña**: 12345678

- **Usuario Regular (user)**:
  - **Correo**: user@gmail.com
  - **Contraseña**: 12345678

---

## 🔄 **Estado Global con NgRx**

El proyecto utiliza **NgRx** para manejar el estado global, con especial enfoque en el manejo del **token de autenticación** y el **rol del usuario**.

### Estado de Autenticación

- **Token**: Almacena el token JWT.
- **Rol**: Administra los permisos basados en los roles (`admin`, `user`).
- **Autenticación**: Persistencia del estado de autenticación en localStorage.

### Acciones principales:

- \`loginSuccess\`
- \`loginFailure\`
- \`logout\`

---

## 🖥️ **Tecnología Utilizada**

- **Angular 17**: Framework para aplicaciones web de una sola página (SPA).
- **NgRx**: Gestión del estado global.
- **PrimeNG**: Biblioteca de componentes UI.
- **RxJS**: Librería para programación reactiva.
- **JWT**: Autenticación segura basada en tokens.
- **TypeScript**: Lenguaje de programación utilizado.

---

## 📚 **Documentación Adicional**

- [Documentación Oficial de Angular](https://v17.angular.io/docs/)
- [Documentación Oficial de NgRx](https://ngrx.io/guide/migration/v17)
- [Documentación de PrimeNG](https://primeng.org/)

---

## 👤 **Sobre Mí**

¡Hola! Soy Federico Silva, desarrollador especializado en Angular y apasionado por crear aplicaciones escalables y de alto rendimiento. Aunque mi principal enfoque está en Angular, también disfruto de programar en otros lenguajes y frameworks como Flutter y Node.js. Siempre estoy buscando aprender nuevas tecnologías y mejorar mis habilidades para entregar soluciones óptimas a los problemas.

---

### Contacto

- **LinkedIn**: [Mi Perfil de LinkedIn](https://www.linkedin.com/in/silva-federico93/)
- **Correo Electrónico**: fesi_93@hotmail.com

---
# challenge-eldar
