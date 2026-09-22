import React, { useEffect, useRef, useState } from 'react';
import { 
  X, 
  MapPin, 
  CheckCircle2, 
  Briefcase, 
  Sparkles, 
  ArrowRight,
  Award,
  Camera
} from 'lucide-react';
import { Hire } from '../types';
import { getMediaUrl, handleImageFallback, useRegisPhoto } from '../utils/media';
import { RegisPhotoModal } from './RegisPhotoModal';

interface HiredProfileModalProps {
  hire: Hire | null;
  onClose: () => void;
  onOpenCurriculum: () => void;
}

export const HiredProfileModal: React.FC<HiredProfileModalProps> = ({
  hire,
  onClose,
  onOpenCurriculum
}) => {
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const [isPhotoUploadOpen, setIsPhotoUploadOpen] = useState(false);
  const regisPhoto = useRegisPhoto();

  // Accessibility: Keyboard Navigation (ESC to close) and body scroll lock
  useEffect(() => {
    if (!hire) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Focus close button on open for accessibility
    setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [hire, onClose]);

  if (!hire) return null;

  // Strict preservation of Regislane da Silva's profile data and photo
  const isRegis = hire.name.toLowerCase().includes('regis') || hire.id === 10;
  const photoSrc = isRegis ? regisPhoto : getMediaUrl(hire.photoKey);
  const displayName = isRegis ? 'Regislane da Silva' : hire.name;
  const displayAge = isRegis ? 28 : hire.age;
  const displayUnit = isRegis ? 'Unidade Dirceu' : (hire.unit || 'Unidade Dirceu');
  const displayRole = isRegis ? 'Coordenadora Pedagógica' : (hire.role || 'Jovem Aprendiz');
  const displaySector = isRegis ? 'Coordenação Pedagógica' : (hire.companySector || 'Administrativo');

  return (
    <>
    <div 
      role="dialog"
      aria-modal="true"
      aria-labelledby="hired-profile-name"
      aria-describedby="hired-profile-desc"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs p-3 sm:p-4 md:p-6 overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg bg-white rounded-3xl overflow-hidden shadow-2xl border border-[#eadfeb] my-auto flex flex-col text-[#25102b] max-h-[94dvh] sm:max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button - Always visible and easily accessible */}
        <button
          ref={closeButtonRef}
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2.5 rounded-full bg-black/25 hover:bg-black/40 text-white transition min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none active:scale-95 z-30 shadow-md backdrop-blur-xs"
          aria-label={`Fechar perfil de ${displayName}`}
        >
          <X className="w-5 h-5 text-white" />
        </button>

        {/* Scrollable Modal Container - Everything scrolls together without any header covering content */}
        <div className="overflow-y-auto overscroll-contain flex-1 flex flex-col">
          
          {/* Header Banner with Avatar and Identity */}
          <div className="bg-gradient-to-b from-[#531062] via-[#480d55] to-[#360940] px-4 pt-5 pb-6 text-white text-center relative shrink-0">
            {/* Category Pill */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ffc928]/25 border border-[#ffc928]/40 text-[#ffc928] text-xs sm:text-sm font-black uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#ffc928] shrink-0" />
              <span>{isRegis ? 'Equipe Pedagógica · Teresina' : 'Jovem Contratado(a) em Teresina'}</span>
            </div>

            <h3 className="text-base sm:text-lg font-bold text-white/90 tracking-tight mb-3">
              História de Sucesso
            </h3>

            {/* Avatar Section: Fully unobstructed, centered, zero negative margin */}
            <div className="flex justify-center my-2">
              <div className="relative inline-block">
                <img
                  src={photoSrc}
                  alt={`Foto de perfil de ${displayName}`}
                  className={`w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-white shadow-2xl ring-4 ring-[#ffc928] bg-[#f7f3f8] ${isRegis ? 'object-[center_15%]' : 'object-center'}`}
                  onError={(e) => {
                    if (isRegis) {
                      (e.target as HTMLImageElement).src = '/media/regislane-da-silva.jpg';
                    } else {
                      handleImageFallback(e);
                    }
                  }}
                />
                
                {/* Verified Checkmark */}
                <span 
                  className="absolute bottom-1 right-1 p-1.5 bg-[#531062] text-[#ffc928] rounded-full shadow-lg border-2 border-white"
                  title="Perfil Verificado"
                  aria-label="Perfil Verificado"
                >
                  <CheckCircle2 className="w-4 h-4" />
                </span>

                {/* Quick Camera Upload Button for Regis */}
                {isRegis && (
                  <button
                    type="button"
                    onClick={() => setIsPhotoUploadOpen(true)}
                    title="Fazer Upload da Foto Real da Regis"
                    aria-label="Fazer Upload da Foto Real da Regis"
                    className="absolute -top-1 -right-1 p-2 rounded-full bg-[#ffc928] hover:bg-[#ffe066] text-[#531062] shadow-xl border-2 border-white transition cursor-pointer min-h-[40px] min-w-[40px] flex items-center justify-center hover:scale-110 active:scale-95 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
                  >
                    <Camera className="w-4 h-4 text-[#531062]" />
                  </button>
                )}
              </div>
            </div>

            {/* Name and Age */}
            <div className="mt-2">
              <h4 id="hired-profile-name" className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {displayName}
              </h4>
              <p className="text-sm sm:text-base font-semibold text-[#f3e8f5] mt-0.5">
                {displayAge} anos · Teresina - PI
              </p>
            </div>
          </div>

          {/* Modal Content Body */}
          <div className="p-4 sm:p-6 text-center space-y-4 flex-1">
            
            {/* Quick Upload Banner for Regis */}
            {isRegis && (
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={() => setIsPhotoUploadOpen(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#ffc928]/20 hover:bg-[#ffc928]/35 border border-[#ffc928]/60 text-[#25102b] text-xs font-black transition cursor-pointer active:scale-98 shadow-xs"
                >
                  <Camera className="w-4 h-4 text-[#812392]" />
                  <span>Adicionar / Fazer Upload da Foto da Regis</span>
                </button>
              </div>
            )}

            {/* Location Badge */}
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#f1e2f4] text-[#812392] text-xs sm:text-sm font-bold">
              <MapPin className="w-4 h-4 text-[#812392] shrink-0" />
              <span>{displayUnit}</span>
            </div>

            {/* Details Table - Clear and Never Obstructed */}
            <div className="p-3.5 sm:p-4 rounded-2xl bg-[#f7f3f8] border border-[#eadfeb] text-left space-y-2.5 text-xs sm:text-sm md:text-base">
              <div className="flex items-center justify-between py-1 border-b border-[#eadfeb]">
                <span className="text-[#716575]">Status no Projeto:</span>
                <span className="font-black text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                  Contratado(a)
                </span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-[#eadfeb]">
                <span className="text-[#716575]">Polo / Unidade:</span>
                <span className="font-bold text-[#25102b]">{displayUnit}</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-[#eadfeb]">
                <span className="text-[#716575]">Atuação:</span>
                <span className="font-bold text-[#25102b]">{displayRole}</span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="text-[#716575]">Área / Setor:</span>
                <span className="font-bold text-[#812392]">{displaySector}</span>
              </div>
            </div>

            {/* Inspiring Quote */}
            <p id="hired-profile-desc" className="text-xs sm:text-sm text-[#6c6570] italic leading-relaxed px-1 sm:px-2">
              “Assim como {displayName}, centenas de jovens em Teresina já deram o primeiro passo através da Oficina do Aprendiz.”
            </p>

          </div>

          {/* Accessible Action Footer */}
          <div className="p-4 sm:p-5 bg-white border-t border-[#eadfeb] shrink-0">
            <button
              onClick={() => {
                onClose();
                onOpenCurriculum();
              }}
              className="w-full min-h-[48px] py-3.5 sm:py-4 px-4 rounded-xl text-sm sm:text-base font-black text-[#28102d] bg-[#ffc928] hover:bg-[#e6b420] active:bg-[#d4a317] shadow-md transition flex items-center justify-center gap-2 cursor-pointer active:scale-98 focus-visible:ring-2 focus-visible:ring-[#812392] focus-visible:outline-none"
            >
              <span>Cadastre Seu Currículo Também</span>
              <ArrowRight className="w-5 h-5 shrink-0" />
            </button>
          </div>

        </div>

      </div>
    </div>

    {/* Regis Photo Upload Modal */}
    {isRegis && (
      <RegisPhotoModal
        isOpen={isPhotoUploadOpen}
        onClose={() => setIsPhotoUploadOpen(false)}
      />
    )}
    </>
  );
};
