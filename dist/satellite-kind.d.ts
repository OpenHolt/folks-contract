/**
 * Nomes canônicos dos satélites do ecossistema OpenSea ERP.
 *
 * IMPORTANT: Estes valores são os **nomes do contract** (target/aspirational
 * state). O wire format atual em produção (Emporion v0.5.0+, API até
 * SAT-RELEASE-05) usa nomes diferentes: 'POS_EMPORION' e 'PUNCH_AGENT'.
 * Use {@link toWireSatelliteKind} / {@link fromWireSatelliteKind} (em
 * `wire-mapping.ts`) para traduzir entre os dois.
 */
export declare const SATELLITE_KINDS: readonly ["EMPORION", "PRINT_SERVER", "HORUS"];
export type SatelliteKind = (typeof SATELLITE_KINDS)[number];
//# sourceMappingURL=satellite-kind.d.ts.map