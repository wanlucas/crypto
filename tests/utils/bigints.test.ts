import { describe, it, expect } from 'vitest';
import bigints from '../../src/utils/bigints';

describe('Utilitários de BigInts', () => {
  describe('is_prime', () => {
    it('deve retornar false para números menores ou iguais a 1', () => {
      expect(bigints.is_prime(0n)).toBe(false);
      expect(bigints.is_prime(1n)).toBe(false);
      expect(bigints.is_prime(-7n)).toBe(false);
    });

    it('deve reconhecer 2 e 3 como números primos', () => {
      expect(bigints.is_prime(2n)).toBe(true);
      expect(bigints.is_prime(3n)).toBe(true);
    });

    it('deve retornar false para números pares maiores que 2', () => {
      expect(bigints.is_prime(4n)).toBe(false);
      expect(bigints.is_prime(100n)).toBe(false);
    });

    it('deve retornar true para primos pequenos conhecidos', () => {
      expect(bigints.is_prime(5n)).toBe(true);
      expect(bigints.is_prime(13n)).toBe(true);
      expect(bigints.is_prime(97n)).toBe(true);
    });

    it('deve retornar false para números compostos pequenos', () => {
      expect(bigints.is_prime(9n)).toBe(false);
      expect(bigints.is_prime(21n)).toBe(false);
      expect(bigints.is_prime(49n)).toBe(false);
    });

    it('deve funcionar com números maiores passando por teste de divisores ímpares', () => {
      expect(bigints.is_prime(7919n)).toBe(true);
      expect(bigints.is_prime(7920n)).toBe(false);
    });
  });

  describe('are_coprime', () => {
    it('deve retornar true para números coprimos clássicos', () => {
      expect(bigints.are_coprime(3n, 5n)).toBe(true);
      expect(bigints.are_coprime(7n, 11n)).toBe(true);
      expect(bigints.are_coprime(9n, 16n)).toBe(true);
    });

    it('deve retornar false quando números compartilham fator comum', () => {
      expect(bigints.are_coprime(4n, 6n)).toBe(false);
      expect(bigints.are_coprime(12n, 18n)).toBe(false);
      expect(bigints.are_coprime(15n, 25n)).toBe(false);
    });

    it('deve retornar true quando um dos números é 1', () => {
      expect(bigints.are_coprime(1n, 5n)).toBe(true);
      expect(bigints.are_coprime(100n, 1n)).toBe(true);
    });

    it('deve retornar false para o mesmo número (exceto 1)', () => {
      expect(bigints.are_coprime(5n, 5n)).toBe(false);
      expect(bigints.are_coprime(13n, 13n)).toBe(false);
    });

    it('deve retornar true para dois números primos diferentes', () => {
      expect(bigints.are_coprime(2n, 3n)).toBe(true);
      expect(bigints.are_coprime(13n, 17n)).toBe(true);
    });

    it('deve ser comutativo (a, b = b, a)', () => {
      expect(bigints.are_coprime(12n, 35n)).toBe(bigints.are_coprime(35n, 12n));
      expect(bigints.are_coprime(8n, 15n)).toBe(bigints.are_coprime(15n, 8n));
    });

    it('deve funcionar com números maiores', () => {
      expect(bigints.are_coprime(65537n, 3233n)).toBe(true);
      expect(bigints.are_coprime(1000n, 1001n)).toBe(true);
    });
  });

  describe('gcd', () => {
    it('deve retornar o mdc correto para pares conhecidos', () => {
      expect(bigints.gcd(12n, 18n)).toBe(6n);
      expect(bigints.gcd(48n, 18n)).toBe(6n);
    });

    it('deve retornar 1 para números coprimos', () => {
      expect(bigints.gcd(5n, 7n)).toBe(1n);
      expect(bigints.gcd(9n, 16n)).toBe(1n);
    });

    it('deve retornar o próprio número quando b é zero', () => {
      expect(bigints.gcd(5n, 0n)).toBe(5n);
    });

    it('deve retornar o menor número quando um divide o outro', () => {
      expect(bigints.gcd(10n, 5n)).toBe(5n);
      expect(bigints.gcd(100n, 25n)).toBe(25n);
    });
  });
});
