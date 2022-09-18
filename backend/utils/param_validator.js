function pathParamValidator(req, _res, next) {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    throw new Error('invalid user id, should be a number');
  }

  next();
}

module.exports = {
  pathParamValidator,
};
