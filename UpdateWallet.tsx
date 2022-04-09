import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import * as React from "react";
export function UpdateWallet({ privateKey, publicKey }) {
  return (
    <div>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <Typography variant="h6">Private key</Typography>
        <pre>{JSON.stringify(privateKey, null, 4)}</pre>{" "}
        <Typography variant="h6">Public key</Typography>
        <pre>{JSON.stringify(publicKey, null, 4)}</pre>
      </Box>
    </div>
  );
}
