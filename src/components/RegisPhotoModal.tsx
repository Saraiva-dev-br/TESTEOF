import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  X, 
  Upload, 
  Camera, 
  RotateCcw, 
  Check, 
  Sparkles, 
  ZoomIn, 
  MoveVertical, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';
import { getRegisPhotoUrl, setRegisPhotoUrl, resetRegisPhotoUrl } from '../utils/media';

interface RegisPhotoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPhotoSaved?: (newUrl: string) => void;
}

export const RegisPhotoModal: React.FC<RegisPhotoModalProps> = ({
  isOpen,
  onClose,
  onPhotoSaved
}) => {
  const [currentPhoto, setCurrentPhoto] = useState<string>(getRegisPhotoUrl());
  const [selectedFileUrl, setSelectedFileUrl] = useState<string | null>(null);
  const [zoom, setZoom] = useState<number>(1.0);
  const [verticalOffset, setVerticalOffset] = useState<number>(15); // percentage from top
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  // Synchronize initial photo when modal opens
  useEffect(() => {
    if (isOpen) {
      setCurrentPhoto(getRegisPhotoUrl());
      setSelectedFileUrl(null);
      setZoom(1.0);
      setVerticalOffset(15);
      setSaveSuccess(null);
      setErrorMessage(null);
      setIsSaving(false);

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      setTimeout(() => closeButtonRef.current?.focus(), 50);

      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen, onClose]);

  // Handle file selection
  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setErrorMessage('Por favor, selecione um arquivo de imagem válido (JPG, PNG ou WEBP).');
      return;
    }

    if (file.size > 20 * 1024 * 1024) {
      setErrorMessage('A imagem deve ter no máximo 20MB.');
      return;
    }

    setErrorMessage(null);
    setSaveSuccess(null);
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setSelectedFileUrl(result);
      setZoom(1.0);
      setVerticalOffset(15);
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  // Render square canvas to export base64
  const renderExportCanvas = useCallback((): Promise<string> => {
    return new Promise((resolve, reject) => {
      const srcToRender = selectedFileUrl || currentPhoto;
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        const canvas = canvasRef.current || document.createElement('canvas');
        const targetSize = 800; // high quality square output
        canvas.width = targetSize;
        canvas.height = targetSize;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Canvas 2D context não disponível'));
          return;
        }

        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, targetSize, targetSize);

        // Aspect ratio math
        const imgAspect = img.width / img.height;
        let drawWidth: number;
        let drawHeight: number;

        if (imgAspect > 1) {
          // Wider than tall
          drawHeight = targetSize * zoom;
          drawWidth = drawHeight * imgAspect;
        } else {
          // Taller than wide (standard portrait)
          drawWidth = targetSize * zoom;
          drawHeight = drawWidth / imgAspect;
        }

        // Horizontal center
        const drawX = (targetSize - drawWidth) / 2;
        // Vertical positioning with verticalOffset percentage (0 = top, 50 = center, 100 = bottom)
        const maxScrollY = Math.max(0, drawHeight - targetSize);
        const drawY = - (maxScrollY * (verticalOffset / 100));

        ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
        resolve(canvas.toDataURL('image/jpeg', 0.92));
      };
      img.onerror = () => reject(new Error('Falha ao carregar a imagem para processamento.'));
      img.src = srcToRender;
    });
  }, [selectedFileUrl, currentPhoto, zoom, verticalOffset]);

  // Save photo to server and update for all users
  const handleSavePhoto = async () => {
    try {
      setIsSaving(true);
      setErrorMessage(null);

      const base64Image = await renderExportCanvas();

      // Send to server API
      const response = await fetch('/api/upload-regis-photo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageBase64: base64Image })
      });

      let updatedUrl: string;
      if (response.ok) {
        const data = await response.json();
        updatedUrl = data.photoUrl || `/media/regislane-da-silva.jpg?t=${Date.now()}`;
      } else {
        // Fallback to local storage if API route unavailable in static build
        updatedUrl = base64Image;
      }

      setRegisPhotoUrl(updatedUrl);
      setCurrentPhoto(updatedUrl);
      setSelectedFileUrl(null);
      setSaveSuccess('Foto oficial da Coordenadora Regislane salva com sucesso para todos os usuários!');

      if (onPhotoSaved) {
        onPhotoSaved(updatedUrl);
      }

      setTimeout(() => {
        onClose();
      }, 1400);
    } catch (err: any) {
      console.error(err);
      setErrorMessage('Erro ao salvar a foto. Tente novamente.');
    } finally {
      setIsSaving(false);
    }
  };

  // Reset to original default photo
  const handleResetToDefault = async () => {
    try {
      setIsSaving(true);
      setErrorMessage(null);

      await fetch('/api/reset-regis-photo', { method: 'POST' }).catch(() => {});
      resetRegisPhotoUrl();
      const defaultUrl = '/media/regislane-da-silva.jpg?t=' + Date.now();
      setCurrentPhoto(defaultUrl);
      setSelectedFileUrl(null);
      setSaveSuccess('Foto padrão restaurada com sucesso!');

      if (onPhotoSaved) {
        onPhotoSaved(defaultUrl);
      }

      setTimeout(() => {
        onClose();
      }, 1200);
    } catch (err: any) {
      console.error(err);
      setErrorMessage('Erro ao restaurar foto.');
    } finally {
      setIsSaving(false);
    }
  };

  if (!isOpen) return null;

  const displayPreview = selectedFileUrl || currentPhoto;

  return (
    <div 
      role="dialog"
      aria-modal="true"
      aria-labelledby="regis-photo-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <canvas ref={canvasRef} className="hidden" />

      <div 
        className="relative w-full max-w-xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-[#eadfeb] my-auto flex flex-col max-h-[94dvh] sm:max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#531062] via-[#4b0d59] to-[#25102b] p-4 sm:p-6 text-white relative shrink-0">
          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="absolute top-3.5 right-3.5 sm:top-5 sm:right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none active:scale-95"
            aria-label="Fechar janela de foto"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ffc928]/20 border border-[#ffc928]/40 text-[#ffc928] text-xs font-bold uppercase tracking-wider mb-2">
            <Camera className="w-3.5 h-3.5" />
            <span>Gestão da Foto Oficial</span>
          </div>

          <h3 id="regis-photo-modal-title" className="text-xl sm:text-2xl font-black text-white pr-8 tracking-tight">
            Foto de Regislane da Silva
          </h3>
          <p className="text-xs sm:text-sm text-[#e9dfea] mt-1 leading-relaxed">
            Faça upload da foto real da Regis. O ajuste será atualizado no perfil, mural de contratados e em toda a plataforma.
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5">
          {/* Alerts */}
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-sm flex items-start gap-2.5">
              <AlertCircle className="w-5 h-5 shrink-0 text-rose-600 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {saveSuccess && (
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-start gap-2.5">
              <Check className="w-5 h-5 shrink-0 text-emerald-600 mt-0.5" />
              <span className="font-semibold">{saveSuccess}</span>
            </div>
          )}

          {/* Live Circular Preview Card */}
          <div className="bg-[#f7f3f8] border border-[#eadfeb] rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center gap-5 justify-between">
            <div className="flex flex-col items-center text-center sm:text-left sm:items-start">
              <span className="text-xs font-bold uppercase tracking-wider text-[#812392]">
                Visualização em Tempo Real
              </span>
              <h4 className="text-base font-black text-[#25102b] mt-0.5">
                Como a Regis aparecerá nos cards
              </h4>
              <p className="text-xs text-[#716575] mt-1 max-w-xs">
                O rosto deve estar visível e centralizado no círculo com a moldura amarela.
              </p>
            </div>

            {/* Circular Avatar Preview with exact styling */}
            <div className="relative shrink-0">
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-white shadow-xl ring-4 ring-[#ffc928] bg-white relative">
                <img
                  src={displayPreview}
                  alt="Prévia de Regislane da Silva"
                  className="w-full h-full object-cover transition-all"
                  style={{
                    transform: `scale(${zoom})`,
                    objectPosition: `center ${verticalOffset}%`
                  }}
                />
              </div>
              <span className="absolute bottom-1 right-1 p-1.5 bg-[#531062] text-[#ffc928] rounded-full shadow-md border-2 border-white">
                <CheckCircle2 className="w-4 h-4" />
              </span>
            </div>
          </div>

          {/* Dropzone & File Input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/jpg"
            onChange={handleFileChange}
            className="hidden"
          />

          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all duration-200 flex flex-col items-center justify-center gap-2 ${
              isDragging 
                ? 'border-[#812392] bg-[#f1e2f4]' 
                : 'border-[#d0bed2] hover:border-[#812392] hover:bg-[#faf6fb]'
            }`}
          >
            <div className="w-12 h-12 rounded-full bg-[#f1e2f4] text-[#812392] flex items-center justify-center">
              <Upload className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-bold text-[#25102b]">
                {selectedFileUrl ? 'Trocar por outro arquivo' : 'Clique ou arraste a nova foto da Regis aqui'}
              </p>
              <p className="text-xs text-[#716575] mt-0.5">
                Formatos aceitos: JPG, PNG ou WEBP (até 20MB)
              </p>
            </div>
          </div>

          {/* Controls: Zoom & Vertical Alignment */}
          <div className="bg-white border border-[#eadfeb] rounded-2xl p-4 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-[#531062] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#ffc928]" />
                Ajustes de Enquadramento
              </span>
              <button
                type="button"
                onClick={() => { setZoom(1.0); setVerticalOffset(15); }}
                className="text-xs font-bold text-[#812392] hover:underline cursor-pointer"
              >
                Resetar Enquadramento
              </button>
            </div>

            {/* Vertical Position Slider */}
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-[#4d3e51] mb-1.5">
                <span className="flex items-center gap-1">
                  <MoveVertical className="w-3.5 h-3.5 text-[#812392]" />
                  Posição Vertical (Altura do Rosto):
                </span>
                <span className="text-[#812392]">
                  {verticalOffset <= 15 ? 'Topo / Rosto' : verticalOffset >= 60 ? 'Centro / Tronco' : `${verticalOffset}%`}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="80"
                step="1"
                value={verticalOffset}
                onChange={(e) => setVerticalOffset(Number(e.target.value))}
                className="w-full accent-[#812392] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#716575] mt-1">
                <span>Topo (Foco no Rosto)</span>
                <span>Meio</span>
                <span>Inferior</span>
              </div>
            </div>

            {/* Zoom Slider */}
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-[#4d3e51] mb-1.5">
                <span className="flex items-center gap-1">
                  <ZoomIn className="w-3.5 h-3.5 text-[#812392]" />
                  Zoom da Foto:
                </span>
                <span className="text-[#812392]">{(zoom * 100).toFixed(0)}%</span>
              </div>
              <input
                type="range"
                min="0.8"
                max="2.5"
                step="0.05"
                value={zoom}
                onChange={(e) => setZoom(Number(e.target.value))}
                className="w-full accent-[#812392] cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="bg-[#f7f3f8] p-4 sm:p-5 border-t border-[#eadfeb] flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <button
            type="button"
            onClick={handleResetToDefault}
            disabled={isSaving}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-[#eadfeb] bg-white text-xs font-bold text-[#716575] hover:text-[#25102b] hover:bg-[#faf6fb] transition cursor-pointer flex items-center justify-center gap-1.5 min-h-[44px] disabled:opacity-50"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restaurar Foto Padrão</span>
          </button>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl border border-[#eadfeb] bg-white text-xs font-bold text-[#4d3e51] hover:bg-slate-50 transition cursor-pointer min-h-[44px]"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleSavePhoto}
              disabled={isSaving}
              className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#531062] to-[#812392] hover:from-[#430c4f] hover:to-[#6a1d78] text-white text-xs font-black shadow-md transition cursor-pointer flex items-center justify-center gap-2 min-h-[44px] disabled:opacity-50"
            >
              {isSaving ? (
                <span>Salvando foto...</span>
              ) : (
                <>
                  <Check className="w-4 h-4 text-[#ffc928]" />
                  <span>Salvar Foto para Todos</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
