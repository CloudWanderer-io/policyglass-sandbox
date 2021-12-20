import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import logo from './logo.png';


function Header() {
    return (<header className="App-header">
        <Container>
            <Box sx={{ width: 1 }}>
                <Box className="App-header-grid" display="grid" gap={2}>
                    <Box gridColumn="span 6">
                        <img src={logo} className="App-logo" alt="logo" />
                    </Box>
                    <Box gridColumn="span 6">
                        <h1>PolicyGlass</h1>
                        <p>
                            <a
                                className="App-link"
                                href="https://policyglass.cloudwanderer.io"
                                target="_blank"
                                rel="noopener noreferrer">
                                PolicyGlass
                            </a> is a Python Package allows you to combine multiple AWS IAM policies/statements into their ‘effective permissions’, deduplicating permissions, and eliminating denied permissions along the way.
                        </p>
                        <p>
                            PolicyGlass will always result in only allow PolicyShard objects, no matter how complex the policy. This makes understanding the effect of your policies programatically a breeze.</p>
                    </Box>
                </Box>
            </Box>
        </Container>
    </header>)
}

export default Header
