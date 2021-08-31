import { useState } from "react";
import { Box, TextField, Typography, Button } from "@material-ui/core";
import axios from "axios";
import { isAuthenticated, isValidEmail, isValidPassword } from '../helpers/authenticationHelper';

function RegisterLogin(props) {
  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const apiHost = process.env.REACT_APP_API_HOST || 'localhost';
  const apiPort = process.env.REACT_APP_API_PORT || '5000';

  const loginOrRegisterUser = async (action) => {
    if (!isValidEmail(email)) {
      setError("Email is invalid, please enter a valid email address.");
      return;
    }

    if (!isValidPassword(password)) {
      setError("Password must be at least 5 characters in length.");
      return;
    }

    const response = await axios.post(
      `http://${apiHost}:${apiPort}/v1/${action}`,
      {
        data: {
          email,
          password
        }
      },
      {
        headers: {
          "Content-Type": "application/vnd.api+json",
          "Accept": "application/vnd.api+json"
        },
      }
    );

    if (!response || !response.data) {
      return;
    }

    const { data } = response.data;

    sessionStorage.setItem('jwt', data.attributes.value);
    props.setIsAuthed(isAuthenticated());
  };

  return (
    <>
      <Box pb={2}>
        {!isLogin && <Typography variant="h5">Register</Typography>}
        {isLogin && <Typography variant="h5">Login</Typography>}
      </Box>
      <Box pb={2}>
        <TextField
          type="text"
          name="email"
          label="Email"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
          variant="outlined"
          value={email}
          fullWidth={true}
          placeholder="email@example.com"
        />
      </Box>
      <Box pb={2}>
        <TextField
          type="password"
          name="password"
          label="Password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          variant="outlined"
          value={password}
          fullWidth={true}
          placeholder="***********"
        />
      </Box>
      <Box display="flex" justifyContent="space-between">
        <Button
          variant="outlined"
          component="label"
          size="medium"
          color="primary"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin && <Typography>Register an account</Typography>}
          {!isLogin && (
            <Typography>Already registered, login instead</Typography>
          )}
        </Button>
        <Button
          variant="outlined"
          component="label"
          size="medium"
          color="primary"
          onClick={() => {
            const action = isLogin ? 'login' : 'register';
            loginOrRegisterUser(action);
          }}
        >
          {isLogin && <Typography>Login</Typography>}
          {!isLogin && <Typography>Register</Typography>}
        </Button>
      </Box>
      <Box pt={2}>
        <Typography>{error}</Typography>
      </Box>
    </>
  );
}

export default RegisterLogin;
