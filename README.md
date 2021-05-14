# NUDINOP

## Proyecto de Seguridad de la Información

Por Imanol González Estepa y Pablo Villacorta Benito

### HOW TO

#### Lanzar el servidor en local

1. Acceder al directorio del servidor

   ```bash
   cd server
   ```

2. Instalar los módulos de Python necesarios

   ```bash
   pip install -r requirements.txt
   ```

3. Lanzar el servidor local

   ```bash
   python manage.py runserver
   ```

Esto debería crear una instancia del servidor REST escuchando en el puerto 8000. Ahora faltaría modificar la extensión para que realice las peticiones al servidor local (por defecto utiliza el servidor remoto en Heroku) y, posteriormente, cargar la extensión en Chrome.

Para modificar la URL a la que la extensión manda sus peticiones, hacer lo siguiente:

1. Abrir el fichero extension/plugin/content.js

2. Comentar la línea 12 y descomentar la 11, de forma que quede de la siguiente forma:

   ```javascript
   fetch("http://localhost:8000/nudiAPI/prediction", {
   // fetch("https://nudinop.herokuapp.com/nudiAPI/prediction", {
   ```

#### Cargar la extensión en Chrome

1. En Chrome, acceder a la siguiente URL:

   ```bash
   chrome://extensions
   ```

2. Activar el modo de desarrollador

3. Hacer clic en el botón "Cargar descomprimida" y seleccionar el directorio extension/plugin

La extensión ya debería estar cargada en el navegador. Para abrir el popup que permite configurarla, hacer clic en el icono que aparecerá en la barra de navegación de Chrome (si no aparece, será necesario anclar la extensión a dicha barra). El popup cuenta con tres *checkboxes*:

- *Overall Active*: permite activar o desactivar la extensión.
- *Image Filter Active*: permite activar o desactivar el filtrado de imágenes.
- *Text Filter Active*: permite activar o desactivar el filtrado de texto.

En la sección correspondiente al filtrado de texto, se mostrará la lista de palabras prohibidas (por defecto se incluyen dos). Para añadir una nueva palabra, utilizar el formulario que aparece en la parte inferior (*New word*), introduciendo la palabra a filtrar y haciendo clic en el botón *Add word*. Será preciso refrescar la página para poder ver los cambios. 

