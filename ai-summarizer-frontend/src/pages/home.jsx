import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-3xl font-bold mb-4">Welcome to My AI Toolkit</h1>
      <Link
        to="/summarizer"
        className="text-white bg-blue-600 px-6 py-2 rounded-md hover:bg-blue-700"
      >
        Go to Summarizer
      </Link>
    </div>
  );
}
