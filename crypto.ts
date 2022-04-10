/**
 * @author Dick Henrik Larsson <dicklarsson@gmail.com>
 *
 * Most of the code comes from this wonderful blog entry
 * https://getstream.io/blog/web-crypto-api-chat/
 * by "Matheus C"
 */
export const generateKeyPair = async () => {
  const keyPair = await window.crypto.subtle.generateKey(
    {
      name: "ECDH",
      namedCurve: "P-256",
    },
    true,
    ["deriveKey", "deriveBits"]
  );

  const publicKeyJwk = await window.crypto.subtle.exportKey(
    "jwk",
    keyPair.publicKey
  );

  const privateKeyJwk = await window.crypto.subtle.exportKey(
    "jwk",
    keyPair.privateKey
  );

  return { publicKeyJwk, privateKeyJwk };
};

export const deriveKey = async (publicKeyJwk, privateKeyJwk) => {
  const publicKey = await window.crypto.subtle.importKey(
    "jwk",
    publicKeyJwk,
    {
      name: "ECDH",
      namedCurve: "P-256",
    },
    true,
    []
  );

  const privateKey = await window.crypto.subtle.importKey(
    "jwk",
    privateKeyJwk,
    {
      name: "ECDH",
      namedCurve: "P-256",
    },
    true,
    ["deriveKey", "deriveBits"]
  );

  return await window.crypto.subtle.deriveKey(
    { name: "ECDH", public: publicKey },
    privateKey,
    { name: "AES-GCM", length: 256 },
    true,
    ["encrypt", "decrypt"]
  );
};

export const encrypt = async (text, derivedKey) => {
  const encodedText = new TextEncoder().encode(text);

  //TOD Math.rando is not secure enough for production
  //Works well for demo
  const initializationVectorAsString = "" + Math.random();
  const initializationVector = new TextEncoder().encode(
    initializationVectorAsString
  );

  const encryptedData = await window.crypto.subtle.encrypt(
    { name: "AES-GCM", iv: initializationVector },
    derivedKey,
    encodedText
  );

  const uintArray = new Uint8Array(encryptedData);

  const string = String.fromCharCode.apply(null, uintArray);

  const base64Data = btoa(string);

  const obj = {
    base64Data,
    initializationVector,
    initializationVectorAsString,
  };
  console.log("OBJ", obj);
  return obj;
};

export const decrypt = async (base64Text, iv, derivedKey) => {
  try {
    const initializationVector = new Uint8Array(iv).buffer;

    const string = atob(base64Text);
    const uintArray = new Uint8Array(
      [...string].map((char) => char.charCodeAt(0))
    );
    const algorithm = {
      name: "AES-GCM",
      iv: initializationVector,
    };
    const decryptedData = await window.crypto.subtle.decrypt(
      algorithm,
      derivedKey,
      uintArray
    );

    return new TextDecoder().decode(decryptedData);
  } catch (e) {
    console.log("ERROR");
    console.dir(e);
    return `error decrypting message: ${e}`;
  }
};
