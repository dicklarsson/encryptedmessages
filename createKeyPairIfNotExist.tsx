import * as Crypto from "./crypto";

export async function createKeyPairIfNotExist(setPrivateKey, setPublicKey) {
  let jwkKeys = null;
  const LOCAL_STORAGE_ITEM_NAME = "JWK_KEYS";
  //Step 1 check if we already have a derived key in local storage
  try {
    const json = localStorage.getItem(LOCAL_STORAGE_ITEM_NAME);
    jwkKeys = JSON.parse(json);
  } catch (e) {}

  //Step 2, if needed, create derived key and store in local storage
  if (!jwkKeys) {
    const masterKey = await Crypto.generateKeyPair();
    jwkKeys = {
      publicKeyJwk: masterKey.publicKeyJwk,
      privateKeyJwk: masterKey.privateKeyJwk,
    };

    const json = JSON.stringify(jwkKeys);
    localStorage.setItem(LOCAL_STORAGE_ITEM_NAME, json);
  }

  setPrivateKey(jwkKeys.privateKeyJwk);
  setPublicKey(jwkKeys.publicKeyJwk);
}
