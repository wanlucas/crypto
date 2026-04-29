import { describe, it, expect } from 'vitest';
import { is_prime } from '../../src/utils/integers';

describe('Utilitários de Inteiros', () => {
  describe('is_prime', () => {
    it('deve retornar false para números menores ou iguais a 1', () => {
      expect(is_prime(0n)).toBe(false);
      expect(is_prime(1n)).toBe(false);
      expect(is_prime(-7n)).toBe(false);
    });

    it('deve reconhecer 2 e 3 como números primos', () => {
      expect(is_prime(2n)).toBe(true);
      expect(is_prime(3n)).toBe(true);
    });

    it('deve retornar false para números pares maiores que 2', () => {
      expect(is_prime(4n)).toBe(false);
      expect(is_prime(100n)).toBe(false);
    });

    it('deve retornar true para primos pequenos conhecidos', () => {
      expect(is_prime(5n)).toBe(true);
      expect(is_prime(13n)).toBe(true);
      expect(is_prime(97n)).toBe(true);
    });

    it('deve retornar false para números compostos pequenos', () => {
      expect(is_prime(9n)).toBe(false);
      expect(is_prime(21n)).toBe(false);
      expect(is_prime(49n)).toBe(false);
    });

    it('deve funcionar com números maiores passando por teste de divisores ímpares', () => {
      expect(is_prime(7919n)).toBe(true);
      expect(is_prime(7920n)).toBe(false);
    });
  });
});
