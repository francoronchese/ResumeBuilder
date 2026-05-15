import EditorPanel from "./components/editor/EditorPanel";

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-99 bg-white border-b border-gray-300">
        <div className="flex items-center justify-between max-w-6xl mx-auto px-8 py-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Resume Builder</h1>
            <p className="mt-0.5 text-base text-gray-600">
              Create your perfect resume in minutes
            </p>
          </div>
          <span className="text-sm text-gray-500">Auto-saved</span>
        </div>
      </header>

      {/* Main layout — editor on the left, preview on the right */}
      <div className="grid md:grid-cols-[380px_1fr] gap-8 max-w-6xl mx-auto p-8">
        <aside className="overflow-y-auto">
          <EditorPanel />
        </aside>
        <main className="overflow-y-auto">Preview</main>
      </div>
    </div>
  );
}
