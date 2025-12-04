import "dotenv/config";
import format from "pg-format";
import { pool } from "../database/connection.js";

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? process.env.DOMAIN_URL_APP
    : `http://localhost:${process.env.PORT || 3000}`;

const VALID_FIELDS = ["id", "nombre", "categoria", "metal", "precio", "stock"];
const VALID_DIRECTIONS = ["ASC", "DESC"];

const parseOrderBy = (orderBy = "id_ASC") => {
  const [campoRaw, direccionRaw] = orderBy.split("_");
  const campo = VALID_FIELDS.includes(campoRaw) ? campoRaw : "id";
  const direccion = VALID_DIRECTIONS.includes(direccionRaw?.toUpperCase())
    ? direccionRaw.toUpperCase()
    : "ASC";
  return { campo, direccion };
};

const prepararHATEOAS = ({ joyas, totalJoyas, limits, page, order_by }) => {
  const results = joyas.map((j) => ({
    name: j.nombre,
    href: `/joyas/joya/${j.id}`,
  }));

  const total_pages = Math.ceil(totalJoyas / limits);

  const next =
    page >= total_pages
      ? null
      : `/joyas?limits=${limits}&page=${page + 1}&order_by=${order_by}`;

  const previous =
    page <= 1
      ? null
      : `/joyas?limits=${limits}&page=${page - 1}&order_by=${order_by}`;

  return {
    totalJoyas,
    total_pages,
    page,
    limits,
    next,
    previous,
    results,
  };
};

export const findJoyas = async ({ limits = 10, page = 1, order_by = "id_ASC" }) => {
  const countQuery = "SELECT COUNT(*) FROM inventario";
  const { rows: countRows } = await pool.query(countQuery);
  const totalJoyas = parseInt(countRows[0].count, 10);

  const { campo, direccion } = parseOrderBy(order_by);

  const safeLimits = Number(limits) > 0 ? Number(limits) : 10;
  const safePage = Number(page) > 0 ? Number(page) : 1;
  const offset = (safePage - 1) * safeLimits;

  const query =
    "SELECT * FROM inventario ORDER BY %I %s LIMIT %s OFFSET %s";
  const formattedQuery = format(query, campo, direccion, safeLimits, offset);

  const { rows } = await pool.query(formattedQuery);

  const HATEOAS = prepararHATEOAS({
    joyas: rows,
    totalJoyas,
    limits: safeLimits,
    page: safePage,
    order_by,
  });

  return {
    ...HATEOAS,
    results: HATEOAS.results.map((r) => ({
      ...r,
      href: `${BASE_URL}${r.href}`,
    })),
  };
};

export const findJoyasByFilters = async ({
  precio_min,
  precio_max,
  categoria,
  metal,
}) => {
  let filtros = [];
  const values = [];

  const agregarFiltro = (campo, comparador, valor) => {
    values.push(valor);
    const index = values.length; 
    filtros.push(`${campo} ${comparador} $${index}`);
  };

  if (precio_min) agregarFiltro("precio", ">=", Number(precio_min));
  if (precio_max) agregarFiltro("precio", "<=", Number(precio_max));
  if (categoria) agregarFiltro("categoria", "ILIKE", categoria);
  if (metal) agregarFiltro("metal", "ILIKE", metal);

  let query = "SELECT * FROM inventario";

  if (filtros.length > 0) {
    const whereClause = filtros.join(" AND ");
    query += ` WHERE ${whereClause}`;
  }

  const { rows } = await pool.query(query, values);
  return rows;
};
