export default function Loading() {
  return (
    <div className="min-h-screen bg-[#0a0e1a] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-violet-400 text-sm font-medium">Chargement...</p>
      </div>
    </div>
  );
}
