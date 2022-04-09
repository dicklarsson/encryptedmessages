import { Button, Typography } from "@mui/material";
import React from "react";
import { createKeyPairIfNotExist } from "./createKeyPairIfNotExist";
import { Navigator } from "./Navigator";
import { Routes } from "./Routes";
import { UpdateWallet } from "./UpdateWallet";

export function App() {
  const [privateKey, setPrivateKey] = React.useState("");
  const [publicKey, setPublicKey] = React.useState("");

  const [route, setRoute] = React.useState(Routes.HOME);

  React.useEffect(() => {
    createKeyPairIfNotExist(setPrivateKey, setPublicKey);
  }, []);

  return (
    <div>
      <Typography variant="h3" component="h1">
        Encrypted text messages
      </Typography>
      <Navigator route={route} setRoute={setRoute} />
      {route === Routes.WALLET && (
        <UpdateWallet privateKey={privateKey} publicKey={publicKey} />
      )}
      {route === Routes.HOME && (
        <Home privateKey={privateKey} publicKey={publicKey} />
      )}
    </div>
  );
}
function Home({ privateKey, publicKey }) {
  const [key, setKey] = React.useState("");
  const encrypt = async (message) => {
    let enc = new TextEncoder();

    const cryptoKey = null; //TODO how to convert JWK to crypto key
    const a = await window.crypto.subtle.encrypt(
      {
        name: "RSA-OAEP",
      },
      cryptoKey,
      enc.encode(message)
    );
  };
  return (
    <div>
      <Typography variant="h6">
        Päjsta in mnottagarens hela public key json
      </Typography>
      <textarea
        value={key}
        onChange={(d) => setKey(d.target.value)}
        style={{ width: "100%", height: "200px" }}
        name="key"
      ></textarea>
      <Typography variant="h6" sx={{ m: 1 }}>
        Skiv plain text
      </Typography>
      <textarea
        style={{ width: "100%", height: "200px" }}
        name="plaintext"
      ></textarea>
      <div style={{ marginTop: "50px" }}>
        <Button variant="outlined">Enkryptera</Button>
      </div>
    </div>
  );
}
