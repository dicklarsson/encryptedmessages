import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import * as React from "react";

import * as Crypto from "../crypto";
export function UpdateWallet({ privateKey, publicKey }) {
  const [privateKeyJwk, setPrivateKeyJwk] = React.useState(null);
  const [publicKeyJwk, setPublicKeyJwk] = React.useState(null);

  React.useEffect(() => {
    const promise = Crypto.generateKeyPair();
    promise.then((masterKey) => {
      setPrivateKeyJwk(masterKey.privateKeyJwk);
      setPublicKeyJwk(masterKey.publicKeyJwk);
    });
  }, []);
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
        <pre>{JSON.stringify(privateKeyJwk, null, 4)}</pre>{" "}
        <Typography variant="h6">Public key</Typography>
        <pre>{JSON.stringify(publicKeyJwk, null, 4)}</pre>
      </Box>
    </div>
  );
}
