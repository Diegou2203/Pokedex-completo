import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema, opcionesJuegos } from "../validations/schema";
import { NavLink } from "react-router-dom";
import { localCRUD } from "../services/serviceLocal";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import axios from "axios"
import { userSchema1 } from "../validations/schema2";



const Juegos = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({ 
    resolver: zodResolver(userSchema) 
  });
  
 const { 
    register: registerPost, 
    handleSubmit: handleSubmitPost, 
    reset: resetPost,
    formState: { errors: postErrors } 
  } = useForm({
    resolver: zodResolver(userSchema1)
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isSending, setIsSending] = useState(false);

  // GET
  const { data: accounts = [], isLoading, refetch } = useQuery({
    queryKey: ["trainerAccounts"],
    queryFn: localCRUD.getAccount
  });

  const showFeedback = (texto, tipo = 'success') => {
    tipo === 'error' ? setError(texto) : setSuccess(texto);
    setTimeout(() => 
      { setError(null); 
        setSuccess(null);
      }, 3000);  
  };


  const enviarReporteOak = async (data) => {
      setIsSending(true);
      try {
        const response = await axios.post("https://jsonplaceholder.typicode.com/posts", {
          title: "Reporte de Entrenador",
          body: data.comentario,
          userId: 1
        });
        
        if (response.status === 201) {
          showFeedback("¡Reporte enviado al Prof. Oak!");

          resetPost();
        }


      } catch (err) {
        showFeedback("Fallo en la conexión del PC", "error");
      } finally {
        setIsSending(false);
      }
    };

  // CREATE
  const enviar = async (data) => {
    try {
      await localCRUD.addAccount(data);
      showFeedback("¡Entrenador Guardado!");
      reset();
      refetch();
    } catch (err) {
      showFeedback("Error al registrar", "error");
    }
  };

  const handleUpdate = async (id) => {
    try {
      // Capturamos los valores directamente del DOM por ID único
      const nombre = document.getElementById(`edit-nombre-${id}`).value;
      const gen = document.getElementById(`edit-gen-${id}`).value;
      const juego = document.getElementById(`edit-juego-${id}`).value;

      if (!nombre.trim() || !gen.trim()) {
        return showFeedback("Campos incompletos", "error");
      }

      if(window.confirm("¿Deseas confirmar los cambios?"))
          await localCRUD.updateAccount(id, { 
          nombreCuenta: nombre, 
          generacion: gen, 
          juegos: juego,
        })
          showFeedback("¡Registro Actualizado!");
          refetch(); 
        
        
    } catch (err) {
      showFeedback("Error al actualizar", "error");
    }
  };

  // DELETE
  const handleDelete = async (id) => {
    
    try{
      if (window.confirm("¿Deseas borrar esta partida guardada?")) {
        await localCRUD.deleteAccount(id);
        refetch();
        showFeedback("Datos eliminados");
      }
    }catch(err){
      showFeedback("Error al eliminar", "error")
    }

  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] p-4 flex flex-col items-center justify-center font-mono text-black">
      
      {/* Alertas */}
      {success && <div className="fixed top-5 bg-green-500 border-2 border-black px-4 py-2 font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-50">{success}</div>}
      {error && <div className="fixed top-5 bg-red-600 text-white border-2 border-black px-4 py-2 font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-50">{error}</div>}

      <div className="w-full max-w-md bg-red-600 rounded-[40px] border-b-50 border-red-800 p-2">
        <div className="bg-[#333] p-6 rounded-t-[30px] rounded-b-[10px]">
          
          {/* Pantalla LCD */}
          <div className="bg-[#98b31d] min-h-[500px] p-4 rounded border-4 border-black overflow-y-auto shadow-inner">
            <h1 className="text-center font-black text-xl mb-4 border-b-2 border-black pb-2 uppercase italic">Poké-entrenador</h1>

            {/* FORMULARIO PRINCIPAL */}
            <form onSubmit={handleSubmit(enviar)} className="flex flex-col gap-2 mb-8 bg-black/5 p-3 border border-black/10 rounded">
              <input {...register("nombreCuenta")} placeholder="NOMBRE ENTRENADOR" className="bg-[#8b9d1a] border-2 border-black p-2 font-bold uppercase text-sm" />
              {errors.nombreCuenta && <span className="text-red-900 text-[10px] font-bold">{errors.nombreCuenta.message}</span>}

              <div className="flex gap-2">
                <input {...register("generacion")} placeholder="GENERACIÓN" className="w-40 bg-[#8b9d1a] border-2 border-black p-2 font-bold text-center text-sm" />
                  <select {...register("juegos")} className="flex-1 bg-[#8b9d1a] border-2 border-black p-2 font-bold outline-none text-[10px] h-[41px]">
                  {opcionesJuegos}
                </select>
              </div>
              {errors.generacion && <span className="text-red-900 text-[10px] font-bold">{errors.generacion.message}</span>}

              <div className="flex items-center gap-2 mt-1">
                <input type="checkbox" {...register("terminos")} className="accent-black w-4 h-4" />
                <span className="text-[9px] font-black uppercase">¿Guardar en Cartucho?</span>
              </div>
              {errors.terminos && <span className="text-red-900 text-[10px] font-bold">{errors.terminos.message}</span>}

              <button type="submit" className="bg-black text-[#98b31d] p-2 font-black mt-2 hover:bg-zinc-800 active:translate-y-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all">
                SAVE DATA
              </button>
            </form>

            <div className="border-b-4 border-double mb-4"></div>

            {/* LISTA DE REGISTROS */}
            <h2 className="text-xs font-black underline mb-4 italic uppercase">Memoria de Partidas:</h2>
            
            <div className="mx-2 space-y-5 max-h-[320px] overflow-y-auto pr-2">
              {isLoading ? (
                <div className="flex flex-col items-center py-10">
                  <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin mb-2"></div>
                  <p className="text-[10px] font-bold">Esperando conectar el cable del gameboy</p>
                </div>
              ) : accounts.length > 0 ? (
                accounts.map((acc) => (
                  <div key={acc.id} className="border-2 overflow-y-auto border-black p-3 bg-[#a7bd2d] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col gap-3">
                    
                    {/* Campos Editables Directos */}
                    <div >
                      <label className="text-[8px] font-bold opacity-70">NOMBRE ENTRENADOR:</label>
                      <input 
                        id={`edit-nombre-${acc.id}`}
                        defaultValue={acc.nombreCuenta}
                        className="w-full bg-white/20 border-b-2 border-black/30 font-black text-sm outline-none focus:bg-white/40 px-1 uppercase"
                      />
                      
                      <div className="flex gap-2">
                        <div className="w-1/4">
                          <label className="text-[8px] font-bold block opacity-70">GENERACIÓN:</label>
                          <input 
                            id={`edit-gen-${acc.id}`}
                            defaultValue={acc.generacion}
                            className="w-full bg-white/20 border-b-2 border-black/30 text-[10px] text-center font-bold outline-none"
                          />
                        </div>
                        <div className="flex-1">
                          <label className="text-[8px] font-bold block opacity-70">VERSIÓN:</label>
                          <select 
                            id={`edit-juego-${acc.id}`}
                            defaultValue={acc.juegos}
                            className="w-full bg-white/20 border-b-2 border-black/30 text-[10px] font-bold outline-none"
                          >
                            {opcionesJuegos}
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-2 border-t border-black/10">
                      <span className="text-[8px] font-bold opacity-50 italic">ID: {acc.id.toString().slice(-1)}</span>
                      <div className="flex gap-2">
                        <button onClick={() => handleUpdate(acc.id)} className="bg-black text-white text-[9px] px-3 py-1 font-bold hover:bg-zinc-800">UPDATE</button>
                        <button onClick={() => handleDelete(acc.id)} className="bg-red-800 text-white text-[9px] px-3 py-1 font-bold hover:bg-red-600">DELETE</button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-10 opacity-40">
                  <p className="text-[10px] font-black underline">INTERNAL BATTERY HAS DIED</p>
                  <p className="text-[8px] mt-1 italic">No save files found</p>
                </div>
              )}
            </div>

                 {/* FORM PARA JSONPLACEHOLDER*/}
                <div className="border-t-4 border-double border-black/30 pt-4">
                      {/* FORM 2: EXTERNO (JSONPlaceholder) */}
                      <h3 className="text-[10px] font-black uppercase mb-2">PC de Bill - Enviar Reporte:</h3>
                      <form onSubmit={handleSubmitPost(enviarReporteOak)} className="flex flex-col gap-2 p-2 bg-black/10 rounded">
                          <textarea 
                          {...registerPost("comentario")}
                          placeholder="Mensaje para el Profesor..."
                          className="bg-[#8b9d1a]/50 border-2 border-black p-2 text-[10px] font-bold h-14 outline-none"
                          />
                          {postErrors.comentario && <span className="text-red-900 text-[9px] font-bold">{postErrors.comentario.message}</span>}
                                
                          <button 
                            disabled={isSending}
                            type="submit" 
                            className="bg-blue-800 text-white p-1 text-[9px] font-black uppercase border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 disabled:opacity-50"
                          >
                            {isSending ? "ENVIANDO..." : "CONECTAR CON KANTO"}
                          </button>
                      </form>
                  </div>
          </div>
        </div>

        {/* Botones Físicos (Decoración) */}
        <div className="flex justify-between items-center px-10 py-6">
          <div className="w-16 h-16 bg-[#222] rounded-full relative shadow-inner flex items-center justify-center">
            <div className="absolute w-12 h-3 bg-black"></div>
            <div className="absolute h-12 w-3 bg-black"></div>
          </div>
          <div className="flex gap-4 rotate-[-15deg]">
            <div className="w-12 h-12 bg-[#222] rounded-full shadow-xl flex items-center justify-center text-white font-black border-b-4 border-black active:translate-y-1 transition-all">B</div>
            <div className="w-12 h-12 bg-[#222] rounded-full shadow-xl flex items-center justify-center text-white font-black border-b-4 border-black active:translate-y-1 transition-all">A</div>
          </div>
        </div>
        <div className="flex justify-center pb-4">
          <NavLink to="/" className="bg-[#1a2d11] text-[#98b31d] text-[10px] px-6 py-1 border-2 border-black font-bold uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-[#2a451a]">Power Off</NavLink>
        </div>
      </div>
    </div>
  );
};

export default Juegos;