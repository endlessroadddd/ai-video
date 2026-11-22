import { useState, useCallback } from 'react';

export const useFakeStream = () => {
  const [displayedText, setDisplayedText] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);

  // 模拟流式输出
  const startStream = useCallback((fullText: string, speedMs: number = 20) => {
    setIsStreaming(true);
    setDisplayedText('');
    
    let currentIndex = 0;
    
    const interval = setInterval(() => {
      if (currentIndex < fullText.length) {
        setDisplayedText((prev) => prev + fullText[currentIndex]);
        currentIndex++;
      } else {
        clearInterval(interval);
        setIsStreaming(false);
      }
    }, speedMs);

    return () => clearInterval(interval);
  }, []);

  return { displayedText, isStreaming, startStream };
};
