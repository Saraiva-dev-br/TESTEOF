import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { StepsJourney } from './components/StepsJourney';
import { ResultsSection } from './components/ResultsSection';
import { OpportunitiesSection } from './components/OpportunitiesSection';
import { VideoStories } from './components/VideoStories';
import { HiredWall } from './components/HiredWall';
import { PresenceSection } from './components/PresenceSection';
import { Footer } from './components/Footer';
import { CurriculumModal } from './components/CurriculumModal';
import { VocationalModal } from './components/VocationalModal';
import { StudentPortalModal } from './components/StudentPortalModal';
import { HiredProfileModal } from './components/HiredProfileModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { useLiveSiteData } from './hooks/useLiveSiteData';
import { Hire } from './types';

export default function App() {
  const [isCurriculumOpen, setIsCurriculumOpen] = useState(false);
  const [isVocationalOpen, setIsVocationalOpen] = useState(false);
  const [isStudentPortalOpen, setIsStudentPortalOpen] = useState(false);
  const [selectedHire, setSelectedHire] = useState<Hire | null>(null);
  const [preselectedUnit, setPreselectedUnit] = useState<'dirceu' | 'centro'>('dirceu');

  // Fetch live API data with automatic fallback to verified static data
  const { opportunities, hires, stories, isLive } = useLiveSiteData();

  // Handle URL hash changes (e.g. #teste-vocacional, #alunos, #vagas)
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash === '#teste-vocacional') {
        setIsVocationalOpen(true);
      } else if (hash === '#alunos' || hash === '#portal-aluno') {
        setIsStudentPortalOpen(true);
      } else if (hash === '#curriculo') {
        setIsCurriculumOpen(true);
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleOpenCurriculum = (unit: 'dirceu' | 'centro' = 'dirceu') => {
    setPreselectedUnit(unit);
    setIsCurriculumOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f7f3f8] text-[#25102b] selection:bg-[#ffc928] selection:text-[#28102d]">
      {/* Header */}
      <Header
        onOpenVocational={() => setIsVocationalOpen(true)}
        onOpenStudentPortal={() => setIsStudentPortalOpen(true)}
        onOpenCurriculum={() => handleOpenCurriculum('dirceu')}
      />

      {/* Main Content Sections */}
      <main className="flex-grow">
        {/* 1. Hero with Real Hired Showcase */}
        <Hero
          onOpenVocational={() => setIsVocationalOpen(true)}
          onOpenCurriculum={() => handleOpenCurriculum('dirceu')}
          onSelectHire={(hire) => setSelectedHire(hire)}
          hires={hires}
        />

        {/* 2. Quem Somos (A História e a Iniciativa) */}
        <AboutSection />

        {/* 3. Etapas do Encaminhamento */}
        <StepsJourney />

        {/* 4. Mural de Contratados (Fotos Reais) */}
        <HiredWall 
          onOpenCurriculum={() => handleOpenCurriculum('dirceu')} 
          hires={hires}
          onSelectHire={(hire) => setSelectedHire(hire)}
        />

        {/* 5. Resultados (Teresina vs. Brasil) */}
        <ResultsSection />

        {/* 6. Painel de Oportunidades & Direitos do Aprendiz */}
        <OpportunitiesSection
          onOpenCurriculum={(unit) => handleOpenCurriculum(unit || 'dirceu')}
          opportunities={opportunities}
        />

        {/* 7. Vídeos & Depoimentos Reais dos Jovens */}
        <VideoStories
          onOpenCurriculum={() => handleOpenCurriculum('dirceu')}
          stories={stories}
        />

        {/* 8. Onde Estamos (Polos Dirceu e Centro + Brasil) */}
        <PresenceSection
          onSelectUnit={(unitId) => handleOpenCurriculum(unitId === 'centro' ? 'centro' : 'dirceu')}
        />
      </main>

      {/* Footer */}
      <Footer
        onOpenVocational={() => setIsVocationalOpen(true)}
        onOpenStudentPortal={() => setIsStudentPortalOpen(true)}
        onOpenCurriculum={() => handleOpenCurriculum('dirceu')}
      />

      {/* Floating WhatsApp & Fast Action Buttons */}
      <FloatingWhatsApp
        onOpenVocational={() => setIsVocationalOpen(true)}
        onOpenCurriculum={() => handleOpenCurriculum('dirceu')}
      />

      {/* Modals */}
      <CurriculumModal
        isOpen={isCurriculumOpen}
        onClose={() => setIsCurriculumOpen(false)}
        preselectedUnit={preselectedUnit}
      />

      <VocationalModal
        isOpen={isVocationalOpen}
        onClose={() => setIsVocationalOpen(false)}
        onOpenCurriculum={() => {
          setIsVocationalOpen(false);
          setIsCurriculumOpen(true);
        }}
      />

      <StudentPortalModal
        isOpen={isStudentPortalOpen}
        onClose={() => setIsStudentPortalOpen(false)}
      />

      {/* Profile Modal for active hire clicked in Hero */}
      <HiredProfileModal
        hire={selectedHire}
        onClose={() => setSelectedHire(null)}
        onOpenCurriculum={() => {
          setSelectedHire(null);
          setIsCurriculumOpen(true);
        }}
      />
    </div>
  );
}
