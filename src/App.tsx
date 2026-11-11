import { HashRouter, Link, NavLink, Route, Routes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Home } from './pages/Home';
import { SubjectPage } from './pages/SubjectPage';
import { ProgressPage } from './pages/ProgressPage';
import { PlanPage } from './pages/PlanPage';
import { CareerPage } from './pages/CareerPage';
import { StudyPage } from './pages/StudyPage';
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
      <a className="skip-link" href="#main-content" onClick={e=>{e.preventDefault();document.getElementById('main-content')?.focus();}}>Ir al contenido</a>
      <header className="topbar">
        <Link to="/" className="brand"><span className="logo" aria-hidden>🎓</span> Mi carrera</Link>
        <nav className="topnav" aria-label="Principal">
          <NavLink to="/" end>Hoy</NavLink>
          <NavLink to="/estudiar" className={loc.pathname.startsWith('/m/')?'active':undefined}>Estudiar</NavLink>
          <NavLink to="/carrera">Mi carrera</NavLink>
        </nav>
      </header>
      <main id="main-content" tabIndex={-1}>
        <ErrorBoundary resetKey={loc.pathname}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/m/:id" element={<SubjectPage />} />
            <Route path="/progreso" element={<ProgressPage />} />
            <Route path="/plan" element={<PlanPage />} />
            <Route path="/estudiar" element={<StudyPage />} />
            <Route path="/carrera" element={<CareerPage />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </ErrorBoundary>
      </main>
      <nav className="bottomnav" aria-label="Navegación móvil">
        <NavLink to="/" end><span aria-hidden>⌂</span>Hoy</NavLink>
        <NavLink to="/estudiar" className={loc.pathname.startsWith('/m/')?'active':undefined}><span aria-hidden>▤</span>Estudiar</NavLink>
        <NavLink to="/carrera"><span aria-hidden>◉</span>Mi carrera</NavLink>
      </nav>
      <footer className="foot">Contenido redactado para estudio personal. Los materiales originales de cada cátedra no se publican.</footer>
    </>
  );
}

export function App() {
  return <HashRouter><Shell /></HashRouter>;
}
