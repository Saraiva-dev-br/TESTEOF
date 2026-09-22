import React, { useState } from 'react';
import { 
  Users, 
  MapPin, 
  CheckCircle2, 
  Sparkles, 
  Filter,
  ArrowRight,
  Briefcase
} from 'lucide-react';
import { HIRED_STUDENTS } from '../data/siteData';
import { Hire } from '../types';
import { getMediaUrl, handleImageFallback, useRegisPhoto } from '../utils/media';
import { HiredProfileModal } from './HiredProfileModal';

interface HiredWallProps {
  onOpenCurriculum: (unit?: 'dirceu' | 'centro') => void;
  hires?: Hire[];
  onSelectHire?: (hire: Hire) => void;
}

export const HiredWall: React.FC<HiredWallProps> = ({ 
  onOpenCurriculum,
  hires = HIRED_STUDENTS,
  onSelectHire
}) => {
  const [localSelectedHire, setLocalSelectedHire] = useState<Hire | null>(null);
  const regisPhoto = useRegisPhoto();

  const handleHireClick = (hire: Hire) => {
    if (onSelectHire) {
      onSelectHire(hire);
    } else {
      setLocalSelectedHire(hire);
    }
  };

  return (
    <section className="py-16 md:py-20 bg-[#f7f3f8] border-b border-[#eadfeb]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#f1e2f4] border border-[#e5d9e8] text-[#812392] text-sm font-black tracking-wider uppercase mb-3">
              <CheckCircle2 className="w-4 h-4 text-[#812392]" />
              <span>CONTRATADOS RECENTES · TERESINA</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#25102b] tracking-tight">
              Orgulho de quem conquistou o primeiro emprego.
            </h2>
            <p className="text-[#6c6570] text-base sm:text-lg mt-2 max-w-2xl">
              Mais de 145 jovens já foram contratados pelo polo de Teresina. Conheça alguns dos rostos e histórias que nos inspiram todos os dias.
            </p>
          </div>

          {/* Unit Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-[#eadfeb] rounded-xl shadow-2xs self-start md:self-auto text-sm font-bold text-[#531062]">
            <MapPin className="w-4 h-4 text-[#812392]" />
            <span>Polo de Formação: <b className="font-black text-[#25102b]">Unidade Dirceu</b></span>
          </div>
        </div>

        {/* Grid of Hired Students */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-6">
          {hires.map((hire) => (
            <div
              key={hire.id}
              role="button"
              tabIndex={0}
              aria-label={`Ver história e perfil de ${hire.name}, ${hire.role || 'Jovem Aprendiz'} na ${hire.unit || 'Unidade Dirceu'}`}
              onClick={() => handleHireClick(hire)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleHireClick(hire);
                }
              }}
              className="bg-white rounded-2xl border border-[#eadfeb] p-3.5 sm:p-5 shadow-xs hover:shadow-lg hover:border-[#812392] transition-all duration-300 flex flex-col items-center text-center group cursor-pointer focus-visible:ring-2 focus-visible:ring-[#812392] focus-visible:outline-none select-none active:scale-98"
            >
              {/* Photo */}
              <div className="relative mb-2.5 sm:mb-3.5">
                <img
                  src={hire.name.toLowerCase().includes('regis') ? regisPhoto : getMediaUrl(hire.photoKey)}
                  alt={`Foto de ${hire.name}`}
                  loading="lazy"
                  decoding="async"
                  className={`w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full object-cover border-3 sm:border-4 border-white shadow-md group-hover:scale-105 transition-transform duration-300 ring-2 sm:ring-3 ring-[#ffc928] ${
                    hire.name.toLowerCase().includes('regis') ? 'object-[center_15%]' : 'object-center'
                  }`}
                  onError={(e) => {
                    if (hire.name.toLowerCase().includes('regis')) {
                      (e.target as HTMLImageElement).src = '/media/regislane-da-silva.jpg';
                    } else {
                      handleImageFallback(e);
                    }
                  }}
                />
                <span className="absolute bottom-0 right-0 p-1 bg-[#531062] text-[#ffc928] rounded-full shadow-xs border border-white">
                  <CheckCircle2 className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
                </span>
              </div>

              {/* Name and Age */}
              <h3 className="text-base sm:text-lg md:text-xl font-black text-[#25102b] leading-tight group-hover:text-[#812392] transition">
                {hire.name}
              </h3>
              <span className="text-xs sm:text-sm font-semibold text-[#716575] mt-0.5 sm:mt-1">
                {hire.age} anos
              </span>

              {/* Unit Pill */}
              <div className="mt-2 sm:mt-2.5 flex items-center gap-1 sm:gap-1.5 text-xs sm:text-sm font-bold text-[#812392] bg-[#f1e2f4] px-2.5 sm:px-3.5 py-0.5 sm:py-1 rounded-full max-w-full truncate">
                <MapPin className="w-3.5 h-3.5 text-[#812392] shrink-0" />
                <span className="truncate">{hire.unit || 'Unidade Dirceu'}</span>
              </div>

              {/* Status & Area Badge */}
              <div className="mt-2.5 sm:mt-3 pt-2.5 sm:pt-3 border-t border-[#eadfeb] w-full flex items-center justify-center gap-1 sm:gap-1.5 text-xs sm:text-sm font-bold text-[#531062]">
                <Briefcase className="w-3.5 h-3.5 text-[#812392] shrink-0" />
                <span className="truncate">{hire.companySector || hire.role || 'Jovem Aprendiz'}</span>
              </div>

              <span className="mt-2 text-xs sm:text-sm font-bold text-[#812392] opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition hidden sm:inline">
                Ver Perfil &rarr;
              </span>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#531062] via-[#4b0d59] to-[#25102b] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl border border-[#7b1a90]/40">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-[#ffc928]">
              Sua foto também pode estar aqui em breve.
            </h3>
            <p className="text-[#e9dfea] text-base max-w-xl">
              O primeiro passo é cadastrar seu currículo gratuitamente em um dos nossos polos em Teresina.
            </p>
          </div>
          <button
            onClick={() => onOpenCurriculum()}
            className="px-6 py-4 text-base font-black text-[#28102d] bg-[#ffc928] hover:bg-[#e6b420] active:bg-[#d4a317] rounded-xl shadow-md transition duration-200 whitespace-nowrap cursor-pointer active:scale-98"
          >
            Cadastre Seu Currículo Grátis
          </button>
        </div>

      </div>

      {/* Hired Student Modal if not controlled from parent */}
      {!onSelectHire && (
        <HiredProfileModal
          hire={localSelectedHire}
          onClose={() => setLocalSelectedHire(null)}
          onOpenCurriculum={onOpenCurriculum}
        />
      )}
    </section>
  );
};
