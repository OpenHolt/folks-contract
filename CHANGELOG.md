# Changelog

Este arquivo documenta as versões publicadas de `@openholt/satellite-contract`.

Formato: cada versão lista a data e as mudanças. Breaking changes são
marcadas com **BREAKING**.

## v0.1.0 — 2026-04-30

Skeleton inicial. Nenhum consumer adota nesta versão; serve como base
sobre a qual SAT-RELEASE-06 (kind-filtered WS event) e SAT-CONTRACT-02
(adoção pelos satélites e pelo backend) vão construir.

### Added

- `SatelliteKind` type (`'EMPORION' | 'PRINT_SERVER' | 'HORUS'`) +
  `SATELLITE_KINDS` const.
- `WireSatelliteKind` type (`'POS_EMPORION' | 'PRINT_SERVER' | 'PUNCH_AGENT'`) +
  `WIRE_SATELLITE_KINDS` const — wire format histórico em produção.
- `toWireSatelliteKind` / `fromWireSatelliteKind` mappers + tabelas
  `WIRE_BY_KIND` / `KIND_BY_WIRE`.
- `ReleaseInfo` interface (kind, version, downloadUrl, sha256, releaseNotes,
  isCritical, releasedAt).
- WS messages: `WsHelloMessage`, `WsHeartbeatMessage`,
  `WsHeartbeatAckMessage`, `WsWelcomeMessage`, `WsAppReleasePublishedMessage`
  (extends `ReleaseInfo`), `WsDeviceRevokedMessage`, `DeviceRevokedReason`.
- Discriminated unions `WsServerMessage` (welcome | heartbeat-ack |
  app.release.published | device.revoked) e `WsClientMessage` (hello |
  heartbeat).
- Build via `tsc` (CJS); `dist/` committed no repo (sem `prepare` script).
- `exports` map para forward-compat com ESM futuro.
- `files` whitelist excluindo source/tests do tarball.
- CI: typecheck + build + diff check + vitest + tsd.

### Notes

- `dist/` é commitado intencionalmente — install via git URL serve o
  artefato direto, sem depender de toolchain no consumer.
- Os nomes do contract (`EMPORION`/`HORUS`) divergem do wire atual
  (`POS_EMPORION`/`PUNCH_AGENT`); use os mappers para conversão até a
  migração SAT-RELEASE-05.
