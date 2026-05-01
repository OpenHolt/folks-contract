# `@opensea/satellite-contract`

Tipos TypeScript compartilhados entre o backend `OpenSea-API` e os satélites
desktop do ecossistema OpenSea ERP (`OpenSea-Emporion`, `OpenSea-Horus`,
`OpenSea-PrintServer`).

Elimina duplicação de definições WS event / release info / device revoke
entre N consumidores e centraliza o mapping entre nomes do **contract** e
o **wire format** atual em produção.

## Versão

**v0.1.0** — skeleton. Inclui `SatelliteKind`, `ReleaseInfo`, mensagens WS
core (hello/heartbeat/welcome/app.release.published/device.revoked), mappers
contract↔wire. Nenhum consumer ainda importa.

## Instalação

Distribuído via Git URL público (sem npm registry, sem SSH). Adicione no
`package.json` do consumer:

```json
{
  "dependencies": {
    "@opensea/satellite-contract": "git+https://github.com/OpenSea-ERP/OpenSea-Satellite-Contract.git#v0.1.0"
  }
}
```

Depois:

```bash
npm install
```

O repo é **público** (apenas TS types, zero secrets), então qualquer
ambiente — local, GitHub Actions, Fly.io, electron-builder — clona via
HTTPS sem credenciais.

### Bumpando a versão

Quando uma nova tag é publicada (`v0.2.0` etc.), edite o sufixo `#vX.Y.Z` no
`package.json` do consumer e:

```bash
npm cache clean --force
rm -rf node_modules
npm install
```

`npm` faz cache agressivo de URLs git e o sufixo de tag não é
suficiente para invalidar — daí o `cache clean`.

### Credenciais (não precisa)

O repo é público — `npm install` clona via HTTPS sem qualquer
credencial. Funciona em GitHub Actions runners limpos, electron-builder
no CI, Fly.io, dev local sem SSH key, etc.

Se precisar voltar atrás e tornar privado (ex: incluir secrets no
contract), o consumer precisaria configurar SSH key ou PAT — ver
histórico git deste arquivo pra opções.

## Uso (depois de publicado)

```ts
import {
  SATELLITE_KINDS,
  toWireSatelliteKind,
  fromWireSatelliteKind,
  type SatelliteKind,
  type WsServerMessage,
  type WsAppReleasePublishedMessage,
} from '@opensea/satellite-contract';

// SatelliteKind: 'EMPORION' | 'PRINT_SERVER' | 'HORUS' (contract names)
const myKind: SatelliteKind = 'EMPORION';

// Converter pra wire format histórico ainda em uso na API/DB
const wire = toWireSatelliteKind(myKind); // 'POS_EMPORION'

// Receber WS event e narrowing por type
function handle(msg: WsServerMessage): void {
  if (msg.type === 'app.release.published') {
    const release: WsAppReleasePublishedMessage = msg;
    if (release.kind === myKind) {
      console.log(`new ${myKind} release: ${release.version}`);
    }
  }
}
```

## Wire format vs contract names

Razão histórica: os primeiros satélites foram nomeados antes do contract
formal. Os valores atualmente em produção (DB Prisma enum, payloads WS,
secrets em CI) usam:

| Contract       | Wire (atual)    |
| -------------- | --------------- |
| `EMPORION`     | `POS_EMPORION`  |
| `PRINT_SERVER` | `PRINT_SERVER`  |
| `HORUS`        | `PUNCH_AGENT`   |

Migração para nomes do contract no wire format será SAT-RELEASE-05 (Prisma
enum migration aditiva + dual-write transitório). Até lá, este package
expõe os helpers de tradução acima.

## Desenvolvimento

```bash
# Instalar deps
npm install

# Build
npm run build

# Testes
npm run test         # vitest (wire-mapping round-trip)
npm run test:types   # tsd (type-tests; precisa de dist/ atualizado)
npm run typecheck    # tsc --noEmit

# Rebuild + commitar dist/
npm run rebuild
git add dist/
git commit -m "chore(build): refresh dist"
```

`dist/` é committed no repo — ver `CONTRIBUTING.md` pra release checklist.

## Licença

PROPRIETARY — OpenSea ERP. Uso exclusivo do ecossistema OpenSea.
