import type { ReleaseInfo } from '../release/release-info';
/**
 * Servidor → cliente: enviado imediatamente após `hello` válido. Carrega
 * identidade do terminal, versão do protocolo, e (opcionalmente) a última
 * release aplicável ao satélite — para que clientes que estavam offline
 * durante uma publicação façam catch-up no boot.
 *
 * `latestRelease` ausente OU `null` quando não há nenhuma release publicada
 * ainda OU quando a última release não é mais nova que a versão atual.
 */
export interface WsWelcomeMessage {
    type: 'welcome';
    terminalId: string;
    protocolVersion: string;
    latestRelease?: ReleaseInfo | null;
}
//# sourceMappingURL=welcome.d.ts.map