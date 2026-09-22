import React, { useState, useRef, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  X, 
  Sparkles, 
  Quote, 
  CheckCircle,
  Video,
  ArrowRight
} from 'lucide-react';
import { VIDEO_STORIES } from '../data/siteData';
import { VideoStory } from '../types';
import { getMediaUrl, handleImageFallback, getVideoThumbnailUrl } from '../utils/media';

interface VideoStoriesProps {
  onOpenCurriculum: (unit?: 'dirceu' | 'centro') => void;
  stories?: VideoStory[];
}

export const VideoStories: React.FC<VideoStoriesProps> = ({ 
  onOpenCurriculum,
  stories = VIDEO_STORIES 
}) => {
  const [selectedVideo, setSelectedVideo] = useState<VideoStory | null>(null);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const openVideoModal = (story: VideoStory) => {
    setSelectedVideo(story);
    setIsPlaying(true);
  };

  const closeVideoModal = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setSelectedVideo(null);
  };

  // Immediate playback logic: guarantees video starts instant with zero lock or stall
  useEffect(() => {
    if (!selectedVideo) return;

    let isMounted = true;

    // Small delay to ensure the video DOM node is ready
    const timer = setTimeout(() => {
      const video = videoRef.current;
      if (!video || !isMounted) return;

      video.currentTime = 0;
      video.preload = 'auto';

      // Attempt to play with sound first
      video.muted = false;
      const playPromise = video.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            if (isMounted) {
              setIsMuted(false);
              setIsPlaying(true);
            }
          })
          .catch(() => {
            // If browser policy prevents unmuted autoplay, immediately start with muted playback
            // so the video NEVER stalls or waits for the user to "unlock" it
            if (!isMounted || !video) return;
            video.muted = true;
            video.play()
              .then(() => {
                if (isMounted) {
                  setIsMuted(true);
                  setIsPlaying(true);
                }
              })
              .catch((err) => {
                console.error("Instant playback attempt failed:", err);
              });
          });
      }
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeVideoModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      isMounted = false;
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [selectedVideo]);

  const toggleMute = () => {
    if (videoRef.current) {
      const nextMuted = !videoRef.current.muted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  // Preload video when hovering or touching card for sub-millisecond response
  const handlePreload = (mediaKey: string) => {
    const videoUrl = getMediaUrl(mediaKey);
    const existingLink = document.querySelector(`link[href="${videoUrl}"]`);
    if (!existingLink) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'video';
      link.href = videoUrl;
      document.head.appendChild(link);
    }
  };

  return (
    <section id="videos-historias" className="py-16 md:py-24 bg-white border-b border-[#eadfeb]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#f1e2f4] border border-[#e5d9e8] text-[#812392] text-sm font-black tracking-wider uppercase mb-3">
              <Sparkles className="w-4 h-4 text-[#812392]" />
              <span>JOVENS TALENTOS · GRANDES HISTÓRIAS</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-[#25102b] tracking-tight leading-tight">
              Quando encaminhamento encontra oportunidade, novas histórias começam.
            </h2>
            <p className="text-[#6c6570] text-base sm:text-lg mt-3 leading-relaxed">
              Assista aos depoimentos em vídeo gravados pelos próprios jovens encaminhados e contratados pela Oficina do Aprendiz em Teresina.
            </p>
          </div>

          <button
            onClick={() => onOpenCurriculum()}
            className="inline-flex items-center gap-2 px-6 py-3.5 text-sm sm:text-base font-black text-[#531062] bg-[#f1e2f4] hover:bg-[#efe3f2] border border-[#e5d9e8] rounded-xl transition self-start md:self-auto shadow-2xs cursor-pointer active:scale-98"
          >
            <span>Cadastre Seu Currículo</span>
            <ArrowRight className="w-4 h-4 text-[#812392]" />
          </button>
        </div>

        {/* Video Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stories.map((story) => (
            <div
              key={story.id}
              onClick={() => openVideoModal(story)}
              onMouseEnter={() => handlePreload(story.mediaKey)}
              onTouchStart={() => handlePreload(story.mediaKey)}
              className="group relative bg-[#17081d] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between border border-[#381044] aspect-[9/14] sm:aspect-[9/15]"
            >
              {/* Lightweight Image Thumbnail Poster for Zero Lag */}
              <img
                src={getVideoThumbnailUrl(story.mediaKey)}
                alt={story.caption}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover opacity-75 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500"
                onError={(e) => handleImageFallback(e, getMediaUrl(story.mediaKey))}
              />

              {/* Dark Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#17081d] via-[#17081d]/50 to-transparent" />

              {/* Top Tag & Badge */}
              <div className="relative z-10 p-4 flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-md text-xs font-black tracking-wider uppercase bg-[#531062]/90 text-[#ffc928] backdrop-blur-xs flex items-center gap-1.5 border border-[#812392]/50">
                  <Video className="w-3.5 h-3.5" />
                  <span>Depoimento Real</span>
                </span>
                <span className="text-sm text-[#d7a8df] font-mono bg-black/60 px-2.5 py-0.5 rounded-sm">
                  {story.duration || 'Vídeo'}
                </span>
              </div>

              {/* Center Play Button Pulse */}
              <div className="relative z-10 flex items-center justify-center my-auto">
                <div className="w-16 h-16 rounded-full bg-[#ffc928] text-[#28102d] flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-white group-hover:text-[#531062] transition-all duration-300">
                  <Play className="w-7 h-7 fill-current ml-1" />
                </div>
              </div>

              {/* Bottom Quote & Caption */}
              <div className="relative z-10 p-5 text-white">
                <Quote className="w-5 h-5 text-[#ffc928] mb-2 opacity-90" />
                <p className="text-base font-medium leading-snug line-clamp-3 text-slate-100 group-hover:text-white transition">
                  {story.caption}
                </p>
                <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-sm text-slate-300">
                  <span className="font-bold text-[#ffc928]">{story.authorNeighborhood || 'Teresina - PI'}</span>
                  <span className="flex items-center gap-1 text-[#ffc928]">
                    <CheckCircle className="w-4 h-4" />
                    <span>Verificado</span>
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Full Video Modal Player */}
      {selectedVideo && (
        <div 
          role="dialog"
          aria-modal="true"
          aria-label={`Vídeo de depoimento: ${selectedVideo.caption}`}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-3 sm:p-6 animate-in fade-in duration-200"
          onClick={closeVideoModal}
        >
          <div 
            className="relative w-full max-w-lg bg-[#1f0927] rounded-2xl overflow-hidden shadow-2xl border border-[#7b1a90] flex flex-col max-h-[92dvh] sm:max-h-[88vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-3.5 sm:p-4 bg-[#17081d] border-b border-[#381044] flex items-center justify-between text-white">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#ffc928] animate-pulse" />
                <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-[#e9dfea]">
                  História da Oficina do Aprendiz · Teresina
                </span>
              </div>
              <button
                onClick={closeVideoModal}
                className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-[#381044] transition min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
                aria-label="Fechar vídeo"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Canvas Container */}
            <div className="relative bg-black flex items-center justify-center flex-1 overflow-hidden min-h-[360px] sm:min-h-[480px]">
              <video
                ref={videoRef}
                src={getMediaUrl(selectedVideo.mediaKey)}
                autoPlay
                controls
                playsInline
                preload="auto"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                className="w-full h-full max-h-[65vh] object-contain"
                onError={(e) => {
                  const vid = e.currentTarget;
                  vid.onerror = null;
                }}
              />

              {/* Unmute notification banner if browser required muted autoPlay */}
              {isMuted && (
                <button
                  onClick={toggleMute}
                  className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#25102b]/90 border border-[#ffc928] text-[#ffc928] text-xs font-bold shadow-lg hover:bg-[#25102b] transition cursor-pointer animate-bounce"
                >
                  <VolumeX className="w-4 h-4" />
                  <span>Toque para ativar o som</span>
                </button>
              )}
            </div>

            {/* Caption & Call to Action Footer */}
            <div className="p-5 bg-[#17081d] border-t border-[#381044] text-white space-y-4">
              <div className="flex items-start gap-3">
                <Quote className="w-6 h-6 text-[#ffc928] shrink-0 mt-0.5" />
                <p className="text-base sm:text-lg font-semibold text-slate-100 leading-relaxed">
                  {selectedVideo.caption}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <span className="text-sm text-[#d7a8df] text-center sm:text-left">
                  Você também pode começar sua trajetória profissional hoje mesmo.
                </span>
                <button
                  onClick={() => {
                    closeVideoModal();
                    onOpenCurriculum();
                  }}
                  className="w-full sm:w-auto px-6 py-3.5 text-sm sm:text-base font-black text-[#28102d] bg-[#ffc928] hover:bg-[#e6b420] active:bg-[#d4a317] rounded-xl shadow-md transition whitespace-nowrap cursor-pointer active:scale-98"
                >
                  Cadastrar Meu Currículo
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
