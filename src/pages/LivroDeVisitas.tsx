import { useEffect } from 'react';

const destino = `${import.meta.env.BASE_URL}livro-de-visitas/registro.html`;

export default function LivroDeVisitas() {
  useEffect(() => { window.location.replace(destino); }, []);
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">
      <a href={destino} className="text-[#F4C025] underline">Abrir Livro de Memórias</a>
    </main>
  );
}
