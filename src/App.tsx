import { HashRouter, Link, NavLink, Route, Routes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Home } from './pages/Home';
import { SubjectPage } from './pages/SubjectPage';
import { ProgressPage } from './pages/ProgressPage';
import { ErrorBoundary } from './components/ErrorBoundary';

function ScrollTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function Shell() {
  const loc = useLocation();
  return (
    <>
      <ScrollTop />
      <header className="topbar">
        <Link to="/" className="brand"><span className="logo" aria-hidden>🎓</span> Mi carrera</Link>
        <nav className="topnav" aria-label="Principal">
          <NavLink to="/" end>Materias</NavLink>
          <NavLink to="/progreso">Progreso</NavLink>
        </nav>
      </header>
      <main>
        <ErrorBoundary resetKey={loc.pathname}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/m/:id" element={<SubjectPage />} />
            <Route path="/progreso" element={<ProgressPage />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </ErrorBoundary>
      </main>
      <nav className="bottomnav" aria-label="Navegación móvil">
        <NavLink to="/" end><span aria-hidden>📚</span>Materias</NavLink>
        <NavLink to="/progreso"><span aria-hidden>📈</span>Progreso</NavLink>
      </nav>
      <footer className="foot">Contenido redactado para estudio personal. Los materiales originales de cada cátedra no se publican.</footer>
    </>
  );
}

export function App() {
  return <HashRouter><Shell /></HashRouter>;
}
