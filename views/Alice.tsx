import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import * as React from "react";
import * as Crypto from "../crypto";

import bobsKeys from "../keys/bob.json";
import alicesKeys from "../keys/alice.json";

interface IProps {
  addMessage(string): void;
}
export default function Alice({ addMessage }: IProps) {
  const [message, setMessage] = React.useState("");
  return (
    <div>
      <Typography variant="h3" component="div" style={{ marginTop: "20px" }}>
        Alice writes messages to Bob
      </Typography>

      <textarea
        className="textarea"
        onChange={(event) => setMessage(event.target.value)}
      ></textarea>
      <Button
        variant="outlined"
        onClick={async (event) => {
          //Use Alice private key and Bobs public key
          const derivedKey = await Crypto.deriveKey(
            bobsKeys.publicKeyJwk,
            alicesKeys.privateKeyJwk
          );
          const encrypted = await Crypto.encrypt(message, derivedKey);
          console.log("Alice encrypted mess", encrypted);
          addMessage(encrypted);
        }}
      >
        Skicka
      </Button>
    </div>
  );
}
