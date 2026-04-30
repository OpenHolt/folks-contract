import type { SatelliteKind } from '../satellite-kind';

/**
 * Metadata de uma release publicada de um satélite. Usado tanto no payload
 * do evento WS `app.release.published` quanto no campo `latestRelease` do
 * envelope `welcome` (offline catch-up).
 *
 * Campos:
 * - `kind` — tipo do satélite (contract names: EMPORION/PRINT_SERVER/HORUS).
 * - `version` — semver da release (ex: '0.5.0', '1.0.0-rc.1').
 * - `downloadUrl` — URL pública do artefato (typicamente GitHub Releases).
 * - `sha256` — hash do artefato (64 chars hex lowercase) para verificação.
 * - `releaseNotes` — markdown opcional com notas de release.
 * - `isCritical` — se true, satélite deve forçar update assim que receber.
 * - `releasedAt` — ISO 8601 string (UTC) do momento de publicação.
 */
export interface ReleaseInfo {
  kind: SatelliteKind;
  version: string;
  downloadUrl: string;
  sha256: string;
  releaseNotes: string | null;
  isCritical: boolean;
  releasedAt: string;
}
