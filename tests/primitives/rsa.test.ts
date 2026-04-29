import { describe, it, expect } from 'vitest';
import { generateRSAKeys, encryptRSA, decryptRSA } from '../../src/primitives/rsa';

describe('Primitivas RSA', () => {
  describe('generateRSAKeys', () => {
    it('deve gerar um par de chaves RSA válido', () => {
      const keys = generateRSAKeys();
      expect(keys).toHaveProperty('publicKey');
      expect(keys).toHaveProperty('privateKey');
      expect(keys.publicKey).toHaveProperty('e');
      expect(keys.publicKey).toHaveProperty('n');
      expect(keys.privateKey).toHaveProperty('d');
      expect(keys.privateKey).toHaveProperty('n');
    });

    it('deve gerar chaves com propriedades matemáticas corretas', () => {
      const keys = generateRSAKeys();
      const { e, n } = keys.publicKey;
      const { d } = keys.privateKey;
      expect((BigInt(e) * BigInt(d)) % BigInt(1)).toBe(BigInt(0));
    });
  });

  describe('encryptRSA', () => {
    it('deve criptografar uma mensagem com chave pública', () => {
      const keys = generateRSAKeys();
      const message = 42n;
      const ciphertext = encryptRSA(message, keys.publicKey);
      expect(typeof ciphertext).toBe('bigint');
      expect(ciphertext).not.toBe(message);
    });

    it('deve falhar para mensagem >= n', () => {
      const keys = generateRSAKeys();
      const largeMessage = keys.publicKey.n;
      expect(() => encryptRSA(largeMessage, keys.publicKey)).toThrow();
    });

    it('deve lidar com caso extremo: mensagem = 0', () => {
      const keys = generateRSAKeys();
      const ciphertext = encryptRSA(0n, keys.publicKey);
      expect(ciphertext).toBe(0n);
    });
  });

  describe('decryptRSA', () => {
    it('deve descriptografar ciphertext de volta para mensagem original', () => {
      const keys = generateRSAKeys();
      const originalMessage = 123n;
      const ciphertext = encryptRSA(originalMessage, keys.publicKey);
      const decrypted = decryptRSA(ciphertext, keys.privateKey);
      expect(decrypted).toBe(originalMessage);
    });

    it('deve falhar com chave privada errada', () => {
      const keys1 = generateRSAKeys();
      const keys2 = generateRSAKeys();
      const message = 456n;
      const ciphertext = encryptRSA(message, keys1.publicKey);
      expect(() => decryptRSA(ciphertext, keys2.privateKey)).toThrow();
    });

    it('deve lidar com descriptografia de 0', () => {
      const keys = generateRSAKeys();
      const ciphertext = encryptRSA(0n, keys.publicKey);
      const decrypted = decryptRSA(ciphertext, keys.privateKey);
      expect(decrypted).toBe(0n);
    });
  });
});