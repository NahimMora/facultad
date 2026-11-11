import { useEffect, useState } from 'react';
import { initialCareerStates, type CareerState } from '../content/career';
import { CAREER_KEY } from './academic';
import { load, save } from './storage';
export function useAcademic() {
  const [states,setStates] = useState(() => initialCareerStates(load<unknown>(CAREER_KEY,null)));
  useEffect(() => {
    const sync = () => setStates(initialCareerStates(load<unknown>(CAREER_KEY,null)));
    window.addEventListener('storage',sync); window.addEventListener('academic-change',sync);
    return () => { window.removeEventListener('storage',sync); window.removeEventListener('academic-change',sync); };
  },[]);
  const update = (id: string, state: CareerState) => {
    const next = {...states,[id]:state}; save(CAREER_KEY,next);
    window.dispatchEvent(new Event('academic-change')); setStates(next);
  };
  return {states,update};
}
