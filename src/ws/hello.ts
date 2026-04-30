/**
 * Cliente → servidor: primeira mensagem após abrir socket. Autentica o
 * satélite via `deviceToken` (string opaca, hash SHA-256 conferido contra
 * tabela de pareamento no backend).
 */
export interface WsHelloMessage {
  type: 'hello';
  deviceToken: string;
}
