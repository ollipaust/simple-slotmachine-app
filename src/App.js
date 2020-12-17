import React, { useState } from 'react';
import Rules from './components/Rules';
import Footer from './components/Footer';
import SlotMachine from './components/SlotMachine';

function App() {
  const [shouldRender, setRender] = useState(true); // eslint-disable-line no-unused-vars
  return (
    <div className="wrapper">
      <h1>Simple SlotMachine App<sub>React practice by Olli Paust</sub></h1>
      <Rules />
      { shouldRender && <SlotMachine /> }
      <Footer />
    </div>
  );
}

export default App;
