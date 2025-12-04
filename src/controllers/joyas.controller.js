import { findJoyas, findJoyasByFilters } from "../models/joyas.model.js";

export const getJoyas = async (req, res, next) => {
  const { limits = 10, page = 1, order_by = "id_ASC" } = req.query;

  try {
    const data = await findJoyas({ limits, page, order_by });
    return res.json(data);
  } catch (error) {
    next(error);
  }
};

export const getJoyasByFiltros = async (req, res, next) => {
  const { precio_min, precio_max, categoria, metal } = req.query;

  try {
    const joyas = await findJoyasByFilters({
      precio_min,
      precio_max,
      categoria,
      metal,
    });

    return res.json(joyas);
  } catch (error) {
    next(error);
  }
};
