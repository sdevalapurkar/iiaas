import { useState } from 'react';
import { Box, Typography } from '@material-ui/core';
import RegisterLogin from './components/RegisterLogin';
import Homepage from './components/Homepage';
import { isAuthenticated } from './helpers/authenticationHelper';

function App() {
  const [isAuthed, setIsAuthed] = useState(isAuthenticated());

  return (
    <Box p={4}>
      <Box pb={4}>
        <Typography variant="h3">Welcome to IIAAS</Typography>
      </Box>
      {isAuthed && (
        <Homepage setIsAuthed={setIsAuthed} />
      )}
      {!isAuthed && (
        <RegisterLogin setIsAuthed={setIsAuthed} />
      )}
    </Box>
  );
}

export default App;
