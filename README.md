🎮 Poké-Entrenador & World Explorer🚀 
Una aplicación web con estética Retro GameBoy para gestionar partidas de Pokémon y explorar datos globales, construida con React y las mejores prácticas de manejo de estado asíncrono.

## 🧐 Sobre el Proyecto

Este sistema fue desarrollado como una prueba técnica de alto nivel para la empresa **DevDatep Consulting**. El objetivo principal fue demostrar el dominio en el manejo de **estado asíncrono**, **validación de datos compleja** y **diseño de interfaces personalizadas** sin depender de librerías de componentes prefabricadas (como MUI o Bootstrap).

La aplicación funciona como una "consola virtual" que permite a los usuarios:
1.  **Gestionar sus progresos:** Un sistema CRUD completo para partidas de Pokémon.
2.  **Consulta de Datos Masivos:** Integración fluida con la PokeAPI y Rest Countries API.
3.  **Inmersión de Usuario:** Interfaz Neobrutalista inspirada en la GameBoy Advance, construida desde cero.

## 🎮 Poké-Entrenador & World Explorer

> Una aplicación web con estética **Retro GameBoy** para gestionar partidas de Pokémon y explorar datos globales, construida con React y las mejores prácticas de manejo de estado asíncrono.

Este proyecto es una "consola virtual" funcional que permite a los usuarios registrar sus partidas de Pokémon, consultar una Pokédex en tiempo real y explorar datos de países de todo el mundo.

---
## 🌳 Estructura de Desarrollo por Niveles (Ramas)

El proyecto se ha desarrollado de forma incremental, siguiendo una metodología de aprendizaje y escalabilidad. Puedes explorar la evolución del código cambiando entre las siguientes ramas de GitHub:

* **`nivel-1` (Básico):** Consumo de API con React Query, listado responsivo, Skeletons de carga y filtrado simple.
* **`nivel-2` (Intermedio):** Implementación de React Router para navegación, vista de detalle, scroll infinito y validación inicial con Zod.
* **`nivel-3` (Avanzado - Actual):** Arquitectura completa con CRUD funcional, integración de múltiples APIs, manejo de errores personalizado y UI pulida.

---
## ✨ Características Principales

* **🕹️ Interfaz Retro:** UI inspirada en una GameBoy Advance diseñada puramente con **Tailwind CSS v4**.
* **💾 Gestión de Partidas (CRUD Local):** Sistema para guardar, editar y eliminar datos de entrenador persistidos en `localStorage`.
* **♾️ Paginación Infinita:** Implementación de **Infinite Scroll** en la Pokédex.
* **🔍 Pokédex Pro:** Consumo de la [PokeAPI](https://pokeapi.co/) con lógica de carga de detalles individuales.
* **🌎 Explorador Global:** Consulta de población, capitales e idiomas mediante la [Rest Countries API](https://restcountries.com/).
* **⚡ Fetching Inteligente:** Implementación de **TanStack Query (React Query)** para manejo de caché, estados de carga (`isLoading`) y re-fetching automático.
* **🛡️ Validación Robusta:** Formularios controlados con **React Hook Form** y esquemas de validación estrictos con **Zod**.

---

## 🛠️ Stack Tecnológico

| Herramienta | Uso |
* | **React 18** | Biblioteca principal para la interfaz de usuario. |
* | **Tailwind CSS v4** | Estilizado basado en utilidades y diseño "Neobrutalista" / Retro. |
* | **TanStack Query** | Manejo de estado asíncrono y sincronización de datos de APIs. |
* | **React Router Dom** | Sistema de navegación SPA (Rutas dinámicas por nombre y ID). |
* | **Zod** | Validación de esquemas y tipos de datos en formularios. |
* | **Axios / Fetch** | Consumo de servicios REST. |
* |**LocalStorage**| Manejo de datos local. |

---

## 📸 Demo de la Interfaz

La aplicación emula la experiencia física de una consola. Incluye:
- **Pantalla LCD:** Con efectos de scroll y estados de "batería baja" si no hay datos.
- **Botones Interactivos:** Cruzeta (D-pad) y botones A/B decorativos.
- **Feedbacks Visuales:** Alertas de éxito/error al guardar datos en el "cartucho".

---

## 🚀 Instalación y Uso

Para ejecutar este proyecto localmente, sigue estos pasos:

1. **Clona el repositorio con SSH** (Debes tener el github con una ssh key)
   ```bash```
   
  * **LocalStorage**
   
   ```git clone git@github.com:Diegou2203/Pokedex-completo.git``` 

3. **Instala las dependencias**

    ``` yarn install``` 

4. **Compilación de estilos (Tailwind CLI)**
Si deseas actualizar o modificar los estilos de Tailwind en tiempo real:

    ```npx @tailwindcss/cli -i ./src/input.css -o ./src/output.css --watch``` 

5. **Ejecución del código**
Para poder compilar el código es necesario escribir este comando en una nueva terminal (Command Prompt):

    ```yarn start``` 

---

## 📂 Estructura del Proyecto

```structure
src/
├── services/          # Consumo de APIs (PokeAPI, Rest Countries) y lógica de persistencia (CRUD LocalStorage).
├── pages/             # Vistas principales de la aplicación (Home, CRUD de Juegos, Pokédex y Explorador de Países).
├── sections/          # Componentes de UI de alto nivel, como la carcasa decorativa y el banner de la GameBoy.
├── validations/       # Definición de esquemas de datos y reglas de validación utilizando Zod.
└── App.js             # Punto de entrada de la aplicación y configuración de React Router para la navegación dinámica.
```

## Despliegue

🌐 Despliegue (Deployment)
El proyecto se encuentra desplegado y funcional en la nube:

🔗 Demo en vivo: Poké-Entrenador Explorer

Plataforma: Vercel (CI/CD deshabilitado)
Link de visita: [https://pokedex-completo-wngeo2t41-diegou2203s-projects.vercel.app/](https://pokedex-completo.vercel.app)

<div align="center">
 <img width=90% alt="image" src="https://github.com/user-attachments/assets/9d454c39-e8fa-4509-b400-74babe38c444" /> 
</div>


