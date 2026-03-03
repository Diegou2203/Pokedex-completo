import {z} from "zod";

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
];;


  //JUEGOS PARA SELECT
  export const opcionesJuegos = [
  Object.entries(juegosDisponibles).map(([key, value]) => {
      return <option value={key} key={key}>{value}</option>
    })
  ];

export const userSchema = z.object({
   
    nombreCuenta: z
    .string()
    .nonempty({"message": "Obligatorio"})
    .max(20, {"message": "Máximo 20 caracteres"}),

    generacion: z
    .string()
    .nonempty({"message": "Obligatorio"})
    .regex(/^[0-9]+$/, {"message": "Solo números"}),

    terminos: z
    .boolean()
    .refine(value => value === true, {"message": "Obligatorio"}),

    juegos: z.string().min(1, {"message": "Por favor selecciona un juego válido"})
  
})
