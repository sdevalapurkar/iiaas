import axios from "axios";
import { useState, useEffect } from "react";
import { Typography, Box, Button, TextField } from '@material-ui/core';
import { isAuthenticated } from '../helpers/authenticationHelper';

function Homepage(props) {
  const [currentInteger, setCurrentInteger] = useState(0);
  const [integerResetValue, setIntegerResetValue] = useState(null);
  const [error, setError] = useState("");

  const apiHost = process.env.REACT_APP_API_HOST || 'localhost';
  const apiPort = process.env.REACT_APP_API_PORT || '5000';

  const getCurrentOrNextInteger = async (action) => {
    const response = await axios.get(`http://${apiHost}:${apiPort}/v1/${action}`, {
      headers: {
        "Content-Type": "application/vnd.api+json",
        Accept: "application/vnd.api+json",
        Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
      },
      data: {}, // so that axios does not strip out required Content-Type header
    });

    if (!response || !response.data) {
      return;
    }

    const { data } = response.data;

    setCurrentInteger(data.attributes.value);
  };

  useEffect(() => {
    getCurrentOrNextInteger("current");
  }, []);

  const resetInteger = async () => {
    if (integerResetValue < 0) {
      setError("Integer provided for reset must be non-negative.");
      return;
    }

    const response = await axios.put(
      `http://${apiHost}:${apiPort}/v1/current`,
      {
        data: {
          current: integerResetValue,
        },
      },
      {
        headers: {
          "Content-Type": "application/vnd.api+json",
          Accept: "application/vnd.api+json",
          Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
        },
      }
    );

    if (!response || !response.data) {
      return;
    }

    const { data } = response.data;

    setCurrentInteger(data.attributes.value);
  };

  const logoutUser = () => {
    sessionStorage.removeItem('jwt');
    props.setIsAuthed(isAuthenticated());
  };

  return (
    <>
      <Box pb={3} display="flex" justifyContent="space-between">
        <Typography variant="h5">Current Integer: {currentInteger}</Typography>
        <Button
          variant="outlined"
          component="label"
          size="medium"
          color="primary"
          onClick={logoutUser}
        >
          Logout
        </Button>
      </Box>
      <Box pb={3}>
        <Button
          variant="outlined"
          component="label"
          size="medium"
          color="primary"
          onClick={() => getCurrentOrNextInteger("next")}
        >
          Get Next Integer in Sequence
        </Button>
      </Box>
      <Box pb={3}>
        <TextField
          type="number"
          name="integer"
          label="Reset Integer"
          id="integer"
          onChange={(e) => setIntegerResetValue(e.target.value)}
          variant="outlined"
          value={integerResetValue}
          fullWidth={true}
          placeholder="60"
          helperText="Must be a non-negative integer."
        />
      </Box>
      <Box>
        <Button
          variant="outlined"
          component="label"
          size="medium"
          color="primary"
          onClick={resetInteger}
        >
          Reset Integer
        </Button>
      </Box>
      <Box pt={2}>
        <Typography>{error}</Typography>
      </Box>
    </>
  );
}

export default Homepage;
