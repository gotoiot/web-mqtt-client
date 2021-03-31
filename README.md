# Web App Base

**Autor**: Agustin Bassi - 2021

## Descripción

La idea de este proyecto es crear una base de una aplicacion web que luego se pueda clonar para crear aplicaciones especificas. 

## Configuración de los repositorios hijos

Para que este proyecto base pueda ser actualizado, y luego reflejar las actualizaciones en los repositorios hijos se debe hacer lo siguiente.

Lo primero a realizar es crear un repositorio nuevo dentro de Github con el nombre del proyecto. Una vez creado el proyecto, se debe hacer un `clone` de este proyecto repositorio base (poner el nombre para el proyecto en el comando para crear el directorio):

```sh
git clone https://github.com/gotoio/web-app-base.git project_name
```

Despues elimina el repositorio remoto "origin" que se crea por defecto al clonar el repositorio base.

```sh
git remote rm origin
```

Una vez eliminado el origin del template base, ahora setea como "origin" el repo que creaste en Github en el primer paso.

```sh
git remote add origin git@github.com:PROJECT_NAME.git
```

Despues agrega un segundo repositorio remoto llamado "base" que vendria a ser este repositorio base para poder actualizarlo periodicamente.

```sh
git remote add base git@github.com:gotoiot/web-app-base.git
```

Con esos pasos ya va a estar todo listo para descargar actualizaciones del repositorio base cuando quieras. Cuando sepas que hay una actualizacion, desde la raiz del repositorio hijo ejecuta este comando para traer los ultimos cambos.

```sh
git pull base master
```

## Licencia

[MIT](https://choosealicense.com/licenses/mit/)

![footer](doc/gotoiot-footer.png)