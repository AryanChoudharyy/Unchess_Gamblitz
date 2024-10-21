// import React from 'react';

// interface HomePageProps {
//   onStartGame: () => void;
// }

// const HomePage: React.FC<HomePageProps> = ({ onStartGame }) => {
//   const styles = {
//     homePage: {
//       background: 'linear-gradient(196deg, #3b434a, #171a21)',
//       minHeight: '100vh',
//       display: 'flex',
//       flexDirection: 'column' as const,
//       color: 'white',
//       fontFamily: 'var(--font-geist-sans), sans-serif',
//     },
//     header: {
//       display: 'flex',
//       justifyContent: 'space-between',
//       alignItems: 'center',
//       padding: '1rem 2rem',
//     },
//     logo: {
//       display: 'flex',
//       alignItems: 'center',
//       fontSize: '1.5rem',
//       fontWeight: 'bold',
//     },
//     logoSvg: {
//       width: '42px',
//       height: '42px',
//       fill: 'white',
//       marginRight: '0.5rem',
//     },
//     main: {
//       flex: 1,
//       display: 'flex',
//       justifyContent: 'center',
//       alignItems: 'center',
//     },
//     content: {
//       textAlign: 'center' as const,
//     },
//     title: {
//       fontSize: '3rem',
//       marginBottom: '0.5rem',
//     },
//     subtitle: {
//       fontSize: '1rem',
//       marginBottom: '2rem',
//     },
//     startButton: {
//       backgroundColor: '#4a4a4a',
//       color: 'white',
//       border: 'none',
//       padding: '0.75rem 2rem',
//       fontSize: '1rem',
//       borderRadius: '4px',
//       cursor: 'pointer',
//       transition: 'background-color 0.3s ease',
//     },
//   };

//   return (
//     <div style={styles.homePage}>
//       <header style={styles.header}>
//         <div style={styles.logo}>
//           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" style={styles.logoSvg}>
//             <path d="M32.1 21.57v11.34H15.9v-2.36a4.06 4.06 0 0 1 2.24-3.62L21 25.48a2.43 2.43 0 0 0 1.34-2.17v-2.55l-1.12.56a1.23 1.23 0 0 0-.64.79l-.58 2.4a.65.65 0 0 1-.37.42l-1.5.59a.59.59 0 0 1-.47 0l-3.05-1.36a.6.6 0 0 1-.36-.55v-8a1.22 1.22 0 0 1 .36-.86l.45-.45-.72-1.44a.85.85 0 0 1-.09-.38.61.61 0 0 1 .61-.61h7.49a9.72 9.72 0 0 1 9.75 9.7Zm1 12.15H14.89a.61.61 0 0 0-.61.61v1.21a.61.61 0 0 0 .61.61h18.22a.61.61 0 0 0 .61-.61v-1.21a.61.61 0 0 0-.61-.61Zm-16.2-17a1 1 0 1 0 1 1 1 1 0 0 0-.99-1.01Z" />
//           </svg>
//           Unchess
//         </div>
//       </header>
//       <main style={styles.main}>
//         <div style={styles.content}>
//           <h1 style={styles.title}>Unchess</h1>
//           <p style={styles.subtitle}>made by Aryan</p>
//           <button 
//             onClick={onStartGame}
//             style={styles.startButton}
//             onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#5a5a5a'}
//             onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#4a4a4a'}
//           >
//             Get Started
//           </button>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default HomePage;




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
      }}
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
