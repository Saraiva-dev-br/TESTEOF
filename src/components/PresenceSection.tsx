import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Building, 
  Phone, 
  Clock, 
  MessageCircle, 
  Navigation, 
  Sparkles,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { STATES_PRESENCE, SITE_INFO } from '../data/siteData';
import { getMediaUrl } from '../utils/media';

interface PresenceSectionProps {
  onSelectUnit: (unitId: string) => void;
}

export const PresenceSection: React.FC<PresenceSectionProps> = ({ onSelectUnit }) => {
  const [, setTick] = useState(0);

  useEffect(() => {
    const handlePhotoUpdated = () => setTick((t) => t + 1);
    window.addEventListener('photo-updated', handlePhotoUpdated);
    return () => window.removeEventListener('photo-updated', handlePhotoUpdated);
  }, []);
  const [activeUf, setActiveUf] = useState<string>('PI');

  const selectedState = STATES_PRESENCE.find(s => s.uf === activeUf) || STATES_PRESENCE[0];

  return (
    <section id="presenca" className="py-16 md:py-24 bg-[#f7f3f8] border-b border-[#eadfeb]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#f1e2f4] border border-[#e5d9e8] text-[#812392] text-sm font-black tracking-wider uppercase mb-3">
            <MapPin className="w-4 h-4 text-[#812392]" />
            <span>ONDE ESTAMOS · PRESENÇA NACIONAL & LOCAL</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-[#25102b] tracking-tight">
            Proximidade que faz a diferença no seu dia a dia.
          </h2>
          <p className="text-[#6c6570] text-base sm:text-lg mt-3">
            Atuamos em 10 estados brasileiros e contamos com dois polos presenciais modernos e bem localizados em Teresina - PI.
          </p>
        </div>

        {/* Highlight: Teresina Units Cards */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-6">
            <span className="w-3 h-3 rounded-full bg-[#ffc928]" />
            <h3 className="text-xl sm:text-2xl font-black text-[#25102b]">
              Polos de Atendimento em Teresina - Piauí
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SITE_INFO.units.map((unit) => (
              <div
                key={unit.id}
                className="bg-white rounded-2xl border-2 border-[#eadfeb] hover:border-[#812392] p-6 sm:p-8 transition-all duration-300 flex flex-col justify-between group shadow-xs hover:shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-full text-sm font-black uppercase tracking-wider bg-[#531062] text-[#ffc928] shadow-2xs">
                      {unit.badge}
                    </span>
                    <span className="text-sm font-bold text-[#716575]">
                      Teresina - PI
                    </span>
                  </div>

                  <h4 className="text-2xl sm:text-3xl font-black text-[#25102b] mb-2">
                    {unit.name}
                  </h4>

                  <p className="text-base text-[#534657] mb-6 leading-relaxed">
                    {unit.description}
                  </p>

                  <div className="space-y-3 pt-4 border-t border-[#eadfeb] text-sm sm:text-base text-[#4d3e51]">
                    <div className="flex items-start gap-2.5">
                      <MapPin className="w-4 h-4 text-[#812392] shrink-0 mt-1" />
                      <span className="font-semibold leading-snug">{unit.address}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Clock className="w-4 h-4 text-[#716575] shrink-0" />
                      <span>{unit.hours}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Phone className="w-4 h-4 text-[#531062] shrink-0" />
                      <span className="font-semibold">WhatsApp / Central: {SITE_INFO.phone}</span>
                    </div>
                  </div>

                  {/* Pedagogical Coordinator Spotlight if present */}
                  {unit.coordinator && (
                    <div className="mt-5 p-3.5 sm:p-4 rounded-xl bg-gradient-to-br from-[#fbf7fc] to-[#f4ebf7] border border-[#eadfeb] flex items-center gap-3.5 shadow-2xs">
                      <img
                        src={getMediaUrl(unit.coordinator.photoUrl)}
                        alt={unit.coordinator.name}
                        className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl object-cover border-2 border-[#812392] shadow-xs shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-xs font-black uppercase tracking-wider text-[#812392] bg-[#f1e2f4] px-2 py-0.5 rounded-md">
                            {unit.coordinator.role}
                          </span>
                          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60">
                            Polo Dirceu
                          </span>
                        </div>
                        <h5 className="font-black text-[#25102b] text-base mt-1 truncate">
                          {unit.coordinator.name}
                        </h5>
                        <p className="text-xs text-[#534657] leading-snug line-clamp-2 mt-0.5">
                          Acompanhamento pedagógico, acolhimento e orientação profissional aos aprendizes.
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-8 pt-5 border-t border-[#eadfeb] flex flex-col sm:flex-row items-center gap-3">
                  <a
                    href={unit.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 py-3.5 px-4 text-sm sm:text-base font-black text-[#28102d] bg-[#ffc928] hover:bg-[#e6b420] active:bg-[#d4a317] rounded-xl shadow-xs transition active:scale-98"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Conversar pelo WhatsApp da {unit.name}</span>
                  </a>

                  <button
                    onClick={() => onSelectUnit(unit.id)}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 py-3.5 px-4 text-sm sm:text-base font-black text-[#531062] bg-[#f1e2f4] hover:bg-[#efe3f2] border border-[#e5d9e8] rounded-xl transition active:scale-98"
                  >
                    <span>Cadastrar Currículo</span>
                    <ChevronRight className="w-4 h-4 text-[#812392]" />
                  </button>
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* National Presence Grid */}
        <div className="rounded-2xl bg-[#17081d] text-white p-6 sm:p-8 border border-[#381044] shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-[#381044]">
            <div>
              <span className="text-sm font-black uppercase tracking-wider text-[#ffc928]">
                Rede Parceira Consolidada
              </span>
              <h4 className="text-xl sm:text-2xl font-black text-white mt-1">
                Presença nos Polos Regionais pelo Brasil
              </h4>
            </div>
            <span className="text-sm font-bold px-3 py-1.5 bg-[#23092c] text-[#ffc928] rounded-full border border-[#531062]">
              Total de 10 Estados Atendidos
            </span>
          </div>

          {/* State Buttons Bar */}
          <div className="flex flex-wrap gap-2 mb-6">
            {STATES_PRESENCE.map((st) => (
              <button
                key={st.uf}
                onClick={() => setActiveUf(st.uf)}
                className={`px-4 py-2.5 rounded-xl text-sm font-black transition ${
                  activeUf === st.uf
                    ? 'bg-[#ffc928] text-[#28102d] shadow-md'
                    : 'bg-[#23092c] text-[#d7a8df] hover:text-white hover:bg-[#381044]'
                }`}
              >
                <span>{st.uf}</span>
                <span className="ml-1.5 text-xs opacity-90 font-medium">({st.polos})</span>
              </button>
            ))}
          </div>

          {/* Selected State Details Card */}
          <div className="bg-[#23092c] rounded-xl p-5 border border-[#531062] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-black text-white">
                  {selectedState.name} ({selectedState.uf})
                </span>
                <span className="text-sm px-2.5 py-0.5 rounded-md bg-[#531062] text-[#ffc928] font-bold border border-[#812392]">
                  Capital: {selectedState.capital}
                </span>
              </div>
              <p className="text-sm sm:text-base text-[#e9dfea] mt-1.5 max-w-2xl">
                {selectedState.details}
              </p>
            </div>

            <div className="flex items-center gap-4 shrink-0">
              <div className="text-right">
                <span className="text-sm text-[#d7a8df] block font-medium">Polos de Atendimento</span>
                <span className="text-2xl font-black text-[#ffc928]">{selectedState.polos}</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
