import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {userSchema, juegosDisponibles} from "../validations/schema";
import { useNavigate, NavLink } from "react-router-dom";

const Juegos = () => {

    const {register, handleSubmit, formState: {errors}} = useForm({ resolver: zodResolver(userSchema)});

    // Función para enviar los datos del formulario

    const navigate = useNavigate(); //hooks para navegar fuera de html 

    const enviar = (data) => {

        //fetch para enviar los datos a un endpoint (ejemplo con JSONPlaceholder)
        //stringify convierte el objeto data a un string JSON para enviarlo en el cuerpo de la solicitud
        fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })

    // 1. Loguea el estado de la respuesta
    //se recibe la respuesta del servidor y se verifica si es exitosa (response.ok). Si no lo es, se lanza un error con el estado de la respuesta. Si es exitosa, se convierte la respuesta a JSON para su posterior uso.
    .then((response) => {
        // 1. Loguea el estado de la respuesta
        console.log("Status:", response.status); 
        
        if (!response.ok) {
            throw new Error(`Error en el servidor: ${response.status}`);
        }

        //se retorna el JSON de la respuesta para ser utilizado en el siguiente .then()
        return response.json();
    })
    .then((json) => {
        // 2. Loguea el JSON recibido
        console.log("JSON recibido:", json); 
        alert("Formulario enviado con éxito.");
        navigate("/"); // Redirige a la página de inicio después de enviar el formulario
        })
    .catch((error) => {
        console.error("Error capturado:", error);
        alert("Hubo un error.");
    });
};

    const opcionesJuegos = [
        Object.entries(juegosDisponibles).map(([key, value]) => {
            return <option value={key} key={key}>{value}</option>
        })
    ];

    return (
       <div className="h-screen bg-[#FFD700] flex flex-col items-center justify-center p-4">
            {/* PANTALLA */}
            <div className="border-40 border-red-600 rounded-[20px] border-b-[80px]">
                <div className="font-mono text-lg bg-[#98b31d] border-10 p-6 min-h-[200px] flex flex-col items-center justify-center text-center">
                    <h1 className="text-2xl font-bold mt-2">SELECCIONA EL JUEGO</h1>
                    <form className="flex flex-col mt-6 mb-4 gap-2 w-full max-w-sm" onSubmit={handleSubmit(enviar)}>

                        <label htmlFor="generacion" className="text-sm">Generación:</label>
                        <input placeholder = "Escribe una generación" className="border bg-white rounded-full border-black px-3 py-1" type="text" id="generacion" {...register("generacion")}></input>
                        {errors.generacion && <p className="text-red-500 text-sm">{errors.generacion.message}</p>}

                        <label htmlFor="juego" className="text-sm">Juego:</label>
                        <select className="border bg-white rounded-full border-black px-3 py-1" id="juego" {...register("juego")}>
                            {opcionesJuegos}
                        </select>
                        {errors.juego && <p className="text-red-500 text-sm">{errors.juego.message}</p>}

                        <label htmlFor="nombreCuenta" className="text-sm">Cuenta:</label>
                        <input placeholder = "Escribe una cuenta" className=" border bg-white rounded-full border-black  px-3 py-1" type="text" id="nombreCuenta" {...register("nombreCuenta")}></input>
                        {errors.nombreCuenta && <p className="text-red-500 text-sm">{errors.nombreCuenta.message}</p>}


                        <div className="flex flex-row mt-3 items-center justify-center text-sm">
                            <label htmlFor="terminos">Acepto términos:</label>
                            <input className="ml-2" type="checkbox" id="terminos" {...register("terminos")}></input>
                            {errors.terminos && <p className="text-red-500 text-sm ml-2">{errors.terminos.message}</p>}
                        </div>

                        <button type="submit" className="w-full mt-4 bg-[#1a2d11] text-[#98b31d] py-2 px-4 font-mono font-bold text-lg uppercase hover:bg-[#2a451a] border-2 border-[#1a2d11] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-0.5 hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">Enviar</button>
                    </form>
                </div>

                {/* BOTONES A B */}
                <div className="flex gap-20 w-full justify-center bg-red-600 p-2" >
                    <div className="w-20 h-16 bg-[#333] text-2xl mt-4 rounded-full shadow-lg flex items-center justify-center text-white font-bold">B</div>
                    <div className="w-20 h-16 bg-[#333] text-2xl mt-4 rounded-full shadow-lg flex items-center justify-center text-white font-bold">A</div>
                    
                    <NavLink to="/" className="w-30  mt-4 bg-[#1a2d11]  text-[#98b31d] py-4 px-4 font-mono font-bold text-lg uppercase hover:bg-[#2a451a] border-2 border-[#1a2d11] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-0.5 hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
                        {"< Volver"}
                    </NavLink>
                </div>
            </div>
        </div>
    )
}

export default Juegos;