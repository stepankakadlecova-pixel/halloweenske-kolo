# Lov strašidel — těžší halloweenská promo hra

Veřejná hra: https://pmd-halloweensky-lov-strasidel.stepanka-kadlecova.chatgpt.site

25 sekund po třísekundovém odpočítání. 15 menších maskovaných strašidel pro slevu a 2 ještě drobnější bonusoví duchové. Bonusy se do skóre pro slevu nezapočítávají: jeden přidá dopravu zdarma, druhý dárek. Hra končí po čase nebo po všech 17 úlovcích; nalezení 15 běžných strašidel samo lov neukončí.

## Pevné kombinované kódy

Zákazník zadává jediný kód. Celkem 16 variant musí být před kampaní aktivováno a otestováno v e-shopu, včetně společného uplatnění slevy, dopravy a dárku.

| Úlovky | Sleva | Bez bonusu | Doprava | Dárek | Oba bonusy |
|---|---|---|---|---|---|
| 0–4 | 5 % | HALLOWEEN5 | HALLOWEEN5-D | HALLOWEEN5-G | HALLOWEEN5-DG |
| 5–8 | 10 % | HALLOWEEN10 | HALLOWEEN10-D | HALLOWEEN10-G | HALLOWEEN10-DG |
| 9–12 | 15 % | HALLOWEEN15 | HALLOWEEN15-D | HALLOWEEN15-G | HALLOWEEN15-DG |
| 13–15 | 20 % | HALLOWEEN20 | HALLOWEEN20-D | HALLOWEEN20-G | HALLOWEEN20-DG |

Navržené podmínky: nákup od 800 Kč, maximální sleva 500 Kč, bez kombinace s jinými promo kódy, bonusy jsou součástí kombinovaného kódu. Platnost do půlnoci 31. října 2026 (Praha). Konkrétní dárek a jeho zásobu je třeba určit před kampaní.

## Nastavení

Délka hry, slevové stupně, kódy a bonusy: game-core.mjs. Pozice a maskování duchů: positions a specials v app.js. Aktivní hra používá novou verzi místního úložiště v2.

Jde o statický prototyp s výsledkem v localStorage. Obnovení zachová čas, skóre i bonusy. Pro skutečné omezení na příjemce emailu je potřeba backend a unikátní pozvánky; vymazání úložiště či jiné zařízení stávající limit obejde. Běží přes HTTP(S) kvůli ES modules.
