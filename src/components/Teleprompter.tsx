import { useLocation, useNavigate } from 'react-router-dom';
import { useTeleprompter } from '@/hooks/useTeleprompter';
import { TeleprompterControls } from '@/components/TeleprompterControls';
import { TeleprompterEditor } from '@/components/teleprompter/TeleprompterEditor';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';
import { useEffect, useState, useRef, useCallback } from 'react';
import { TeleprompterContainer } from './teleprompter/TeleprompterContainer';
import { TeleprompterWord } from './teleprompter/TeleprompterWord';
import { TeleprompterScroll } from './teleprompter/TeleprompterScroll';
import { TeleprompterLayout } from './teleprompter/TeleprompterLayout';

interface TeleprompterProps {
  initialScript?: string;
  fontSize?: number;
  fontFamily?: string;
  textColor?: string;
  autoStart?: boolean;
  onExit?: () => void;
}

interface TeleprompterState {
  script: string;
  fontSize: number;
  fontFamily: string;
  textColor: string;
}

export const Teleprompter = ({
  initialScript,
  fontSize: initialFontSize,
  fontFamily: initialFontFamily,
  textColor: initialTextColor,
  autoStart = false,
  onExit,
}: TeleprompterProps = {}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [words, setWords] = useState<string[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [editableScript, setEditableScript] = useState('');
  const { script, fontSize, fontFamily, textColor } = (location.state as TeleprompterState) || {
    script: initialScript,
    fontSize: initialFontSize,
    fontFamily: initialFontFamily,
    textColor: initialTextColor,
  };
  
  const highlightRef = useRef<HTMLSpanElement>(null);
  const firstWordRef = useRef<HTMLSpanElement>(null);
  const scrollIntervalRef = useRef<number>();
  
  const {
    isPlaying,
    speed,
    togglePlay,
    updateSpeed,
    reset,
    containerRef,
  } = useTeleprompter(2, autoStart);

  useKeyboardShortcuts(updateSpeed, togglePlay, speed);

  useEffect(() => {
    if (!script) {
      navigate('/');
      return;
    }
    setWords(script.split(/\s+/).filter(word => word.length > 0));
    setEditableScript(script);
  }, [script, navigate]);

  useEffect(() => {
    if (isPlaying) {
      scrollIntervalRef.current = window.setInterval(() => {
        setCurrentWordIndex(prev => {
          if (prev >= words.length - 1) {
            clearInterval(scrollIntervalRef.current);
            togglePlay();
            return prev;
          }
          return prev + 1;
        });
      }, 60000 / (speed * 200));
      
      return () => {
        if (scrollIntervalRef.current) {
          clearInterval(scrollIntervalRef.current);
        }
      };
    }
  }, [isPlaying, speed, words.length, togglePlay]);

  const handleWordClick = useCallback((index: number) => {
    setCurrentWordIndex(index);
    if (isPlaying) {
      togglePlay();
    }
  }, [isPlaying, togglePlay]);

  const handleExit = useCallback(() => {
    if (scrollIntervalRef.current) {
      clearInterval(scrollIntervalRef.current);
    }
    reset();
    setCurrentWordIndex(0);
    if (onExit) {
      onExit();
    } else {
      navigate('/');
    }
  }, [reset, navigate, onExit]);

  const handleEditToggle = useCallback(() => {
    if (isEditing) {
      setWords(editableScript.split(/\s+/).filter(word => word.length > 0));
      setCurrentWordIndex(0);
    }
    setIsEditing(!isEditing);
  }, [isEditing, editableScript]);

  const handleRestart = useCallback(() => {
    if (scrollIntervalRef.current) {
      clearInterval(scrollIntervalRef.current);
    }
    reset();
    setCurrentWordIndex(0);
  }, [reset]);

  return (
    <TeleprompterLayout
      onExit={handleExit}
      isEditing={isEditing}
      onEditToggle={handleEditToggle}
    >
      <TeleprompterContainer 
        containerRef={containerRef}
        firstWordRef={firstWordRef}
        autoStart={autoStart}
      >
        {isEditing ? (
          <TeleprompterEditor
            editableScript={editableScript}
            setEditableScript={setEditableScript}
            fontFamily={fontFamily}
            fontSize={fontSize}
            textColor={textColor}
          />
        ) : (
          <div 
            className="teleprompter-text max-w-4xl mx-auto"
            style={{
              fontFamily: fontFamily === 'inter' ? 'Inter' : 
                         fontFamily === 'cal-sans' ? 'Cal Sans' : fontFamily,
              fontSize: `${fontSize / 16}rem`,
              color: textColor,
            }}
          >
            {words.map((word, index) => (
              <TeleprompterWord
                key={index}
                word={word}
                index={index}
                currentWordIndex={currentWordIndex}
                onClick={handleWordClick}
                highlightRef={index === currentWordIndex ? highlightRef : 
                            index === 0 ? firstWordRef : null}
                textColor={textColor}
              />
            ))}
          </div>
        )}
      </TeleprompterContainer>

      <TeleprompterScroll
        highlightRef={highlightRef}
        containerRef={containerRef}
        currentWordIndex={currentWordIndex}
        isPlaying={isPlaying}
      />
      
      <TeleprompterControls
        isPlaying={isPlaying}
        speed={speed}
        onTogglePlay={togglePlay}
        onSpeedChange={updateSpeed}
        onExit={handleExit}
        onRestart={handleRestart}
      />
    </TeleprompterLayout>
  );
};

export default Teleprompter;
