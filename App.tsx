import { Typography } from "@mui/material";
import React from "react";
import { createKeyPairIfNotExist } from "./createKeyPairIfNotExist";
import { Home } from "./views/Home";
import { Navigator } from "./Navigator";
import { Routes } from "./Routes";
import { UpdateWallet } from "./views/UpdateWallet";
import Alice from "./views/Alice";
import Bob from "./views/Bob";
export function App() {
  const [privateKey, setPrivateKey] = React.useState("");
  const [publicKey, setPublicKey] = React.useState("");
  const [messageList, setMessageList] = React.useState([]);

  const [route, setRoute] = React.useState(Routes.ALICE);

  React.useEffect(() => {
    createKeyPairIfNotExist(setPrivateKey, setPublicKey);
  }, []);

  return (
    <div>
      <Typography variant="h3" component="h1">
        Encrypted text messages
      </Typography>
      <Navigator
        route={route}
        setRoute={setRoute}
        numberOfMessages={messageList.length}
      />
      {route === Routes.WALLET && (
        <UpdateWallet privateKey={privateKey} publicKey={publicKey} />
      )}
      Antal meddelanden {messageList.length}
      {route === Routes.HOME && (
        <Home privateKey={privateKey} publicKey={publicKey} />
      )}
      {route === Routes.ALICE && (
        <Alice
          addMessage={(str) => {
            //Need a new array since React state is by REFERNCE not value
            //Need a new array reference
            const arr = [str].concat(messageList);
            setMessageList(arr);
          }}
        />
      )}
      {route === Routes.BOB && <Bob listOfEncryptedMessages={messageList} />}
    </div>
  );
}
