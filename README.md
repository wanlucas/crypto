# Criptografia Assimétrica com RSA

## Conceito Básico

A criptografia assimétrica, também conhecida como criptografia de chave pública, utiliza um par de chaves: uma **chave pública** para criptografar dados e uma **chave privada** para descriptografar. Diferente da criptografia simétrica, onde a mesma chave é usada para ambas as operações, aqui as chaves são distintas e matemáticamente relacionadas.

### Analogia Simples

Imagine uma caixa de correio com duas chaves:
- A **chave pública** é como a fechadura da caixa: qualquer um pode colocar uma carta (criptografar), mas só o dono da chave privada pode abrir e ler (descriptografar).
- A **chave privada** é mantida em segredo pelo proprietário.

## RSA: Rivest-Shamir-Adleman

O RSA é um dos algoritmos mais famosos de criptografia assimétrica, baseado na dificuldade de fatorar números grandes em seus fatores primos.

### Fórmulas Principais

1. **Geração de Chaves:**
   - Escolha dois números primos grandes: \( p \) e \( q \)
   - Calcule \( n = p \times q \) (módulo)
   - Calcule \( \phi(n) = (p-1) \times (q-1) \) (função totiente de Euler)
   - Escolha um expoente público \( e \) tal que \( 1 < e < \phi(n) \) e \( gcd(e, \phi(n)) = 1 \)
   - Calcule o expoente privado \( d \) tal que \( d \times e \equiv 1 \pmod{\phi(n)} \) (usando algoritmo de Euclides estendido)

   Chave pública: \( (e, n) \)
   Chave privada: \( (d, n) \)

2. **Criptografia:**
   - Para uma mensagem \( m \) (como número), compute \( c = m^e \mod n \)

3. **Descriptografia:**
   - Para o ciphertext \( c \), compute \( m = c^d \mod n \)

### Fluxo Passo-a-Passo

1. **Geração de Chaves:**
   - Alice gera \( p \) e \( q \) primos.
   - Calcula \( n \) e \( \phi(n) \).
   - Escolhe \( e \) e calcula \( d \).

2. **Compartilhamento:**
   - Alice publica sua chave pública \( (e, n) \).
   - Mantém \( d \) em segredo.

3. **Criptografia:**
   - Bob converte sua mensagem em número \( m \).
   - Computa \( c = m^e \mod n \).
   - Envia \( c \) para Alice.

4. **Descriptografia:**
   - Alice recebe \( c \).
   - Computa \( m = c^d \mod n \).
   - Converte \( m \) de volta para texto.

### Uso no Mundo Real

- **HTTPS/TLS:** Protege comunicações na web.
- **Assinaturas Digitais:** Verifica a autenticidade de mensagens.
- **VPNs e Email Seguro:** Como PGP.

## Arquivos de Código

- **Implementação Principal:** [src/primitives/rsa.ts](src/primitives/rsa.ts) - Contém as funções de geração de chaves, criptografia e descriptografia RSA.
- **Testes de Primitivas:** [tests/primitives/rsa.test.ts](tests/primitives/rsa.test.ts) - Testes unitários para as funções básicas.
- **Testes de Fluxo:** [tests/flows/rsa-flow.test.ts](tests/flows/rsa-flow.test.ts) - Testes de cenários reais como Alice e Bob.

### Limitações da Abordagem Simplificada

Esta implementação é puramente educacional e usa números pequenos para facilitar o entendimento. Em produção, use bibliotecas criptográficas robustas como OpenSSL ou Node.js crypto (embora este projeto evite isso).

⚠️ **Por que esta implementação NÃO é segura**

1. **Tamanho das Chaves Pequenas:** Usamos primos pequenos (ex: 61, 53), tornando \( n \) fácil de fatorar. Ataques de força bruta ou algoritmos como o de Pollard podem quebrar em segundos.

2. **Falta de Padding:** RSA puro é vulnerável a ataques como "padding oracle" ou "chosen ciphertext". Precisamos de esquemas como OAEP para criptografia e PSS para assinaturas.

3. **Sem Verificação de Primalidade Forte:** Números primos são gerados de forma simplificada; em produção, use testes probabilísticos robustos.

4. **Ataques de Tempo:** Implementações ingênuas podem vazar informações via timing attacks.

5. **Sem Gerenciamento de Chaves:** Chaves são geradas e usadas sem rotação, backup ou certificados.

6. **Vulnerabilidades Matemáticas:** Para \( n \) pequeno, ataques como Wiener's attack ou Fermat's factorization podem aplicar.

Esta versão é apenas para aprendizado; nunca use em ambientes reais!