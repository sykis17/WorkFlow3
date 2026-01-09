export default function TailwindFlow() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-4 p-8 bg-slate-50 rounded-xl border border-slate-200">
      
      {/* Vaihe 1 */}
      <div className="group relative p-6 bg-white rounded-2xl shadow-md border-b-4 border-blue-500 hover:shadow-xl transition-all w-48 text-center">
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-[10px] px-5 py-2 rounded-full font-bold uppercase">Alku</span>
        <p className="font-bold text-slate-800">Hakemus</p>
      </div>

      {/* Nuoli (Tailwindilla tehty) */}
      <div className="text-slate-300 text-2xl hidden md:block">→</div>
      <div className="text-slate-300 text-2xl md:hidden">↓</div>

      {/* Vaihe 2 */}
      <div className="group p-6 bg-white rounded-2xl shadow-md border-b-4 border-amber-500 hover:shadow-xl transition-all w-48 text-center">
        <p className="font-bold text-slate-800">Käsittely</p>
        <div className="mt-2 h-1 w-0 group-hover:w-full bg-amber-500 transition-all duration-500 mx-auto"></div>
      </div>

      {/* Nuoli */}
      <div className="text-slate-300 text-2xl hidden md:block">→</div>
      <div className="text-slate-300 text-2xl md:hidden">↓</div>

      {/* Vaihe 3 */}
      <div className="group p-6 bg-emerald-500 rounded-2xl shadow-lg text-white w-48 text-center transform hover:scale-105 transition-transform">
        <p className="font-bold italic text-lg">Päätös!</p>
      </div>

      {/* Nuoli */}
      <div className="text-slate-300 text-2xl hidden md:block">→</div>
      <div className="text-slate-300 text-2xl md:hidden">↓</div>

      {/* Vaihe 4 */}
      <div className="group p-6 bg-yellow-500 rounded-2xl shadow-lg text-white w-48 text-center transform hover:scale-105 transition-transform">
        <p className="font-bold italic text-lg">Kysymyksiä?</p>
      </div>
      
    </div>
  );
}