
import Sandbox from './Sandbox';
import Header from './Header';
import Box from '@mui/material/Box';
import './App.css';

function App() {


  return (
    <div className="App">
      {Header()}
      <main>
        {Sandbox()}
        <Box className="Call-to-action-box">
          <h1>Ready to use it for real?</h1>
          <p>Visit <a
            className="App-link"
            href="https://policyglass.cloudwanderer.io"
            target="_blank"
            rel="noopener noreferrer">
            policyglass.cloudwanderer.io
          </a> to get started parsing AWS policies.</p>
          <h2>Found a bug?</h2>
          <p><a className="App-link" href="https://github.com/CloudWanderer-io/PolicyGlass/issues" target="_blank"
            rel="noopener noreferrer">Report it in GitHub Issues.</a></p>
        </Box>
      </main>
    </div >
  );
}

export default App;
