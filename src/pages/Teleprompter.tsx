import { useLocation, useNavigate } from 'react-router-dom';
import { useTeleprompter } from '@/hooks/useTeleprompter';
import { TeleprompterControls } from '@/components/TeleprompterControls';
import { useEffect, useState, useRef, useCallback } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TeleprompterState {
  script: string;
  fontSize: number;
  fontFamily: string;
  textColor: string;
}

const Teleprompter = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [words, setWords] = useState<string[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const { script, fontSize, fontFamily } = (location.state as TeleprompterState) || {};
  const highlightRef = useRef<HTMLSpanElement>(null);
  
  const {
    isPlaying,
    speed,
    containerRef,
    togglePlay,
    updateSpeed,
    reset,
    updateScrollPosition
  } = useTeleprompter(2);

  useEffect(() => {
    if (!script) {
      navigate('/');
      return;
    }
    setWords(script.split(/\s+/).filter(word => word.length > 0));
  }, [script, navigate]);

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentWordIndex(prev => {
          if (prev >= words.length - 1) {
            clearInterval(interval);
            togglePlay();
            return prev;
          }
          return prev + 1;
        });
      }, 60000 / (speed * 200));
      
      return () => clearInterval(interval);
    }
  }, [isPlaying, speed, words.length, togglePlay]);

  useEffect(() => {
    if (highlightRef.current) {
      updateScrollPosition(highlightRef.current);
    }
  }, [currentWordIndex, updateScrollPosition]);

  const handleExit = useCallback(() => {
    reset();
    setCurrentWordIndex(0);
    navigate('/');
  }, [reset, navigate]);

  const handleWordClick = useCallback((index: number) => {
    setCurrentWordIndex(index);
  }, []);

  return (
    <div className="min-h-screen bg-cream-100 overflow-hidden relative">
      <Button
        variant="ghost"
        size="icon"
        onClick={handleExit}
        className="absolute top-6 left-6 z-50 rounded-full bg-cream-200/80 hover:bg-cream-300/80 text-cream-600 transition-all duration-300 hover:scale-105"
      >
        <ArrowLeft className="h-6 w-6" />
      </Button>

      <div className="absolute inset-0 bg-gradient-to-b from-cream-200/50 to-transparent pointer-events-none" />
      
      <div
        ref={containerRef}
        className="h-screen overflow-hidden relative z-10 smooth-scroll px-4 md:px-8 lg:px-16"
      >
        <div 
          className="teleprompter-text"
          style={{
            fontFamily: fontFamily === 'inter' ? 'Inter' : 
                       fontFamily === 'cal-sans' ? 'Cal Sans' : fontFamily,
            fontSize: `${fontSize / 16}rem`,
          }}
        >
          {words.map((word, index) => (
            <span
              key={index}
              ref={index === currentWordIndex ? highlightRef : null}
              onClick={() => handleWordClick(index)}
              className={`inline-block mx-1 px-1.5 py-1 rounded-lg transition-all duration-300 cursor-pointer
                ${index === currentWordIndex
                  ? 'text-cream-600 scale-110 bg-cream-200 font-semibold shadow-lg'
                  : index < currentWordIndex
                  ? 'text-cream-600/60'
                  : 'text-cream-600/40'
                } hover:bg-cream-200/50`}
            >
              {word}
            </span>
          ))}
        </div>
      </div>
      
      <div className="fixed inset-x-0 top-0 h-40 bg-gradient-to-b from-cream-100 via-cream-100/80 to-transparent pointer-events-none z-20" />
      <div className="fixed inset-x-0 bottom-0 h-40 bg-gradient-to-t from-cream-100 via-cream-100/80 to-transparent pointer-events-none z-20" />
      
      <TeleprompterControls
        isPlaying={isPlaying}
        speed={speed}
        onTogglePlay={togglePlay}
        onSpeedChange={updateSpeed}
        onExit={handleExit}
      />
    </div>
  );
};

export default Teleprompter;