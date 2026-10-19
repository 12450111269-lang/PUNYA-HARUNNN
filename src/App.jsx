import React, { useState } from 'react';
import LoadingScreen from './components/LoadingScreen.jsx';
import PasscodeScreen from './components/PasscodeScreen.jsx';
import FlowerBloomLoading from './components/FlowerBloomLoading.jsx';
import UnboxingScreen from './components/UnboxingScreen.jsx';
import MainCelebration from './components/MainCelebration.jsx';

export default function App() {
  const [phase, setPhase] = useState('loading');

  return (
    <div className="mobile-app-shell">
      {phase === 'loading' && (
        <LoadingScreen onComplete={() => setPhase('passcode')} />
      )}
      {phase === 'passcode' && (
        <PasscodeScreen onUnlock={() => setPhase('flower-loading')} />
      )}
      {phase === 'flower-loading' && (
        <FlowerBloomLoading onComplete={() => setPhase('unboxing')} />
      )}
      {phase === 'unboxing' && (
        <UnboxingScreen onOpen={() => setPhase('unlocked')} />
      )}
      {phase === 'unlocked' && (
        <MainCelebration />
      )}
    </div>
  );
}
