import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  BrainCircuit, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  RotateCcw, 
  Sparkles, 
  Award, 
  MessageCircle, 
  Briefcase, 
  Share2 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { VOCATIONAL_QUESTIONS, VOCATIONAL_RESULTS, SITE_INFO } from '../data/siteData';

interface VocationalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenCurriculum: () => void;
}

export const VocationalModal: React.FC<VocationalModalProps> = ({
  isOpen,
  onClose,
  onOpenCurriculum
}) => {
  const [step, setStep] = useState<'intro' | 'quiz' | 'result'>('intro');
  const [userName, setUserName] = useState<string>('');
  const [userAge, setUserAge] = useState<string>('');
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState<number>(0);
  const [scores, setScores] = useState<Record<string, number>>({
    recepcao: 0,
    administrativo: 0,
    pedagogico: 0,
    telemarketing: 0
  });
  const [winningCategory, setWinningCategory] = useState<string>('administrativo');
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const startQuiz = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('quiz');
    setCurrentQuestionIdx(0);
    setScores({ recepcao: 0, administrativo: 0, pedagogico: 0, telemarketing: 0 });
  };

  const handleSelectOption = (optionScores: Record<string, number | undefined>) => {
    const nextScores = { ...scores };
    Object.entries(optionScores).forEach(([key, val]) => {
      if (val) {
        nextScores[key] = (nextScores[key] || 0) + val;
      }
    });
    setScores(nextScores);

    if (currentQuestionIdx < VOCATIONAL_QUESTIONS.length - 1) {
      setCurrentQuestionIdx((prev) => prev + 1);
    } else {
      // Finished! Calculate highest
      let highestKey = 'administrativo';
      let maxScore = -1;
      Object.entries(nextScores).forEach(([key, score]) => {
        if (score > maxScore) {
          maxScore = score;
          highestKey = key;
        }
      });
      setWinningCategory(highestKey);
      setStep('result');

      // Trigger celebration confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // ignore if not supported
      }
    }
  };

  const resetQuiz = () => {
    setStep('intro');
    setCurrentQuestionIdx(0);
    setScores({ recepcao: 0, administrativo: 0, pedagogico: 0, telemarketing: 0 });
  };

  const currentQ = VOCATIONAL_QUESTIONS[currentQuestionIdx];
  const resultData = VOCATIONAL_RESULTS[winningCategory] || VOCATIONAL_RESULTS.administrativo;

  const handleApplyWithResult = () => {
    const text = encodeURIComponent(
      `Olá! Fiz o Teste Vocacional no site da Oficina do Aprendiz e meu perfil indicado foi *${resultData.title}*! Gostaria de cadastrar meu currículo para oportunidades nessa área em Teresina.`
    );
    window.open(`https://wa.me/${SITE_INFO.whatsappRaw}?text=${text}`, '_blank');
    onClose();
  };

  return (
    <div 
      role="dialog"
      aria-modal="true"
      aria-labelledby="vocational-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-xs p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200 my-auto flex flex-col max-h-[92dvh] sm:max-h-[88vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Header */}
        <div className="bg-gradient-to-r from-[#531062] via-[#4b0d59] to-[#25102b] p-4 sm:p-6 text-white relative shrink-0">
          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="absolute top-3.5 right-3.5 sm:top-5 sm:right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none active:scale-95"
            aria-label="Fechar teste vocacional"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ffc928]/25 border border-[#ffc928]/40 text-[#ffc928] text-xs sm:text-sm font-black uppercase tracking-wider mb-2">
            <BrainCircuit className="w-4 h-4 text-[#ffc928]" />
            <span>Orientação Profissional Gratuita · Teresina</span>
          </div>

          <h3 id="vocational-modal-title" className="text-xl sm:text-2xl md:text-3xl font-black text-white pr-8 tracking-tight">
            Teste Vocacional do Jovem Aprendiz
          </h3>
          <p className="text-xs sm:text-base text-[#e9dfea] mt-1.5 leading-relaxed">
            Descubra em 2 minutos qual área do mercado de trabalho mais combina com seu perfil e habilidades.
          </p>

          {/* Progress Bar (Quiz Mode) */}
          {step === 'quiz' && (
            <div className="mt-4 sm:mt-5">
              <div className="flex justify-between text-xs sm:text-sm font-bold text-[#ffc928] mb-1.5">
                <span>Pergunta {currentQuestionIdx + 1} de {VOCATIONAL_QUESTIONS.length}</span>
                <span>{Math.round(((currentQuestionIdx + 1) / VOCATIONAL_QUESTIONS.length) * 100)}% concluído</span>
              </div>
              <div className="w-full h-2.5 bg-[#25102b] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#ffc928] to-[#e6b420] transition-all duration-300 rounded-full"
                  style={{ width: `${((currentQuestionIdx + 1) / VOCATIONAL_QUESTIONS.length) * 100}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-8 overflow-y-auto flex-1">
          
          {/* STEP 1: INTRO */}
          {step === 'intro' && (
            <form onSubmit={startQuiz} className="space-y-6">
              <div className="bg-[#f7f3f8] border border-[#eadfeb] rounded-2xl p-5 text-[#4d3e51] text-sm sm:text-base leading-relaxed">
                <p className="font-black text-[#25102b] text-base mb-1.5">Como funciona o teste?</p>
                <p className="text-[#6c6570]">
                  Responda a 5 perguntas práticas sobre suas preferências de ambiente, ferramentas e estilo de comunicação. Ao final, você receberá a indicação da melhor área e poderá encaminhar seu currículo direto para os polos de Teresina.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-black uppercase tracking-wider text-[#25102b] mb-1.5">
                    Seu Primeiro Nome:
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Gabriel, Amanda, Lucas..."
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full px-4 py-3 text-sm sm:text-base rounded-xl border border-[#eadfeb] focus:outline-hidden focus:ring-2 focus:ring-[#812392] bg-[#f7f3f8] focus:bg-white transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-black uppercase tracking-wider text-[#25102b] mb-1.5">
                    Sua Idade:
                  </label>
                  <input
                    type="number"
                    min="13"
                    max="25"
                    required
                    placeholder="Ex: 17"
                    value={userAge}
                    onChange={(e) => setUserAge(e.target.value)}
                    className="w-full px-4 py-3 text-sm sm:text-base rounded-xl border border-[#eadfeb] focus:outline-hidden focus:ring-2 focus:ring-[#812392] bg-[#f7f3f8] focus:bg-white transition"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 py-4 px-6 text-base font-black text-[#28102d] bg-[#ffc928] hover:bg-[#e6b420] active:bg-[#d4a317] rounded-xl shadow-md transition cursor-pointer active:scale-98"
              >
                <span>Começar Teste Vocacional Agora</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          )}

          {/* STEP 2: QUIZ QUESTIONS */}
          {step === 'quiz' && (
            <div className="space-y-6">
              <div>
                <span className="text-sm font-black uppercase tracking-wider text-[#812392]">
                  Questão {currentQuestionIdx + 1}
                </span>
                <h4 className="text-xl sm:text-2xl font-black text-[#25102b] mt-1 mb-2 leading-snug">
                  {currentQ.title}
                </h4>
                {currentQ.description && (
                  <p className="text-sm text-[#716575]">
                    {currentQ.description}
                  </p>
                )}
              </div>

              <div className="space-y-3">
                {currentQ.options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelectOption(opt.scores)}
                    className="w-full p-4.5 rounded-2xl border-2 border-[#eadfeb] hover:border-[#812392] hover:bg-[#f7f3f8] text-left transition duration-200 flex items-start gap-3.5 group cursor-pointer"
                  >
                    <span className="w-7 h-7 rounded-full border border-[#eadfeb] group-hover:border-[#531062] group-hover:bg-[#531062] group-hover:text-[#ffc928] flex items-center justify-center text-sm font-black shrink-0 mt-0.5 transition">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span className="text-sm sm:text-base font-semibold text-[#4d3e51] group-hover:text-[#25102b] leading-relaxed">
                      {opt.label}
                    </span>
                  </button>
                ))}
              </div>

              {currentQuestionIdx > 0 && (
                <div className="pt-2 flex justify-start">
                  <button
                    type="button"
                    onClick={() => setCurrentQuestionIdx(prev => prev - 1)}
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-[#716575] hover:text-[#25102b] cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Voltar à Pergunta Anterior</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* STEP 3: RESULT */}
          {step === 'result' && (
            <div className="space-y-6 text-center">
              
              <div className="w-16 h-16 rounded-2xl bg-[#f1e2f4] text-[#812392] flex items-center justify-center mx-auto shadow-xs border border-[#e5d9e8]">
                <Award className="w-8 h-8 text-[#ffc928]" />
              </div>

              <div>
                <span className="text-sm font-black uppercase tracking-wider text-[#812392]">
                  Resultado Vocacional de {userName || 'Jovem Aprendiz'}
                </span>
                <h4 className="text-2xl sm:text-3xl font-black text-[#25102b] mt-1.5 mb-3">
                  {resultData.title}
                </h4>
                <p className="text-sm sm:text-base text-[#6c6570] max-w-xl mx-auto leading-relaxed">
                  {resultData.description}
                </p>
              </div>

              {/* Skills Highlights */}
              <div className="bg-[#f7f3f8] border border-[#eadfeb] rounded-2xl p-5 text-left space-y-4">
                <div>
                  <span className="text-sm font-black uppercase tracking-wider text-[#25102b] block mb-2.5">
                    Suas principais forças identificadas:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {resultData.skills.map((sk, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm font-bold text-[#4d3e51] bg-white p-3 rounded-xl border border-[#eadfeb]">
                        <CheckCircle2 className="w-4.5 h-4.5 text-[#812392] shrink-0" />
                        <span>{sk}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Affinity Breakdown Bars */}
                <div className="pt-3 border-t border-[#eadfeb] space-y-2.5">
                  <span className="text-xs font-black uppercase tracking-wider text-[#716575] block">
                    Mapa de Afinidades do seu Perfil:
                  </span>
                  {(() => {
                    const totalScore = Math.max(1, Object.values(scores).reduce((a, b) => a + b, 0));
                    const labels: Record<string, string> = {
                      administrativo: 'Administrativo & Rotinas',
                      recepcao: 'Recepção & Atendimento',
                      pedagogico: 'Apoio Pedagógico & Instrução',
                      telemarketing: 'Comunicação & Varejo'
                    };
                    return Object.entries(scores).map(([key, val]) => {
                      const pct = Math.round((val / totalScore) * 100);
                      const isWinner = key === winningCategory;
                      return (
                        <div key={key} className="space-y-1">
                          <div className="flex justify-between text-xs font-bold text-[#4d3e51]">
                            <span className={isWinner ? 'text-[#812392] font-black' : ''}>
                              {labels[key] || key} {isWinner ? '★' : ''}
                            </span>
                            <span className="font-mono">{pct}%</span>
                          </div>
                          <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full transition-all duration-500 ${isWinner ? 'bg-[#812392]' : 'bg-[#a394a8]'}`}
                              style={{ width: `${Math.max(5, pct)}%` }}
                            />
                          </div>
                        </div>
                      );
                    });
                  })()}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-2">
                <button
                  onClick={handleApplyWithResult}
                  className="w-full inline-flex items-center justify-center gap-2 py-4 px-6 text-sm sm:text-base font-black text-[#28102d] bg-[#ffc928] hover:bg-[#e6b420] active:bg-[#d4a317] rounded-xl shadow-md transition cursor-pointer active:scale-98"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Cadastrar Currículo Nesta Área (WhatsApp)</span>
                </button>

                <div className="flex flex-col sm:flex-row items-center gap-2.5">
                  <button
                    onClick={() => {
                      onClose();
                      onOpenCurriculum();
                    }}
                    className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 text-xs sm:text-sm font-bold text-[#531062] bg-[#f1e2f4] hover:bg-[#efe3f2] rounded-xl transition cursor-pointer"
                  >
                    <Briefcase className="w-4 h-4 text-[#812392]" />
                    <span>Abrir Formulário no Site</span>
                  </button>

                  <button
                    onClick={resetQuiz}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 py-3 px-4 text-xs sm:text-sm font-bold text-[#716575] hover:text-[#25102b] transition cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Refazer Teste</span>
                  </button>
                </div>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
