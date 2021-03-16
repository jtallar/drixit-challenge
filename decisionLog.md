# Log de Decisiones
En este archivo, se explicarán todas las decisiones tomadas para el desarrollo de este ejercicio.

## Database
Para mantener la información de los usuarios, tanto de acceso (email y contraseña) como datos personales, se decidió utilizar `MongoDB`. De esta manera, se evita tener los datos almacenados en un archivo estático. Para realizar las búsquedas de usuarios, se podría haber utilizado tanto el id como el email, ya que ambos campos deberían ser únicos. Como este campo se almacenará en el token de autenticación, se decide utilizar el email para todos los accesos.

Se espera que la base de datos esté corriendo en `localhost:27017`. La colección a utilizar se llamará `users` y estará dentro de la base de datos `challenge`.

## Back-End
Para el desarrollo del back-end, se decidió desarrollar una API Rest en `Node JS` utilizando `Express`. Esta API estará corriendo en `localhost:8080` y expondrá dos endpoints:
- Un endpoint de autenticación en `/api/v0/authenticate`. Éste recibe email y contraseña de un usuario y accede a MongoDB para validar estas credenciales. Existen tres posibles respuestas al request.
    * Si no existe un usuario con el email ingresado, se devuelve un código de error 404.
    * Si el usuario existe pero la contraseña es inválida, se devuelve un código de error 401.
    * Si el usuario existe y la contraseña es correcta, se genera un token JWT con el email como dato y se lo retorna al cliente para que lo pueda almacenar.
- Un endpoint de información del usuario en `/api/v0/users/me`. Éste endpoint requiere que el usuario esté autenticado, dado que solo se accede a la información del usuario logueado.
    * Si no se recibe ningún token JWT en el header `Authorization`, se devuelve un código de error 401.
    * Si el token JWT recibido es incorrecto, ya sea porque fue modificado o bien por estar vencido, se devuelve un código de error 403.
    * Si el token JWT recibido es válido, se busca la información correspondiente al email almacenado en el token y se la envía al usuario, eliminando previamente el campo contraseña de la respuesta.

Para mantener sesiones, se decidió utilizar tokens JWT dado que es una manera adecuada para mantener a un usuario autenticado sin guardar ningún estado en el servidor. Además, permite guardar información no sensible dentro de la misma (como el mail), de forma tal de conocer quién es el usuario que está haciendo el request en caso de necesitarlo. En este caso, es necesario en el endpoint de información de usuario. El token se envía a través del header `Authorization`, que suele ser lo más estándar. Cada vez que se corra el servidor, se generará un secreto de 64 caracteres que se utilizará para generar los tokens de acceso y verificarloss.

No se utilizó `Typescript` dado que aún no tuve oportunidad de usarlo y prioricé enfocarme en el resto de los items del desarrollo.

## Front-End
Para el desarrollo del front-end, se decidió utilizar `React JS`, de manera tal de facilitar la interacción entre componentes y el manejo de páginas. Dada mi nula experiencia con este framework (he trabajado con `Angular JS` y, en menor medida, con `Vue JS`), se utilizó la herramienta `create-react-app` para contruir la base de la app. Además, se utilizó `react-router` como librería de routing para controlar la navegación del sitio.

La estructura de la aplicación se dividió en 
- `pages`, donde se puede encontrar cada página disponible: Login, UserInfo y Logout.
- `components`, donde se encuentran los dos componentes utilizados: LoginForm y User.
- `services`, donde se encuentran los servicios que se comunicarán con la API Rest: authenticationService y userService.

Para persistir el token JWT en el cliente, utilizamos Local Storage. Cuando se realiza un POST para autenticar al usuario, en el caso de recibir una respuesta satisfactoria, se almacena el token recibido en dicho almacenamiento. Cada vez que se requiera realizar un request con autenticación, se agregará el token en la request en un header `Authorization`. 

De esta manera, se puede recargar el sitio o cerrar el navegador manteniendo al usuario logueado (mientras sea dentro de la hora, dado que el token vence). Por ello, también se revisa si el usuario ya está logueado al ir a `/login`, en cuyo caso se redirige a `/user-info`.

Al ingresar en `/user-info`, se intenta traer la información del usuario logueado enviando el token en la request. En caso de fallar dicha request por un error de autenticación, se elimina el token del almacenamiento local (de existir uno) y se redirige al login. En caso de éxito, se muestra la información del usuario. Además, se decidió agregar una acceso a Logout desde aquí. Lo único que hace dicho sitio es cerrar la sesión, borrando el token de Local Storage, y redirigir al login. Resulta útil para verificar el correcto funcionamiento de la app.

Respecto al sitio de `/login`, al ingresar muestra únicamente la entrada para email, como sucede con el sitio de login de mongodb. En caso de que el formato del texto ingresado sea correcto (validado únicamente con una expresión regular), se permite ingresar la contraseña. Una vez que se da submit, se intenta autenticar dicho usuario como se explicó anteriormente. Si las credenciales son incorrectas, se muestra un mensaje adecuado de error, mientras que si la autenticación es exitosa se redirige a la página de información del usuario.

Para darle algo de estilo al sitio, se utilizó la librería `Bootstrap`, en conjunto con algunas clases de CSS propias. Esto facilita la realización de una UI algo más amigable, por ejemplo con el uso de sus grillas.