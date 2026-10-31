# Halloweenský lov strašidel

20 sekund, 15 drobných strašidel, dvě obrazové vrstvy, pět variant a maximálně pět pokusů v prohlížeči. Každý další pokus nahrazuje předchozí výhru. Jediný přednastavený kód se ukáže po přijetí výhry. Bez dopravy zdarma a bez dárků.

| Úlovky | Sleva | Kód | Minimum košíku |
|---|---|---|---|
| 0–2 | 5 % | BOJIMSE5 | 800 Kč |
| 3–5 | 100 Kč | BUBAK100 | 1 000 Kč |
| 6–8 | 10 % | STRASIDLO10 | 1 000 Kč |
| 9–11 | 200 Kč | NETOPYR200 | 1 500 Kč |
| 12–15 | 15 % | POSTRACH15 | 1 500 Kč |

Procentní slevy nejvýše 500 Kč, platnost do půlnoci 31. 10. 2026 v Praze. Kódy je nutné aktivovat v e-shopu. Vyšší úroveň nemusí být výhodnější pro každý košík.

## Registrace a export

Worker ukládá do D1 DB / participants email, souhlas, jeho znění a verzi a čas. Session je hashovaná v DB; cookie HttpOnly/Secure/SameSite. Kontakty nemají veřejné API pro výpis. Vlastník je může číst/exportovat přes Sites Settings databázi nebo nástroje Sites. `email_verified=0`: email zatím neověřujeme, neprobíhá double opt-in ani odesílání newsletterů. Vymazání na žádost přes správu databáze. Před ostrou kampaní prověřit právní podmínky vázání hry na marketingový souhlas a pravidla uchování dat.

Limit pokusů je v localStorage, nikoli vynucený na email. Server registraci ukládá, ale neověřuje skóre ani identitu hráče. Nejde o ochranu proti podvodům.

## Vývoj

Zdroj rozhraní v této složce, server `worker/index.js`, migrace `drizzle/`. `node scripts/build.mjs` vloží statické soubory do ESM Workeru. `node scripts/test.mjs` ověří logiku a registrační API s testovací DB adaptérem. Žádná osobní data ani tajné tokeny do GitHubu.
