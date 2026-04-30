/**
 * Razões pelas quais um dispositivo pode ser revogado. Determina UX no
 * cliente (mensagem mostrada antes do socket fechar).
 */
export type DeviceRevokedReason =
  | 'unpaired_by_user'
  | 'unpaired_by_admin'
  | 'force_revoked_by_admin';

/**
 * Servidor → cliente: notifica que o dispositivo foi descadastrado. Após
 * receber esta mensagem, o cliente DEVE encerrar a sessão local (limpar
 * deviceToken, voltar à tela de pareamento) e o servidor fechará o socket
 * em seguida (close code 4003).
 */
export interface WsDeviceRevokedMessage {
  type: 'device.revoked';
  reason: DeviceRevokedReason;
  revokedBy: { userId: string; email: string };
  revokedAt: string;
}
