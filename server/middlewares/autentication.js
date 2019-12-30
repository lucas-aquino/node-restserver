// =======================================
//		        AUTENTICATIONS
// =======================================


const jwt = require('jsonwebtoken');

// =======================================
//		VERIFICATION TOKENS
// =======================================

let verifyToken = (req, res, next) => {

    let token = req.get('token');

    jwt.verify(token, process.env.SEED, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token invalido'
                }
            });
        }

        req.usuario = decoded.usuario;

        next();

    });

};

// =======================================
//		VERIFICATION ADMIN ROLE
// =======================================

let verifyAdmin = (req, res, next) => {

    let usuario = req.usuario;

    if (usuario.role === 'ADMIN_ROLE') {
        next();
    } else {
        
        return res.json({
            ok: false,
            err: {
                message: 'Necesita ser administrador'
            }
        });

    }
    
};

module.exports = {
    verifyToken,
    verifyAdmin
};
