/**
 * Cliente → servidor: ping periódico (típico ~25-30s) para manter o
 * socket vivo e permitir ao servidor detectar conexões mortas.
 */
export interface WsHeartbeatMessage {
    type: 'heartbeat';
}
/**
 * Servidor → cliente: confirmação de heartbeat recebido.
 */
export interface WsHeartbeatAckMessage {
    type: 'heartbeat-ack';
}
//# sourceMappingURL=heartbeat.d.ts.map