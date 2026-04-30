import { expectAssignable, expectError, expectType } from 'tsd';

import type {
  ReleaseInfo,
  SatelliteKind,
  WireSatelliteKind,
  WsAppReleasePublishedMessage,
  WsClientMessage,
  WsDeviceRevokedMessage,
  WsHelloMessage,
  WsServerMessage,
  WsWelcomeMessage,
} from '../src';
import { fromWireSatelliteKind, toWireSatelliteKind } from '../src';

// SatelliteKind: aceita exatamente 3 valores
expectAssignable<SatelliteKind>('EMPORION');
expectAssignable<SatelliteKind>('PRINT_SERVER');
expectAssignable<SatelliteKind>('HORUS');
expectError<SatelliteKind>('POS_EMPORION');
expectError<SatelliteKind>('PUNCH_AGENT');
expectError<SatelliteKind>('UNKNOWN');

// WireSatelliteKind: aceita exatamente os 3 valores históricos
expectAssignable<WireSatelliteKind>('POS_EMPORION');
expectAssignable<WireSatelliteKind>('PRINT_SERVER');
expectAssignable<WireSatelliteKind>('PUNCH_AGENT');
expectError<WireSatelliteKind>('EMPORION');
expectError<WireSatelliteKind>('HORUS');

// Mappers preservam tipo
expectType<WireSatelliteKind>(toWireSatelliteKind('EMPORION'));
expectType<SatelliteKind>(fromWireSatelliteKind('POS_EMPORION'));

// ReleaseInfo: shape obrigatório
declare const release: ReleaseInfo;
expectType<SatelliteKind>(release.kind);
expectType<string>(release.version);
expectType<string>(release.downloadUrl);
expectType<string>(release.sha256);
expectType<string | null>(release.releaseNotes);
expectType<boolean>(release.isCritical);
expectType<string>(release.releasedAt);

// WsAppReleasePublishedMessage: estende ReleaseInfo + type literal
declare const appReleasePublished: WsAppReleasePublishedMessage;
expectType<'app.release.published'>(appReleasePublished.type);
expectAssignable<ReleaseInfo>(appReleasePublished);

// WsServerMessage: discriminada por type
declare const serverMsg: WsServerMessage;
if (serverMsg.type === 'welcome') {
  expectType<WsWelcomeMessage>(serverMsg);
} else if (serverMsg.type === 'heartbeat-ack') {
  expectAssignable<{ type: 'heartbeat-ack' }>(serverMsg);
} else if (serverMsg.type === 'app.release.published') {
  expectType<WsAppReleasePublishedMessage>(serverMsg);
} else if (serverMsg.type === 'device.revoked') {
  expectType<WsDeviceRevokedMessage>(serverMsg);
}

// WsClientMessage: discriminada por type
declare const clientMsg: WsClientMessage;
if (clientMsg.type === 'hello') {
  expectType<WsHelloMessage>(clientMsg);
  expectType<string>(clientMsg.deviceToken);
} else if (clientMsg.type === 'heartbeat') {
  expectAssignable<{ type: 'heartbeat' }>(clientMsg);
}

// Welcome: latestRelease é opcional
declare const welcome: WsWelcomeMessage;
expectType<ReleaseInfo | null | undefined>(welcome.latestRelease);
