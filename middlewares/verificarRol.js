module.exports = function(rolesPermitidos = []) {
  return (req, res, next) => {
    const rol = req.body?.usuario?.rol || req.query?.rol || req.headers['x-user-role'];

    if (!rol) {
      return res.status(403).json({ mensaje: 'Acceso denegado: rol no especificado' });
    }

    if (!rolesPermitidos.includes(rol)) {
      return res.status(403).json({ mensaje: 'Acceso denegado: rol no autorizado' });
    }

    next();
  };
};
