exports.isAuth = (req, res, next) => {
  if (process.env.NODE_ENV === 'test') {
    next();
  } else {
    if (req.isAuthenticated()) {
      next();
    } else {
      res.status(403).send('Unauthorized');
    }
  }
}
