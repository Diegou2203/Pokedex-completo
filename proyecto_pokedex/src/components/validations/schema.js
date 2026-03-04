import { z } from "zod";

const juegosDisponibles = [
  "Pokemon Rojo",
  "Pokemon Azul",
  "Pokemon Amarillo",
  "Pokemon Oro",
  "Pokemon Plata",
  "Pokemon Cristal",
  "Pokemon Rubí",
  "Pokemon Zafiro",
  "Pokemon Esmeralda",
  "Pokemon Diamante",
  "Pokemon Perla",
  "Pokemon Platino",
  "Pokemon Negro",
  "Pokemon Blanco",
  "Pokemon Negro 2",
  "Pokemon Blanco 2"
];

// CORRECCIÓN: Usamos el nombre del juego como valor, no el índice numérico
export const opcionesJuegos = [
  ...juegosDisponibles.map((juego) => (
    <option value={juego} key={juego}>
      {juego}
    </option>
  ))
];

export const userSchema = z.object({
  nombreCuenta: z
    .string()
    .min(1, { message: "Obligatorio" }) // nonempty está deprecado, mejor usar min(1)
    .max(20, { message: "Máximo 20 caracteres" }),

  generacion: z
    .string()
    .min(1, { message: "Obligatorio" })
    .regex(/^[0-9]+$/, { message: "Solo números" }),

  terminos: z
    .boolean()
    .refine((value) => value === true, { message: "Debes guardar la cuenta en el cartucho" }),

  // Validamos que el string no esté vacío (que el usuario haya elegido uno)
  juegos: z
    .string()
    .min(1, { message: "Selecciona un juego válido" })
});