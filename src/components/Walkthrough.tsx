import { useEffect, useRef, useState } from 'react';
import { Vis } from '../vis/Vis';
import { visSteps, type VisScene, type VisSpec } from '../vis/types';
import { Rich } from './Rich';

const BASE = import.meta.env.BASE_URL;

/** Diagrama estático (todos los pasos visibles), p. ej. en preguntas. */
export function StaticVis({ v, title }: { v: VisSpec; title?: string }) {
  return <div className="vstage static"><Vis v={v} imgBase={BASE} title={title} /></div>;
}

/**
 * Recorrido visual: el diagrama se arma paso a paso y debajo aparece la explicación de cada paso.
 * Tocar el diagrama avanza; ▶ reproduce solo; ⤢ pantalla completa (ideal con el celular girado).
 */
export function Walkthrough({ scene, title }: { scene: VisScene; title?: string }) {
  const n = visSteps(scene);
  const [step, setStep] = useState(0);
  const [play, setPlay] = useState(false);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!play) return;
    if (step >= n - 1) { setPlay(false); return; }
    const ms = Math.min(14000, Math.max(3800, (scene.say[step]?.length ?? 60) * 62));
    const id = setTimeout(() => setStep((s) => Math.min(n - 1, s + 1)), ms);
    return () => clearTimeout(id);
  }, [play, step, n, scene.say]);

  const go = (k: number) => { setPlay(false); setStep(Math.max(0, Math.min(n - 1, k))); };
  const full = () => {
    const el = box.current;
    if (!el) return;
    if (document.fullscreenElement) void document.exitFullscreen();
    else void el.requestFullscreen?.().then(() => (screen.orientation as ScreenOrientation & { lock?: (o: string) => Promise<void> })?.lock?.('landscape').catch(() => undefined)).catch(() => undefined);
  };

  return (
    <div className="walk" ref={box}>
      <button type="button" className="vstage" onClick={() => go(step + 1 >= n ? 0 : step + 1)} aria-label={step + 1 >= n ? 'Volver al primer paso' : 'Siguiente paso'}>
        <Vis v={scene.v} step={step} anim imgBase={BASE} title={title} />
      </button>
      <div className="walk-cap" aria-live="polite">
        <span className="walk-n">{step + 1}/{n}</span>
        <p><Rich text={scene.say[step] ?? ''} /></p>
      </div>
      <div className="walk-ctl">
        <button type="button" className="btn small ghost" onClick={() => go(step - 1)} disabled={step === 0} aria-label="Paso anterior">◀</button>
        <div className="walk-dots" role="tablist" aria-label="Pasos">
          {Array.from({ length: n }, (_, i) => <button key={i} type="button" role="tab" aria-selected={i === step} className={`dot ${i === step ? 'on' : i < step ? 'done' : ''}`} onClick={() => go(i)} aria-label={`Paso ${i + 1}`} />)}
        </div>
        <button type="button" className="btn small primary" onClick={() => go(step + 1)} disabled={step >= n - 1} aria-label="Paso siguiente">▶</button>
        <button type="button" className="btn small ghost" onClick={() => { if (step >= n - 1) setStep(0); setPlay(!play); }} aria-pressed={play}>{play ? '⏸ Pausa' : '⏵ Auto'}</button>
        <button type="button" className="btn small ghost" onClick={full} aria-label="Pantalla completa">⤢ Agrandar</button>
      </div>
    </div>
  );
}

/** Video corto incrustado (se carga recién al tocarlo). */
export function ShortVideo({ src, poster, minutes, label = 'Ver este tema en video' }: { src: string; poster?: string; minutes: number; label?: string }) {
  const [open, setOpen] = useState(false);
  const abs = (u: string) => (/^https?:/.test(u) ? u : BASE + u);
  const mm = `${Math.floor(minutes)}:${String(Math.round((minutes % 1) * 60)).padStart(2, '0')}`;
  if (!open) return <button type="button" className="short-btn" onClick={() => setOpen(true)}><span aria-hidden>▶</span> {label} <span className="hint">· {mm}</span></button>;
  return <video className="short-video" controls autoPlay playsInline preload="auto" src={abs(src)} poster={poster ? abs(poster) : undefined} />;
}
