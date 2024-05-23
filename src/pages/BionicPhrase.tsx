import React from 'react';
import { toUnicodeVariant } from '../util/toUnicodeVariant';

const FormatWord = (word: string, isUnicode: boolean) => {
    const mid = Math.floor(word.length / 2);
    return (
      <>
        {isUnicode ? (
          <span className='font-bold'>{toUnicodeVariant(word.slice(0, mid), 'bold')}</span>
        ) : (
          <span className='bio-letter'>{word.slice(0, mid)}</span>
        )}
        {word.slice(mid)}
      </>
    );
  };

  interface BionicPhraseProps {
    words: string[];
    isUnicode: boolean;
  }

  const BionicPhrase: React.FC<BionicPhraseProps> = ({
    words, 
    isUnicode
  }) => {
    return (
        <div className="text-2xl">
            {words.map((text) => (
            <>{FormatWord(text, isUnicode)} </>
            ))}
        </div>
      );
};

export default BionicPhrase;