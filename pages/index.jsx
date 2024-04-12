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
    <div className="max-w-4xl mx-auto p-4 pb-10 relative min-h-screen  ">
      <span className="absolute top-2 right-2 text-white rounded-bl-md">{GithubLogo}  </span>
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
        <pre className="bg-slate-800 p-3 rounded-md shadow-sm">"selenium-webdriver": "^4.19.0"<br/>"chromedriver": "123",
        <br/>$google-chrome --version:

Google Chrome 123.0.6312.105 </pre>
      </div>

      <footer className="pt-10 mt-4 absolute bottom-4           right-4 text-xs
      ">


        With <span className="text-xs animate-pulse">❤️</span> and a little  <span className="text-xs">😡</span> by <a href="https://github.com/remcostoeten" target="_blank" className="text-blue-500  hover:text-blue-800">Remco Stoeten</a>.
      </footer>
    </div>
  );
}


const GithubLogo = () => (
  <a href="https://github.com/remcostoeten/Nextjs-selenium-chromedriver-scraper-test " target="_blank">
    <svg viewBox="0 0 24 24" aria-hidden="true" class="h-6 w-6 fill-slate-900"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.463 2 11.97c0 4.404 2.865 8.14 6.839 9.458.5.092.682-.216.682-.48 0-.236-.008-.864-.013-1.695-2.782.602-3.369-1.337-3.369-1.337-.454-1.151-1.11-1.458-1.11-1.458-.908-.618.069-.606.069-.606 1.003.07 1.531 1.027 1.531 1.027.892 1.524 2.341 1.084 2.91.828.092-.643.35-1.083.636-1.332-2.22-.251-4.555-1.107-4.555-4.927 0-1.088.39-1.979 1.029-2.675-.103-.252-.446-1.266.098-2.638 0 0 .84-.268 2.75 1.022A9.607 9.607 0 0 1 12 6.82c.85.004 1.705.114 2.504.336 1.909-1.29 2.747-1.022 2.747-1.022.546 1.372.202 2.386.1 2.638.64.696 1.028 1.587 1.028 2.675 0 3.83-2.339 4.673-4.566 4.92.359.307.678.915.678 1.846 0 1.332-.012 2.407-.012 2.734 0 .267.18.577.688.48 3.97-1.32 6.833-5.054 6.833-9.458C22 6.463 17.522 2 12 2Z"></path></svg><svg viewBox="0 0 24 24" aria-hidden="true" class="h-6 w-6 fill-slate-900"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.463 2 11.97c0 4.404 2.865 8.14 6.839 9.458.5.092.682-.216.682-.48 0-.236-.008-.864-.013-1.695-2.782.602-3.369-1.337-3.369-1.337-.454-1.151-1.11-1.458-1.11-1.458-.908-.618.069-.606.069-.606 1.003.07 1.531 1.027 1.531 1.027.892 1.524 2.341 1.084 2.91.828.092-.643.35-1.083.636-1.332-2.22-.251-4.555-1.107-4.555-4.927 0-1.088.39-1.979 1.029-2.675-.103-.252-.446-1.266.098-2.638 0 0 .84-.268 2.75 1.022A9.607 9.607 0 0 1 12 6.82c.85.004 1.705.114 2.504.336 1.909-1.29 2.747-1.022 2.747-1.022.546 1.372.202 2.386.1 2.638.64.696 1.028 1.587 1.028 2.675 0 3.83-2.339 4.673-4.566 4.92.359.307.678.915.678 1.846 0 1.332-.012 2.407-.012 2.734 0 .267.18.577.688.48 3.97-1.32 6.833-5.054 6.833-9.458C22 6.463 17.522 2 12 2Z"></path></svg>
  </a>
);

