import bigints, { modInverse } from "../utils/bigints";

export interface RSAPublicKey {
  e: bigint;
  n: bigint;
}

export interface RSAPrivateKey {
  d: bigint;
  n: bigint;
}

export interface RSAKeyPair {
  publicKey: RSAPublicKey;
  privateKey: RSAPrivateKey;
}

export function generateRSAKeys(): RSAKeyPair {
  const p = bigints.generate_prime(512), q = bigints.generate_prime(512);
  const n = p * q;
  const phi = (p - 1n) * (q - 1n);
  let e = bigints.random_number(3n, phi - 1n);

  while (bigints.gcd(e, phi) !== 1n) {
    e = bigints.random_number(3n, phi - 1n);
  }

  const d = bigints.modInverse(e, phi);

  return {
    publicKey: { e, n },
    privateKey: { d, n }
  }

}

export function encryptRSA(message: bigint, publicKey: RSAPublicKey): bigint {
  throw new Error("Not implemented");
}

export function decryptRSA(ciphertext: bigint, privateKey: RSAPrivateKey): bigint {
  throw new Error("Not implemented");
}