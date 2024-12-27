# Prueba técnica MeLi

Este proyecto es una aplicación React con varias funcionalidades, como la visualización de personajes de una serie, la gestión de favoritos y la paginación.

## Índice

1. [Descripción](#descripción)
2. [Tecnologías utilizadas](#tecnologías-utilizadas)
3. [Estructura del Proyecto](#estructura-del-proyecto)
4. [Visualización](#visualizacion)
5. [Instalación](#instalación)
6. [Cómo ejecutar las pruebas](#cómo-ejecutar-las-pruebas)

## Descripción

Este es un proyecto de una aplicación web interactiva basada en la API de Rick and Morty. Permite explorar los personajes de la famosa serie de animación, ver detalles sobre ellos y gestionarlos en una lista de favoritos.

La aplicación permite a los usuarios navegar entre las páginas de personajes, ver información detallada sobre cada uno, y agregar o quitar personajes de sus favoritos. Además, cuenta con un sistema de filtrado para que los usuarios puedan buscar personajes por nombre, estado o especie, y una funcionalidad de paginación para navegar a través de las páginas de personajes.

## Tecnologías utilizadas

- **React**: Biblioteca principal para construir la interfaz de usuario.
- **Jest**: Framework de pruebas en JavaScript.
- **React Testing Library**: Herramienta de pruebas para React que facilita la simulación de interacciones de usuario.
  
## Estructura del Proyecto
    
    ├── /src                                  # Archivos fuente del proyecto
    │   ├── /components                       # Componentes reutilizables
    │   │   ├── /character-card               # Componente para mostrar información de un personaje
    │   │   │   ├── CharacterCard.js          # Lógica del componente CharacterCard
    │   │   │   ├── CharacterCard.css         # Estilos de CharacterCard
    │   │   ├── /character-filters            # Componente para los filtros de personajes
    │   │   │   ├── CharacterFilters.js       # Lógica del componente CharacterFilters
    │   │   │   ├── CharacterFilters.css      # Estilos de CharacterFilters
    │   │   │   ├── CharacterFilters.test.js  # Pruebas para CharacterFilters
    │   │   │   └── constants.js              # Archivo de constantes
    │   │   ├── /episode-popup                # Componente para el modal con la lista de episodios
    │   │   │   ├── EpisodePopup.js           # Lógica del componente EpisodePopup
    │   │   │   ├── EpisodePopup.css          # Estilos de EpisodePopup
    │   │   │   └── EpisodePopup.test.js      # Pruebas para EpisodePopup
    │   │   ├── /navbar                       # Componente Navbar
    │   │   │   ├── Navbar.js                 # Lógica del componente Navbar
    │   │   │   ├── Navbar.css                # Estilos de Navbar
    │   │   ├── /spinner                      # Componente para mostrar el spinner de carga
    │   │   │   ├── Spinner.js                # Lógica del componente Spinner
    │   │   │   ├── Spinner.css               # Estilos de Spinner
    │   │   │   └── Spinner.test.js           # Pruebas para Spinner
    │   ├── /context                          # Archivos relacionados con los Contexts de la aplicación
    │   │   ├── FavoriteContext.js            # Lógica para manejar el contexto de favoritos
    │   │   ├── CharactersContext.js          # Lógica para manejar el contexto de personajes
    │   │   ├── CharactersContext.test.js     # Pruebas para CharactersContext
    │   │   └── FavoriteContext.test.js       # Pruebas para FavoriteContext
    │   ├── /hooks                            # Custom hooks
    │   │   ├── useCharacterFilters.js        # Lógica para useCharacterFilters
    │   │   └── useCharacterFilters.test.js   # Pruebas para useCharacterFilters
    │   ├── /pages                            # Páginas principales de la aplicación
    │   │   ├── /home                         # Página principal
    │   │   │   ├── Home.js                   # Lógica de la página principal (Home)
    │   │   │   └── Home.css                  # Estilos para la página Home
    │   │   ├── /favorites                    # Página de favoritos
    │   │   │   ├── Favorites.js              # Lógica de la página de favoritos
    │   │   │   ├── Favorites.css             # Estilos para la página Favorites
    │   ├── /App.js                           # Componente principal de la aplicación
    │   ├── /App.css                          # Estilos globales de la aplicación
    │   ├── /index.js                         # Punto de entrada de la aplicación (renderiza App)
    │   ├── /index.css                        # Estilos globales (resets, fonts, etc.)
    │   └── /setupTests.js

## Visualizacion

Abre: https://santirogo.github.io/rick-and-morty-list/

## Instalación

### Requisitos previos

- **Node.js**: Asegúrate de tener instalada la versión recomendada de [Node.js](https://nodejs.org/).
  
### Paso a paso para instalar el proyecto

1. Clona el repositorio:
   ```bash
   git clone https://github.com/santirogo/rick-and-morty-list.git

2. Instala las dependencias:
    ```bash
    cd rick-and-morty
    npm install

3. Inicia la aplicación en modo de desarrollo:
    ```bash
    npm start

4. Abre http://localhost:3000

## Cómo ejecutar las pruebas
Para ejecutar todas las pruebas del proyecto, utiliza el siguiente comando:

    npm test
    Esto ejecutará Jest y te permitirá ver la salida de las pruebas en la terminal. Jest automáticamente encuentra los archivos de prueba que tienen la extensión .test.js.
