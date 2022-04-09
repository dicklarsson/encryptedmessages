import { badgeClasses } from "@mui/material";
import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";

import * as crypto from "./crypto";
const container = document.getElementById("app");
const root = createRoot(container);
//root.render(<App />);

async function bla() {
  //Generate key pair
  const keyPair = await crypto.generateKeyPair();

  //Generate derived key
  const derivedKey = await crypto.deriveKey(
    keyPair.publicKeyJwk,
    keyPair.privateKeyJwk
  );
  console.log("DerivedKey", derivedKey);

  const text = "Elis Presley is alive";
  const encrypted = await crypto.encrypt(text, derivedKey);

  console.log("ENCODED TEXT", encrypted);

  const decrypted = await crypto.decrypt(
    encrypted.base64Data,
    encrypted.initializationVector,
    derivedKey
  );

  console.log("DECRYPTED", decrypted);
}
bla();
