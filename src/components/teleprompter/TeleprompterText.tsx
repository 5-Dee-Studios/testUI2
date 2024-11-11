import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TeleprompterTextProps {
  words: string[];
  currentWordIndex: number;
  handleWordClick: (index: number) => void;
  highlightRef: React.RefObject<HTMLSpanElement>;
  fontFamily: string;
  fontSize: number;
  textColor: string;
}

export const TeleprompterText = ({
  words,
  currentWordIndex,
  handleWordClick,
  highlightRef,
  fontFamily,
  fontSize,
  textColor,
}: TeleprompterTextProps) => {
  return (
    <motion.div 
      className="teleprompter-text"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        fontFamily: fontFamily === 'inter' ? 'Inter' : 
                   fontFamily === 'cal-sans' ? 'Cal Sans' : fontFamily,
        fontSize: `${fontSize / 16}rem`,
        color: textColor,
      }}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          ref={index === currentWordIndex ? highlightRef : null}
          onClick={() => handleWordClick(index)}
          className={cn(
            "inline-flex items-center justify-center",
            "mx-1 px-1 py-0.5 rounded cursor-pointer min-h-[1.8em]",
            "transition-all duration-400 ease-in-out",
            index === currentWordIndex && "word-highlight",
            index < currentWordIndex ? "word-past" : "word-future"
          )}
          layout="position"
          layoutId={`word-${index}`}
          animate={{
            scale: index === currentWordIndex ? 1.1 : 1,
            opacity: index === currentWordIndex ? 1 : 
                     index < currentWordIndex ? 0.6 : 0.4,
          }}
          transition={{
            duration: 0.4,
            ease: [0.4, 0, 0.2, 1],
            layout: {
              duration: 0.4,
              ease: [0.4, 0, 0.2, 1],
            }
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};