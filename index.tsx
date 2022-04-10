import { badgeClasses } from "@mui/material";
import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";

import * as crypto from "./crypto";
const container = document.getElementById("app");
const root = createRoot(container);
root.render(<App />);

async function test1() {
  const aliceKeyPair = await crypto.generateKeyPair();
  const bobKeyPair = await crypto.generateKeyPair();

  //Generate derived key to be used when encrypting
  //Senders private key and receivers publik key
  const derivedKeyForEncryption = await crypto.deriveKey(
    bobKeyPair.publicKeyJwk,
    aliceKeyPair.privateKeyJwk
  );
  console.log("DerivedKey", derivedKeyForEncryption);

  const text = "Elis Presley is alive";
  const encrypted = await crypto.encrypt(text, derivedKeyForEncryption);

  console.log("ENCODED TEXT", encrypted);

  //Now derive a key with the senders PUBLIC key and the receivers private key
  const derivedKey2 = await crypto.deriveKey(
    aliceKeyPair.publicKeyJwk,
    bobKeyPair.privateKeyJwk
  );
  console.log("Derived key number 2", derivedKey2);
  const decrypted = await crypto.decrypt(
    encrypted.base64Data,
    encrypted.initializationVector,
    derivedKey2
  );

  console.log("DECRYPTED", decrypted);
}
