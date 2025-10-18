export const BackButton = () => {
  return (
    <div
      onClick={() => window.history.back()}
      className="absolute top-20 left-4 flex px-6 py-3 bg-[#fff] dark:bg-zinc-900/50 border border-zinc-300 dark:border-zinc-800/50 rounded-xl gap-3 items-center cursor-pointer group"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-move-left-icon lucide-move-left strok group-hover:-translate-x-1 transition-transform"
      >
        <path d="M6 8L2 12L6 16" />
        <path d="M2 12H22" />
      </svg>
      <span className="text-zinc-800 dark:text-zinc-100">Volver</span>
    </div>
  );
};
