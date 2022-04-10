import { Typography } from "@mui/material";
import * as React from "react";
import * as Crypto from "../crypto";

import * as bobKeys from "../keys/bob.json";
import * as alicesKeys from "../keys/alice.json";

export default function Bob({ listOfEncryptedMessages }) {
  const [bobsDerivedKey, setBobsDerivedKey] = React.useState(null);
  const [messagesInPlainText, setMessagesInPlainText] = React.useState([]);

  /*
    - Derive a key using Alice public key and Bobs private key
    - Decrypt each message in "listOfEncryptedMessages" 
        and store them in "messagesInPlainText"
  */
  React.useEffect(() => {
    async function work() {
      //To decrypt, use Alices public key and Bobs private key
      const derivedKey = await Crypto.deriveKey(
        alicesKeys.publicKeyJwk,
        bobKeys.privateKeyJwk
      );
      setBobsDerivedKey(derivedKey);

      const temp = [];
      listOfEncryptedMessages.map(async (message) => {
        const plainText = await Crypto.decrypt(
          message.base64Data,
          message.initializationVector,
          derivedKey
        );
        setMessagesInPlainText(temp);
        temp.push(plainText);
      });
    }
    work();
  }, []);

  if (!bobsDerivedKey) {
    return <div>Nothing to see</div>;
  }
  return (
    <div>
      <Typography variant="h4">
        Bob reads encrypted messages from Alice
      </Typography>

      {messagesInPlainText.map(function (message, index) {
        const encrypted = listOfEncryptedMessages[index];
        return (
          <Message
            key={index}
            messagePlainText={message}
            messageEncrypted={encrypted}
          />
        );
      })}
    </div>
  );
}
function Message({ messagePlainText, messageEncrypted }): JSX.Element {
  return (
    <div className="message">
      <Typography variant="h6">Message decrypted, as plain text.</Typography>
      <div style={{ background: "white", padding: "20px" }}>
        {messagePlainText}
      </div>
      <div>
        <Typography variant="h6">Message as encrypted text</Typography>
        <div>
          <pre>{JSON.stringify(messageEncrypted, null, 4)}</pre>
        </div>
      </div>
    </div>
  );
}
