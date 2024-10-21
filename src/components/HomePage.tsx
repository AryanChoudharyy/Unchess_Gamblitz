import React from 'react';

interface HomePageProps {
  onStartGame: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onStartGame }) => {
  return (
    <div
      className="min-h-screen flex flex-col text-white font-sans"
      style={{
        background: 'linear-gradient(196deg, var(--bg-dark), var(--bg-light))',
        colorScheme: 'light dark',
        '--bg-light': '#333',
        '--bg-dark': '#cecece',
      } as React.CSSProperties}
    >
      <header className="flex justify-between items-center p-4 sm:p-8">
        <div className="flex items-center text-xl font-bold">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-10 h-10 fill-white mr-2">
            <path d="M32.1 21.57v11.34H15.9v-2.36a4.06 4.06 0 0 1 2.24-3.62L21 25.48a2.43 2.43 0 0 0 1.34-2.17v-2.55l-1.12.56a1.23 1.23 0 0 0-.64.79l-.58 2.4a.65.65 0 0 1-.37.42l-1.5.59a.59.59 0 0 1-.47 0l-3.05-1.36a.6.6 0 0 1-.36-.55v-8a1.22 1.22 0 0 1 .36-.86l.45-.45-.72-1.44a.85.85 0 0 1-.09-.38.61.61 0 0 1 .61-.61h7.49a9.72 9.72 0 0 1 9.75 9.7Zm1 12.15H14.89a.61.61 0 0 0-.61.61v1.21a.61.61 0 0 0 .61.61h18.22a.61.61 0 0 0 .61-.61v-1.21a.61.61 0 0 0-.61-.61Zm-16.2-17a1 1 0 1 0 1 1 1 1 0 0 0-.99-1.01Z" />
          </svg>
          Unchess
        </div>
      </header>
      <main className="flex flex-1 justify-center items-center">
        <div className="text-center">
          <h1 className="text-6xl mb-2">Unchess</h1>
          <p className="text-lg mb-8">made by Aryan</p>
          <button
            onClick={onStartGame}
            className="bg-gray-700 text-white py-3 px-6 text-lg rounded hover:bg-gray-600 transition-colors"
          >
            Get Started
          </button>
        </div>
      </main>
    </div>
  );
};

export default HomePage;