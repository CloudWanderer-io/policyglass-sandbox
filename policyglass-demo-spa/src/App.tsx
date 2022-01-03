
import Sandbox from './Sandbox';
import Header from './Header';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
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
          <a className="App-link" href="https://github.com/CloudWanderer-io/PolicyGlass" target="_blank"
            rel="noopener noreferrer"><GitHubIcon fontSize="large" className="Footer-Icon" /></a>
          <a className="App-link" href="https://twitter.com/samjackmartin" target="_blank"
            rel="noopener noreferrer"><TwitterIcon fontSize="large" className="Footer-Icon" /></a>
        </Box>

      </main>
    </div >
  );
}

export default App;
