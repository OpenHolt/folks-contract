# Contributing

## Workflow geral

1. Branch direto em `main` (sempre — projeto pequeno, sem feature branches).
2. PR opcional — para mudanças não-triviais é bom ter o CI rodando antes do
   merge. Para skeleton, commits diretos em `main` são aceitos.
3. CI roda em todo push: typecheck + build + diff check + tests + tsd.

## Release checklist

Para publicar uma nova versão (ex: `v0.2.0`):

```
- [ ] Source code está pronto, tests verdes localmente
- [ ] Bump em package.json: "version": "0.2.0"
- [ ] Update CHANGELOG.md com entry da versão (data, mudanças, breaking)
- [ ] Rebuild: `npm run rebuild`
- [ ] Diff check: `git status` — confirmar que dist/ tem mudanças OU está em sync
- [ ] Commit: `git add . && git commit -m "chore(release): v0.2.0"`
- [ ] Push: `git push origin main` (aguardar CI verde)
- [ ] Tag annotated: `git tag -a v0.2.0 -m "v0.2.0 — <one-line summary>"`
- [ ] Push tag: `git push origin v0.2.0`
- [ ] Smoke pós-tag: criar projeto temp, instalar via git URL, importar e compilar
```

## Annotated vs lightweight tags

Sempre usar **annotated tags** (`git tag -a`) — não lightweight. Annotated
tags têm autor, data, mensagem; lightweight são só ponteiros e perdem
metadata.

## Smoke pós-tag

Depois de `git push origin vX.Y.Z`, validar que o install via git URL
funciona end-to-end:

```bash
mkdir /tmp/sat-contract-smoke
cd /tmp/sat-contract-smoke
npm init -y
npm install "git+ssh://git@github.com:OpenSea-ERP/OpenSea-Satellite-Contract.git#vX.Y.Z"
node -e "const c = require('@openholt/satellite-contract'); console.log(c.SATELLITE_KINDS);"
```

Expected: `[ 'EMPORION', 'PRINT_SERVER', 'HORUS' ]`

Se falhar, NÃO promover a tag para uso real — investigar (geralmente
`dist/` desatualizado, `files` whitelist excluindo algo, ou `exports` map
mal configurado).

## Versionamento

Semver:

- **Pre-1.0** — minor bumps (`0.1.0` → `0.2.0`) podem incluir breaking
  type changes. Consumers pinam tag exata (`#v0.1.0`).
- **Post-1.0** — major bump = breaking type change. Minor = adições
  compatíveis. Patch = doc/internal fixes sem mudança de superfície.
