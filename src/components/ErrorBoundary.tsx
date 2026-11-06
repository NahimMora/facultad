import { Component, type ReactNode } from 'react';

/** Evita la pantalla en blanco si algo falla al dibujar una sección. */
export class ErrorBoundary extends Component<{ children: ReactNode; resetKey: string }, { err: Error | null; key: string }> {
  state = { err: null as Error | null, key: this.props.resetKey };
  static getDerivedStateFromError(err: Error) { return { err }; }
  static getDerivedStateFromProps(p: { resetKey: string }, s: { key: string; err: Error | null }) { return p.resetKey !== s.key ? { err: null, key: p.resetKey } : null; }
  render() {
    if (!this.state.err) return this.props.children;
    return (
      <div className="page"><div className="card">
        <h2>Algo falló al mostrar esta pantalla</h2>
        <p>Tu progreso está guardado. Volvé al inicio o recargá.</p>
        <div className="row"><a className="btn primary" href="#/">Ir al inicio</a><button type="button" className="btn" onClick={() => location.reload()}>Recargar</button></div>
      </div></div>
    );
  }
}
