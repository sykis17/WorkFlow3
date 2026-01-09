import React from 'react';
import Link from '@docusaurus/Link';

export default function Hero() {
  return (
    <div className="relative isolate overflow-hidden bg-slate-900 py-24 sm:py-32 rounded-3xl mx-4 my-8">
      {/* Taustan koristekuviot (Blobit) */}
      <div className="absolute -top-24 right-0 -z-10 transform-gpu blur-3xl opacity-30">
        <div className="aspect-[1155/678] w-[72rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc]" />
      </div>
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-6">
            Hei, olen <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">Jesse</span>
          </h1>
          <p className="text-lg leading-8 text-slate-300 mb-10">
            Olen koodari ja oikeudellisen teknologian harrastaja. Rakennan työkaluja, 
            jotka tekevät monimutkaisista säädöksistä ymmärrettäviä ja lämpötilan 
            muunnoksista tyylikkäitä.
          </p>
          
          <div className="flex flex-wrap gap-x-6 gap-y-4">
            <Link
              className="rounded-full bg-blue-600 px-8 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400 transition-all transform hover:scale-105"
              to="/docs/koodari.mdx"
            >
              Tutustu projekteihin
            </Link>
            <Link
              className="rounded-full px-8 py-3.5 text-sm font-semibold leading-6 text-white border border-slate-700 hover:bg-slate-800 transition-all"
              to="https://github.com/sinun-profiili"
            >
              GitHub <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        {/* Pieni "statistiikka" tai teknologia-pillerit */}
        <div className="mx-auto mt-16 max-w-2xl lg:mx-0 lg:max-w-none">
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 text-base font-semibold leading-7 text-white sm:grid-cols-2 md:flex lg:gap-x-10">
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-blue-500"></span> React / Docusaurus
            </span>
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500"></span> Tailwind CSS
            </span>
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-amber-500"></span> Legal Tech
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}