export const errorMiddleware = (err, req, res, next) => {
  console.error(err);

  if (err.code === "22P02") {
    return res
      .status(400)
      .json({ message: "Parámetros inválidos en la consulta." });
  }

  if (err.statusCode) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  res.status(500).json({ message: "Error interno del servidor." });
};
