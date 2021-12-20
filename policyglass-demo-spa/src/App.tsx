import { useState } from 'react';

import Sandbox from './Sandbox';
import Header from './Header';
import Box from '@mui/material/Box';
import './App.css';

function App() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  return (
    <div className="App">
      {Header()}
      <main>
        {Sandbox(input, setInput, output, setOutput)}
        <Box className="Call-to-action-box">
          <h1>Ready to use it for real?</h1>
          <p>Visit <a
            className="App-link"
            href="https://policyglass.cloudwanderer.io"
            target="_blank"
            rel="noopener noreferrer">
            policyglass.cloudwanderer.io
          </a> to get started parsing AWS policies.</p>
        </Box>
      </main>
    </div >
  );
}

export default App;
