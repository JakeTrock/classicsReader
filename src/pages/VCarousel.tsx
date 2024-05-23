import React, { useState, useEffect, useRef } from 'react';
import BionicPhrase from './BionicPhrase';

interface VCarouselProps {
  words: string[];
  initialWpm?: number;
  initialWordsCount?: number;
  isUnicode?: boolean;
}

const VCarousel: React.FC<VCarouselProps> = ({
  words,
  initialWpm = 300,
  initialWordsCount = 1,
  isUnicode = false,
}) => {
  const [index, setIndex] = useState(0);
  const [wpm, setWpm] = useState(initialWpm);
  const [wordsCount, setWordsCount] = useState(initialWordsCount);
  const [isPlaying, setIsPlaying] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const delay = 60000 / wpm;

  useEffect(() => {
    if (isPlaying) {
      timeoutRef.current = setTimeout(() => {
        setIndex((prevIndex) => (prevIndex + wordsCount) % words.length);
      }, delay);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [index, isPlaying, delay, words.length, wordsCount]);

  const playPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleWpmChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWpm(parseInt(event.target.value));
  };

  const handleWordsCountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWordsCount(parseInt(event.target.value));
  };

  const skip = (forward: boolean) => {
    const step = Math.ceil(words.length * 0.1); // skip by 10% of the total words
    setIndex((currentIndex) => {
      let newIndex = forward ? currentIndex + step : currentIndex - step;
      if (newIndex < 0) newIndex = words.length - Math.abs(newIndex % words.length);
      else if (newIndex >= words.length) newIndex = newIndex % words.length;
      return newIndex;
    });
  };

  return (
    <div className="flex flex-col items-center space-y-2">
      <BionicPhrase words={words.slice(index, index + wordsCount)} isUnicode={isUnicode} />
      <div className="flex space-x-4">
        <button onClick={() => skip(false)} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700">
          Skip Backward
        </button>
        <button onClick={playPause} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        <button onClick={() => skip(true)} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700">
          Skip Forward
        </button>
      </div>
      <div>
        WPM: <input type="number" min="100" max="1000" value={wpm} onChange={handleWpmChange} />
        {wpm} wpm
      </div>
      <div>
        Words Displayed: <input type="number" min="1" max={words.length} value={wordsCount} onChange={handleWordsCountChange} />
        {wordsCount}
      </div>
    </div>
  );
};

export default VCarousel;
