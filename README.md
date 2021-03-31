# Web MQTT Client

**Autor**: Agustin Bassi - 2021

## Tabla de contenido

* [Introducción](#introducción)
* [Instalar dependencias](#instalar-dependencias)
* [Descargar el código](#descargar-el-código)
* [Ejecutar la aplicación](#ejecutar-la-aplicación)
* [Colaborar](#colaborar)
* [Licencia](#licencia)

## Introducción

Este proyecto es una aplicación web que se comunica con un broker MQTT através de WebSockets. Funciona como un cliente donde se pueden publicar y suscribirse a topics y visualizar los mensajes en tiempo real.

Corre sobre cualquier navegador actual y está desarrollado en JS, HTML y CSS. Los estilos son de `Material Design` y la conexión MQTT con `Paho MQTT`.

## Instalar dependencias

Para correr este proyecto solo necesitas un navegador moderno, aunque es preferible que lo accedas desde un servidor web. Cualquier servidor es válido, aunque si usas VS Code podes instalar la extensión [Live Server](https://github.com/ritwickdey/vscode-live-server.git) que es un servidor web para desarrollo muy fácil y práctico de utilizar. 

También va a ser necesario que tengas un broker MQTT al cual conectarte. Si no sabes como hacerlo, podes ver nuestro proyecto [Sphere MQTT](https://github.com/gotoiot/sphere-mqtt), que se compone de un broker y distintos servicios relacionados que conforman un ecosistema MQTT completo.

> Tener el broker no es estrictamente necesario, ya que podes ejecutar la app sin conectarte por MQTT, pero carecería de sentido.

## Descargar el código

Para descargar el código, lo más conveniente es que realices un `fork` de este proyecto a tu cuenta personal haciendo click en [este link](https://github.com/gotoiot/web-mqtt-client/fork). Una vez que ya tengas el fork a tu cuenta, descargalo con este comando (acordate de poner tu usuario en el link):

```
git clone https://github.com/USER/web-mqtt-client.git
```

Abrí la carpeta del proyecto desde VS Code cuando descargues el código.

> En caso que no tengas una cuenta en Github podes clonar directamente este repo.

## Ejecutar la aplicación

El primer paso es acceder a la app desde el navegador. Si instalaste `Live Server` en VS Code hace click derecho sobre el archivo `index.html` y seleccioná la opción `Open with Live Server` que abrirá automáticamente la aplicación en el navegador. 

Si estas usando otro servidor web accedé a la URL correspondiente; y de manera opcional podés poner el path del archivo desde la barra de búsqueda del navegador (ej: `file://PATH_TO_PROJECT/index.html`).

Una vez que accedas a la app tenes que configurar los campos para conectarte al broker. Muchos de los campos tienen valores precargados para no tener que escribirlos cada vez. Los únicos que no tienen datos cargados son los de usuario y contraseña. 

Si los datos por defecto te sirven, comenzá presionando `CONNECT` y después `SUBSCRIBE` para suscribirte a todos los topics (`#`). Fijate que en la sección de logs aparecen las acciones que vas realizando. Después, una vez que te suscribas a todos los topics presioná el botón `PUBLISH`. Esto va a producir un `echo` del mensaje enviado, y es debido a que estás suscripto a todos los topics.

Si queres hacer una prueba más completa podés abrir en otra pestaña una nueva instancia de esta app, entonces desde una te suscribis a topics y desde la otra publicas, así podes ver la comunicación entre dos clientes utilizando el broker. 

Para que veas la app sin necesidad de ejecutarla, en esta imagen te mostramos cómo se cargan los datos para comunicarte con el broker para hacer el echo.

![web-mqtt-client-fields-filled](doc/web-mqtt-client-fields-filled.png)

Y en esta otra imagen cómo se van visualizando los logs.

![web-mqtt-client-logs](doc/web-mqtt-client-logs.png)

Para las configuraciones de los logs podes setar el numero de líneas que se muestran con el campo `Lines`. El check `Time` imprime la hora mientras que el check `Level` imprime el nivel de loggeo. Si querés pausar la actualización de mensajes en el log chequeá el campo `Pause`. Por último, si querés borrar los mensajes presioná `CLEAR LOG`.

## Colaborar

¿Te gustó el proyecto? Si es así no dudes en apoyarlo con una estrella en Github desde [la home del proyecto](https://github.com/gotoiot/web-mqtt-client), esto motiva mucho a seguir adelante con el desarrollo de código para la comunidad. Si estás interesado en recibir novedades cuando se hagan actualizaciones, podes suscribirte desde [este link](https://github.com/gotoiot/web-mqtt-client/subscription).

Si te gustaría aplicar mejoras a este proyecto podes abrir un hilo de discusión en [este link](https://github.com/gotoiot/web-mqtt-client/issues/new) para conversarlas y luego podrías enviarlas mediante un `pull request`. 

Finalmente podés compartir este proyecto para que más personas puedan utilizarlo y beneficiarse de esta gran comunidad del software libre.

## Licencia

[MIT](https://choosealicense.com/licenses/mit/)

![footer](doc/gotoiot-footer.png)