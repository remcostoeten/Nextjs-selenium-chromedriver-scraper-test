import { useState, useEffect } from "react";
import { getHighlighter } from 'shiki';
import beautify from 'js-beautify';

export default function Home() {
  const [code, setCode] = useState(null);
  const [headerHTML, setHeaderHTML] = useState(null);
  const [status, setStatus] = useState('Idle');
  const [showCheckmark, setShowCheckmark] = useState(false);

  async function init() {
    setStatus('Running...');
    const response = await fetch('/api/launch');
    const data = await response.json();
    setHeaderHTML(beautify.html(data.headerHTML));
    setStatus('Getting header...');
    setShowCheckmark(true);
  }

  useEffect(() => {
    async function highlightCode() {
      const highlighter = await getHighlighter({
        themes: ["dark-plus"],
        langs: ['html']
      });

      const highlightedCode = await highlighter.codeToHtml(headerHTML, { lang: 'html', theme: 'dark-plus' });
      setCode(highlightedCode);
      setStatus('Idle');
    }

    if (headerHTML) {
      highlightCode();
    }
  }, [headerHTML]);

  const triggerButton = () => (
    <button
      onClick={init}
      className="my-4 relative p-2 inline-flex items-center justify-center font-bold overflow-hidden group rounded-md bg-gradient-to-br from-yellow-500 via-pink-500 to-purple-500 group-hover:from-purple-500 group-hover:via-pink-500 group-hover:to-yellow-500"
    >
      {status === 'Idle' ? 'Run chromedriver' : status}
    </button>
  );

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Selenium Chromedriver Testing UI</h1>
      <p className="text-gray-300">
        Click the button below to run chromedriver. If everything works as expected, it should launch Chromedriver, navigate to my {''}
        <a href="http://remcostoeten.com" target='_blank' className="text-blue-500 underline hover:text-blue-800">website</a> and scrape the header in a <>pre</> tag on this page.
      </p>

      {triggerButton()}

      <div className="bg-zinc-900 p-4 rounded-md">
        <h2 className="font-semibold">Scraped data will appear here </h2>

        <pre className="p-3 rounded-md shadow-sm">
          {status === 'Running...' ? 'Running...' : (code ? <div dangerouslySetInnerHTML={{ __html: code }} /> : 'Waiting for data...')}
        </pre>
        </div>

        {showCheckmark && <div className="absolute top-0 right-0 p-2 bg-green-500 text-white rounded-bl-md">✓</div>}

      <div className="mt-6 bg-zinc-900 p-4 rounded-md flex flex-col gap-4">
        <h2 className="text-lg font-semibold">Practical Information</h2>
        <p>A test repository to check if Selenium Chromedriver will be available when deployed.</p>
        <p>Local version of the code is working fine:</p>
        <p>Package version:</p>
        <pre className="bg-zinc-800 p-3 rounded-md shadow-sm">"selenium-webdriver": "^4.19.0"<br/>"chromedriver": "123",</pre>
      </div>
    </div>

    <footer>Source code can be found <a href='https</footer>
  );
}