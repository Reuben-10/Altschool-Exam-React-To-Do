export default function ErrorFallback() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] bg-[#FEFEFB] dark:bg-[#1E1E1E]">
      <div className="bg-white dark:bg-transparent rounded-[32px] shadow-xl border border-[#FDBF46] dark:border-[#53462b] px-8 py-10 flex flex-col items-center">
        <img src="/assets/quill_todo.svg" alt="Error" className="w-12 h-12 mb-3" />
        <h2 className="text-2xl font-bold text-[#5B6097] mb-2">Oops! Something broke.</h2>
        <p className="text-[#A3A3B9] mb-4 text-center">Try again later.</p>
        <a
          href="/"
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-[1406.64px] px-6 py-2 font-semibold shadow text-base transition-all duration-200"
        >
          Go Home
        </a>
      </div>
    </div>
  );
}
