export const Home = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold text-blue-600 mb-4">Welcome to the Home Page</h1>
            <p className="text-lg text-gray-700">This is the home component of your application.</p>
            <div className="mt-6">
                <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
                    Get Started
                </button>
            </div>
        </div>
    );
};