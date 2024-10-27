require('dotenv').config();

const jwt = require('jsonwebtoken');

function jwtMiddleware(req, res, next) {
    // Excluir rutas específicas de la validación JWT
    const excludedPaths = [
        { path: '/api/users/login', method: 'POST' },
        { path: '/api/users', method: 'POST' } // Registro
    ];

    // Verificar si la ruta actual está en la lista de exclusiones
    const isExcluded = excludedPaths.some(
        (route) => route.path === req.path && route.method === req.method
    );

    if (isExcluded) {
        return next();
    }

    // Obtener el token de la cabecera Authorization
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({ error: true, message: 'No token provided' });
    }

    // Extraer el token quitando el prefijo 'Bearer '
    const token = authHeader.split(' ')[1];

    // Verificar el token
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            // El token es inválido o ha expirado
            return res.status(401).json({ error: true, message: 'Failed to authenticate token' });
        }

        // Guardar los datos decodificados del token en req.user para usarlos en otras partes de la aplicación
        req.user = decoded;
        next();
    });
}

module.exports = jwtMiddleware;
