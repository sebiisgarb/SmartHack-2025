import { useState, useEffect } from 'react';
import { Home } from './pages/Home';
import { ReadAloud } from './pages/ReadAloud';
import { ListenWrite } from './pages/ListenWrite';
import { Reward } from './pages/Reward';
import { Dashboard } from './pages/Dashboard';

type Page = 'home' | 'read-aloud' | 'listen-write' | 'reward' | 'dashboard';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [successfulExercises, setSuccessfulExercises] = useState(0);

  useEffect(() => {
    if (successfulExercises >= 3) {
      setCurrentPage('reward');
      setSuccessfulExercises(0);
    }
  }, [successfulExercises]);

  const handleExerciseComplete = () => {
    setSuccessfulExercises((prev) => prev + 1);
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page as Page);
  };

  return (
    <>
      {currentPage === 'home' && <Home onNavigate={handleNavigate} />}
      {currentPage === 'read-aloud' && (
        <ReadAloud onNavigate={handleNavigate} onExerciseComplete={handleExerciseComplete} />
      )}
      {currentPage === 'listen-write' && (
        <ListenWrite onNavigate={handleNavigate} onExerciseComplete={handleExerciseComplete} />
      )}
      {currentPage === 'reward' && <Reward onNavigate={handleNavigate} />}
      {currentPage === 'dashboard' && <Dashboard onNavigate={handleNavigate} />}
    </>
  );
}

export default App;
