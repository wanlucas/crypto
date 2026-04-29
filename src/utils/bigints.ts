import { randomBytes } from 'crypto';

export const generate_prime = (bitLength: number): bigint => {
  const byte_length = Math.ceil(bitLength / 8);

  while (true) {  
    const random_buffer = randomBytes(byte_length);
    let candidate = BigInt('0x' + random_buffer.toString('hex'));
    const mask = (1n << BigInt(bitLength)) - 1n;
    candidate = candidate & mask;

    if (candidate <= 2n) continue;
    if (candidate % 2n === 0n) continue
    if (is_prime(candidate)) return candidate;  
  }
};

export const random_number = (min: bigint, max: bigint): bigint => {
  const range = max - min;
  const byte_length = Math.ceil(range.toString(2).length / 8);
  const random_buffer = randomBytes(byte_length);
  const random_number = BigInt('0x' + random_buffer.toString('hex'));

  return min + (random_number % range);
};

export const is_prime = (n: bigint): boolean => {
  if (n <= 1n) return false;
  if (n === 2n || n === 3n) return true;
  if (n % 2n === 0n) return false;
  for (let i = 3n; i * i <= n; i += 2n) {
    if (n % i === 0n) return false;
  }

  return true;
};

export const gcd = (a: bigint, b: bigint): bigint => {
  return b === 0n ? a : gcd(b, a % b);
};

export const are_coprime = (a: bigint, b: bigint): boolean => {
  return gcd(a, b) === 1n;
};

const extendedGcd = (
  a: bigint,
  b: bigint
): [bigint, bigint, bigint] => {
  if (b === 0n) {
    return [a, 1n, 0n];
  }

  const [g, x1, y1] = extendedGcd(b, a % b);

  const x = y1;
  const y = x1 - (a / b) * y1;

  return [g, x, y];
};

export const modInverse = (e: bigint, phi: bigint): bigint => {
  const [g, x] = extendedGcd(e, phi);

  if (g !== 1n) {
    throw new Error("Inverse does not exist");
  }

  return (x % phi + phi) % phi;
};

export default {
  generate_prime,
  random_number,
  is_prime,
  are_coprime,
  gcd,
  modInverse,
}