import React, { FC, useRef, useState } from 'react';

import * as bookIndex from './bookIndex.json';
import VCarousel from './VCarousel';

const initialFormat = (text: string) => {
  //remove all /r/n or /n
  const newText = text.replace(/\s\s+/g, ' ').replace(/(\r\n|\n|\r)/gm, ' ');
  //remove all extra spaces
  return newText.split(' ');
};

export const BionicReaderPage: FC = () => {
  const [isUnicode, setIsUnicode] = useState<boolean>(false);
  const [text, setText] = useState<string[]>([]);

  const customInputRef = useRef(null);

  //function that loads a text file from a url
  const loadText = async (url: string) => {
    console.log('loading text from: ', url);
    const response = await fetch(url);
    const lText = await response.text().then((text) => initialFormat(text));
    setText(lText);
    console.log('text length: ', lText.length);
  };

  return (
    <div className='px-3 py-20 w-screen h-screen bg-gray-500'>
      <div className='mx-auto max-w-xs h-auto min-h-fit sm:max-w-lg md:max-w-4xl rounded-lg shadow bg-white p-4'>
        <h2 className='text-2xl font-bold my-2 text-left'>ClassicsReader</h2>
        <p className='text-left text-gray-500'>Don&apos;t wait, read the classics now!</p>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <section className='text-left py-4 w-1/2'>
            <h3 className='text-lg font-bold pb-4'>Library:</h3>
            <div className='border border-gray-300 p-4'>
              <ul className='space-y-2'>
                {bookIndex.books.map((book) => (
                  <li key={book.author + book.title}>
                    <button
                      className='text-left underline hover:text-blue-500'
                      onClick={() =>
                        loadText(window.location.toString() + '/books/' + book.location)
                      }
                    >
                      &gt; {book.author} - {book.title}
                    </button>
                  </li>
                ))}
              </ul>
              <ul className='space-y-2'>
                  <li key="external">
                    <button
                      className='text-left underline hover:text-blue-500'
                      onClick={() => window.location.href = 'https://www.gutenberg.org'}
                    >
                      &gt; Find More
                    </button>
                  </li>
               </ul>
            </div>
            <h3 className='font-bold pb-4 text-lg'>Custom Book(url with txt file):</h3>
            <div className='border border-gray-300 p-4'>
              <input
                className='text-left underline hover:text-blue-500 w-full p-2 border border-gray-300'
                type='text'
                placeholder='Book URL'
                ref={customInputRef}
              />
              <button
                className='text-left underline hover:text-blue-500'
                onClick={() => {
                  if (
                    customInputRef.current === null ||
                    (customInputRef.current as HTMLInputElement).value.trim() === ''
                  ) {
                    alert('Please enter a valid URL');
                    return;
                  }
                  return loadText((customInputRef.current as HTMLInputElement).value);
                }}
              >
                [Load]
              </button>
              <button
                className='text-left underline hover:text-blue-500'
                onClick={() => setIsUnicode(!isUnicode)}
              >
                {isUnicode ? 'Disable' : 'Enable'} Unicode Conversion
              </button>
            </div>
          </section>
          <section className='text-left py-4 overflow-hidden flex flex-col'>
            <h3 className='text-lg font-bold pb-4'>Read Section:</h3>
            <VCarousel words={text} initialWpm={300} />
          </section>
        </div>
      </div>
    </div>
  );
};
