import { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';

interface DialogueLine {
  text: string;
  duration?: number;
}

interface DialogueContextType {
  currentLine: string | null;
  isVisible: boolean;
  queueLine: (text: string, duration?: number) => void;
  queueLines: (lines: DialogueLine[]) => void;
  clear: () => void;
  show: () => void;
  hide: () => void;
}

const DialogueContext = createContext<DialogueContextType | undefined>(undefined);

export function DialogueProvider({ children }: { children: ReactNode }) {
  const [currentLine, setCurrentLine] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [queue, setQueue] = useState<DialogueLine[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const queueLine = useCallback((text: string, duration: number = 4000) => {
    setQueue(prev => [...prev, { text, duration }]);
  }, []);

  const queueLines = useCallback((lines: DialogueLine[]) => {
    setQueue(prev => [...prev, ...lines]);
  }, []);

  const clear = useCallback(() => {
    setCurrentLine(null);
    setQueue([]);
    setIsVisible(false);
    setIsProcessing(false);
  }, []);

  const show = useCallback(() => setIsVisible(true), []);
  const hide = useCallback(() => setIsVisible(false), []);

  useEffect(() => {
    if (queue.length > 0 && !isProcessing) {
      setIsProcessing(true);
      const nextLine = queue[0];
      setCurrentLine(nextLine.text);
      setIsVisible(true);

      const timer = setTimeout(() => {
        setQueue(prev => prev.slice(1));
        setIsProcessing(false);
        if (queue.length === 1) {
          setCurrentLine(null);
          setIsVisible(false);
        }
      }, nextLine.duration || 4000);

      return () => clearTimeout(timer);
    }
  }, [queue, isProcessing]);

  return (
    <DialogueContext.Provider
      value={{ currentLine, isVisible, queueLine, queueLines, clear, show, hide }}
    >
      {children}
    </DialogueContext.Provider>
  );
}

export function useDialogue() {
  const context = useContext(DialogueContext);
  if (!context) {
    throw new Error('useDialogue must be used within DialogueProvider');
  }
  return context;
}
