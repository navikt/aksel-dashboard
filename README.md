# Aksel Dashboard

Tracking av Aksel sine løsninger og bruk.

## Plan

### Generator

- [x] Hente ut navn på aktive git-repo som bruker ds pakker >= v1.0.0
- [x] Laste ned repo
- [x] Parse kode i repo
- [x] Hente ut relevante datapunkter
- [x] Laste opp "rådata" til GCP-bucket
- [x] Manipulere rådata for visning i dashboard

### App

- [ ] Oppsummere dashboard på forside, mest relevante data
- [ ] Vise data over lengre tidsperiode
- [ ] Oppdatere colors-side etter oppdatering av tokens
- [ ] Oppdatere breakpoints side etter oppdatering av tokens
- [ ] Hente data fra siteimprove/grafana over sider med komponenter

## Tokens

.env på root

```
// Må ha read access til repo og navikt SSO
TOKEN=[git-token]
```
