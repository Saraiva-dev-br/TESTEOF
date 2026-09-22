import React from 'react';
import { 
  ClipboardList, 
  MessagesSquare, 
  ShieldCheck, 
  Stethoscope, 
  GraduationCap, 
  ChevronRight,
  Info,
  CheckCircle,
  Clock
} from 'lucide-react';
import { STEPS_DATA } from '../data/siteData';

const ICONS = [
  ClipboardList,
  MessagesSquare,
  ShieldCheck,
  Stethoscope,
  GraduationCap
];

export const StepsJourney: React.FC = () => {
  return (
    <section id="etapas" className="py-16 md:py-24 bg-white border-b border-[#eadfeb]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#f1e2f4] border border-[#e5d9e8] text-[#812392] text-sm font-black tracking-wider uppercase mb-3">
            <span>ETAPAS DO ENCAMINHAMENTO</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-[#25102b] tracking-tight">
            Um caminho claro, etapa por etapa.
          </h2>
          <p className="text-[#6c6570] text-base sm:text-lg mt-3">
            Conheça o fluxo transparente e estruturado que faz parte do processo de encaminhamento para as oportunidades de trabalho.
          </p>
        </div>

        {/* Steps Grid / Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
          {STEPS_DATA.map((item, idx) => {
            const Icon = ICONS[idx] || ClipboardList;
            return (
              <div 
                key={item.step}
                className="relative bg-[#f7f3f8] hover:bg-white rounded-2xl border border-[#eadfeb] hover:border-[#812392] p-5 flex flex-col justify-between transition-all duration-300 group hover:shadow-lg"
              >
                {/* Step badge & icon */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="w-9 h-9 rounded-full bg-[#531062] text-[#ffc928] font-black text-base flex items-center justify-center shadow-xs">
                      {item.step}
                    </span>
                    <div className="p-2 rounded-xl bg-white border border-[#eadfeb] text-[#812392] group-hover:bg-[#531062] group-hover:text-white transition-all">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <span className="text-xs font-black uppercase tracking-wider text-[#812392]">
                    Etapa {item.step}
                  </span>
                  
                  <h3 className="text-lg font-black text-[#25102b] mt-1 mb-2 leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-sm text-[#534657] leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                {/* Tip at bottom */}
                <div className="mt-4 pt-3 border-t border-[#eadfeb] text-xs sm:text-sm font-semibold text-[#534657] flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#812392] shrink-0" />
                  <span>{item.tip}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Ethical / Legal notice */}
        <div className="mt-10 p-4 rounded-xl bg-[#fffbeb] border border-[#fde68a] flex items-start gap-3 text-[#78350f] text-sm sm:text-base">
          <Info className="w-5 h-5 text-[#d97706] shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <b className="font-bold">Transparência e conformidade legal:</b> A participação nas etapas preparatórias não garante contratação direta. O avanço em cada etapa depende estritamente dos critérios de perfil, entrevistas e decisões das empresas parceiras responsáveis por cada oportunidade.
          </p>
        </div>

      </div>
    </section>
  );
};
