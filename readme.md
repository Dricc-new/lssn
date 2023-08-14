# LSSN -> Login System by Social Network

- Caso de uso: Autenticación por red social (LinkedIn)
- Descripción: El sistema creado por el desarrollador, debe permitir la autenticación a través de la red social. 
- Lenguajes: vue 3, composition api y Nestjs (graphql o Rest).
API de integración de LinkedIn

## Especificaciones
- El proyecto cuenta con autenticacion con Passport.js con jwt como estrategia
- Autenticacion con Linkedin (No lo implemente como una estrategia de Passport)
- El frontend esta montado con Vue 3(Composition API)
- El backend esta montado sobre NestJS, y la base de datos es MySQL

## Server Routes
|Ruta          |Metodo|descripcion
|--------------|------| ------------- 
|/auth/register| POST | Registra un usuario
|/auth/login   | POST | Inicia la session de un usuario y le devuelve una clave de acceso
|/auth/oauth2/linkedin/:action|GET| devuelve una ruta para autenticar a un usuario de linkedin, action es para saber si quiere iniciar session o registrarse solo acepta los valores "login" y "register"
|/auth/oauth2/linkedin|POST| Esta ruta debe ser llamada una vez linkedin redirija a la ruta callback, pide un codigo("code") que la API de linkedin provee y un estado("state") que fue enviado a linkedin para verificar que la llamada fue echa por esta misma aplicacion.
|/auth/refreshToken|POST| Actualiza un access token cuando este ha expirado
|/auth/profile |POST| Devuelve el name,email y picture que estan asociados a tu cuenta de linkedin.
## Screenshot del home
# ![home](https://github.com/Dricc-new/lssn/blob/main/screenshot/home.jpg?raw=true)

## Nota:
 Al autenticarse con Linkedin(ya sea registrarse o inisiar sesion); puede que al hacer logout de la applicacion e intentar registrar o entrar por otro usuariom se salte la pantalla de autenticacion de linkedin. Esto es haci porque se queda guardada el inicio de session de linkedin, para evitar esto, tiene que ir a linquedin y cerrar session. No se considera un error, solo es una consecuensia de iniciar session con linkedin.