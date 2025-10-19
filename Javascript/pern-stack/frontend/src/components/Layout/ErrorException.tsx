export const ErrorException = ({ setError }: { setError: TypeError }) => {
  return (
    <div className="absolute top-0 left-0 w-full">
      <div className="flex m-auto h-screen justify-center items-center">
        <div className="flex p-5 rounded-xl border border-red-400/30 bg-red-500/25">
          <small className="text-red-400">{setError.message}</small>
        </div>
      </div>
    </div>
  );
};
