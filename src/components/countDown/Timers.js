import React from 'react';
import CountDown from './CountDown';

export const SpinCounter = <CountDown startCount={5}>{count => (
    <>
      <span>Spinning stops in </span>
      <span style={{ color: 'red', fontSize: '2rem' }}>{count}</span>
      <span>...</span>
    </>
  )}
</CountDown>

export const AutoSpinCounter = <CountDown startCount={5}>{count => (
    <>
      <span>Auto-Start: Spinning stops in </span>
      <span style={{ color: 'red' }}>{count}</span>
      <span>...</span>
    </>
  )}
</CountDown>