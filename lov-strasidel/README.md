# Lov strašidel — druhá promo varianta

Veřejná hra: https://pmd-halloweensky-lov-strasidel.stepanka-kadlecova.chatgpt.site

Úvod s pravidly, třísekundové odpočítání, 45 sekund na hledání 15 strašidel v halloweenské ilustraci skutečného obchodu. Mobilní zvětšení scény, automatické ukončení, pevný kód podle skóre a následná prohlídka úkrytů.

| Úlovky | Sleva | Kód |
|---|---|---|
| 0–4 | 5 % | HALLOWEEN5 |
| 5–8 | 10 % | HALLOWEEN10 |
| 9–12 | 15 % | HALLOWEEN15 |
| 13–15 | 20 % | HALLOWEEN20 |

Nastavení délky hry a odměn: `game-core.mjs`. Rozmístění strašidel: `positions` v `app.js`.

Navržené podmínky: nákup od 800 Kč, maximální sleva 500 Kč, bez kombinace s dalšími kódy, platnost do půlnoci 31. října 2026 (Praha). Před kampaní musí být potvrzeny a kupony aktivovány v e-shopu.

Jde o statický prototyp. Jedna hra a termín jejího konce se ukládají v localStorage. Obnovení stránky nezastaví čas ani nesmaže úlovky. Toto není serverové omezení na osobu; jiný prohlížeč či vymazání dat umožní další hru. Pro ostré jednorázové pozvánky je potřeba backend.

Spouštět přes statický webserver, nikoli file://, protože hra používá ES modules.
