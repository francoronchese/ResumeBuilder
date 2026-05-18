import EditorPanel from "./components/editor/EditorPanel";
import PreviewPanel from "./components/preview/PreviewPanel";
import { useAutoSave } from "./hooks/useAutoSave";

export default function App() {
  const { formattedTime } = useAutoSave();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-99 bg-white border-b border-gray-300">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between max-w-7xl mx-auto px-8 py-4 gap-2">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Resume Builder</h1>
            <p className="mt-0.5 text-base text-gray-600">
              Create your perfect resume in minutes
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-sm text-gray-500">
              {formattedTime ? `Last saved: ${formattedTime}` : "Auto-saved"}
            </span>
          </div>
        </div>
      </header>

      {/* Main layout — editor on the left, preview on the right */}
      <div className="grid md:grid-cols-[332px_1fr] gap-8 md:h-[calc(100vh-96px)] max-w-7xl mx-auto p-8">
        <aside className="md:overflow-y-scroll">
          <EditorPanel />
        </aside>
        <main className="overflow-y-auto">
          <PreviewPanel />
        </main>
      </div>
    </div>
  );
}
