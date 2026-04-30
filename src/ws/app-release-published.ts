import type { ReleaseInfo } from '../release/release-info';

/**
 * Servidor → cliente: notifica que uma nova release foi publicada para
 * algum satélite. O campo `kind` (de `ReleaseInfo`) permite ao cliente
 * filtrar releases de outros satélites — Emporion ignora releases com
 * `kind !== 'EMPORION'`, e assim por diante.
 *
 * Recebido tanto via push em runtime quanto via reconexão (caso o
 * `welcome.latestRelease` seja mais novo que a versão atual do cliente).
 */
export interface WsAppReleasePublishedMessage extends ReleaseInfo {
  type: 'app.release.published';
}
