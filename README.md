# Template Web SPA

## Actualizar los repositorios hijos

Las posibilidades para actualizar codigo de manera externa dentro de un proyecto son, como un submodulo, haciendo un fork, enviando un PR o desde un template de Github.

Particularmente este ultimo resulta util ya que se tienen las mismas estructuras de archivos y directorios, y esos mismos archivos/directorios se pueden modificar dentro de cada proyecto (este mecanismo no es posible con un submodulo).

Tampoco la opcion de fork seria adecuada, ya que un fork se supone como una bifurcacion de un proyecto para realizar algunos cambios y que posteriormente puedan volver al proyecto original, pero no seria un approach correcto pensando que los proyectos que parten de una base tendran caminos independientes y no volveran a cruzar sus caminos nuevamente.

Por esta razon se decidio hacer un template de proyecto como este, y que luego los distintos proyectos puedan usarlo como base. El unico inconveniente que presenta esto (a diferencia del fork) es que los proyectos tienen historias completamente diferentes (es decir el template y sus hijos), entonces no se puede realizar un merge con las actualizaciones del template de manera natural.

Segun [este hilo de Stackoverflow](https://stackoverflow.com/questions/37937984/git-refusing-to-merge-unrelated-histories-on-rebase) antes Git permitia hacer un merge por defecto cuando habia dos repositorios con historias diferentes, pero en las nuevas versiones lo dejo de hacer, y solo esa opcion esta disponible con el flag `--allow-unrelated-histories`.

## Pasos necesarios para la sincronizacion

Para crear un nuevo repo a partir de un template desde Github ir a la home de este repo, y en la esquina superior derecha presionar el boton `Use this template`. En ese proceso elegir el nombre del nuevo proyecto. Luego hacer un clone a la maquina de desarrollo del nuevo proyecto creado.

```sh
git clone https://github.com/gotoio/XXX.git
```

Luego dentro del repositorio agregar un nuevo remote, que es el repositorio del template.


```sh
git remote add template git@github.com:gotoiot/template-web-spa.git
```

En el momento que se produzcan cambios en el template que quieran ser actualizados en los repos hijos, ir a la rama master del hijo y ejecutar el siguiente comando:

```sh
git pull template master --allow-unrelated-histories
```

En este proceso seguramente se van a producir conflictos de MERGE que deben ser resueltos manualmente. Aceptar los incomming o current changes en cada caso y luego agregar los cambios con `git add .`. Para tener una claridad sobre lo que se esta haciendo, commitear las actualizaciones del rempo como `git commit -m "Brings new changes from template"`.


## Licencia

[MIT](https://choosealicense.com/licenses/mit/)

![footer](doc/gotoiot-footer.png)