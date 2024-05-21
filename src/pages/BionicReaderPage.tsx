import React, { FC, useRef } from 'react';

import { useTextProcessing } from '../hooks/useTextProcessing';

import * as bookIndex from './bookIndex.json';

export const BionicReaderPage: FC = () => {
  const { listPrepText, isDisabled, onClickButton, pretext } =
    useTextProcessing(true);
  const inputRef = useRef(null);

  //function that loads a text file from a url
  const loadText = async (url: string) => {
    const response = await fetch(url);
    const text = await response.text();
    return text;
  };

  return (
    <div className='px-3 py-20 w-screen h-screen bg-gray-500'>
      <div className='mx-auto max-w-xs h-auto min-h-fit sm:max-w-lg md:max-w-4xl rounded-lg shadow bg-white p-4'>
        <h2 className='text-2xl font-bold my-2 text-left'>ClassicsReader</h2>
        <p className='text-left text-gray-500'>
          Don&apos;t wait, read the classics now!
        </p>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
          <section className='text-left py-4'>
            <h3 className='text-lg font-bold pb-4'>Library:</h3>
            <div className='border border-gray-300 p-4'>
              <ul className='space-y-2'>
                {bookIndex.books.map((book) => (
                  <li key={book.author+book.title}>
                    <button
                      className='text-left underline hover:text-blue-500'
                      disabled={isDisabled}
                      onClick={() => 
                        loadText(window.location.toString() + book.location)
                        .then((text) => onClickButton(text))
                      }
                    >
                      &gt; {book.author} - {book.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </section>
          <section className='text-left py-4 overflow-hidden flex flex-col'>
            <h3 className='text-lg font-bold pb-4 '>Read Section:</h3>

            <p
              className='whitespace-pre-wrap break-all basis-11/12 shadow mb-4 px-3
              py-1.5'
              id='divToPrint'
              ref={inputRef}
            >
              {pretext}
              <span className='t-text'>
                {listPrepText.map((text) => (
                  <>{text} </>
                ))}
              </span>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
