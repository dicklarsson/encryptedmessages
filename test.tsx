import * as encryptedMessageFromJSON from "./mock/messageFromAliceToBob.json";

import * as bob from "./keys/bob.json";

import * as alice from "./keys/alice.json";

import * as Crypto from "./crypto";

//Async because all operations in web crypto are asynchronous
async function test() {
  /*
    
    OK we have a message from Alice to Bob stored in a JSON file
    
    TO be able to decrypt the message we need to derive a key using
    the PUBLIC key of Alice and the PRIVATE key of Bob
    
    Lets do it.
    */

  console.log("From JSON", encryptedMessageFromJSON);

  const derivedKey = await Crypto.deriveKey(
    alice.publicKeyJwk,
    bob.privateKeyJwk
  );

  console.log("DerivedKey", derivedKey);

  //Note JSON cannot handle byte arrays so we store a copy of the initalizationVector
  //as string, we need to use TextEncoder to convert it to byte array
  const initializationVector = new TextEncoder().encode(
    encryptedMessageFromJSON.initializationVectorAsString
  );

  const plainText = await Crypto.decrypt(
    encryptedMessageFromJSON.base64Data,
    initializationVector,
    derivedKey
  );

  console.table(plainText);
  document.getElementById("message").innerText = plainText;
}

test();
