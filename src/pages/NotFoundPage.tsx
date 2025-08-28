import { ThemeProvider } from '@/components/theme-provider'
import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <ThemeProvider>
      <div className="flex flex-col items-center justify-center min-h-[80vh] bg-[#FEFEFB] dark:bg-[#1E1E1E]">
        <div className="bg-white dark:bg-[#1E1E1E] rounded-[44px] shadow-xl border border-[#FDBF46] dark:border-[#53462b] px-12 py-16 flex flex-col items-center">
          <img src="/assets/quill_todo.svg" alt="Not Found" className="w-16 h-16 mb-4" />
          <h1 className="text-5xl font-bold text-[#5B6097] mb-2">404</h1>
          <h2 className="text-2xl font-semibold text-[#FDBF46] mb-2">Page Not Found</h2>
          <p className="text-[#A3A3B9] mb-6 text-center max-w-md">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link
            to="/"
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-[1406.64px] px-8 py-3 font-semibold shadow text-lg transition-all duration-200"
          >
            Go Home
          </Link>
        </div>
      </div>
    </ThemeProvider>
  )
}