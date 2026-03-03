import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema, opcionesJuegos } from "../validations/schema";
import { NavLink } from "react-router-dom";
import { axiosService } from "../services/axiosService";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const Juegos = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({ resolver: zodResolver(userSchema) });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // GET
  const { data: accounts, isLoading, refetch } = useQuery({
    queryKey: ["accounts"],
    queryFn: axiosService.getAccount
  });

  // POST
  const enviar = async (data) => {
    try {
      const res = await axiosService.addAccount(data);
      console.log("Estado del POST:", res.status);
      console.log("Datos devueltos:", res.data);

      setSuccess("Formulario enviado con éxito");
      setError();        // limpiar errores previos
      reset();               // limpiar formulario
      refetch();             // actualizar lista
      setTimeout(() => setSuccess(null), 2000);

    } catch (err) {
      setError(err.response?.data?.message || "Error al crear la cuenta");
      setSuccess();
      console.error(err);
    }
  };

  // UPDATE
  const handleUpdate = async (id, updatedData) => {
    try {
      const res = await axiosService.updateAccount(id, updatedData);
      console.log("Estado del PUT", res.status);
      console.log("Datos actualizados", res.data);

      setSuccess("Cuenta actualizada con éxito");      
      refetch();
      setTimeout(() => setSuccess(null), 2000);

    } catch (err) {
      setError(err.response?.data?.message || "Error al actualizar");
      setSuccess(null);
      console.error(err);
    }
  };

  // DELETE
  const handleDelete = async (id) => {
    try {
      const res = await axiosService.deleteAccount(id);
      console.log("Estado del DELETE", res.status);
      console.log("ID de cuenta eliminada:", id);

      setSuccess("Cuenta eliminada con éxito");  
      refetch();
      setTimeout(() => setSuccess(null), 2000);

    } catch (err) {
      setError(err.response?.data?.message || "Error al eliminar");
      setSuccess(null);
      console.error(err);
    }
  };

  return (
    <div className="h-screen bg-[#222] flex flex-col items-center justify-center p-4">

          {/* Mensajes */}
          {success && (
            <div className="mb-10 bg-green-100 text-green-700 p-2 rounded mb-2 text-center font-bold">
              {success}
            </div>
          )}

      <div className="border-40 border-red-600 rounded-[20px] border-b-[80px]">
        <div className="font-mono text-lg bg-[#98b31d] border-10 p-6 min-h-[200px] flex flex-col items-center justify-center text-center">
          <h1 className="text-2xl font-bold mt-2">SELECCIONA EL JUEGO</h1>

          {error && (
            <div className="bg-red-100 text-red-700 p-2 rounded mb-2 text-center font-bold">
              {error}
            </div>
          )}

          {/* Formulario */}
          <form className="flex flex-col mt-6 mb-4 gap-2 w-full max-w-sm" onSubmit={handleSubmit(enviar)}>
            <label htmlFor="generacion" className="text-sm">Generación:</label>
            <input
              placeholder="Escribe una generación"
              className="border bg-white rounded-full border-black px-3 py-1"
              type="text"
              id="generacion"
              {...register("generacion")}
            />
            {errors.generacion && <p className="text-red-500 text-sm">{errors.generacion.message}</p>}

            <label htmlFor="juego" className="text-sm">Juego:</label>
            <select
              className="border bg-white rounded-full border-black px-3 py-1"
              id="juego"
              {...register("juegos")}
            >
              {opcionesJuegos}
            </select>
            {errors.juego && <p className="text-red-500 text-sm">{errors.juego.message}</p>}

            <label htmlFor="nombreCuenta" className="text-sm">Cuenta:</label>
            <input
              placeholder="Escribe una cuenta"
              className="border bg-white rounded-full border-black px-3 py-1"
              type="text"
              id="nombreCuenta"
              {...register("nombreCuenta")}
            />
            {errors.nombreCuenta && <p className="text-red-500 text-sm">{errors.nombreCuenta.message}</p>}

            <div className="flex flex-row mt-3 items-center justify-center text-sm">
              <label htmlFor="terminos">Acepto términos:</label>
              <input className="ml-2" type="checkbox" id="terminos" {...register("terminos")} />
              {errors.terminos && <p className="text-red-500 text-sm ml-2">{errors.terminos.message}</p>}
            </div>

            <button
              type="submit"
              className="w-full mt-4 bg-[#1a2d11] text-[#98b31d] py-2 px-4 font-mono font-bold text-lg uppercase hover:bg-[#2a451a] border-2 border-[#1a2d11] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-0.5 hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"
            >
              Enviar
            </button>

            {/* Lista de cuentas */}
            <label className="text-sm mt-4">Cuentas guardadas:</label>
            <div className="w-full mt-4 bg-[#1a2d11] rounded p-4 max-h-40 overflow-y-auto shadow-md">
              {isLoading && <p className="text-center text-gray-600">Cargando cuentas...</p>}
              {!isLoading && (!accounts || accounts.length === 0) && <p className="text-center text-gray-600">No hay cuentas disponibles.</p>}
              {accounts && accounts.length > 0 && accounts.map((acc) => (
                
                <div key={acc.id} className="flex flex-col items-center gap-2 mb-3 border-b border-gray-300 pb-2">
                  <label className="text-sm text-green-300 py-2">Username:</label>
                  <input defaultValue={acc.title} className="border rounded bg-white text-sm px-2 py-1 focus:outline-none"/>
                  <div className="justify-between flex">
                    <span>
                        <button
                            type="button"
                            onClick={(e) => handleUpdate(acc.id, { ...acc, title: e.target.value })}
                            className="bg-red-600 hover:bg-red-700 text-white text-sm rounded mr-5 px-3 py-1 transition"
                        >Actualizar</button>                 
                    </span>

                    <span>
                        <button
                            type="button"
                            onClick={() => handleDelete(acc.id)}
                            className="bg-red-600 hover:bg-red-700 text-white text-sm rounded px-3 py-1 transition"
                        >Eliminar</button>
                    </span>

                  </div>
                </div>
              ))}
            </div>
          </form>
        </div>

        {/* Botones A/B y volver */}
        <div className="flex gap-20 w-full justify-center bg-red-600 p-2">
          <div className="w-20 h-16 bg-[#333] text-2xl mt-4 rounded-full shadow-lg flex items-center justify-center text-white font-bold">B</div>
          <div className="w-20 h-16 bg-[#333] text-2xl mt-4 rounded-full shadow-lg flex items-center justify-center text-white font-bold">A</div>
          <NavLink
            to="/"
            className="w-30 mt-4 bg-[#1a2d11] text-[#98b31d] py-4 px-4 font-mono font-bold text-lg uppercase hover:bg-[#2a451a] border-2 border-[#1a2d11] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-0.5 hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"
          >
            {"< Volver"}
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Juegos;