import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  MapPin, 
  MessageCircle, 
  Send, 
  CheckCircle2, 
  Building2, 
  FileText, 
  Clock, 
  Sparkles, 
  Copy, 
  Check, 
  ShieldCheck, 
  GraduationCap,
  Award,
  AlertCircle,
  RotateCcw
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { SITE_INFO } from '../data/siteData';
import { formatPhone, generateProtocol, formatBrazilianDate } from '../utils/formatters';

interface CurriculumModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedUnit?: 'dirceu' | 'centro' | string;
}

export const CurriculumModal: React.FC<CurriculumModalProps> = ({
  isOpen,
  onClose,
  preselectedUnit = 'dirceu'
}) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [selectedUnit, setSelectedUnit] = useState<string>(preselectedUnit === 'centro' ? 'centro' : 'dirceu');
  const [candidateName, setCandidateName] = useState<string>('');
  const [candidateAge, setCandidateAge] = useState<string>('');
  const [candidatePhone, setCandidatePhone] = useState<string>('');
  const [candidateNeighborhood, setCandidateNeighborhood] = useState<string>('');
  const [candidateZone, setCandidateZone] = useState<string>('Zona Sudeste');
  const [candidateSchooling, setCandidateSchooling] = useState<string>('Ensino Médio (cursando)');
  const [candidateArea, setCandidateArea] = useState<string>('Administrativo / Recepção');
  const [protocolCode, setProtocolCode] = useState<string>('');
  const [submissionDate, setSubmissionDate] = useState<string>('');
  const [validationError, setValidationError] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [protocolCopied, setProtocolCopied] = useState<boolean>(false);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (preselectedUnit) {
      setSelectedUnit(preselectedUnit === 'centro' ? 'centro' : 'dirceu');
    }
  }, [preselectedUnit]);

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

  const popularNeighborhoods = [
    { name: 'Dirceu', zone: 'Zona Sudeste' },
    { name: 'Mocambinho', zone: 'Zona Norte' },
    { name: 'Centro', zone: 'Centro' },
    { name: 'Promorar', zone: 'Zona Sul' },
    { name: 'Parque Piauí', zone: 'Zona Sul' },
    { name: 'Renascença', zone: 'Zona Sudeste' },
    { name: 'São Cristóvão', zone: 'Zona Leste' }
  ];

  const buildMessage = (protocol?: string) => {
    const unitName = selectedUnit === 'centro' ? 'Unidade Centro' : 'Unidade Dirceu';
    const protoHeader = protocol ? `*Protocolo de Pré-Cadastro:* ${protocol}\n\n` : '';
    let message = `Olá! Gostaria de cadastrar meu currículo na Oficina do Aprendiz (${unitName}).\n\n${protoHeader}`;
    if (candidateName.trim()) {
      message += `*Nome Completo:* ${candidateName.trim()}\n`;
    }
    if (candidateAge.trim()) {
      message += `*Idade:* ${candidateAge.trim()} anos\n`;
    }
    if (candidatePhone.trim()) {
      message += `*Contato / WhatsApp:* ${candidatePhone.trim()}\n`;
    }
    if (candidateNeighborhood.trim()) {
      message += `*Bairro:* ${candidateNeighborhood.trim()}\n`;
    }
    message += `*Zona da Cidade:* ${candidateZone}\n`;
    if (candidateSchooling) {
      message += `*Escolaridade:* ${candidateSchooling}\n`;
    }
    if (candidateArea) {
      message += `*Área de Interesse:* ${candidateArea}\n`;
    }
    message += `\n_Pré-cadastro oficial realizado pelo portal Oficina do Aprendiz Teresina._`;
    return message;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setCandidatePhone(formatted);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');

    const trimmedName = candidateName.trim();
    if (trimmedName.length < 3) {
      setValidationError('Por favor, informe o nome completo do candidato.');
      return;
    }

    const ageNum = parseInt(candidateAge, 10);
    if (isNaN(ageNum) || ageNum < 14 || ageNum > 24) {
      setValidationError('A idade para o programa Jovem Aprendiz deve ser entre 14 e 24 anos.');
      return;
    }

    const phoneDigits = candidatePhone.replace(/\D/g, '');
    if (phoneDigits.length < 10) {
      setValidationError('Por favor, informe um número de telefone/WhatsApp válido com DDD (Ex: 86 99999-9999).');
      return;
    }

    // Generate Protocol
    const proto = generateProtocol('OA-PI');
    const dateStr = formatBrazilianDate();
    setProtocolCode(proto);
    setSubmissionDate(dateStr);
    setStep('success');

    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }
  };

  const handleOpenWhatsAppWithProtocol = () => {
    const message = buildMessage(protocolCode);
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${SITE_INFO.whatsappRaw}?text=${encoded}`, '_blank');
  };

  const handleCopyMessage = () => {
    const message = buildMessage(protocolCode);
    if (navigator.clipboard) {
      navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleCopyProtocol = () => {
    if (navigator.clipboard && protocolCode) {
      navigator.clipboard.writeText(protocolCode);
      setProtocolCopied(true);
      setTimeout(() => setProtocolCopied(false), 2500);
    }
  };

  const handleResetForm = () => {
    setStep('form');
    setCandidateName('');
    setCandidateAge('');
    setCandidatePhone('');
    setCandidateNeighborhood('');
    setProtocolCode('');
    setValidationError('');
  };

  return (
    <div 
      role="dialog"
      aria-modal="true"
      aria-labelledby="curriculum-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-[#eadfeb] my-auto flex flex-col max-h-[92dvh] sm:max-h-[88vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="bg-gradient-to-r from-[#531062] via-[#4b0d59] to-[#25102b] p-4 sm:p-6 text-white relative shrink-0">
          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="absolute top-3.5 right-3.5 sm:top-5 sm:right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none active:scale-95"
            aria-label="Fechar cadastro de currículo"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ffc928]/25 border border-[#ffc928]/40 text-[#ffc928] text-xs sm:text-sm font-black uppercase tracking-wider mb-2">
            <Sparkles className="w-4 h-4 text-[#ffc928]" />
            <span>Processo Gratuito · Teresina - PI</span>
          </div>

          <h3 id="curriculum-modal-title" className="text-xl sm:text-2xl md:text-3xl font-black text-white pr-8 tracking-tight">
            {step === 'form' ? 'Cadastrar Currículo na Oficina do Aprendiz' : 'Pré-Cadastro Concluído com Sucesso!'}
          </h3>
          <p className="text-xs sm:text-sm text-[#e9dfea] mt-1.5 leading-relaxed">
            {step === 'form' 
              ? 'Escolha sua unidade de preferência e inicie seu atendimento oficial em Teresina.' 
              : 'Seu protocolo oficial foi emitido. Confirme com a coordenação para agilizar a triagem.'}
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-8 space-y-5 sm:space-y-6 overflow-y-auto flex-1">
          
          {step === 'form' ? (
            <>
              {/* Unit Selector */}
              <div>
                <label className="block text-sm font-black uppercase tracking-wider text-[#25102b] mb-2.5">
                  1. Selecione o Polo Mais Próximo de Você:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedUnit('dirceu')}
                    className={`p-4.5 rounded-2xl border-2 text-left transition flex flex-col justify-between cursor-pointer ${
                      selectedUnit === 'dirceu'
                        ? 'border-[#812392] bg-[#f1e2f4] shadow-xs'
                        : 'border-[#eadfeb] hover:border-[#812392]/50 bg-white'
                    }`}
                  >
                    <div>
                      <span className="text-sm font-black text-[#812392] uppercase tracking-wider block">
                        Zona Sudeste · Parque Ideal
                      </span>
                      <span className="font-black text-[#25102b] text-lg block mt-0.5">
                        Unidade Dirceu
                      </span>
                      <span className="text-sm text-[#716575] block mt-1 leading-relaxed">
                        R. Dr. Pedro Teixeira, 2964 - Parque Ideal
                      </span>
                      <span className="text-xs text-[#812392] font-bold block mt-1.5">
                        Coord. Pedagógica: Regislane da Silva
                      </span>
                    </div>
                    {selectedUnit === 'dirceu' && (
                      <div className="mt-3 flex items-center gap-1.5 text-sm font-black text-[#531062]">
                        <CheckCircle2 className="w-4.5 h-4.5 text-[#812392]" />
                        <span>Polo Selecionado</span>
                      </div>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedUnit('centro')}
                    className={`p-4.5 rounded-2xl border-2 text-left transition flex flex-col justify-between cursor-pointer ${
                      selectedUnit === 'centro'
                        ? 'border-[#812392] bg-[#f1e2f4] shadow-xs'
                        : 'border-[#eadfeb] hover:border-[#812392]/50 bg-white'
                    }`}
                  >
                    <div>
                      <span className="text-sm font-black text-[#812392] uppercase tracking-wider block">
                        Centro · Ed. Cel. Otávio Miranda
                      </span>
                      <span className="font-black text-[#25102b] text-lg block mt-0.5">
                        Unidade Centro
                      </span>
                      <span className="text-sm text-[#716575] block mt-1 leading-relaxed">
                        Rua Rui Barbosa, nº 68, Centro - 6º Andar, sala 613
                      </span>
                    </div>
                    {selectedUnit === 'centro' && (
                      <div className="mt-3 flex items-center gap-1.5 text-sm font-black text-[#531062]">
                        <CheckCircle2 className="w-4.5 h-4.5 text-[#812392]" />
                        <span>Polo Selecionado</span>
                      </div>
                    )}
                  </button>
                </div>
              </div>

              {/* Validation Warning Alert if any */}
              {validationError && (
                <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-sm flex items-start gap-2 animate-in fade-in duration-150">
                  <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <span>{validationError}</span>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-black uppercase tracking-wider text-[#25102b] mb-1.5">
                    2. Dados Básicos do Candidato:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <input
                        type="text"
                        required
                        placeholder="Nome completo do jovem *"
                        value={candidateName}
                        onChange={(e) => setCandidateName(e.target.value)}
                        className="w-full px-4 py-3 text-sm rounded-xl border border-[#eadfeb] focus:outline-hidden focus:ring-2 focus:ring-[#812392] bg-[#f7f3f8] focus:bg-white text-[#25102b]"
                      />
                    </div>
                    <div>
                      <input
                        type="number"
                        required
                        placeholder="Idade (14 a 24 anos) *"
                        min="14"
                        max="24"
                        value={candidateAge}
                        onChange={(e) => setCandidateAge(e.target.value)}
                        className="w-full px-4 py-3 text-sm rounded-xl border border-[#eadfeb] focus:outline-hidden focus:ring-2 focus:ring-[#812392] bg-[#f7f3f8] focus:bg-white text-[#25102b]"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <input
                      type="tel"
                      required
                      placeholder="WhatsApp (86) 9XXXX-XXXX *"
                      value={candidatePhone}
                      onChange={handlePhoneChange}
                      maxLength={15}
                      className="w-full px-4 py-3 text-sm rounded-xl border border-[#eadfeb] focus:outline-hidden focus:ring-2 focus:ring-[#812392] bg-[#f7f3f8] focus:bg-white text-[#25102b]"
                    />
                  </div>

                  <div>
                    <input
                      type="text"
                      placeholder="Seu Bairro em Teresina"
                      value={candidateNeighborhood}
                      onChange={(e) => setCandidateNeighborhood(e.target.value)}
                      className="w-full px-4 py-3 text-sm rounded-xl border border-[#eadfeb] focus:outline-hidden focus:ring-2 focus:ring-[#812392] bg-[#f7f3f8] focus:bg-white text-[#25102b]"
                    />
                  </div>
                </div>

                {/* Zona da Cidade */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-[#716575] mb-1">
                      Zona da Cidade em Teresina:
                    </label>
                    <select
                      value={candidateZone}
                      onChange={(e) => setCandidateZone(e.target.value)}
                      className="w-full px-4 py-3 text-sm rounded-xl border border-[#eadfeb] focus:outline-hidden focus:ring-2 focus:ring-[#812392] bg-[#f7f3f8] focus:bg-white text-[#25102b] font-medium"
                    >
                      <option value="Zona Sudeste">Zona Sudeste</option>
                      <option value="Zona Sul">Zona Sul</option>
                      <option value="Zona Leste">Zona Leste</option>
                      <option value="Zona Norte">Zona Norte</option>
                      <option value="Centro">Centro</option>
                      <option value="Região Metropolitana">Região Metropolitana</option>
                    </select>
                  </div>

                  {/* Quick Neighborhood Chips */}
                  <div>
                    <span className="text-xs sm:text-sm text-[#716575] font-semibold block mb-1">
                      Bairros Frequentes:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {popularNeighborhoods.map((bairro) => (
                        <button
                          type="button"
                          key={bairro.name}
                          onClick={() => {
                            setCandidateNeighborhood(bairro.name);
                            setCandidateZone(bairro.zone);
                          }}
                          className="px-2.5 py-1 text-xs font-bold rounded-md bg-[#f7f3f8] text-[#531062] hover:bg-[#efe3f2] border border-[#eadfeb] transition cursor-pointer"
                        >
                          {bairro.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-[#716575] mb-1">
                      Escolaridade Atual:
                    </label>
                    <select
                      value={candidateSchooling}
                      onChange={(e) => setCandidateSchooling(e.target.value)}
                      className="w-full px-4 py-3 text-sm rounded-xl border border-[#eadfeb] focus:outline-hidden focus:ring-2 focus:ring-[#812392] bg-[#f7f3f8] focus:bg-white text-[#25102b] font-medium"
                    >
                      <option value="Ensino Médio (cursando)">Ensino Médio (cursando)</option>
                      <option value="Ensino Médio Concluído">Ensino Médio Concluído</option>
                      <option value="Ensino Superior (cursando)">Ensino Superior (cursando)</option>
                      <option value="Ensino Fundamental">Ensino Fundamental</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-bold text-[#716575] mb-1">
                      Área de Interesse:
                    </label>
                    <select
                      value={candidateArea}
                      onChange={(e) => setCandidateArea(e.target.value)}
                      className="w-full px-4 py-3 text-sm rounded-xl border border-[#eadfeb] focus:outline-hidden focus:ring-2 focus:ring-[#812392] bg-[#f7f3f8] focus:bg-white text-[#25102b] font-medium"
                    >
                      <option value="Administrativo / Recepção">Administrativo / Recepção</option>
                      <option value="Atendimento ao Cliente">Atendimento ao Cliente</option>
                      <option value="Apoio Pedagógico">Apoio Pedagógico</option>
                      <option value="Primeira Oportunidade (Qualquer)">Primeira Oportunidade (Qualquer)</option>
                    </select>
                  </div>
                </div>

                {/* Document Checklist Info */}
                <div className="p-4 rounded-xl bg-[#f7f3f8] border border-[#eadfeb] text-sm text-[#4d3e51] space-y-1.5">
                  <span className="font-bold text-[#25102b] flex items-center gap-1.5 text-sm">
                    <ShieldCheck className="w-4 h-4 text-[#812392]" />
                    Documentos recomendados para levar ao atendimento presencial:
                  </span>
                  <p className="text-[#6c6570] text-xs sm:text-sm leading-relaxed">
                    RG, CPF, comprovante de residência recente e declaração escolar atualizada.
                  </p>
                </div>

                {/* Buttons */}
                <div className="pt-2 space-y-2.5">
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 py-4 px-6 text-base font-black text-[#28102d] bg-[#ffc928] hover:bg-[#e6b420] active:bg-[#d4a317] rounded-xl shadow-md hover:shadow-lg transition duration-200 cursor-pointer active:scale-98"
                  >
                    <Send className="w-5 h-5 text-[#28102d]" />
                    <span>Concluir Pré-Cadastro & Gerar Protocolo</span>
                  </button>
                </div>
              </form>
            </>
          ) : (
            /* SUCCESS CONFIRMATION SCREEN WITH PROTOCOL */
            <div className="space-y-6 text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto border-2 border-emerald-300 shadow-xs">
                <CheckCircle2 className="w-9 h-9 text-emerald-600" />
              </div>

              <div>
                <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-[#812392] block">
                  Confirmação de Registro Oficial
                </span>
                <h4 className="text-2xl sm:text-3xl font-black text-[#25102b] mt-1">
                  Pré-Cadastro Emitido com Sucesso!
                </h4>
                <p className="text-sm sm:text-base text-[#6c6570] max-w-md mx-auto mt-1.5 leading-relaxed">
                  Guarde seu número de protocolo e confirme seu atendimento com a coordenação de Teresina.
                </p>
              </div>

              {/* Protocol Badge Card */}
              <div className="bg-[#f7f3f8] border-2 border-[#812392]/30 rounded-2xl p-5 text-left space-y-3">
                <div className="flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-[#eadfeb]">
                  <div>
                    <span className="text-xs font-bold text-[#716575] uppercase block">
                      Número do Protocolo
                    </span>
                    <span className="text-xl sm:text-2xl font-black text-[#531062] font-mono tracking-tight">
                      {protocolCode}
                    </span>
                  </div>
                  <button
                    onClick={handleCopyProtocol}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#eadfeb] hover:bg-[#efe3f2] text-xs font-bold text-[#531062] transition cursor-pointer"
                  >
                    {protocolCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-[#812392]" />}
                    <span>{protocolCopied ? 'Copiado!' : 'Copiar'}</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm text-[#4d3e51]">
                  <div>
                    <strong className="text-[#25102b]">Candidato:</strong> {candidateName}
                  </div>
                  <div>
                    <strong className="text-[#25102b]">Idade:</strong> {candidateAge} anos
                  </div>
                  <div>
                    <strong className="text-[#25102b]">Polo Escolhido:</strong> {selectedUnit === 'centro' ? 'Unidade Centro' : 'Unidade Dirceu'}
                  </div>
                  <div>
                    <strong className="text-[#25102b]">Data de Registro:</strong> {submissionDate}
                  </div>
                  <div className="col-span-2">
                    <strong className="text-[#25102b]">Área Solicitada:</strong> {candidateArea}
                  </div>
                </div>
              </div>

              {/* Call to Action Buttons */}
              <div className="space-y-3 pt-2">
                <button
                  type="button"
                  onClick={handleOpenWhatsAppWithProtocol}
                  className="w-full inline-flex items-center justify-center gap-2 py-4 px-6 text-base font-black text-[#28102d] bg-[#ffc928] hover:bg-[#e6b420] active:bg-[#d4a317] rounded-xl shadow-md transition cursor-pointer active:scale-98"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Enviar Protocolo para o WhatsApp da Coordenação</span>
                </button>

                <div className="flex flex-col sm:flex-row items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCopyMessage}
                    className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 text-xs sm:text-sm font-bold text-[#531062] bg-[#f7f3f8] hover:bg-[#efe3f2] border border-[#eadfeb] rounded-xl transition cursor-pointer"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-[#812392]" />}
                    <span>{copied ? 'Comprovante Copiado!' : 'Copiar Comprovante Completo'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleResetForm}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 py-3 px-4 text-xs sm:text-sm font-bold text-[#716575] hover:text-[#25102b] transition cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Novo Cadastro</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Reassurance Footer */}
          <div className="p-4 rounded-xl bg-[#fcfaff] border border-[#eadfeb] flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-[#716575]">
            <span className="flex items-center gap-1.5 font-bold text-[#4d3e51]">
              <Clock className="w-4 h-4 text-[#812392]" />
              Atendimento: Segunda a sexta-feira, das 08h às 17h
            </span>
            <span className="font-semibold text-[#812392]">Central: {SITE_INFO.phone}</span>
          </div>

        </div>

      </div>
    </div>
  );
};
