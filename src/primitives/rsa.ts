import bigints from "../utils/bigints";

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

export function generateRSAKeys(bit_length: number = 32): RSAKeyPair {
  const p = bigints.generate_prime(bit_length), q = bigints.generate_prime(bit_length);
  const phi = (p - 1n) * (q - 1n);
  let e = 65537n; // primo geralmente utilizado para otimização

  while (bigints.gcd(e, phi) !== 1n) {
    // caso não seja co-primo de phi, aí sim tenta gerar aleatoriamente
    e = bigints.random_number(3n, phi - 1n);
  }

  const [, x] = bigints.extended_gcd(e, phi);
  const d = (x % phi + phi) % phi;
  const n = p * q;

  return {
    publicKey: { e, n },
    privateKey: { d, n }
  };
}

export function encryptRSA(message: bigint, publicKey: RSAPublicKey): bigint {
  throw new Error("Not implemented");
}

export function decryptRSA(
  ciphertext: bigint,
  privateKey: RSAPrivateKey,
): bigint {
  throw new Error("Not implemented");
}
