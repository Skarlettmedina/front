import { Router } from "express";
import { productos, registrarProductos } from "../controllers/controllers.productos.js";
import { generar } from "../controllers/controller.informe.js";

const rutaProductos = Router();

rutaProductos.get("/productos", productos);
rutaProductos.get("/registrarProductos", registrarProductos);
rutaProductos.get("/factura", generar);



export default rutaProductos;