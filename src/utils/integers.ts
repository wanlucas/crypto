import { randomBytes } from 'crypto';

export const generate_prime = (bitLength: number): bigint => {
  const byteLength = Math.ceil(bitLength / 8);

  while (true) {  
    const randomBuffer = randomBytes(byteLength);
    let candidate = BigInt('0x' + randomBuffer.toString('hex'));
    const mask = (1n << BigInt(bitLength)) - 1n;
    
    candidate = candidate & mask;

    if (candidate <= 2n) continue;

    if (candidate % 2n === 0n) continue

    if (is_prime(candidate)) return candidate;  
  }
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