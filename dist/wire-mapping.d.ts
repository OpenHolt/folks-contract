import type { SatelliteKind } from './satellite-kind';
/**
 * Wire format histórico (DB Prisma enum + WS payloads em produção até a
 * migração SAT-RELEASE-05). NÃO usar diretamente em código novo — preferir
 * `SatelliteKind` do contract e converter na borda I/O via os helpers
 * abaixo.
 */
export declare const WIRE_SATELLITE_KINDS: readonly ["POS_EMPORION", "PRINT_SERVER", "PUNCH_AGENT"];
export type WireSatelliteKind = (typeof WIRE_SATELLITE_KINDS)[number];
export declare const WIRE_BY_KIND: Record<SatelliteKind, WireSatelliteKind>;
export declare const KIND_BY_WIRE: Record<WireSatelliteKind, SatelliteKind>;
export declare function toWireSatelliteKind(kind: SatelliteKind): WireSatelliteKind;
export declare function fromWireSatelliteKind(wire: WireSatelliteKind): SatelliteKind;
//# sourceMappingURL=wire-mapping.d.ts.map