"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SATELLITE_KINDS = void 0;
/**
 * Nomes canônicos dos satélites do ecossistema OpenSea ERP.
 *
 * IMPORTANT: Estes valores são os **nomes do contract** (target/aspirational
 * state). O wire format atual em produção (Emporion v0.5.0+, API até
 * SAT-RELEASE-05) usa nomes diferentes: 'POS_EMPORION' e 'PUNCH_AGENT'.
 * Use {@link toWireSatelliteKind} / {@link fromWireSatelliteKind} (em
 * `wire-mapping.ts`) para traduzir entre os dois.
 */
exports.SATELLITE_KINDS = ['EMPORION', 'PRINT_SERVER', 'HORUS'];
//# sourceMappingURL=satellite-kind.js.map