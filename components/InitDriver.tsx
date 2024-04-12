'use client'
import { useEffect, useState } from 'react';
import shiki from 'shiki';

export default function InitDriver() {
  const [headerHTML, setHeaderHTML] = useState('');

   async function init() {
    const response = await fetch('/api/scrapeHeader');
    const data = await response.json();
    setHeaderHTML(data.headerHTML);
  }

  useEffect(() => {
    async function highlight() {
      if (headerHTML) {
        const highlighter = await shiki.getHighlighter({ theme: 'nord' });
        const highlightedCode = highlighter.codeToHtml(headerHTML, 'html');
        setHeaderHTML(highlightedCode);
      }
    }

    if (headerHTML) {
      highlight();
    }
  }, [headerHTML]);

  return (
    <div className="p-4">
      <button
        onClick={init}
        className="relative p-2 inline-flex items-center justify-center font-bold overflow-hidden group rounded-md bg-gradient-to-br from-yellow-500 via-pink-500 to-purple-500 group-hover:from-purple-500 group-hover:via-pink-500 group-hover:to-yellow-500"
      >
        Init
      </button>
      <pre className="mt-4 text-white bg-black p-4 rounded-md overflow-auto" dangerouslySetInnerHTML={{ __html: headerHTML }} />
    </div>
  );
}