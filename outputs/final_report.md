# Voynich ZL3b Quantitative Report

## 1. Corpus Summary

- Parsed entries: 39049
- Unique tokens: 8176

### Top Tokens
| Token | Frequency |
| --- | --- |
| daiin | 848 |
| ol | 563 |
| aiin | 511 |
| chedy | 508 |
| shedy | 435 |
| ar | 408 |
| chol | 397 |
| or | 392 |
| s | 354 |
| chey | 353 |
| dar | 323 |
| y | 312 |
| qokeedy | 307 |
| qokeey | 307 |
| qokain | 279 |
| shey | 278 |
| dy | 277 |
| qokedy | 276 |
| qokaiin | 265 |
| al | 261 |

### Top Repeated Patterns
| Pattern | Count |
| --- | --- |
| s aiin | 60 |
| or aiin | 57 |
| chol daiin | 33 |
| ar aiin | 27 |
| o l | 26 |
| r aiin | 25 |
| chol chol | 24 |
| ol shedy | 24 |
| ol chedy | 22 |
| shedy qokedy | 21 |
| s ar | 20 |
| chedy qokeey | 19 |
| ar al | 18 |
| chedy qokain | 18 |
| qokeedy qokeedy | 18 |
| shedy qokaiin | 17 |
| shey qokain | 17 |
| qokedy qokedy | 16 |
| qokedy qokeedy | 15 |
| qol chedy | 15 |

## 2. General Predictability Experiment

| Prefix Length | voynich entropy | voynich candidates | voynich top1 | voynich top3 | voynich top5 | shuffled entropy | shuffled candidates | shuffled top1 | shuffled top3 | shuffled top5 | reversed entropy | reversed candidates | reversed top1 | reversed top3 | reversed top5 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 7.2084 | 1031.5425 | 10.49% | 21.98% | 29.02% | 9.6410 | 1800.9719 | 5.57% | 10.93% | 13.14% | 7.8594 | 1769.5970 | 8.29% | 17.39% | 23.22% |
| 2 | 5.6735 | 446.4144 | 19.14% | 34.04% | 43.34% | 6.3281 | 176.6506 | 12.55% | 22.04% | 27.70% | 6.3534 | 594.1497 | 13.59% | 28.63% | 37.55% |
| 3 | 4.0429 | 131.9658 | 31.35% | 52.67% | 63.16% | 3.4784 | 22.0632 | 27.58% | 49.51% | 60.60% | 4.6480 | 212.4989 | 26.96% | 47.61% | 56.94% |
| 4 | 2.3852 | 31.3076 | 52.63% | 74.65% | 82.99% | 1.3710 | 4.1357 | 58.87% | 86.55% | 94.35% | 3.3265 | 105.6454 | 41.05% | 64.00% | 72.32% |
| 5 | 1.2449 | 9.4830 | 71.09% | 88.71% | 93.74% | 0.3333 | 1.4340 | 87.04% | 99.55% | 99.99% | 2.0469 | 28.8781 | 57.48% | 80.63% | 87.21% |
| 6 | 0.5487 | 2.8161 | 85.32% | 96.32% | 98.65% | 0.0481 | 1.0498 | 97.75% | 100.00% | 100.00% | 1.1917 | 7.4736 | 69.72% | 90.71% | 94.87% |
| 7 | 0.1857 | 1.3580 | 93.89% | 99.46% | 99.96% | 0.0031 | 1.0031 | 99.85% | 100.00% | 100.00% | 0.5869 | 2.7859 | 83.53% | 96.40% | 98.36% |
| 8 | 0.0505 | 1.0857 | 98.06% | 100.00% | 100.00% | 0.0007 | 1.0007 | 99.97% | 100.00% | 100.00% | 0.3121 | 1.8245 | 91.02% | 98.40% | 99.24% |
| 9 | 0.0066 | 1.0069 | 99.71% | 100.00% | 100.00% | 0.0000 | 1.0000 | 100.00% | 100.00% | 100.00% | 0.1583 | 1.3023 | 95.09% | 99.41% | 99.71% |
| 10 | 0.0063 | 1.0063 | 99.68% | 100.00% | 100.00% | 0.0000 | 1.0000 | 100.00% | 100.00% | 100.00% | 0.0492 | 1.0571 | 98.10% | 100.00% | 100.00% |
| 11 | 0.0000 | 1.0000 | 100.00% | 100.00% | 100.00% | 0.0000 | 1.0000 | 100.00% | 100.00% | 100.00% | 0.0000 | 1.0000 | 100.00% | 100.00% | 100.00% |
| 12 | 0.0000 | 1.0000 | 100.00% | 100.00% | 100.00% | 0.0000 | 1.0000 | 100.00% | 100.00% | 100.00% | 0.0000 | 1.0000 | 100.00% | 100.00% | 100.00% |
| 13 | 0.0000 | 1.0000 | 100.00% | 100.00% | 100.00% | 0.0000 | 1.0000 | 100.00% | 100.00% | 100.00% | 0.0000 | 1.0000 | 100.00% | 100.00% | 100.00% |
| 14 | 0.0000 | 1.0000 | 100.00% | 100.00% | 100.00% | 0.0000 | 1.0000 | 100.00% | 100.00% | 100.00% | 0.0000 | 1.0000 | 100.00% | 100.00% | 100.00% |

## Position-Aware Predictability

### Prefix Length vs Entropy by Position
| Prefix Length | all entropy | lineInitial entropy | paragraphInitial entropy | lineFinal entropy |
| --- | --- | --- | --- | --- |
| 1 | 7.2084 | 7.1518 | 5.0998 | 7.0972 |
| 2 | 5.6735 | 5.1498 | 3.3388 | 5.2026 |
| 3 | 4.0429 | 3.6244 | 2.2947 | 3.3987 |
| 4 | 2.3852 | 2.2233 | 1.2127 | 1.9008 |
| 5 | 1.2449 | 1.0482 | 0.5041 | 0.8149 |
| 6 | 0.5487 | 0.3720 | 0.1158 | 0.2614 |
| 7 | 0.1857 | 0.0868 | 0.0000 | 0.0465 |
| 8 | 0.0505 | 0.0165 | 0.0000 | 0.0123 |
| 9 | 0.0066 | 0.0074 | 0.0000 | 0.0000 |
| 10 | 0.0063 | 0.0000 | 0.0000 | 0.0000 |
| 11 | 0.0000 | 0.0000 | 0.0000 | 0.0000 |
| 12 | 0.0000 | 0.0000 | 0.0000 | 0.0000 |
| 13 | 0.0000 | 0.0000 | - | 0.0000 |
| 14 | 0.0000 | - | - | - |

### Prefix Length vs Candidate Count by Position
| Prefix Length | all candidates | lineInitial candidates | paragraphInitial candidates | lineFinal candidates |
| --- | --- | --- | --- | --- |
| 1 | 1031.5425 | 344.0718 | 53.2025 | 387.1700 |
| 2 | 446.4144 | 86.1035 | 15.6870 | 121.6115 |
| 3 | 131.9658 | 31.3654 | 9.3406 | 33.4862 |
| 4 | 31.3076 | 11.6193 | 3.7840 | 8.9261 |
| 5 | 9.4830 | 4.1397 | 1.8579 | 2.9084 |
| 6 | 2.8161 | 1.6148 | 1.1481 | 1.3584 |
| 7 | 1.3580 | 1.1099 | 1.0000 | 1.0497 |
| 8 | 1.0857 | 1.0184 | 1.0000 | 1.0167 |
| 9 | 1.0069 | 1.0074 | 1.0000 | 1.0000 |
| 10 | 1.0063 | 1.0000 | 1.0000 | 1.0000 |
| 11 | 1.0000 | 1.0000 | 1.0000 | 1.0000 |
| 12 | 1.0000 | 1.0000 | 1.0000 | 1.0000 |
| 13 | 1.0000 | 1.0000 | - | 1.0000 |
| 14 | 1.0000 | - | - | - |

### Prefix Length vs Top-k Accuracy by Position
| Prefix Length | all top1 | all top3 | all top5 | lineInitial top1 | lineInitial top3 | lineInitial top5 | paragraphInitial top1 | paragraphInitial top3 | paragraphInitial top5 | lineFinal top1 | lineFinal top3 | lineFinal top5 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 10.49% | 21.98% | 29.02% | 8.69% | 17.00% | 22.84% | 11.57% | 21.90% | 29.34% | 8.85% | 18.62% | 25.17% |
| 2 | 19.14% | 34.04% | 43.34% | 16.67% | 32.33% | 41.04% | 21.30% | 43.04% | 55.65% | 19.14% | 33.71% | 42.40% |
| 3 | 31.35% | 52.67% | 63.16% | 29.95% | 51.30% | 61.82% | 38.43% | 65.50% | 76.42% | 35.22% | 55.32% | 64.76% |
| 4 | 52.63% | 74.65% | 82.99% | 48.54% | 72.66% | 82.14% | 61.50% | 85.92% | 93.43% | 54.88% | 76.56% | 85.15% |
| 5 | 71.09% | 88.71% | 93.74% | 70.79% | 90.29% | 95.03% | 81.73% | 96.45% | 97.97% | 75.44% | 93.57% | 98.00% |
| 6 | 85.32% | 96.32% | 98.65% | 87.45% | 98.13% | 99.73% | 95.68% | 100.00% | 100.00% | 90.12% | 99.55% | 100.00% |
| 7 | 93.89% | 99.46% | 99.96% | 96.53% | 99.79% | 100.00% | 100.00% | 100.00% | 100.00% | 97.95% | 100.00% | 100.00% |
| 8 | 98.06% | 100.00% | 100.00% | 99.23% | 100.00% | 100.00% | 100.00% | 100.00% | 100.00% | 99.58% | 100.00% | 100.00% |
| 9 | 99.71% | 100.00% | 100.00% | 99.63% | 100.00% | 100.00% | 100.00% | 100.00% | 100.00% | 100.00% | 100.00% | 100.00% |
| 10 | 99.68% | 100.00% | 100.00% | 100.00% | 100.00% | 100.00% | 100.00% | 100.00% | 100.00% | 100.00% | 100.00% | 100.00% |
| 11 | 100.00% | 100.00% | 100.00% | 100.00% | 100.00% | 100.00% | 100.00% | 100.00% | 100.00% | 100.00% | 100.00% | 100.00% |
| 12 | 100.00% | 100.00% | 100.00% | 100.00% | 100.00% | 100.00% | 100.00% | 100.00% | 100.00% | 100.00% | 100.00% | 100.00% |
| 13 | 100.00% | 100.00% | 100.00% | 100.00% | 100.00% | 100.00% | - | - | - | 100.00% | 100.00% | 100.00% |
| 14 | 100.00% | 100.00% | 100.00% | - | - | - | - | - | - | - | - | - |

## 4. Prefix Family Size Distribution

| Prefix Length | Family Count | Mean Family Size | Median Family Size | Max Family Size |
| --- | --- | --- | --- | --- |
| 1 | 24 | 340.6667 | 110.5000 | 1841 |
| 2 | 229 | 35.7031 | 4.0000 | 1106 |
| 3 | 931 | 8.7820 | 1.0000 | 428 |
| 4 | 2327 | 3.5135 | 1.0000 | 126 |
| 5 | 4477 | 1.8262 | 1.0000 | 48 |
| 6 | 6615 | 1.2360 | 1.0000 | 17 |

### Prefix Length 1 Top Families

| Prefix | Unique Token Count | Total Frequency | Top Tokens |
| --- | --- | --- | --- |
| o | 1841 | 8915 | ol:563, or:392, okaiin:215, o:208, okeey:184, otedy:165, okal:156, otaiin:155, otar:153, oteey:145 |
| c | 1362 | 7060 | chedy:508, chol:397, chey:353, chor:212, cheey:186, cheol:173, chy:167, chdy:146, chckhy:140, cthy:103 |
| s | 868 | 4601 | shedy:435, s:354, shey:278, shol:186, sheey:149, saiin:127, sho:126, sheol:108, shy:101, shor:96 |
| q | 837 | 5401 | qokeedy:307, qokeey:307, qokain:279, qokedy:276, qokaiin:265, qokal:197, qokar:159, qoky:146, qol:142, qokey:108 |
| d | 617 | 3663 | daiin:848, dar:323, dy:277, dal:242, dain:214, dair:111, dol:109, dam:88, d:68, dor:68 |
| y | 591 | 1993 | y:312, ykeey:57, ykaiin:46, ytaiin:39, ykar:36, ykeedy:33, yteey:31, yteedy:29, ytar:24, ytedy:24 |
| l | 363 | 1457 | l:191, lchedy:116, lchey:49, lkaiin:48, lshedy:40, lkeey:39, lor:39, lol:38, lkeedy:37, lkain:34 |
| t | 363 | 1028 | tol:47, taiin:45, tar:42, tedy:40, tchedy:33, tchy:28, tal:26, tchey:22, tchor:22, tor:22 |
| k | 345 | 1280 | kaiin:79, keedy:62, kar:60, keey:56, kedy:47, kain:43, kol:38, kchy:36, ky:32, kal:27 |
| a | 324 | 2173 | aiin:511, ar:408, al:261, ain:116, am:88, air:84, aiiin:47, aiir:29, aly:26, ary:26 |
| p | 294 | 547 | pchedy:36, pol:19, pchor:12, pchedar:11, pcheol:11, pchdy:10, pchey:8, polaiin:8, por:8, p:7 |
| r | 125 | 530 | r:169, raiin:64, rain:22, rol:20, ral:18, rar:16, ror:15, ram:12, ry:11, rchedy:10 |
| e | 96 | 143 | eees:8, e:7, eeedy:7, eey:6, ety:6, eedy:5, eeey:5, ees:5, es:3, eeckhy:2 |
| f | 83 | 120 | f:10, fchedy:9, fcheey:4, far:3, fchdy:3, fcheody:3, fchor:3, fol:3, fchey:2, fcho:2 |
| h | 23 | 44 | hy:15, hey:5, ho:3, h:2, hain:1, har:1, hc:1, hda:1, hdai:1, hdeec:1 |
| i | 19 | 21 | ih:2, iin:2, i:1, ihar:1, ihearamom:1, iiin:1, iim:1, iir:1, iirain:1, iirchal:1 |
| x | 10 | 21 | x:11, xar:2, xaloeees:1, xasashe:1, xdar:1, xockhhy:1, xoiin:1, xol:1, xoltedy:1, xor:1 |
| v | 4 | 15 | v:12, vo:1, vor:1, vs:1 |
| g | 3 | 17 | g:15, giin:1, gm:1 |
| m | 2 | 12 | m:11, mol:1 |

### Prefix Length 2 Top Families

| Prefix | Unique Token Count | Total Frequency | Top Tokens |
| --- | --- | --- | --- |
| ch | 1106 | 6145 | chedy:508, chol:397, chey:353, chor:212, cheey:186, cheol:173, chy:167, chdy:146, chckhy:140, cheor:94 |
| qo | 740 | 5276 | qokeedy:307, qokeey:307, qokain:279, qokedy:276, qokaiin:265, qokal:197, qokar:159, qoky:146, qol:142, qokey:108 |
| sh | 544 | 3243 | shedy:435, shey:278, shol:186, sheey:149, sho:126, sheol:108, shy:101, shor:96, sheedy:83, shckhy:60 |
| ot | 461 | 2500 | otedy:165, otaiin:155, otar:153, oteey:145, otal:137, oty:118, oteedy:106, otain:96, otol:82, otey:60 |
| ok | 397 | 2544 | okaiin:215, okeey:184, okal:156, okain:141, okar:140, okedy:120, okeedy:111, oky:104, okol:78, okey:65 |
| ol | 290 | 1633 | ol:563, oly:61, olaiin:52, olkeedy:45, olchedy:39, olkeey:38, olkain:34, olkaiin:31, oldy:30, olor:30 |
| da | 231 | 2337 | daiin:848, dar:323, dal:242, dain:214, dair:111, dam:88, daly:31, daiir:25, dary:23, daiiin:21 |
| yk | 182 | 627 | ykeey:57, ykaiin:46, ykar:36, ykeedy:33, ykchy:22, ykedy:21, ykeody:16, yky:16, ykeol:15, ykol:14 |
| op | 172 | 399 | opchedy:50, opchey:30, opchdy:20, opaiin:16, opchy:14, opar:13, opal:10, opy:9, opcheol:7, opor:7 |
| yt | 140 | 514 | ytaiin:39, yteey:31, yteedy:29, ytar:24, ytedy:24, yty:23, ytchy:16, ytal:15, ytol:15, yteody:14 |
| so | 136 | 342 | sol:67, sor:51, soiin:19, soraiin:8, so:6, solchedy:6, soiiin:5, soin:5, sos:5, soaiin:4 |
| po | 109 | 170 | pol:19, polaiin:8, por:8, polchedy:7, podaiin:5, poiin:3, polshy:3, poar:2, pochedy:2, podaiir:2 |
| al | 106 | 512 | al:261, aly:26, aldy:14, alam:11, alor:9, alaiin:8, alol:8, alal:7, alchey:6, alkain:6 |
| dc | 103 | 295 | dchedy:29, dchy:29, dchor:27, dchol:24, dchey:17, dcheey:13, dchdy:9, dcheol:8, dcho:7, dcheo:6 |
| ke | 101 | 426 | keedy:62, keey:56, kedy:47, keody:21, keol:21, key:16, keeol:15, keeody:12, keeey:10, keeo:10 |
| lk | 100 | 421 | lkaiin:48, lkeey:39, lkeedy:37, lkain:34, lkar:31, lkedy:27, lky:19, lkchedy:15, lkchey:8, lkeeey:7 |
| do | 99 | 343 | dol:109, dor:68, do:17, doiin:12, dody:7, doiir:7, dom:7, doly:6, dory:4, doiiin:3 |
| sa | 98 | 499 | saiin:127, sar:81, sain:64, sal:49, sair:29, sam:12, sary:10, saral:5, saiir:4, salchedy:4 |
| ct | 97 | 506 | cthy:103, cthol:56, cthey:51, cthor:43, ctho:20, cthar:17, cthody:16, ctheey:15, cthedy:13, cthaiin:12 |
| pc | 96 | 248 | pchedy:36, pchor:12, pchedar:11, pcheol:11, pchdy:10, pchey:8, pchody:6, pchol:6, pchar:5, pchdair:5 |

### Prefix Length 3 Top Families

| Prefix | Unique Token Count | Total Frequency | Top Tokens |
| --- | --- | --- | --- |
| che | 428 | 2867 | chedy:508, chey:353, cheey:186, cheol:173, cheor:94, cheody:91, cheo:79, cheky:67, cheedy:59, chear:51 |
| cho | 323 | 1703 | chol:397, chor:212, chody:92, cho:84, chodaiin:46, choky:40, chos:39, choty:39, chockhy:24, chocthy:19 |
| qok | 248 | 3113 | qokeedy:307, qokeey:307, qokain:279, qokedy:276, qokaiin:265, qokal:197, qokar:159, qoky:146, qokey:108, qokol:98 |
| she | 239 | 1888 | shedy:435, shey:278, sheey:149, sheol:108, sheedy:83, sheody:49, sheo:48, sheor:47, sheky:34, sheckhy:33 |
| qot | 171 | 1122 | qotedy:89, qoty:89, qotaiin:79, qoteedy:77, qotar:64, qotchy:62, qotain:60, qotal:59, qotol:44, qoteey:42 |
| oke | 164 | 1017 | okeey:184, okedy:120, okeedy:111, okey:65, okeol:64, okeody:37, okeeey:27, okeeo:20, okeor:20, okees:19 |
| sho | 162 | 773 | shol:186, sho:126, shor:96, shody:53, shodaiin:24, shocthy:12, shod:11, shos:10, shokchy:8, sholdy:8 |
| ote | 159 | 925 | otedy:165, oteey:145, oteedy:106, otey:60, oteody:41, oteol:37, oteos:26, oteo:18, oteeos:14, otedar:13 |
| dch | 96 | 288 | dchedy:29, dchy:29, dchor:27, dchol:24, dchey:17, dcheey:13, dchdy:9, dcheol:8, dcho:7, dcheo:6 |
| pch | 96 | 248 | pchedy:36, pchor:12, pchedar:11, pcheol:11, pchdy:10, pchey:8, pchody:6, pchol:6, pchar:5, pchdair:5 |
| ota | 92 | 776 | otaiin:155, otar:153, otal:137, otain:96, otam:48, otair:26, otaly:21, otaldy:8, otary:6, otaram:5 |
| dai | 88 | 1343 | daiin:848, dain:214, dair:111, daiir:25, daiiin:21, daim:11, daiidy:7, dairal:5, daiiny:4, daiim:3 |
| chc | 86 | 428 | chckhy:140, chcthy:81, chckhey:30, chckhdy:13, chckhedy:11, chcphy:10, chckhhy:8, chcthdy:7, chcthey:7, chcthedy:6 |
| oto | 86 | 292 | otol:82, otor:40, otody:26, oto:11, otoldy:11, otoly:9, otodar:6, otodaiin:5, otos:5, otoy:4 |
| oka | 83 | 879 | okaiin:215, okal:156, okain:141, okar:140, okam:33, okaly:23, okair:20, okary:12, okaldy:10, okaiiin:7 |
| cth | 82 | 482 | cthy:103, cthol:56, cthey:51, cthor:43, ctho:20, cthar:17, cthody:16, ctheey:15, cthedy:13, cthaiin:12 |
| yke | 82 | 294 | ykeey:57, ykeedy:33, ykedy:21, ykeody:16, ykeol:15, ykeeody:13, ykeeol:10, ykey:8, ykeeo:7, ykees:7 |
| ych | 81 | 214 | ycheey:20, ychey:17, ychor:15, ychedy:11, ycheo:11, ycheol:11, ychol:10, ycheeo:8, ycheor:8, ycheedy:7 |
| olk | 79 | 377 | olkeedy:45, olkeey:38, olkain:34, olkaiin:31, olkedy:26, olky:23, olkar:21, olkey:14, olkal:13, olkam:11 |
| tch | 79 | 266 | tchedy:33, tchy:28, tchey:22, tchor:22, tchol:18, tchdy:14, tcho:9, tchody:9, tcheey:6, tcheody:6 |

### Prefix Length 4 Top Families

| Prefix | Unique Token Count | Total Frequency | Top Tokens |
| --- | --- | --- | --- |
| cheo | 126 | 716 | cheol:173, cheor:94, cheody:91, cheo:79, cheos:37, cheodaiin:13, cheockhy:10, cheoky:9, cheom:9, cheodain:8 |
| qoke | 104 | 1397 | qokeedy:307, qokeey:307, qokedy:276, qokey:108, qokeol:50, qokeody:33, qokeeey:28, qokeor:21, qokeed:18, qokeeo:18 |
| chee | 72 | 477 | cheey:186, cheedy:59, chees:38, cheeky:25, cheeo:20, cheeor:16, cheeody:13, cheeey:9, cheeol:9, cheeos:7 |
| otch | 70 | 292 | otchy:45, otchedy:35, otchdy:33, otchey:33, otchol:30, otchor:16, otcho:7, otchar:6, otcham:5, otcheody:4 |
| okee | 66 | 498 | okeey:184, okeedy:111, okeeey:27, okeeo:20, okees:19, okeeody:17, okeeol:16, okeeor:12, okeeedy:8, okeeos:7 |
| opch | 65 | 218 | opchedy:50, opchey:30, opchdy:20, opchy:14, opcheol:7, opchol:6, opchedaiin:5, opcheey:5, opchor:5, opchal:3 |
| otee | 64 | 400 | oteey:145, oteedy:106, oteeos:14, oteeody:13, otees:12, oteeo:10, oteeol:9, oteed:8, oteeey:7, oteedaiin:4 |
| sheo | 63 | 370 | sheol:108, sheody:49, sheo:48, sheor:47, sheos:13, sheod:11, sheoky:7, sheodaiin:5, sheodal:4, sheoy:4 |
| chol | 62 | 520 | chol:397, choly:17, choldy:11, cholkaiin:5, cholor:5, cholaiin:4, cholkeedy:4, cholky:4, cholody:4, chols:4 |
| chok | 61 | 212 | choky:40, chokaiin:16, chokchy:16, chokeey:12, chokain:11, chokal:7, chokar:7, chokey:7, chok:5, chokeody:5 |
| shee | 60 | 394 | sheey:149, sheedy:83, sheeky:15, shee:13, sheeol:13, sheeo:11, shees:10, sheety:8, sheeor:6, sheed:5 |
| okch | 58 | 233 | okchey:32, okchy:31, okchdy:28, okchedy:24, okchor:18, okchol:14, okcho:8, okchd:6, okcheey:6, okchody:6 |
| qote | 55 | 351 | qotedy:89, qoteedy:77, qoteey:42, qotey:23, qoteol:12, qoteody:11, qoteeody:6, qoted:5, qoteeo:5, qoteeol:5 |
| oteo | 49 | 206 | oteody:41, oteol:37, oteos:26, oteo:18, oteor:12, oteodaiin:8, oteodar:7, oteodal:6, oteotey:5, oteod:3 |
| yche | 48 | 147 | ycheey:20, ychey:17, ychedy:11, ycheo:11, ycheol:11, ycheeo:8, ycheor:8, ycheedy:7, ychear:3, ycheody:3 |
| dche | 47 | 127 | dchedy:29, dchey:17, dcheey:13, dcheol:8, dcheo:6, dcheedy:4, dcheor:4, dcheos:3, dcheeody:2, dcheeos:2 |
| ykee | 46 | 189 | ykeey:57, ykeedy:33, ykeeody:13, ykeeol:10, ykeeo:7, ykees:7, ykeeey:6, ykeeor:6, ykeeedy:4, ykeear:3 |
| chot | 46 | 168 | choty:39, chotchy:13, chotar:11, chotaiin:10, choteey:9, chotol:9, chotal:8, chotey:8, chot:4, chotain:4 |
| ched | 45 | 699 | chedy:508, chedaiin:39, chedar:34, chedal:26, chedain:19, ched:18, chedam:6, chedol:5, chedaly:3, chedl:3 |
| olch | 44 | 155 | olchedy:39, olchey:25, olcheey:11, olchdy:10, olchy:10, olcheol:7, olched:3, olcheedy:3, olcheo:3, olcheor:3 |

### Prefix Length 5 Top Families

| Prefix | Unique Token Count | Total Frequency | Top Tokens |
| --- | --- | --- | --- |
| qokee | 48 | 785 | qokeedy:307, qokeey:307, qokeeey:28, qokeed:18, qokeeo:18, qokeeody:16, qokeeol:9, qokeeor:8, qokees:8, qokeechy:6 |
| qokch | 37 | 267 | qokchy:68, qokchdy:51, qokchedy:40, qokchey:27, qokchol:15, qokcho:11, qokchor:8, qokchd:6, qokchod:5, qokcheody:3 |
| qotch | 35 | 211 | qotchy:62, qotchedy:25, qotchdy:23, qotchey:18, qotchol:13, qotchor:11, qotcho:9, qotched:5, qotchd:4, qotcheo:4 |
| qopch | 33 | 113 | qopchedy:31, qopchdy:16, qopchy:13, qopchey:10, qopchol:6, qopcheey:4, qopchar:2, qopcheedy:2, qopcheo:2, qopcheody:2 |
| opche | 32 | 133 | opchedy:50, opchey:30, opcheol:7, opchedaiin:5, opcheey:5, opcheedy:3, opcheody:3, opchear:2, opched:2, opchees:2 |
| olkee | 29 | 136 | olkeedy:45, olkeey:38, olkeeey:11, olkeeody:6, olkeeo:4, olkeechy:3, olkees:3, olkeear:2, olkeedal:2, olkeeedy:2 |
| chckh | 27 | 239 | chckhy:140, chckhey:30, chckhdy:13, chckhedy:11, chckhhy:8, chckhal:4, chckhd:4, chckhol:4, chckhaiin:3, chckh:2 |
| otche | 27 | 99 | otchedy:35, otchey:33, otcheody:4, otcheey:3, otcheor:2, otchealkar:1, otchechy:1, otchedain:1, otchedair:1, otchedey:1 |
| olche | 26 | 114 | olchedy:39, olchey:25, olcheey:11, olcheol:7, olched:3, olcheedy:3, olcheo:3, olcheor:3, olcheeey:2, olcheody:2 |
| cheok | 26 | 51 | cheoky:9, cheokeey:6, cheokaiin:3, cheokain:3, cheokey:3, cheok:2, cheokal:2, cheokam:2, cheokedy:2, cheokeol:2 |
| cheol | 25 | 212 | cheol:173, cheoldy:6, cheoly:5, cheolor:3, cheols:3, cheolchey:2, cheolkeedy:2, cheolain:1, cheolchal:1, cheolchcthy:1 |
| qokal | 22 | 246 | qokal:197, qokaly:17, qokaldy:10, qokalor:3, qokalchdy:2, qokalaiin:1, qokalam:1, qokalar:1, qokalchal:1, qokalchar:1 |
| qotee | 22 | 164 | qoteedy:77, qoteey:42, qoteeody:6, qoteeo:5, qoteeol:5, qotees:4, qoteed:3, qoteedar:3, qoteeedy:3, qoteeey:3 |
| chcth | 22 | 129 | chcthy:81, chcthdy:7, chcthey:7, chcthedy:6, chcthhy:4, chctho:3, chcthody:3, chcth:2, chcthal:2, chctham:2 |
| choke | 22 | 56 | chokeey:12, chokey:7, chokeody:5, chokedy:4, chokeo:4, chokeol:4, chokeedy:3, chokeeey:2, chokeeo:2, chokeal:1 |
| otcho | 21 | 76 | otchol:30, otchor:16, otcho:7, otchody:4, otchod:2, otchodar:2, otchodal:1, otchodals:1, otchodeey:1, otchodol:1 |
| qockh | 21 | 69 | qockhey:18, qockhy:18, qockhol:8, qockhedy:4, qockheey:3, qockheol:2, qockhhy:2, qockhal:1, qockhdy:1, qockhed:1 |
| qokeo | 19 | 145 | qokeol:50, qokeody:33, qokeor:21, qokeo:10, qokeod:7, qokeos:6, qokeochy:2, qokeodal:2, qokeoly:2, qokeom:2 |
| okche | 19 | 81 | okchey:32, okchedy:24, okcheey:6, okchedam:2, okcheody:2, okcheor:2, okche:1, okchecf:1, okchechy:1, okchedaiin:1 |
| oteeo | 19 | 68 | oteeos:14, oteeody:13, oteeo:10, oteeol:9, oteeor:4, oteeoaly:2, oteeod:2, oteeodar:2, oteeosy:2, oteeoal:1 |

### Prefix Length 6 Top Families

| Prefix | Unique Token Count | Total Frequency | Top Tokens |
| --- | --- | --- | --- |
| qopche | 17 | 63 | qopchedy:31, qopchey:10, qopcheey:4, qopcheedy:2, qopcheo:2, qopcheody:2, qopcher:2, qopchear:1, qopchedaiin:1, qopchedal:1 |
| qokeeo | 15 | 66 | qokeeo:18, qokeeody:16, qokeeol:9, qokeeor:8, qokeeodaiin:3, qokeeod:2, qokeeos:2, qokeeoar:1, qokeeodal:1, qokeeodar:1 |
| olchee | 12 | 25 | olcheey:11, olcheedy:3, olcheeey:2, olcheear:1, olcheedar:1, olcheees:1, olcheeg:1, olcheeo:1, olcheeol:1, olchees:1 |
| qokche | 11 | 82 | qokchedy:40, qokchey:27, qokcheody:3, qokcheedy:2, qokcheey:2, qokcheo:2, qokcheor:2, qokched:1, qokcheodaiin:1, qokcheol:1 |
| qotche | 11 | 65 | qotchedy:25, qotchey:18, qotched:5, qotcheo:4, qotcheedy:3, qotcheol:3, qotcheaiin:2, qotchedar:2, qotcheeaiin:1, qotcheey:1 |
| cheoke | 11 | 20 | cheokeey:6, cheokey:3, cheokedy:2, cheokeol:2, cheokeain:1, cheokealy:1, cheokeeas:1, cheokeeo:1, cheokeo:1, cheokeor:1 |
| chepch | 11 | 17 | chepchy:4, chepchey:3, chepchedy:2, chepcham:1, chepchar:1, chepchdy:1, chepched:1, chepcheesaly:1, chepchefy:1, chepcheol:1 |
| otcheo | 11 | 15 | otcheody:4, otcheor:2, otcheo:1, otcheochy:1, otcheodaiin:1, otcheodal:1, otcheodar:1, otcheol:1, otcheolom:1, otcheoly:1 |
| qokcho | 10 | 46 | qokchol:15, qokcho:11, qokchor:8, qokchod:5, qokchody:2, qokchocthor:1, qokchodal:1, qokchon:1, qokchory:1, qokchos:1 |
| cheoda | 10 | 39 | cheodaiin:13, cheodain:8, cheodal:7, cheodar:4, cheodam:2, cheoda:1, cheodadaiin:1, cheodaiiin:1, cheodaiir:1, cheodalol:1 |
| chockh | 10 | 38 | chockhy:24, chockhey:5, chockhar:2, chockhdy:1, chockhed:1, chockhedy:1, chockhhor:1, chockhia:1, chockhol:1, chockhor:1 |
| chokch | 10 | 33 | chokchy:16, chokchol:4, chokchey:3, chokchaiin:2, chokchedy:2, chokcho:2, chokcheey:1, chokcheo:1, chokchodaiin:1, chokchor:1 |
| chotch | 10 | 26 | chotchy:13, chotchey:4, chotchdy:2, chotchedy:1, chotcheey:1, chotcheol:1, chotcho:1, chotchody:1, chotchol:1, chotchs:1 |
| chokee | 10 | 25 | chokeey:12, chokeedy:3, chokeeey:2, chokeeo:2, chokeed:1, chokeedam:1, chokeeodol:1, chokeeody:1, chokeeoky:1, chokees:1 |
| olkeeo | 10 | 19 | olkeeody:6, olkeeo:4, olkeeol:2, olkeeodaiin:1, olkeeodal:1, olkeeoldy:1, olkeeolkeeo:1, olkeeoly:1, olkeeor:1, olkeeos:1 |
| chopch | 10 | 15 | chopchy:5, chopchedy:2, chopchal:1, chopchdy:1, chopcheey:1, chopcheod:1, chopcheopchy:1, chopchey:1, chopcho:1, chopchol:1 |
| checkh | 9 | 67 | checkhy:47, checkhey:11, checkhed:2, checkhol:2, checkhd:1, checkhdy:1, checkhedy:1, checkho:1, checkhyys:1 |
| qotcho | 9 | 43 | qotchol:13, qotchor:11, qotcho:9, qotchody:3, qotchod:2, qotchoiin:2, qotcholg:1, qotchoraiin:1, qotchos:1 |
| qokeee | 9 | 42 | qokeeey:28, qokeeedy:5, qokeees:3, qokeee:1, qokeeeb:1, qokeeechy:1, qokeeeody:1, qokeeeor:1, qokeeeos:1 |
| qockhe | 9 | 32 | qockhey:18, qockhedy:4, qockheey:3, qockheol:2, qockhed:1, qockheedy:1, qockheo:1, qockheor:1, qockheos:1 |

## 5. Entropy and Candidate Reduction Slope

### voynich_all

| Prefix Transition | delta_entropy | relative_entropy_reduction | delta_candidate_count | relative_candidate_reduction |
| --- | --- | --- | --- | --- |
| 1->2 | 1.5349 | 21.29% | 585.1282 | 56.72% |
| 2->3 | 1.6306 | 28.74% | 314.4485 | 70.44% |
| 3->4 | 1.6577 | 41.00% | 100.6582 | 76.28% |
| 4->5 | 1.1403 | 47.81% | 21.8247 | 69.71% |
| 5->6 | 0.6962 | 55.93% | 6.6669 | 70.30% |
| 6->7 | 0.3629 | 66.15% | 1.4581 | 51.78% |
| 7->8 | 0.1352 | 72.80% | 0.2723 | 20.05% |
| 8->9 | 0.0439 | 86.88% | 0.0788 | 7.26% |
| 9->10 | 0.0003 | 4.22% | 0.0005 | 0.05% |
| 10->11 | 0.0063 | 100.00% | 0.0063 | 0.63% |
| 11->12 | 0.0000 | 0.00% | 0.0000 | 0.00% |
| 12->13 | 0.0000 | 0.00% | 0.0000 | 0.00% |
| 13->14 | 0.0000 | 0.00% | 0.0000 | 0.00% |

### voynich_lineInitial

| Prefix Transition | delta_entropy | relative_entropy_reduction | delta_candidate_count | relative_candidate_reduction |
| --- | --- | --- | --- | --- |
| 1->2 | 2.0020 | 27.99% | 257.9683 | 74.98% |
| 2->3 | 1.5254 | 29.62% | 54.7381 | 63.57% |
| 3->4 | 1.4011 | 38.66% | 19.7461 | 62.96% |
| 4->5 | 1.1750 | 52.85% | 7.4796 | 64.37% |
| 5->6 | 0.6762 | 64.51% | 2.5249 | 60.99% |
| 6->7 | 0.2852 | 76.66% | 0.5049 | 31.27% |
| 7->8 | 0.0703 | 80.97% | 0.0914 | 8.24% |
| 8->9 | 0.0091 | 55.16% | 0.0110 | 1.08% |
| 9->10 | 0.0074 | 100.00% | 0.0074 | 0.74% |
| 10->11 | 0.0000 | 0.00% | 0.0000 | 0.00% |
| 11->12 | 0.0000 | 0.00% | 0.0000 | 0.00% |
| 12->13 | 0.0000 | 0.00% | 0.0000 | 0.00% |

### voynich_paragraphInitial

| Prefix Transition | delta_entropy | relative_entropy_reduction | delta_candidate_count | relative_candidate_reduction |
| --- | --- | --- | --- | --- |
| 1->2 | 1.7610 | 34.53% | 37.5155 | 70.51% |
| 2->3 | 1.0440 | 31.27% | 6.3463 | 40.46% |
| 3->4 | 1.0820 | 47.15% | 5.5566 | 59.49% |
| 4->5 | 0.7086 | 58.43% | 1.9262 | 50.90% |
| 5->6 | 0.3884 | 77.04% | 0.7097 | 38.20% |
| 6->7 | 0.1158 | 100.00% | 0.1481 | 12.90% |
| 7->8 | 0.0000 | 0.00% | 0.0000 | 0.00% |
| 8->9 | 0.0000 | 0.00% | 0.0000 | 0.00% |
| 9->10 | 0.0000 | 0.00% | 0.0000 | 0.00% |
| 10->11 | 0.0000 | 0.00% | 0.0000 | 0.00% |
| 11->12 | 0.0000 | 0.00% | 0.0000 | 0.00% |

### voynich_lineFinal

| Prefix Transition | delta_entropy | relative_entropy_reduction | delta_candidate_count | relative_candidate_reduction |
| --- | --- | --- | --- | --- |
| 1->2 | 1.8946 | 26.70% | 265.5585 | 68.59% |
| 2->3 | 1.8039 | 34.67% | 88.1253 | 72.46% |
| 3->4 | 1.4979 | 44.07% | 24.5601 | 73.34% |
| 4->5 | 1.0860 | 57.13% | 6.0177 | 67.42% |
| 5->6 | 0.5535 | 67.92% | 1.5500 | 53.29% |
| 6->7 | 0.2149 | 82.22% | 0.3087 | 22.72% |
| 7->8 | 0.0342 | 73.55% | 0.0330 | 3.15% |
| 8->9 | 0.0123 | 100.00% | 0.0167 | 1.64% |
| 9->10 | 0.0000 | 0.00% | 0.0000 | 0.00% |
| 10->11 | 0.0000 | 0.00% | 0.0000 | 0.00% |
| 11->12 | 0.0000 | 0.00% | 0.0000 | 0.00% |
| 12->13 | 0.0000 | 0.00% | 0.0000 | 0.00% |

### shuffled_all

| Prefix Transition | delta_entropy | relative_entropy_reduction | delta_candidate_count | relative_candidate_reduction |
| --- | --- | --- | --- | --- |
| 1->2 | 3.3185 | 34.44% | 1624.1239 | 90.33% |
| 2->3 | 2.8555 | 45.21% | 152.2896 | 87.55% |
| 3->4 | 2.0974 | 60.60% | 17.4645 | 80.66% |
| 4->5 | 1.0317 | 75.67% | 2.7532 | 65.76% |
| 5->6 | 0.2858 | 86.18% | 0.3856 | 26.90% |
| 6->7 | 0.0448 | 97.63% | 0.0467 | 4.45% |
| 7->8 | 0.0011 | 100.00% | 0.0011 | 0.11% |
| 8->9 | 0.0000 | 0.00% | 0.0000 | 0.00% |
| 9->10 | 0.0000 | 0.00% | 0.0000 | 0.00% |
| 10->11 | 0.0000 | 0.00% | 0.0000 | 0.00% |
| 11->12 | 0.0000 | 0.00% | 0.0000 | 0.00% |
| 12->13 | 0.0000 | 0.00% | 0.0000 | 0.00% |
| 13->14 | 0.0000 | 0.00% | 0.0000 | 0.00% |

### reversed_all

| Prefix Transition | delta_entropy | relative_entropy_reduction | delta_candidate_count | relative_candidate_reduction |
| --- | --- | --- | --- | --- |
| 1->2 | 1.5060 | 19.16% | 1175.4473 | 66.42% |
| 2->3 | 1.7054 | 26.84% | 381.6508 | 64.23% |
| 3->4 | 1.3215 | 28.43% | 106.8534 | 50.28% |
| 4->5 | 1.2796 | 38.47% | 76.7673 | 72.67% |
| 5->6 | 0.8552 | 41.78% | 21.4045 | 74.12% |
| 6->7 | 0.6049 | 50.75% | 4.6877 | 62.72% |
| 7->8 | 0.2748 | 46.82% | 0.9614 | 34.51% |
| 8->9 | 0.1538 | 49.28% | 0.5222 | 28.62% |
| 9->10 | 0.1091 | 68.90% | 0.2451 | 18.82% |
| 10->11 | 0.0492 | 100.00% | 0.0571 | 5.41% |
| 11->12 | 0.0000 | 0.00% | 0.0000 | 0.00% |
| 12->13 | 0.0000 | 0.00% | 0.0000 | 0.00% |
| 13->14 | 0.0000 | 0.00% | 0.0000 | 0.00% |

## 6. Ambiguity Persistence

### voynich_all

| prefix_length | total_evaluated | unique_resolution_rate | ambiguity_rate | avg_ambiguous_candidate_count | median_ambiguous_candidate_count |
| --- | --- | --- | --- | --- | --- |
| 1 | 39049 | 0.01% | 99.99% | 1031.6481 | 868.0000 |
| 2 | 37587 | 0.22% | 99.78% | 447.4120 | 397.0000 |
| 3 | 35064 | 1.45% | 98.55% | 133.8988 | 83.0000 |
| 4 | 31465 | 5.52% | 94.48% | 33.0774 | 24.0000 |
| 5 | 24480 | 17.91% | 82.09% | 11.3341 | 8.0000 |
| 6 | 14893 | 47.41% | 52.59% | 4.4534 | 4.0000 |
| 7 | 7361 | 77.34% | 22.66% | 2.5797 | 2.0000 |
| 8 | 2883 | 92.85% | 7.15% | 2.1990 | 2.0000 |
| 9 | 1019 | 99.31% | 0.69% | 2.0000 | 2.0000 |
| 10 | 315 | 99.37% | 0.63% | 2.0000 | 2.0000 |
| 11 | 102 | 100.00% | 0.00% | 0.0000 | 0.0000 |
| 12 | 37 | 100.00% | 0.00% | 0.0000 | 0.0000 |
| 13 | 11 | 100.00% | 0.00% | 0.0000 | 0.0000 |
| 14 | 2 | 100.00% | 0.00% | 0.0000 | 0.0000 |

### voynich_lineInitial

| prefix_length | total_evaluated | unique_resolution_rate | ambiguity_rate | avg_ambiguous_candidate_count | median_ambiguous_candidate_count |
| --- | --- | --- | --- | --- | --- |
| 1 | 5376 | 0.04% | 99.96% | 344.1995 | 271.0000 |
| 2 | 5171 | 0.56% | 99.44% | 86.5834 | 75.0000 |
| 3 | 5055 | 3.64% | 96.36% | 32.5124 | 28.0000 |
| 4 | 4586 | 12.67% | 87.33% | 13.1598 | 9.0000 |
| 5 | 3923 | 36.43% | 63.57% | 5.9387 | 4.0000 |
| 6 | 2614 | 70.05% | 29.95% | 3.0524 | 3.0000 |
| 7 | 1411 | 92.42% | 7.58% | 2.4486 | 2.0000 |
| 8 | 651 | 98.62% | 1.38% | 2.3333 | 2.0000 |
| 9 | 270 | 99.26% | 0.74% | 2.0000 | 2.0000 |
| 10 | 97 | 100.00% | 0.00% | 0.0000 | 0.0000 |
| 11 | 28 | 100.00% | 0.00% | 0.0000 | 0.0000 |
| 12 | 12 | 100.00% | 0.00% | 0.0000 | 0.0000 |
| 13 | 4 | 100.00% | 0.00% | 0.0000 | 0.0000 |

### voynich_paragraphInitial

| prefix_length | total_evaluated | unique_resolution_rate | ambiguity_rate | avg_ambiguous_candidate_count | median_ambiguous_candidate_count |
| --- | --- | --- | --- | --- | --- |
| 1 | 242 | 1.24% | 98.76% | 53.8577 | 45.0000 |
| 2 | 230 | 6.52% | 93.48% | 16.7116 | 12.0000 |
| 3 | 229 | 19.21% | 80.79% | 11.3243 | 8.0000 |
| 4 | 213 | 42.25% | 57.75% | 5.8211 | 4.0000 |
| 5 | 197 | 68.02% | 31.98% | 3.6825 | 3.0000 |
| 6 | 162 | 91.36% | 8.64% | 2.7143 | 3.0000 |
| 7 | 107 | 100.00% | 0.00% | 0.0000 | 0.0000 |
| 8 | 56 | 100.00% | 0.00% | 0.0000 | 0.0000 |
| 9 | 26 | 100.00% | 0.00% | 0.0000 | 0.0000 |
| 10 | 9 | 100.00% | 0.00% | 0.0000 | 0.0000 |
| 11 | 2 | 100.00% | 0.00% | 0.0000 | 0.0000 |
| 12 | 1 | 100.00% | 0.00% | 0.0000 | 0.0000 |

### voynich_lineFinal

| prefix_length | total_evaluated | unique_resolution_rate | ambiguity_rate | avg_ambiguous_candidate_count | median_ambiguous_candidate_count |
| --- | --- | --- | --- | --- | --- |
| 1 | 5376 | 0.07% | 99.93% | 387.4576 | 244.0000 |
| 2 | 5182 | 1.06% | 98.94% | 122.9054 | 114.0000 |
| 3 | 4761 | 6.32% | 93.68% | 35.6787 | 25.0000 |
| 4 | 4074 | 21.70% | 78.30% | 11.1226 | 8.0000 |
| 5 | 3143 | 42.41% | 57.59% | 4.3138 | 4.0000 |
| 6 | 1984 | 75.96% | 24.04% | 2.4906 | 2.0000 |
| 7 | 1026 | 95.03% | 4.97% | 2.0000 | 2.0000 |
| 8 | 480 | 98.33% | 1.67% | 2.0000 | 2.0000 |
| 9 | 179 | 100.00% | 0.00% | 0.0000 | 0.0000 |
| 10 | 68 | 100.00% | 0.00% | 0.0000 | 0.0000 |
| 11 | 27 | 100.00% | 0.00% | 0.0000 | 0.0000 |
| 12 | 10 | 100.00% | 0.00% | 0.0000 | 0.0000 |
| 13 | 2 | 100.00% | 0.00% | 0.0000 | 0.0000 |

### shuffled_all

| prefix_length | total_evaluated | unique_resolution_rate | ambiguity_rate | avg_ambiguous_candidate_count | median_ambiguous_candidate_count |
| --- | --- | --- | --- | --- | --- |
| 1 | 39049 | 0.00% | 100.00% | 1799.1629 | 1629.0000 |
| 2 | 37587 | 0.12% | 99.88% | 176.0200 | 170.0000 |
| 3 | 35064 | 2.70% | 97.30% | 22.8460 | 17.0000 |
| 4 | 31465 | 24.47% | 75.53% | 5.3722 | 4.0000 |
| 5 | 24480 | 69.44% | 30.56% | 2.4560 | 2.0000 |
| 6 | 14893 | 95.23% | 4.77% | 2.0479 | 2.0000 |
| 7 | 7361 | 99.92% | 0.08% | 2.0000 | 2.0000 |
| 8 | 2883 | 100.00% | 0.00% | 0.0000 | 0.0000 |
| 9 | 1019 | 100.00% | 0.00% | 0.0000 | 0.0000 |
| 10 | 315 | 100.00% | 0.00% | 0.0000 | 0.0000 |
| 11 | 102 | 100.00% | 0.00% | 0.0000 | 0.0000 |
| 12 | 37 | 100.00% | 0.00% | 0.0000 | 0.0000 |
| 13 | 11 | 100.00% | 0.00% | 0.0000 | 0.0000 |
| 14 | 2 | 100.00% | 0.00% | 0.0000 | 0.0000 |

### reversed_all

| prefix_length | total_evaluated | unique_resolution_rate | ambiguity_rate | avg_ambiguous_candidate_count | median_ambiguous_candidate_count |
| --- | --- | --- | --- | --- | --- |
| 1 | 39049 | 0.04% | 99.96% | 1770.3673 | 1134.0000 |
| 2 | 37587 | 0.17% | 99.83% | 595.1614 | 568.0000 |
| 3 | 35064 | 1.15% | 98.85% | 214.9579 | 128.0000 |
| 4 | 31465 | 3.98% | 96.02% | 109.9819 | 48.0000 |
| 5 | 24480 | 13.32% | 86.68% | 33.1610 | 16.0000 |
| 6 | 14893 | 26.13% | 73.87% | 9.7630 | 6.0000 |
| 7 | 7361 | 54.67% | 45.33% | 4.9395 | 3.0000 |
| 8 | 2883 | 75.23% | 24.77% | 4.3291 | 3.0000 |
| 9 | 1019 | 87.24% | 12.76% | 3.3692 | 2.5000 |
| 10 | 315 | 94.29% | 5.71% | 2.0000 | 2.0000 |
| 11 | 102 | 100.00% | 0.00% | 0.0000 | 0.0000 |
| 12 | 37 | 100.00% | 0.00% | 0.0000 | 0.0000 |
| 13 | 11 | 100.00% | 0.00% | 0.0000 | 0.0000 |
| 14 | 2 | 100.00% | 0.00% | 0.0000 | 0.0000 |

## 7. Prefix-Specific Predictability

### Prefix Length 1 - Largest Families

| prefix | total_frequency | unique_token_count | entropy | top_token | top_token_probability | avg_token_length | lineInitial_rate | paragraphInitial_rate | lineFinal_rate | top5_tokens |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| o | 8915 | 1841 | 8.3544 | ol | 6.32% | 4.9457 | 14.56% | 0.06% | 17.86% | ol:563, or:392, okaiin:215, o:208, okeey:184 |
| c | 7060 | 1362 | 7.8628 | chedy | 7.20% | 5.3980 | 3.39% | 0.21% | 11.12% | chedy:508, chol:397, chey:353, chor:212, cheey:186 |
| s | 4601 | 868 | 7.0485 | shedy | 9.45% | 4.7420 | 15.34% | 0.09% | 9.50% | shedy:435, s:354, shey:278, shol:186, sheey:149 |
| q | 5401 | 837 | 7.1056 | qokeedy | 5.68% | 6.0000 | 10.09% | 0.15% | 6.72% | qokeedy:307, qokeey:307, qokain:279, qokedy:276, qokaiin:265 |
| d | 3663 | 617 | 5.7347 | daiin | 23.15% | 4.3137 | 20.61% | 0.11% | 22.30% | daiin:848, dar:323, dy:277, dal:242, dain:214 |
| y | 1993 | 591 | 7.4365 | y | 15.65% | 4.8710 | 36.03% | 0.10% | 12.95% | y:312, ykeey:57, ykaiin:46, ytaiin:39, ykar:36 |
| l | 1457 | 363 | 6.6111 | l | 13.11% | 4.5896 | 5.77% | 0.07% | 17.43% | l:191, lchedy:116, lchey:49, lkaiin:48, lshedy:40 |
| t | 1028 | 363 | 7.2356 | tol | 4.57% | 4.9854 | 39.49% | 4.86% | 7.59% | tol:47, taiin:45, tar:42, tedy:40, tchedy:33 |
| k | 1280 | 345 | 6.8563 | kaiin | 6.17% | 4.7164 | 9.22% | 3.13% | 10.39% | kaiin:79, keedy:62, kar:60, keey:56, kedy:47 |
| a | 2173 | 324 | 4.8079 | aiin | 23.52% | 3.4602 | 1.66% | 0.05% | 20.25% | aiin:511, ar:408, al:261, ain:116, am:88 |
| p | 547 | 294 | 7.5258 | pchedy | 6.58% | 6.2888 | 70.20% | 17.92% | 3.29% | pchedy:36, pol:19, pchor:12, pchedar:11, pcheol:11 |
| r | 530 | 125 | 4.7205 | r | 31.89% | 3.4415 | 5.09% | 0.00% | 23.77% | r:169, raiin:64, rain:22, rol:20, ral:18 |
| e | 143 | 96 | 6.1675 | eees | 5.59% | 4.6503 | 8.39% | 0.00% | 16.08% | eees:8, e:7, eeedy:7, eey:6, ety:6 |
| f | 120 | 83 | 6.0109 | f | 8.33% | 5.5500 | 32.50% | 10.83% | 14.17% | f:10, fchedy:9, fcheey:4, far:3, fchdy:3 |
| h | 44 | 23 | 3.7102 | hy | 34.09% | 3.1591 | 4.55% | 2.27% | 11.36% | hy:15, hey:5, ho:3, h:2, hain:1 |
| i | 21 | 19 | 4.2018 | ih | 9.52% | 4.5238 | 4.76% | 0.00% | 19.05% | ih:2, iin:2, i:1, ihar:1, ihearamom:1 |
| x | 21 | 10 | 2.4850 | x | 52.38% | 2.9048 | 23.81% | 0.00% | 19.05% | x:11, xar:2, xaloeees:1, xasashe:1, xdar:1 |
| v | 15 | 4 | 1.0389 | v | 80.00% | 1.2667 | 6.67% | 0.00% | 6.67% | v:12, vo:1, vor:1, vs:1 |
| g | 17 | 3 | 0.6402 | g | 88.24% | 1.2353 | 0.00% | 0.00% | 70.59% | g:15, giin:1, gm:1 |
| m | 12 | 2 | 0.4138 | m | 91.67% | 1.1667 | 0.00% | 0.00% | 50.00% | m:11, mol:1 |

### Prefix Length 1 - Most Concentrated Families

| prefix | total_frequency | unique_token_count | entropy | top_token | top_token_probability | avg_token_length | lineInitial_rate | paragraphInitial_rate | lineFinal_rate | top5_tokens |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| o | 8915 | 1841 | 8.3544 | ol | 6.32% | 4.9457 | 14.56% | 0.06% | 17.86% | ol:563, or:392, okaiin:215, o:208, okeey:184 |
| c | 7060 | 1362 | 7.8628 | chedy | 7.20% | 5.3980 | 3.39% | 0.21% | 11.12% | chedy:508, chol:397, chey:353, chor:212, cheey:186 |
| q | 5401 | 837 | 7.1056 | qokeedy | 5.68% | 6.0000 | 10.09% | 0.15% | 6.72% | qokeedy:307, qokeey:307, qokain:279, qokedy:276, qokaiin:265 |
| s | 4601 | 868 | 7.0485 | shedy | 9.45% | 4.7420 | 15.34% | 0.09% | 9.50% | shedy:435, s:354, shey:278, shol:186, sheey:149 |
| d | 3663 | 617 | 5.7347 | daiin | 23.15% | 4.3137 | 20.61% | 0.11% | 22.30% | daiin:848, dar:323, dy:277, dal:242, dain:214 |
| a | 2173 | 324 | 4.8079 | aiin | 23.52% | 3.4602 | 1.66% | 0.05% | 20.25% | aiin:511, ar:408, al:261, ain:116, am:88 |
| y | 1993 | 591 | 7.4365 | y | 15.65% | 4.8710 | 36.03% | 0.10% | 12.95% | y:312, ykeey:57, ykaiin:46, ytaiin:39, ykar:36 |
| l | 1457 | 363 | 6.6111 | l | 13.11% | 4.5896 | 5.77% | 0.07% | 17.43% | l:191, lchedy:116, lchey:49, lkaiin:48, lshedy:40 |
| k | 1280 | 345 | 6.8563 | kaiin | 6.17% | 4.7164 | 9.22% | 3.13% | 10.39% | kaiin:79, keedy:62, kar:60, keey:56, kedy:47 |
| t | 1028 | 363 | 7.2356 | tol | 4.57% | 4.9854 | 39.49% | 4.86% | 7.59% | tol:47, taiin:45, tar:42, tedy:40, tchedy:33 |
| r | 530 | 125 | 4.7205 | r | 31.89% | 3.4415 | 5.09% | 0.00% | 23.77% | r:169, raiin:64, rain:22, rol:20, ral:18 |
| p | 547 | 294 | 7.5258 | pchedy | 6.58% | 6.2888 | 70.20% | 17.92% | 3.29% | pchedy:36, pol:19, pchor:12, pchedar:11, pcheol:11 |
| e | 143 | 96 | 6.1675 | eees | 5.59% | 4.6503 | 8.39% | 0.00% | 16.08% | eees:8, e:7, eeedy:7, eey:6, ety:6 |
| f | 120 | 83 | 6.0109 | f | 8.33% | 5.5500 | 32.50% | 10.83% | 14.17% | f:10, fchedy:9, fcheey:4, far:3, fchdy:3 |
| g | 17 | 3 | 0.6402 | g | 88.24% | 1.2353 | 0.00% | 0.00% | 70.59% | g:15, giin:1, gm:1 |
| h | 44 | 23 | 3.7102 | hy | 34.09% | 3.1591 | 4.55% | 2.27% | 11.36% | hy:15, hey:5, ho:3, h:2, hain:1 |
| m | 12 | 2 | 0.4138 | m | 91.67% | 1.1667 | 0.00% | 0.00% | 50.00% | m:11, mol:1 |
| v | 15 | 4 | 1.0389 | v | 80.00% | 1.2667 | 6.67% | 0.00% | 6.67% | v:12, vo:1, vor:1, vs:1 |
| x | 21 | 10 | 2.4850 | x | 52.38% | 2.9048 | 23.81% | 0.00% | 19.05% | x:11, xar:2, xaloeees:1, xasashe:1, xdar:1 |
| i | 21 | 19 | 4.2018 | ih | 9.52% | 4.5238 | 4.76% | 0.00% | 19.05% | ih:2, iin:2, i:1, ihar:1, ihearamom:1 |

### Prefix Length 1 - Most Position-Biased Families

| prefix | total_frequency | unique_token_count | entropy | top_token | top_token_probability | avg_token_length | lineInitial_rate | paragraphInitial_rate | lineFinal_rate | top5_tokens |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| o | 8915 | 1841 | 8.3544 | ol | 6.32% | 4.9457 | 14.56% | 0.06% | 17.86% | ol:563, or:392, okaiin:215, o:208, okeey:184 |
| d | 3663 | 617 | 5.7347 | daiin | 23.15% | 4.3137 | 20.61% | 0.11% | 22.30% | daiin:848, dar:323, dy:277, dal:242, dain:214 |
| c | 7060 | 1362 | 7.8628 | chedy | 7.20% | 5.3980 | 3.39% | 0.21% | 11.12% | chedy:508, chol:397, chey:353, chor:212, cheey:186 |
| a | 2173 | 324 | 4.8079 | aiin | 23.52% | 3.4602 | 1.66% | 0.05% | 20.25% | aiin:511, ar:408, al:261, ain:116, am:88 |
| s | 4601 | 868 | 7.0485 | shedy | 9.45% | 4.7420 | 15.34% | 0.09% | 9.50% | shedy:435, s:354, shey:278, shol:186, sheey:149 |
| q | 5401 | 837 | 7.1056 | qokeedy | 5.68% | 6.0000 | 10.09% | 0.15% | 6.72% | qokeedy:307, qokeey:307, qokain:279, qokedy:276, qokaiin:265 |
| y | 1993 | 591 | 7.4365 | y | 15.65% | 4.8710 | 36.03% | 0.10% | 12.95% | y:312, ykeey:57, ykaiin:46, ytaiin:39, ykar:36 |
| l | 1457 | 363 | 6.6111 | l | 13.11% | 4.5896 | 5.77% | 0.07% | 17.43% | l:191, lchedy:116, lchey:49, lkaiin:48, lshedy:40 |
| k | 1280 | 345 | 6.8563 | kaiin | 6.17% | 4.7164 | 9.22% | 3.13% | 10.39% | kaiin:79, keedy:62, kar:60, keey:56, kedy:47 |
| r | 530 | 125 | 4.7205 | r | 31.89% | 3.4415 | 5.09% | 0.00% | 23.77% | r:169, raiin:64, rain:22, rol:20, ral:18 |
| p | 547 | 294 | 7.5258 | pchedy | 6.58% | 6.2888 | 70.20% | 17.92% | 3.29% | pchedy:36, pol:19, pchor:12, pchedar:11, pcheol:11 |
| t | 1028 | 363 | 7.2356 | tol | 4.57% | 4.9854 | 39.49% | 4.86% | 7.59% | tol:47, taiin:45, tar:42, tedy:40, tchedy:33 |
| e | 143 | 96 | 6.1675 | eees | 5.59% | 4.6503 | 8.39% | 0.00% | 16.08% | eees:8, e:7, eeedy:7, eey:6, ety:6 |
| f | 120 | 83 | 6.0109 | f | 8.33% | 5.5500 | 32.50% | 10.83% | 14.17% | f:10, fchedy:9, fcheey:4, far:3, fchdy:3 |
| g | 17 | 3 | 0.6402 | g | 88.24% | 1.2353 | 0.00% | 0.00% | 70.59% | g:15, giin:1, gm:1 |
| m | 12 | 2 | 0.4138 | m | 91.67% | 1.1667 | 0.00% | 0.00% | 50.00% | m:11, mol:1 |
| h | 44 | 23 | 3.7102 | hy | 34.09% | 3.1591 | 4.55% | 2.27% | 11.36% | hy:15, hey:5, ho:3, h:2, hain:1 |
| i | 21 | 19 | 4.2018 | ih | 9.52% | 4.5238 | 4.76% | 0.00% | 19.05% | ih:2, iin:2, i:1, ihar:1, ihearamom:1 |
| x | 21 | 10 | 2.4850 | x | 52.38% | 2.9048 | 23.81% | 0.00% | 19.05% | x:11, xar:2, xaloeees:1, xasashe:1, xdar:1 |
| n | 3 | 1 | 0.0000 | n | 100.00% | 1.0000 | 0.00% | 0.00% | 100.00% | n:3 |

### Prefix Length 2 - Largest Families

| prefix | total_frequency | unique_token_count | entropy | top_token | top_token_probability | avg_token_length | lineInitial_rate | paragraphInitial_rate | lineFinal_rate | top5_tokens |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| ch | 6145 | 1106 | 7.4342 | chedy | 8.27% | 5.4405 | 3.30% | 0.05% | 10.43% | chedy:508, chol:397, chey:353, chor:212, cheey:186 |
| qo | 5276 | 740 | 6.9581 | qokeedy | 5.82% | 6.0157 | 10.10% | 0.13% | 6.61% | qokeedy:307, qokeey:307, qokain:279, qokedy:276, qokaiin:265 |
| sh | 3243 | 544 | 6.4449 | shedy | 13.41% | 5.1733 | 6.44% | 0.03% | 6.07% | shedy:435, shey:278, shol:186, sheey:149, sho:126 |
| ot | 2500 | 461 | 6.4649 | otedy | 6.60% | 5.3448 | 14.00% | 0.00% | 16.28% | otedy:165, otaiin:155, otar:153, oteey:145, otal:137 |
| ok | 2544 | 397 | 6.2492 | okaiin | 8.45% | 5.3113 | 14.62% | 0.12% | 16.86% | okaiin:215, okeey:184, okal:156, okain:141, okar:140 |
| ol | 1633 | 290 | 5.3652 | ol | 34.48% | 4.4807 | 8.45% | 0.00% | 18.37% | ol:563, oly:61, olaiin:52, olkeedy:45, olchedy:39 |
| da | 2337 | 231 | 3.9505 | daiin | 36.29% | 4.4048 | 16.17% | 0.04% | 23.49% | daiin:848, dar:323, dal:242, dain:214, dair:111 |
| yk | 627 | 182 | 6.2026 | ykeey | 9.09% | 5.5120 | 27.27% | 0.16% | 12.76% | ykeey:57, ykaiin:46, ykar:36, ykeedy:33, ykchy:22 |
| op | 399 | 172 | 6.3090 | opchedy | 12.53% | 6.3885 | 15.29% | 0.00% | 22.06% | opchedy:50, opchey:30, opchdy:20, opaiin:16, opchy:14 |
| yt | 514 | 140 | 5.9279 | ytaiin | 7.59% | 5.4027 | 27.82% | 0.00% | 14.40% | ytaiin:39, yteey:31, yteedy:29, ytar:24, ytedy:24 |
| so | 342 | 136 | 5.5851 | sol | 19.59% | 4.8947 | 59.65% | 0.88% | 13.74% | sol:67, sor:51, soiin:19, soraiin:8, so:6 |
| po | 170 | 109 | 6.2360 | pol | 11.18% | 6.2412 | 82.94% | 20.00% | 2.35% | pol:19, polaiin:8, por:8, polchedy:7, podaiin:5 |
| al | 512 | 106 | 3.9385 | al | 50.98% | 3.4258 | 1.37% | 0.00% | 24.02% | al:261, aly:26, aldy:14, alam:11, alor:9 |
| dc | 295 | 103 | 5.4737 | dchedy | 9.83% | 5.7763 | 53.56% | 0.00% | 8.47% | dchedy:29, dchy:29, dchor:27, dchol:24, dchey:17 |
| ke | 426 | 101 | 5.0851 | keedy | 14.55% | 4.8732 | 2.82% | 0.70% | 7.75% | keedy:62, keey:56, kedy:47, keody:21, keol:21 |
| lk | 421 | 100 | 5.1928 | lkaiin | 11.40% | 5.4252 | 1.90% | 0.00% | 9.26% | lkaiin:48, lkeey:39, lkeedy:37, lkain:34, lkar:31 |
| do | 343 | 99 | 4.3983 | dol | 31.78% | 4.1020 | 20.70% | 0.58% | 17.20% | dol:109, dor:68, do:17, doiin:12, dody:7 |
| sa | 499 | 98 | 4.2225 | saiin | 25.45% | 4.4188 | 41.68% | 0.00% | 23.05% | saiin:127, sar:81, sain:64, sal:49, sair:29 |
| ct | 506 | 97 | 4.8056 | cthy | 20.36% | 5.1304 | 1.78% | 0.00% | 17.19% | cthy:103, cthol:56, cthey:51, cthor:43, ctho:20 |
| pc | 248 | 96 | 5.7428 | pchedy | 14.52% | 6.5887 | 59.68% | 15.32% | 4.03% | pchedy:36, pchor:12, pchedar:11, pcheol:11, pchdy:10 |

### Prefix Length 2 - Most Concentrated Families

| prefix | total_frequency | unique_token_count | entropy | top_token | top_token_probability | avg_token_length | lineInitial_rate | paragraphInitial_rate | lineFinal_rate | top5_tokens |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| ch | 6145 | 1106 | 7.4342 | chedy | 8.27% | 5.4405 | 3.30% | 0.05% | 10.43% | chedy:508, chol:397, chey:353, chor:212, cheey:186 |
| qo | 5276 | 740 | 6.9581 | qokeedy | 5.82% | 6.0157 | 10.10% | 0.13% | 6.61% | qokeedy:307, qokeey:307, qokain:279, qokedy:276, qokaiin:265 |
| da | 2337 | 231 | 3.9505 | daiin | 36.29% | 4.4048 | 16.17% | 0.04% | 23.49% | daiin:848, dar:323, dal:242, dain:214, dair:111 |
| sh | 3243 | 544 | 6.4449 | shedy | 13.41% | 5.1733 | 6.44% | 0.03% | 6.07% | shedy:435, shey:278, shol:186, sheey:149, sho:126 |
| s | 354 | 1 | 0.0000 | s | 100.00% | 1.0000 | 8.19% | 0.00% | 12.43% | s:354 |
| ok | 2544 | 397 | 6.2492 | okaiin | 8.45% | 5.3113 | 14.62% | 0.12% | 16.86% | okaiin:215, okeey:184, okal:156, okain:141, okar:140 |
| ot | 2500 | 461 | 6.4649 | otedy | 6.60% | 5.3448 | 14.00% | 0.00% | 16.28% | otedy:165, otaiin:155, otar:153, oteey:145, otal:137 |
| y | 312 | 1 | 0.0000 | y | 100.00% | 1.0000 | 23.72% | 0.00% | 15.71% | y:312 |
| ol | 1633 | 290 | 5.3652 | ol | 34.48% | 4.4807 | 8.45% | 0.00% | 18.37% | ol:563, oly:61, olaiin:52, olkeedy:45, olchedy:39 |
| ai | 895 | 82 | 2.6417 | aiin | 57.09% | 3.9866 | 0.78% | 0.11% | 11.84% | aiin:511, ain:116, air:84, aiiin:47, aiir:29 |
| o | 208 | 1 | 0.0000 | o | 100.00% | 1.0000 | 18.27% | 0.48% | 8.17% | o:208 |
| l | 191 | 1 | 0.0000 | l | 100.00% | 1.0000 | 4.71% | 0.00% | 4.71% | l:191 |
| ar | 582 | 71 | 2.3900 | ar | 70.10% | 2.8436 | 2.58% | 0.00% | 20.62% | ar:408, ary:26, aral:20, arody:12, aram:11 |
| r | 169 | 1 | 0.0000 | r | 100.00% | 1.0000 | 4.14% | 0.00% | 6.51% | r:169 |
| or | 609 | 89 | 2.8515 | or | 64.37% | 3.1757 | 11.82% | 0.00% | 18.56% | or:392, oraiin:34, orain:16, ory:16, orol:12 |
| dy | 339 | 46 | 1.6555 | dy | 81.71% | 2.6608 | 3.54% | 0.00% | 33.33% | dy:277, dyky:5, dydy:3, dykaiin:3, dys:3 |
| al | 512 | 106 | 3.9385 | al | 50.98% | 3.4258 | 1.37% | 0.00% | 24.02% | al:261, aly:26, aldy:14, alam:11, alor:9 |
| sa | 499 | 98 | 4.2225 | saiin | 25.45% | 4.4188 | 41.68% | 0.00% | 23.05% | saiin:127, sar:81, sain:64, sal:49, sair:29 |
| ct | 506 | 97 | 4.8056 | cthy | 20.36% | 5.1304 | 1.78% | 0.00% | 17.19% | cthy:103, cthol:56, cthey:51, cthor:43, ctho:20 |
| yk | 627 | 182 | 6.2026 | ykeey | 9.09% | 5.5120 | 27.27% | 0.16% | 12.76% | ykeey:57, ykaiin:46, ykar:36, ykeedy:33, ykchy:22 |

### Prefix Length 2 - Most Position-Biased Families

| prefix | total_frequency | unique_token_count | entropy | top_token | top_token_probability | avg_token_length | lineInitial_rate | paragraphInitial_rate | lineFinal_rate | top5_tokens |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| ch | 6145 | 1106 | 7.4342 | chedy | 8.27% | 5.4405 | 3.30% | 0.05% | 10.43% | chedy:508, chol:397, chey:353, chor:212, cheey:186 |
| da | 2337 | 231 | 3.9505 | daiin | 36.29% | 4.4048 | 16.17% | 0.04% | 23.49% | daiin:848, dar:323, dal:242, dain:214, dair:111 |
| ok | 2544 | 397 | 6.2492 | okaiin | 8.45% | 5.3113 | 14.62% | 0.12% | 16.86% | okaiin:215, okeey:184, okal:156, okain:141, okar:140 |
| ot | 2500 | 461 | 6.4649 | otedy | 6.60% | 5.3448 | 14.00% | 0.00% | 16.28% | otedy:165, otaiin:155, otar:153, oteey:145, otal:137 |
| qo | 5276 | 740 | 6.9581 | qokeedy | 5.82% | 6.0157 | 10.10% | 0.13% | 6.61% | qokeedy:307, qokeey:307, qokain:279, qokedy:276, qokaiin:265 |
| ol | 1633 | 290 | 5.3652 | ol | 34.48% | 4.4807 | 8.45% | 0.00% | 18.37% | ol:563, oly:61, olaiin:52, olkeedy:45, olchedy:39 |
| sh | 3243 | 544 | 6.4449 | shedy | 13.41% | 5.1733 | 6.44% | 0.03% | 6.07% | shedy:435, shey:278, shol:186, sheey:149, sho:126 |
| al | 512 | 106 | 3.9385 | al | 50.98% | 3.4258 | 1.37% | 0.00% | 24.02% | al:261, aly:26, aldy:14, alam:11, alor:9 |
| ar | 582 | 71 | 2.3900 | ar | 70.10% | 2.8436 | 2.58% | 0.00% | 20.62% | ar:408, ary:26, aral:20, arody:12, aram:11 |
| sa | 499 | 98 | 4.2225 | saiin | 25.45% | 4.4188 | 41.68% | 0.00% | 23.05% | saiin:127, sar:81, sain:64, sal:49, sair:29 |
| dy | 339 | 46 | 1.6555 | dy | 81.71% | 2.6608 | 3.54% | 0.00% | 33.33% | dy:277, dyky:5, dydy:3, dykaiin:3, dys:3 |
| or | 609 | 89 | 2.8515 | or | 64.37% | 3.1757 | 11.82% | 0.00% | 18.56% | or:392, oraiin:34, orain:16, ory:16, orol:12 |
| ai | 895 | 82 | 2.6417 | aiin | 57.09% | 3.9866 | 0.78% | 0.11% | 11.84% | aiin:511, ain:116, air:84, aiiin:47, aiir:29 |
| op | 399 | 172 | 6.3090 | opchedy | 12.53% | 6.3885 | 15.29% | 0.00% | 22.06% | opchedy:50, opchey:30, opchdy:20, opaiin:16, opchy:14 |
| ct | 506 | 97 | 4.8056 | cthy | 20.36% | 5.1304 | 1.78% | 0.00% | 17.19% | cthy:103, cthol:56, cthey:51, cthor:43, ctho:20 |
| yk | 627 | 182 | 6.2026 | ykeey | 9.09% | 5.5120 | 27.27% | 0.16% | 12.76% | ykeey:57, ykaiin:46, ykar:36, ykeedy:33, ykchy:22 |
| yt | 514 | 140 | 5.9279 | ytaiin | 7.59% | 5.4027 | 27.82% | 0.00% | 14.40% | ytaiin:39, yteey:31, yteedy:29, ytar:24, ytedy:24 |
| am | 98 | 11 | 0.8144 | am | 89.80% | 2.1939 | 0.00% | 0.00% | 73.47% | am:88, amam:1, aman:1, amchg:1, amchy:1 |
| lo | 188 | 64 | 4.5234 | lor | 20.74% | 4.0106 | 12.23% | 0.00% | 36.17% | lor:39, lol:38, lo:20, loly:6, los:5 |
| do | 343 | 99 | 4.3983 | dol | 31.78% | 4.1020 | 20.70% | 0.58% | 17.20% | dol:109, dor:68, do:17, doiin:12, dody:7 |

### Prefix Length 3 - Largest Families

| prefix | total_frequency | unique_token_count | entropy | top_token | top_token_probability | avg_token_length | lineInitial_rate | paragraphInitial_rate | lineFinal_rate | top5_tokens |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| che | 2867 | 428 | 5.8076 | chedy | 17.72% | 5.5825 | 2.16% | 0.03% | 8.86% | chedy:508, chey:353, cheey:186, cheol:173, cheor:94 |
| cho | 1703 | 323 | 5.6969 | chol | 23.31% | 5.3981 | 6.46% | 0.06% | 10.86% | chol:397, chor:212, chody:92, cho:84, chodaiin:46 |
| qok | 3113 | 248 | 5.1519 | qokeedy | 9.86% | 6.1134 | 10.02% | 0.16% | 5.81% | qokeedy:307, qokeey:307, qokain:279, qokedy:276, qokaiin:265 |
| she | 1888 | 239 | 5.0646 | shedy | 23.04% | 5.3257 | 3.28% | 0.00% | 4.66% | shedy:435, shey:278, sheey:149, sheol:108, sheedy:83 |
| qot | 1122 | 171 | 5.5280 | qotedy | 7.93% | 6.0856 | 10.87% | 0.00% | 9.00% | qotedy:89, qoty:89, qotaiin:79, qoteedy:77, qotar:64 |
| oke | 1017 | 164 | 5.0883 | okeey | 18.09% | 5.6126 | 12.39% | 0.20% | 12.09% | okeey:184, okedy:120, okeedy:111, okey:65, okeol:64 |
| sho | 773 | 162 | 4.7774 | shol | 24.06% | 4.9897 | 15.27% | 0.13% | 6.34% | shol:186, sho:126, shor:96, shody:53, shodaiin:24 |
| ote | 925 | 159 | 4.9739 | otedy | 17.84% | 5.6443 | 11.14% | 0.00% | 10.16% | otedy:165, oteey:145, oteedy:106, otey:60, oteody:41 |
| dch | 288 | 96 | 5.3727 | dchedy | 10.07% | 5.8264 | 54.86% | 0.00% | 8.33% | dchedy:29, dchy:29, dchor:27, dchol:24, dchey:17 |
| pch | 248 | 96 | 5.7428 | pchedy | 14.52% | 6.5887 | 59.68% | 15.32% | 4.03% | pchedy:36, pchor:12, pchedar:11, pcheol:11, pchdy:10 |
| ota | 776 | 92 | 3.8389 | otaiin | 19.97% | 5.0142 | 10.05% | 0.00% | 20.88% | otaiin:155, otar:153, otal:137, otain:96, otam:48 |
| dai | 1343 | 88 | 2.2114 | daiin | 63.14% | 4.8675 | 20.33% | 0.00% | 17.20% | daiin:848, dain:214, dair:111, daiir:25, daiiin:21 |
| chc | 428 | 86 | 4.1864 | chckhy | 32.71% | 6.5117 | 0.70% | 0.00% | 10.98% | chckhy:140, chcthy:81, chckhey:30, chckhdy:13, chckhedy:11 |
| oto | 292 | 86 | 4.6092 | otol | 28.08% | 5.2089 | 28.77% | 0.00% | 24.32% | otol:82, otor:40, otody:26, oto:11, otoldy:11 |
| oka | 879 | 83 | 3.6476 | okaiin | 24.46% | 5.0648 | 11.26% | 0.00% | 17.75% | okaiin:215, okal:156, okain:141, okar:140, okam:33 |
| cth | 482 | 82 | 4.5765 | cthy | 21.37% | 5.1598 | 1.87% | 0.00% | 17.01% | cthy:103, cthol:56, cthey:51, cthor:43, ctho:20 |
| yke | 294 | 82 | 4.9617 | ykeey | 19.39% | 5.8401 | 31.29% | 0.34% | 11.56% | ykeey:57, ykeedy:33, ykedy:21, ykeody:16, ykeol:15 |
| ych | 214 | 81 | 5.4642 | ycheey | 9.35% | 6.1729 | 80.84% | 0.00% | 5.14% | ycheey:20, ychey:17, ychor:15, ychedy:11, ycheo:11 |
| olk | 377 | 79 | 4.8926 | olkeedy | 11.94% | 6.2785 | 10.34% | 0.00% | 14.32% | olkeedy:45, olkeey:38, olkain:34, olkaiin:31, olkedy:26 |
| tch | 266 | 79 | 5.0962 | tchedy | 12.41% | 5.7293 | 45.11% | 4.89% | 4.51% | tchedy:33, tchy:28, tchey:22, tchor:22, tchol:18 |

### Prefix Length 3 - Most Concentrated Families

| prefix | total_frequency | unique_token_count | entropy | top_token | top_token_probability | avg_token_length | lineInitial_rate | paragraphInitial_rate | lineFinal_rate | top5_tokens |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| ol | 563 | 1 | 0.0000 | ol | 100.00% | 2.0000 | 5.68% | 0.00% | 7.64% | ol:563 |
| qok | 3113 | 248 | 5.1519 | qokeedy | 9.86% | 6.1134 | 10.02% | 0.16% | 5.81% | qokeedy:307, qokeey:307, qokain:279, qokedy:276, qokaiin:265 |
| che | 2867 | 428 | 5.8076 | chedy | 17.72% | 5.5825 | 2.16% | 0.03% | 8.86% | chedy:508, chey:353, cheey:186, cheol:173, cheor:94 |
| dai | 1343 | 88 | 2.2114 | daiin | 63.14% | 4.8675 | 20.33% | 0.00% | 17.20% | daiin:848, dain:214, dair:111, daiir:25, daiiin:21 |
| ar | 408 | 1 | 0.0000 | ar | 100.00% | 2.0000 | 1.23% | 0.00% | 7.84% | ar:408 |
| or | 392 | 1 | 0.0000 | or | 100.00% | 2.0000 | 8.67% | 0.00% | 4.59% | or:392 |
| s | 354 | 1 | 0.0000 | s | 100.00% | 1.0000 | 8.19% | 0.00% | 12.43% | s:354 |
| y | 312 | 1 | 0.0000 | y | 100.00% | 1.0000 | 23.72% | 0.00% | 15.71% | y:312 |
| she | 1888 | 239 | 5.0646 | shedy | 23.04% | 5.3257 | 3.28% | 0.00% | 4.66% | shedy:435, shey:278, sheey:149, sheol:108, sheedy:83 |
| dy | 277 | 1 | 0.0000 | dy | 100.00% | 2.0000 | 0.72% | 0.00% | 36.10% | dy:277 |
| aii | 625 | 38 | 1.2777 | aiin | 81.76% | 4.2096 | 0.32% | 0.16% | 10.24% | aiin:511, aiiin:47, aiir:29, aiiny:3, aiinal:2 |
| al | 261 | 1 | 0.0000 | al | 100.00% | 2.0000 | 0.38% | 0.00% | 11.11% | al:261 |
| cho | 1703 | 323 | 5.6969 | chol | 23.31% | 5.3981 | 6.46% | 0.06% | 10.86% | chol:397, chor:212, chody:92, cho:84, chodaiin:46 |
| o | 208 | 1 | 0.0000 | o | 100.00% | 1.0000 | 18.27% | 0.48% | 8.17% | o:208 |
| l | 191 | 1 | 0.0000 | l | 100.00% | 1.0000 | 4.71% | 0.00% | 4.71% | l:191 |
| oka | 879 | 83 | 3.6476 | okaiin | 24.46% | 5.0648 | 11.26% | 0.00% | 17.75% | okaiin:215, okal:156, okain:141, okar:140, okam:33 |
| qot | 1122 | 171 | 5.5280 | qotedy | 7.93% | 6.0856 | 10.87% | 0.00% | 9.00% | qotedy:89, qoty:89, qotaiin:79, qoteedy:77, qotar:64 |
| r | 169 | 1 | 0.0000 | r | 100.00% | 1.0000 | 4.14% | 0.00% | 6.51% | r:169 |
| oke | 1017 | 164 | 5.0883 | okeey | 18.09% | 5.6126 | 12.39% | 0.20% | 12.09% | okeey:184, okedy:120, okeedy:111, okey:65, okeol:64 |
| ota | 776 | 92 | 3.8389 | otaiin | 19.97% | 5.0142 | 10.05% | 0.00% | 20.88% | otaiin:155, otar:153, otal:137, otain:96, otam:48 |

### Prefix Length 3 - Most Position-Biased Families

| prefix | total_frequency | unique_token_count | entropy | top_token | top_token_probability | avg_token_length | lineInitial_rate | paragraphInitial_rate | lineFinal_rate | top5_tokens |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| che | 2867 | 428 | 5.8076 | chedy | 17.72% | 5.5825 | 2.16% | 0.03% | 8.86% | chedy:508, chey:353, cheey:186, cheol:173, cheor:94 |
| dai | 1343 | 88 | 2.2114 | daiin | 63.14% | 4.8675 | 20.33% | 0.00% | 17.20% | daiin:848, dain:214, dair:111, daiir:25, daiiin:21 |
| cho | 1703 | 323 | 5.6969 | chol | 23.31% | 5.3981 | 6.46% | 0.06% | 10.86% | chol:397, chor:212, chody:92, cho:84, chodaiin:46 |
| qok | 3113 | 248 | 5.1519 | qokeedy | 9.86% | 6.1134 | 10.02% | 0.16% | 5.81% | qokeedy:307, qokeey:307, qokain:279, qokedy:276, qokaiin:265 |
| ota | 776 | 92 | 3.8389 | otaiin | 19.97% | 5.0142 | 10.05% | 0.00% | 20.88% | otaiin:155, otar:153, otal:137, otain:96, otam:48 |
| oka | 879 | 83 | 3.6476 | okaiin | 24.46% | 5.0648 | 11.26% | 0.00% | 17.75% | okaiin:215, okal:156, okain:141, okar:140, okam:33 |
| oke | 1017 | 164 | 5.0883 | okeey | 18.09% | 5.6126 | 12.39% | 0.20% | 12.09% | okeey:184, okedy:120, okeedy:111, okey:65, okeol:64 |
| dal | 421 | 63 | 3.1208 | dal | 57.48% | 4.1306 | 5.94% | 0.00% | 28.03% | dal:242, daly:31, daldy:21, dals:9, dalol:7 |
| dar | 420 | 52 | 1.9019 | dar | 76.90% | 3.6071 | 16.67% | 0.24% | 25.71% | dar:323, dary:23, daram:9, daral:4, darol:3 |
| qot | 1122 | 171 | 5.5280 | qotedy | 7.93% | 6.0856 | 10.87% | 0.00% | 9.00% | qotedy:89, qoty:89, qotaiin:79, qoteedy:77, qotar:64 |
| dy | 277 | 1 | 0.0000 | dy | 100.00% | 2.0000 | 0.72% | 0.00% | 36.10% | dy:277 |
| ote | 925 | 159 | 4.9739 | otedy | 17.84% | 5.6443 | 11.14% | 0.00% | 10.16% | otedy:165, oteey:145, oteedy:106, otey:60, oteody:41 |
| she | 1888 | 239 | 5.0646 | shedy | 23.04% | 5.3257 | 3.28% | 0.00% | 4.66% | shedy:435, shey:278, sheey:149, sheol:108, sheedy:83 |
| cth | 482 | 82 | 4.5765 | cthy | 21.37% | 5.1598 | 1.87% | 0.00% | 17.01% | cthy:103, cthol:56, cthey:51, cthor:43, ctho:20 |
| oto | 292 | 86 | 4.6092 | otol | 28.08% | 5.2089 | 28.77% | 0.00% | 24.32% | otol:82, otor:40, otody:26, oto:11, otoldy:11 |
| aii | 625 | 38 | 1.2777 | aiin | 81.76% | 4.2096 | 0.32% | 0.16% | 10.24% | aiin:511, aiiin:47, aiir:29, aiiny:3, aiinal:2 |
| am | 88 | 1 | 0.0000 | am | 100.00% | 2.0000 | 0.00% | 0.00% | 72.73% | am:88 |
| oko | 238 | 58 | 4.1442 | okol | 32.77% | 4.9832 | 27.31% | 0.00% | 26.47% | okol:78, okor:35, okody:18, okoiin:8, okoldy:8 |
| dam | 91 | 4 | 0.2613 | dam | 96.70% | 3.0549 | 2.20% | 0.00% | 64.84% | dam:88, dama:1, damamm:1, damo:1 |
| lch | 317 | 61 | 3.9509 | lchedy | 36.59% | 5.7508 | 7.26% | 0.00% | 17.67% | lchedy:116, lchey:49, lchdy:18, lcheey:13, lcheedy:9 |

### Prefix Length 4 - Largest Families

| prefix | total_frequency | unique_token_count | entropy | top_token | top_token_probability | avg_token_length | lineInitial_rate | paragraphInitial_rate | lineFinal_rate | top5_tokens |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| cheo | 716 | 126 | 4.5293 | cheol | 24.16% | 5.8771 | 4.05% | 0.00% | 9.64% | cheol:173, cheor:94, cheody:91, cheo:79, cheos:37 |
| qoke | 1397 | 104 | 3.7842 | qokeedy | 21.98% | 6.3937 | 10.24% | 0.21% | 3.51% | qokeedy:307, qokeey:307, qokedy:276, qokey:108, qokeol:50 |
| chee | 477 | 72 | 3.8148 | cheey | 38.99% | 5.7694 | 2.10% | 0.21% | 4.82% | cheey:186, cheedy:59, chees:38, cheeky:25, cheeo:20 |
| otch | 292 | 70 | 4.5371 | otchy | 15.41% | 6.3116 | 21.92% | 0.00% | 11.99% | otchy:45, otchedy:35, otchdy:33, otchey:33, otchol:30 |
| okee | 498 | 66 | 3.5349 | okeey | 36.95% | 5.8112 | 12.05% | 0.20% | 9.24% | okeey:184, okeedy:111, okeeey:27, okeeo:20, okees:19 |
| opch | 218 | 65 | 4.6391 | opchedy | 22.94% | 6.8073 | 10.09% | 0.00% | 14.22% | opchedy:50, opchey:30, opchdy:20, opchy:14, opcheol:7 |
| otee | 400 | 64 | 3.5130 | oteey | 36.25% | 5.8725 | 10.25% | 0.00% | 8.75% | oteey:145, oteedy:106, oteeos:14, oteeody:13, otees:12 |
| sheo | 370 | 63 | 3.8996 | sheol | 29.19% | 5.6081 | 5.95% | 0.00% | 5.68% | sheol:108, sheody:49, sheo:48, sheor:47, sheos:13 |
| chol | 520 | 62 | 2.0472 | chol | 76.35% | 4.7135 | 4.42% | 0.00% | 6.92% | chol:397, choly:17, choldy:11, cholkaiin:5, cholor:5 |
| chok | 212 | 61 | 4.9449 | choky | 18.87% | 6.7123 | 10.38% | 0.00% | 15.57% | choky:40, chokaiin:16, chokchy:16, chokeey:12, chokain:11 |
| shee | 394 | 60 | 3.6560 | sheey | 37.82% | 5.6751 | 3.81% | 0.00% | 2.28% | sheey:149, sheedy:83, sheeky:15, shee:13, sheeol:13 |
| okch | 233 | 58 | 4.4946 | okchey | 13.73% | 6.2704 | 18.45% | 0.43% | 17.17% | okchey:32, okchy:31, okchdy:28, okchedy:24, okchor:18 |
| qote | 351 | 55 | 3.9010 | qotedy | 25.36% | 6.4387 | 8.55% | 0.00% | 4.56% | qotedy:89, qoteedy:77, qoteey:42, qotey:23, qoteol:12 |
| oteo | 206 | 49 | 4.1089 | oteody | 19.90% | 5.9563 | 16.50% | 0.00% | 11.65% | oteody:41, oteol:37, oteos:26, oteo:18, oteor:12 |
| yche | 147 | 48 | 4.6963 | ycheey | 13.61% | 6.4286 | 80.27% | 0.00% | 2.72% | ycheey:20, ychey:17, ychedy:11, ycheo:11, ycheol:11 |
| dche | 127 | 47 | 4.4159 | dchedy | 22.83% | 6.4724 | 71.65% | 0.00% | 4.72% | dchedy:29, dchey:17, dcheey:13, dcheol:8, dcheo:6 |
| ykee | 189 | 46 | 3.9704 | ykeey | 30.16% | 6.0106 | 30.69% | 0.00% | 9.52% | ykeey:57, ykeedy:33, ykeeody:13, ykeeol:10, ykeeo:7 |
| chot | 168 | 46 | 4.4916 | choty | 23.21% | 6.3631 | 8.33% | 0.00% | 14.88% | choty:39, chotchy:13, chotar:11, chotaiin:10, choteey:9 |
| ched | 699 | 45 | 1.9145 | chedy | 72.68% | 5.4378 | 1.29% | 0.00% | 8.44% | chedy:508, chedaiin:39, chedar:34, chedal:26, chedain:19 |
| olch | 155 | 44 | 4.1833 | olchedy | 25.16% | 6.6774 | 10.97% | 0.00% | 17.42% | olchedy:39, olchey:25, olcheey:11, olchdy:10, olchy:10 |

### Prefix Length 4 - Most Concentrated Families

| prefix | total_frequency | unique_token_count | entropy | top_token | top_token_probability | avg_token_length | lineInitial_rate | paragraphInitial_rate | lineFinal_rate | top5_tokens |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| ol | 563 | 1 | 0.0000 | ol | 100.00% | 2.0000 | 5.68% | 0.00% | 7.64% | ol:563 |
| daii | 948 | 41 | 0.9217 | daiin | 89.45% | 5.1086 | 19.09% | 0.00% | 17.19% | daiin:848, daiir:25, daiiin:21, daiidy:7, daiiny:4 |
| aiin | 522 | 9 | 0.2074 | aiin | 97.89% | 4.0536 | 0.38% | 0.19% | 9.96% | aiin:511, aiiny:3, aiinal:2, aiinchodar:1, aiindy:1 |
| ar | 408 | 1 | 0.0000 | ar | 100.00% | 2.0000 | 1.23% | 0.00% | 7.84% | ar:408 |
| or | 392 | 1 | 0.0000 | or | 100.00% | 2.0000 | 8.67% | 0.00% | 4.59% | or:392 |
| s | 354 | 1 | 0.0000 | s | 100.00% | 1.0000 | 8.19% | 0.00% | 12.43% | s:354 |
| dar | 323 | 1 | 0.0000 | dar | 100.00% | 3.0000 | 13.00% | 0.31% | 14.55% | dar:323 |
| y | 312 | 1 | 0.0000 | y | 100.00% | 1.0000 | 23.72% | 0.00% | 15.71% | y:312 |
| qoke | 1397 | 104 | 3.7842 | qokeedy | 21.98% | 6.3937 | 10.24% | 0.21% | 3.51% | qokeedy:307, qokeey:307, qokedy:276, qokey:108, qokeol:50 |
| dy | 277 | 1 | 0.0000 | dy | 100.00% | 2.0000 | 0.72% | 0.00% | 36.10% | dy:277 |
| qoka | 1027 | 43 | 2.7740 | qokain | 27.17% | 5.9455 | 7.79% | 0.00% | 7.40% | qokain:279, qokaiin:265, qokal:197, qokar:159, qokam:25 |
| al | 261 | 1 | 0.0000 | al | 100.00% | 2.0000 | 0.38% | 0.00% | 11.11% | al:261 |
| chey | 369 | 16 | 0.4255 | chey | 95.66% | 4.1409 | 1.90% | 0.00% | 5.96% | chey:353, cheyky:2, cheychear:1, cheyet:1, cheykaiin:1 |
| dal | 242 | 1 | 0.0000 | dal | 100.00% | 3.0000 | 3.31% | 0.00% | 20.25% | dal:242 |
| ched | 699 | 45 | 1.9145 | chedy | 72.68% | 5.4378 | 1.29% | 0.00% | 8.44% | chedy:508, chedaiin:39, chedar:34, chedal:26, chedain:19 |
| shed | 518 | 23 | 1.1813 | shedy | 83.98% | 5.2085 | 2.32% | 0.00% | 5.41% | shedy:435, shed:19, shedaiin:14, shedain:12, shedal:12 |
| o | 208 | 1 | 0.0000 | o | 100.00% | 1.0000 | 18.27% | 0.48% | 8.17% | o:208 |
| shey | 291 | 12 | 0.4149 | shey | 95.53% | 4.1375 | 2.06% | 0.00% | 4.81% | shey:278, sheyky:2, sheyr:2, sheycthy:1, sheyk:1 |
| l | 191 | 1 | 0.0000 | l | 100.00% | 1.0000 | 4.71% | 0.00% | 4.71% | l:191 |
| dain | 221 | 8 | 0.2916 | dain | 96.83% | 4.0724 | 23.08% | 0.00% | 14.03% | dain:214, dainaldy:1, dainchey:1, daindl:1, dainl:1 |

### Prefix Length 4 - Most Position-Biased Families

| prefix | total_frequency | unique_token_count | entropy | top_token | top_token_probability | avg_token_length | lineInitial_rate | paragraphInitial_rate | lineFinal_rate | top5_tokens |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| daii | 948 | 41 | 0.9217 | daiin | 89.45% | 5.1086 | 19.09% | 0.00% | 17.19% | daiin:848, daiir:25, daiiin:21, daiidy:7, daiiny:4 |
| dy | 277 | 1 | 0.0000 | dy | 100.00% | 2.0000 | 0.72% | 0.00% | 36.10% | dy:277 |
| qoka | 1027 | 43 | 2.7740 | qokain | 27.17% | 5.9455 | 7.79% | 0.00% | 7.40% | qokain:279, qokaiin:265, qokal:197, qokar:159, qokam:25 |
| cheo | 716 | 126 | 4.5293 | cheol | 24.16% | 5.8771 | 4.05% | 0.00% | 9.64% | cheol:173, cheor:94, cheody:91, cheo:79, cheos:37 |
| am | 88 | 1 | 0.0000 | am | 100.00% | 2.0000 | 0.00% | 0.00% | 72.73% | am:88 |
| otal | 221 | 37 | 2.6287 | otal | 61.99% | 4.8597 | 18.10% | 0.00% | 28.51% | otal:137, otaly:21, otaldy:8, otalaiin:4, otalal:4 |
| ched | 699 | 45 | 1.9145 | chedy | 72.68% | 5.4378 | 1.29% | 0.00% | 8.44% | chedy:508, chedaiin:39, chedar:34, chedal:26, chedain:19 |
| dam | 88 | 1 | 0.0000 | dam | 100.00% | 3.0000 | 1.14% | 0.00% | 63.64% | dam:88 |
| okal | 237 | 32 | 2.3125 | okal | 65.82% | 4.7257 | 11.81% | 0.00% | 22.78% | okal:156, okaly:23, okaldy:10, okalal:6, okalar:4 |
| aiin | 522 | 9 | 0.2074 | aiin | 97.89% | 4.0536 | 0.38% | 0.19% | 9.96% | aiin:511, aiiny:3, aiinal:2, aiinchodar:1, aiindy:1 |
| qoke | 1397 | 104 | 3.7842 | qokeedy | 21.98% | 6.3937 | 10.24% | 0.21% | 3.51% | qokeedy:307, qokeey:307, qokedy:276, qokey:108, qokeol:50 |
| dal | 242 | 1 | 0.0000 | dal | 100.00% | 3.0000 | 3.31% | 0.00% | 20.25% | dal:242 |
| y | 312 | 1 | 0.0000 | y | 100.00% | 1.0000 | 23.72% | 0.00% | 15.71% | y:312 |
| dar | 323 | 1 | 0.0000 | dar | 100.00% | 3.0000 | 13.00% | 0.31% | 14.55% | dar:323 |
| okee | 498 | 66 | 3.5349 | okeey | 36.95% | 5.8112 | 12.05% | 0.20% | 9.24% | okeey:184, okeedy:111, okeeey:27, okeeo:20, okees:19 |
| s | 354 | 1 | 0.0000 | s | 100.00% | 1.0000 | 8.19% | 0.00% | 12.43% | s:354 |
| qota | 311 | 31 | 2.9569 | qotaiin | 25.40% | 5.9003 | 3.86% | 0.00% | 13.83% | qotaiin:79, qotar:64, qotain:60, qotal:59, qotam:12 |
| ol | 563 | 1 | 0.0000 | ol | 100.00% | 2.0000 | 5.68% | 0.00% | 7.64% | ol:563 |
| oly | 61 | 1 | 0.0000 | oly | 100.00% | 3.0000 | 0.00% | 0.00% | 67.21% | oly:61 |
| okch | 233 | 58 | 4.4946 | okchey | 13.73% | 6.2704 | 18.45% | 0.43% | 17.17% | okchey:32, okchy:31, okchdy:28, okchedy:24, okchor:18 |

### Filtered Position Bias Ranking (Prefix Length 2-3, Total Frequency >= 50)

| rank | prefix | prefix_length | total_frequency | unique_token_count | family_entropy | position_bias | paragraph_initial | line_initial | line_final | P(suffix|prefix) top |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | ysh | 3 | 81 | 40 | 4.7087 | 91.36% | 0.00% | 91.36% | 0.00% | y:25 (30.86%), dy:16 (19.75%), or:7 (8.64%), aiin:4 (4.94%), ar:4 (4.94%), ho:4 (4.94%), od:3 (3.70%), ol:3 (3.70%) |
| 2 | ys | 2 | 89 | 45 | 4.9013 | 87.64% | 0.00% | 87.64% | 0.00% | y:25 (28.09%), dy:16 (17.98%), aiin:8 (8.99%), or:7 (7.87%), ar:5 (5.62%), ho:4 (4.49%), ol:4 (4.49%), ir:3 (3.37%) |
| 3 | pol | 3 | 91 | 50 | 4.9131 | 85.71% | 13.19% | 85.71% | 0.00% | ol:22 (24.18%), y:18 (19.78%), dy:16 (17.58%), aiin:11 (12.09%), al:5 (5.49%), ar:4 (4.40%), or:4 (4.40%), ain:2 (2.20%) |
| 4 | po | 2 | 170 | 109 | 6.2360 | 82.94% | 20.00% | 82.94% | 2.35% | y:32 (18.82%), dy:25 (14.71%), ol:24 (14.12%), aiin:22 (12.94%), or:17 (10.00%), ar:12 (7.06%), al:9 (5.29%), ir:6 (3.53%) |
| 5 | ych | 3 | 214 | 81 | 5.4642 | 80.84% | 0.00% | 80.84% | 5.14% | y:65 (30.37%), dy:25 (11.68%), or:24 (11.21%), ol:23 (10.75%), eo:19 (8.88%), aiin:9 (4.21%), ain:9 (4.21%), ar:9 (4.21%) |
| 6 | yc | 2 | 224 | 90 | 5.6228 | 79.46% | 0.00% | 79.46% | 5.80% | y:69 (30.80%), dy:27 (12.05%), ol:24 (10.71%), or:24 (10.71%), eo:19 (8.48%), aiin:10 (4.46%), ar:10 (4.46%), ain:9 (4.02%) |
| 7 | am | 2 | 98 | 11 | 0.8144 | 73.47% | 0.00% | 0.00% | 73.47% | am:89 (90.82%), y:2 (2.04%), an:1 (1.02%), dy:1 (1.02%), hg:1 (1.02%), md:1 (1.02%), mg:1 (1.02%), od:1 (1.02%) |
| 8 | am | 3 | 88 | 1 | 0.0000 | 72.73% | 0.00% | 0.00% | 72.73% | am:88 (100.00%) |
| 9 | dsh | 3 | 139 | 38 | 4.2091 | 72.66% | 0.00% | 72.66% | 2.16% | dy:48 (34.53%), y:34 (24.46%), or:16 (11.51%), ol:13 (9.35%), ho:8 (5.76%), al:5 (3.60%), eo:3 (2.16%), es:3 (2.16%) |
| 10 | ds | 2 | 143 | 41 | 4.3174 | 71.33% | 0.00% | 71.33% | 3.50% | dy:48 (33.57%), y:36 (25.17%), or:16 (11.19%), ol:13 (9.09%), ho:8 (5.59%), al:5 (3.50%), eo:3 (2.10%), es:3 (2.10%) |
| 11 | ts | 2 | 86 | 46 | 4.9933 | 68.60% | 16.28% | 68.60% | 3.49% | dy:22 (25.58%), y:20 (23.26%), ol:8 (9.30%), or:7 (8.14%), ar:6 (6.98%), ho:5 (5.81%), ed:3 (3.49%), aiin:2 (2.33%) |
| 12 | tsh | 3 | 86 | 46 | 4.9933 | 68.60% | 16.28% | 68.60% | 3.49% | dy:22 (25.58%), y:20 (23.26%), ol:8 (9.30%), or:7 (8.14%), ar:6 (6.98%), ho:5 (5.81%), ed:3 (3.49%), aiin:2 (2.33%) |
| 13 | oly | 3 | 63 | 3 | 0.2348 | 66.67% | 0.00% | 0.00% | 66.67% | y:62 (98.41%), ol:1 (1.59%) |
| 14 | dam | 3 | 91 | 4 | 0.2613 | 64.84% | 0.00% | 2.20% | 64.84% | am:88 (96.70%), ma:1 (1.10%), mm:1 (1.10%), mo:1 (1.10%) |
| 15 | sor | 3 | 74 | 13 | 1.8574 | 63.51% | 2.70% | 63.51% | 14.86% | or:51 (68.92%), aiin:8 (10.81%), y:7 (9.46%), al:3 (4.05%), ain:2 (2.70%), ir:1 (1.35%), ls:1 (1.35%), rl:1 (1.35%) |
| 16 | tol | 3 | 86 | 33 | 3.2278 | 60.47% | 8.14% | 60.47% | 8.14% | ol:51 (59.30%), y:13 (15.12%), dy:6 (6.98%), or:4 (4.65%), ain:3 (3.49%), hd:3 (3.49%), al:2 (2.33%), aiin:1 (1.16%) |
| 17 | to | 2 | 214 | 96 | 5.4286 | 59.81% | 6.07% | 59.81% | 8.88% | ol:55 (25.70%), y:40 (18.69%), or:32 (14.95%), dy:22 (10.28%), aiin:14 (6.54%), ain:8 (3.74%), ar:8 (3.74%), al:5 (2.34%) |
| 18 | sol | 3 | 134 | 43 | 3.5608 | 59.70% | 0.75% | 59.70% | 11.19% | ol:71 (52.99%), dy:18 (13.43%), y:16 (11.94%), aiin:6 (4.48%), ain:3 (2.24%), ls:3 (2.24%), al:2 (1.49%), am:2 (1.49%) |
| 19 | pc | 2 | 248 | 96 | 5.7428 | 59.68% | 15.32% | 59.68% | 4.03% | dy:69 (27.82%), y:35 (14.11%), ar:33 (13.31%), or:22 (8.87%), ol:21 (8.47%), aiin:15 (6.05%), al:14 (5.65%), ir:7 (2.82%) |
| 20 | pch | 3 | 248 | 96 | 5.7428 | 59.68% | 15.32% | 59.68% | 4.03% | dy:69 (27.82%), y:35 (14.11%), ar:33 (13.31%), or:22 (8.87%), ol:21 (8.47%), aiin:15 (6.05%), al:14 (5.65%), ir:7 (2.82%) |

## 8. Length-Controlled Predictability

### Dataset: voynich

| prefix_length | short_entropy | short_candidates | medium_entropy | medium_candidates | long_entropy | long_candidates |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | 4.3693 | 115.0944 | 6.9240 | 649.8719 | 7.5675 | 324.2518 |
| 2 | 2.6748 | 29.7467 | 5.4767 | 286.0167 | 6.2147 | 191.4072 |
| 3 | 1.0548 | 6.2255 | 3.9073 | 83.3256 | 4.4970 | 62.9445 |
| 4 | 0.0000 | 1.0000 | 2.3493 | 21.5124 | 2.6937 | 15.3888 |
| 5 | - | - | 0.8587 | 5.3307 | 1.4732 | 5.6663 |
| 6 | - | - | 0.1834 | 1.4809 | 0.7710 | 2.7496 |
| 7 | - | - | 0.0000 | 1.0000 | 0.3512 | 1.6015 |
| 8 | - | - | - | - | 0.0505 | 1.0857 |
| 9 | - | - | - | - | 0.0066 | 1.0069 |
| 10 | - | - | - | - | 0.0063 | 1.0063 |
| 11 | - | - | - | - | 0.0000 | 1.0000 |
| 12 | - | - | - | - | 0.0000 | 1.0000 |
| 13 | - | - | - | - | 0.0000 | 1.0000 |
| 14 | - | - | - | - | 0.0000 | 1.0000 |

| prefix_length | short_top1 | short_top3 | short_top5 | medium_top1 | medium_top3 | medium_top5 | long_top1 | long_top3 | long_top5 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 21.84% | 45.62% | 57.63% | 12.86% | 22.29% | 29.72% | 5.20% | 11.65% | 15.33% |
| 2 | 42.65% | 70.24% | 82.54% | 19.07% | 33.87% | 43.95% | 9.75% | 20.67% | 27.23% |
| 3 | 73.64% | 95.70% | 98.54% | 29.19% | 51.20% | 62.90% | 21.68% | 37.70% | 46.41% |
| 4 | 100.00% | 100.00% | 100.00% | 47.46% | 76.37% | 85.95% | 40.48% | 61.08% | 70.93% |
| 5 | - | - | - | 77.95% | 94.37% | 97.69% | 60.56% | 82.90% | 90.22% |
| 6 | - | - | - | 94.80% | 99.64% | 99.98% | 77.07% | 94.10% | 97.95% |
| 7 | - | - | - | 100.00% | 100.00% | 100.00% | 88.21% | 98.89% | 99.93% |
| 8 | - | - | - | - | - | - | 98.06% | 100.00% | 100.00% |
| 9 | - | - | - | - | - | - | 99.71% | 100.00% | 100.00% |
| 10 | - | - | - | - | - | - | 99.68% | 100.00% | 100.00% |
| 11 | - | - | - | - | - | - | 100.00% | 100.00% | 100.00% |
| 12 | - | - | - | - | - | - | 100.00% | 100.00% | 100.00% |
| 13 | - | - | - | - | - | - | 100.00% | 100.00% | 100.00% |
| 14 | - | - | - | - | - | - | 100.00% | 100.00% | 100.00% |

| prefix_length | short_unique_resolution | short_ambiguity | medium_unique_resolution | medium_ambiguity | long_unique_resolution | long_ambiguity |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | 0.04% | 99.96% | 0.01% | 99.99% | 0.07% | 99.93% |
| 2 | 0.85% | 99.15% | 0.13% | 99.87% | 0.90% | 99.10% |
| 3 | 7.78% | 92.22% | 1.13% | 98.87% | 3.95% | 96.05% |
| 4 | 100.00% | 0.00% | 3.44% | 96.56% | 12.31% | 87.69% |
| 5 | - | - | 24.62% | 75.38% | 28.79% | 71.21% |
| 6 | - | - | 68.78% | 31.22% | 47.69% | 52.31% |
| 7 | - | - | 100.00% | 0.00% | 67.12% | 32.88% |
| 8 | - | - | - | - | 92.85% | 7.15% |
| 9 | - | - | - | - | 99.31% | 0.69% |
| 10 | - | - | - | - | 99.37% | 0.63% |
| 11 | - | - | - | - | 100.00% | 0.00% |
| 12 | - | - | - | - | 100.00% | 0.00% |
| 13 | - | - | - | - | 100.00% | 0.00% |
| 14 | - | - | - | - | 100.00% | 0.00% |

### Dataset: shuffled

| prefix_length | short_entropy | short_candidates | medium_entropy | medium_candidates | long_entropy | long_candidates |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | 6.1856 | 259.6762 | 10.0438 | 1388.6806 | 7.6790 | 236.8370 |
| 2 | 3.3486 | 28.7423 | 6.5216 | 139.8759 | 4.0466 | 21.8928 |
| 3 | 1.2200 | 3.8930 | 3.4384 | 18.0428 | 1.2576 | 3.0562 |
| 4 | 0.0000 | 1.0000 | 1.2638 | 3.5408 | 0.1966 | 1.2130 |
| 5 | - | - | 0.3244 | 1.4220 | 0.0291 | 1.0291 |
| 6 | - | - | 0.0465 | 1.0482 | 0.0042 | 1.0042 |
| 7 | - | - | 0.0000 | 1.0000 | 0.0000 | 1.0000 |
| 8 | - | - | - | - | 0.0000 | 1.0000 |
| 9 | - | - | - | - | 0.0000 | 1.0000 |
| 10 | - | - | - | - | 0.0000 | 1.0000 |
| 11 | - | - | - | - | 0.0000 | 1.0000 |
| 12 | - | - | - | - | 0.0000 | 1.0000 |
| 13 | - | - | - | - | 0.0000 | 1.0000 |
| 14 | - | - | - | - | 0.0000 | 1.0000 |

| prefix_length | short_top1 | short_top3 | short_top5 | medium_top1 | medium_top3 | medium_top5 | long_top1 | long_top3 | long_top5 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 14.94% | 29.36% | 35.20% | 0.80% | 2.21% | 3.46% | 0.69% | 2.01% | 3.30% |
| 2 | 34.34% | 57.81% | 69.23% | 5.00% | 12.11% | 17.26% | 9.75% | 24.70% | 37.11% |
| 3 | 65.68% | 93.45% | 98.56% | 22.47% | 45.16% | 57.80% | 52.45% | 86.26% | 95.87% |
| 4 | 100.00% | 100.00% | 100.00% | 59.83% | 87.06% | 94.98% | 90.63% | 99.86% | 100.00% |
| 5 | - | - | - | 87.49% | 99.56% | 99.99% | 98.54% | 100.00% | 100.00% |
| 6 | - | - | - | 97.86% | 100.00% | 100.00% | 99.79% | 100.00% | 100.00% |
| 7 | - | - | - | 100.00% | 100.00% | 100.00% | 100.00% | 100.00% | 100.00% |
| 8 | - | - | - | - | - | - | 100.00% | 100.00% | 100.00% |
| 9 | - | - | - | - | - | - | 100.00% | 100.00% | 100.00% |
| 10 | - | - | - | - | - | - | 100.00% | 100.00% | 100.00% |
| 11 | - | - | - | - | - | - | 100.00% | 100.00% | 100.00% |
| 12 | - | - | - | - | - | - | 100.00% | 100.00% | 100.00% |
| 13 | - | - | - | - | - | - | 100.00% | 100.00% | 100.00% |
| 14 | - | - | - | - | - | - | 100.00% | 100.00% | 100.00% |

| prefix_length | short_unique_resolution | short_ambiguity | medium_unique_resolution | medium_ambiguity | long_unique_resolution | long_ambiguity |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | 0.09% | 99.91% | 0.00% | 100.00% | 0.03% | 99.97% |
| 2 | 0.52% | 99.48% | 0.18% | 99.82% | 1.87% | 98.13% |
| 3 | 13.61% | 86.39% | 4.00% | 96.00% | 30.00% | 70.00% |
| 4 | 100.00% | 0.00% | 29.82% | 70.18% | 82.41% | 17.59% |
| 5 | - | - | 69.73% | 30.27% | 97.09% | 2.91% |
| 6 | - | - | 95.24% | 4.76% | 99.58% | 0.42% |
| 7 | - | - | 100.00% | 0.00% | 100.00% | 0.00% |
| 8 | - | - | - | - | 100.00% | 0.00% |
| 9 | - | - | - | - | 100.00% | 0.00% |
| 10 | - | - | - | - | 100.00% | 0.00% |
| 11 | - | - | - | - | 100.00% | 0.00% |
| 12 | - | - | - | - | 100.00% | 0.00% |
| 13 | - | - | - | - | 100.00% | 0.00% |
| 14 | - | - | - | - | 100.00% | 0.00% |

### Dataset: reversed

| prefix_length | short_entropy | short_candidates | medium_entropy | medium_candidates | long_entropy | long_candidates |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | 4.7843 | 146.6740 | 7.7164 | 1180.1820 | 8.4801 | 661.9074 |
| 2 | 3.1201 | 36.3846 | 6.2301 | 374.5784 | 7.1660 | 303.3212 |
| 3 | 1.1544 | 5.2684 | 4.6139 | 125.4944 | 5.6429 | 144.6674 |
| 4 | 0.0000 | 1.0000 | 3.0703 | 48.3131 | 4.3850 | 93.5106 |
| 5 | - | - | 1.5087 | 10.6942 | 2.8323 | 28.9202 |
| 6 | - | - | 0.6443 | 2.7241 | 1.6622 | 9.3094 |
| 7 | - | - | 0.0000 | 1.0000 | 0.8500 | 3.6930 |
| 8 | - | - | - | - | 0.3121 | 1.8245 |
| 9 | - | - | - | - | 0.1583 | 1.3023 |
| 10 | - | - | - | - | 0.0492 | 1.0571 |
| 11 | - | - | - | - | 0.0000 | 1.0000 |
| 12 | - | - | - | - | 0.0000 | 1.0000 |
| 13 | - | - | - | - | 0.0000 | 1.0000 |
| 14 | - | - | - | - | 0.0000 | 1.0000 |

| prefix_length | short_top1 | short_top3 | short_top5 | medium_top1 | medium_top3 | medium_top5 | long_top1 | long_top3 | long_top5 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 18.83% | 38.66% | 50.23% | 8.52% | 17.34% | 23.47% | 3.92% | 9.23% | 11.86% |
| 2 | 34.29% | 65.38% | 77.48% | 13.73% | 27.16% | 35.82% | 6.94% | 14.81% | 19.22% |
| 3 | 68.06% | 95.23% | 98.63% | 23.46% | 42.36% | 53.25% | 13.77% | 26.92% | 33.89% |
| 4 | 100.00% | 100.00% | 100.00% | 39.79% | 64.69% | 74.21% | 23.76% | 42.11% | 50.43% |
| 5 | - | - | - | 63.78% | 88.35% | 94.21% | 39.75% | 62.78% | 72.04% |
| 6 | - | - | - | 79.49% | 98.48% | 99.59% | 59.21% | 80.44% | 87.86% |
| 7 | - | - | - | 100.00% | 100.00% | 100.00% | 76.17% | 93.24% | 96.46% |
| 8 | - | - | - | - | - | - | 91.02% | 98.40% | 99.24% |
| 9 | - | - | - | - | - | - | 95.09% | 99.41% | 99.71% |
| 10 | - | - | - | - | - | - | 98.10% | 100.00% | 100.00% |
| 11 | - | - | - | - | - | - | 100.00% | 100.00% | 100.00% |
| 12 | - | - | - | - | - | - | 100.00% | 100.00% | 100.00% |
| 13 | - | - | - | - | - | - | 100.00% | 100.00% | 100.00% |
| 14 | - | - | - | - | - | - | 100.00% | 100.00% | 100.00% |

| prefix_length | short_unique_resolution | short_ambiguity | medium_unique_resolution | medium_ambiguity | long_unique_resolution | long_ambiguity |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | 0.12% | 99.88% | 0.00% | 100.00% | 0.07% | 99.93% |
| 2 | 0.60% | 99.40% | 0.16% | 99.84% | 1.18% | 98.82% |
| 3 | 6.28% | 93.72% | 1.16% | 98.84% | 3.85% | 96.15% |
| 4 | 100.00% | 0.00% | 3.77% | 96.23% | 9.40% | 90.60% |
| 5 | - | - | 15.22% | 84.78% | 19.29% | 80.71% |
| 6 | - | - | 36.34% | 63.66% | 32.02% | 67.98% |
| 7 | - | - | 100.00% | 0.00% | 49.84% | 50.16% |
| 8 | - | - | - | - | 75.23% | 24.77% |
| 9 | - | - | - | - | 87.24% | 12.76% |
| 10 | - | - | - | - | 94.29% | 5.71% |
| 11 | - | - | - | - | 100.00% | 0.00% |
| 12 | - | - | - | - | 100.00% | 0.00% |
| 13 | - | - | - | - | 100.00% | 0.00% |
| 14 | - | - | - | - | 100.00% | 0.00% |

## 9. Prefix-Suffix Coupling

### 2-char Prefix -> 2-char Suffix

Top 30 strongest prefix→suffix couplings

| prefix | suffix | count | p(suffix|prefix) | p(prefix|suffix) |
| --- | --- | --- | --- | --- |
| qo | dy | 1270 | 0.2537 | 0.1965 |
| ch | dy | 1143 | 0.1967 | 0.1768 |
| da | in | 1106 | 0.6732 | 0.1897 |
| qo | in | 903 | 0.1804 | 0.1549 |
| ch | ey | 813 | 0.1399 | 0.2040 |
| sh | dy | 763 | 0.2589 | 0.1180 |
| qo | ey | 709 | 0.1416 | 0.1779 |
| ch | ol | 683 | 0.1175 | 0.2789 |
| ai | in | 558 | 0.8254 | 0.0957 |
| ch | hy | 540 | 0.0929 | 0.2764 |
| sh | ey | 533 | 0.1809 | 0.1337 |
| ot | dy | 513 | 0.2183 | 0.0794 |
| ch | in | 483 | 0.0831 | 0.0829 |
| ok | dy | 441 | 0.1822 | 0.0682 |
| ok | in | 422 | 0.1744 | 0.0724 |
| ch | or | 409 | 0.0704 | 0.2664 |
| ok | ey | 351 | 0.1450 | 0.0881 |
| sh | ol | 348 | 0.1181 | 0.1421 |
| ch | ar | 330 | 0.0568 | 0.1796 |
| ot | in | 328 | 0.1396 | 0.0563 |
| qo | ar | 319 | 0.0637 | 0.1737 |
| qo | ol | 315 | 0.0629 | 0.1286 |
| qo | al | 313 | 0.0625 | 0.2119 |
| ot | ey | 290 | 0.1234 | 0.0728 |
| sh | hy | 260 | 0.0882 | 0.1331 |
| ol | dy | 249 | 0.2570 | 0.0385 |
| qo | hy | 247 | 0.0493 | 0.1264 |
| ch | al | 236 | 0.0406 | 0.1598 |
| ot | ar | 234 | 0.0996 | 0.1274 |
| ok | al | 215 | 0.0888 | 0.1456 |

Top 30 most selective prefixes (high frequency + low suffix entropy)

| prefix | total | suffix_entropy | top_suffixes |
| --- | --- | --- | --- |
| ch | 5811 | 3.9543 | dy:1143, ey:813, ol:683, hy:540, in:483, or:409, ar:330, al:236, ky:185, eo:113 |
| qo | 5006 | 3.5733 | dy:1270, in:903, ey:709, ar:319, ol:315, al:313, hy:247, or:160, ky:158, ty:91 |
| sh | 2947 | 3.6428 | dy:763, ey:533, ol:348, hy:260, in:175, or:168, ar:108, al:91, ky:90, eo:62 |
| ok | 2420 | 3.7672 | dy:441, in:422, ey:351, al:215, ar:198, ol:192, or:102, hy:81, am:59, ly:51 |
| da | 1643 | 2.2776 | in:1106, ir:136, dy:87, ly:35, ry:32, al:30, am:25, ar:18, ol:16, hy:15 |
| ot | 2350 | 3.8005 | dy:513, in:328, ey:290, ar:234, al:190, ol:180, or:93, am:83, hy:75, os:56 |
| ai | 676 | 1.3603 | in:558, ir:29, dy:14, hy:12, al:6, am:6, ar:5, ly:5, od:5, ol:5 |
| ol | 969 | 3.5701 | dy:249, in:172, ey:153, ar:63, or:48, ol:46, hy:38, al:33, am:29, ky:27 |
| yk | 597 | 3.7855 | dy:128, ey:87, in:78, ol:54, ar:49, hy:39, or:31, al:16, eo:13, am:12 |
| ct | 492 | 3.6554 | hy:114, ol:71, ey:69, or:48, dy:46, in:23, ar:22, ho:20, al:12, es:7 |
| yt | 483 | 3.6550 | dy:123, in:67, ey:65, ar:41, or:33, ol:29, hy:24, al:21, am:14, ly:8 |
| lk | 394 | 2.9869 | dy:115, in:91, ey:70, ar:35, ol:19, al:10, or:9, am:7, ed:6, eo:6 |
| ke | 398 | 3.0325 | dy:162, ey:78, ol:39, ar:15, or:15, hy:14, in:13, eo:12, al:10, ed:6 |
| sa | 348 | 2.6947 | in:200, ir:34, dy:16, al:14, ry:13, ar:9, ol:9, ly:7, hy:6, am:4 |
| lc | 316 | 2.7410 | dy:154, ey:64, hy:13, ol:12, al:11, or:8, am:7, ar:7, ho:7, ed:6 |
| op | 387 | 3.8882 | dy:99, in:52, ey:44, al:24, ar:24, or:21, ol:20, hy:18, am:15, ir:8 |
| dc | 292 | 3.6668 | dy:56, hy:44, ey:38, ol:35, or:33, in:17, os:10, ar:8, eo:7, ho:7 |
| ka | 191 | 2.1897 | in:128, ir:14, dy:10, ry:6, al:4, am:3, ar:3, im:3, ol:3, hy:2 |
| tc | 265 | 3.5370 | dy:67, hy:34, ey:31, or:29, ol:28, in:14, ho:11, ar:10, os:7, al:5 |
| pc | 248 | 3.4823 | dy:69, ar:33, in:24, or:22, ol:21, ey:15, al:14, hy:13, ir:7, ho:4 |
| kc | 251 | 3.6550 | dy:56, hy:38, ol:32, or:29, ey:27, in:11, ar:8, ho:8, al:4, od:4 |
| od | 204 | 3.0649 | in:93, ar:25, al:19, or:9, dy:8, am:7, ey:7, ir:7, ly:4, an:3 |
| te | 201 | 3.0338 | dy:81, ey:26, ol:23, in:19, ar:11, al:7, or:6, am:5, eo:4, os:3 |
| yc | 223 | 3.8123 | ey:41, dy:27, ol:24, or:24, eo:19, in:19, hy:17, ar:10, es:5, od:5 |
| ck | 192 | 3.3344 | hy:45, ey:43, ol:28, dy:20, or:11, in:7, al:6, os:6, ar:5, am:3 |
| ra | 127 | 1.8891 | in:92, ir:5, ry:5, hy:4, al:3, am:3, ly:3, ty:2, dy:1, ey:1 |
| so | 208 | 3.8305 | in:63, dy:31, ey:19, ar:10, hy:9, al:8, ol:8, es:6, ir:5, ly:5 |
| al | 210 | 4.0830 | dy:37, in:30, am:19, ar:17, ey:16, or:14, hy:10, ol:10, al:9, ky:6 |
| or | 193 | 3.7847 | in:57, ol:17, am:14, ey:14, al:13, or:12, ar:11, dy:11, hy:6, ir:5 |
| oc | 180 | 3.5233 | dy:39, hy:36, ey:31, or:14, ol:11, in:9, ar:5, al:4, os:4, am:3 |

Top 30 most selective suffixes (high frequency + low prefix entropy)

| suffix | total | prefix_entropy | top_prefixes |
| --- | --- | --- | --- |
| dy | 6464 | 4.2636 | qo:1270, ch:1143, sh:763, ot:513, ok:441, ol:249, ke:162, lc:154, yk:128, yt:123 |
| in | 5829 | 4.3434 | da:1106, qo:903, ai:558, ch:483, ok:422, ot:328, sa:200, sh:175, ol:172, ka:128 |
| ey | 3986 | 4.0955 | ch:813, qo:709, sh:533, ok:351, ot:290, ol:153, yk:87, ke:78, lk:70, ct:69 |
| ol | 2449 | 3.9438 | ch:683, sh:348, qo:315, ok:192, ot:180, ct:71, yk:54, ol:46, ke:39, dc:35 |
| hy | 1954 | 4.1576 | ch:540, sh:260, qo:247, ct:114, ok:81, ot:75, ck:45, dc:44, yk:39, kc:38 |
| ar | 1837 | 4.3151 | ch:330, qo:319, ot:234, ok:198, sh:108, ol:63, yk:49, yt:41, lk:35, pc:33 |
| al | 1477 | 4.0607 | qo:313, ch:236, ok:215, ot:190, sh:91, ol:33, da:30, op:24, ar:21, yt:21 |
| or | 1535 | 4.3075 | ch:409, sh:168, qo:160, ok:102, ot:93, ct:48, ol:48, dc:33, yt:33, yk:31 |
| ky | 559 | 2.9943 | ch:185, qo:158, sh:90, ol:27, ot:10, da:8, al:6, dc:5, dy:5, ok:5 |
| am | 560 | 4.4582 | ch:84, ot:83, ok:59, qo:54, ol:29, sh:26, da:25, al:19, op:15, ar:14 |
| ir | 540 | 4.4875 | da:136, qo:50, ot:37, sa:34, ok:31, ai:29, ch:17, ka:14, ol:13, ta:13 |
| eo | 447 | 3.8405 | ch:113, sh:62, qo:57, ok:44, ot:33, yc:19, yk:13, ke:12, ol:9, dc:7 |
| ly | 410 | 4.5229 | ch:66, ok:51, ot:41, qo:40, da:35, sh:17, yk:12, ol:11, yt:8, ar:7 |
| ty | 273 | 2.7224 | ch:99, qo:91, sh:33, lo:5, dy:4, ot:4, da:3, ol:3, dc:2, ls:2 |
| os | 353 | 4.0246 | ch:97, ot:56, ok:30, sh:27, qo:22, dc:10, yk:10, yt:8, tc:7, ck:6 |
| es | 343 | 4.1807 | ch:91, sh:30, ok:28, qo:28, ot:27, oe:23, ee:9, ol:9, yk:8, ct:7 |
| ed | 203 | 4.1471 | qo:41, ch:30, sh:27, ot:14, ol:11, ok:9, ke:6, lc:6, lk:6, op:4 |
| ry | 216 | 4.7019 | ch:33, da:32, ok:17, sa:13, ot:12, qo:8, do:6, ka:6, sh:6, op:5 |
| ho | 207 | 4.6139 | qo:25, ct:20, ch:15, ok:14, ot:13, tc:11, sh:9, ds:8, kc:8, ks:8 |
| od | 183 | 4.3221 | qo:29, ch:26, sh:25, ok:13, ot:12, ct:6, ai:5, yc:5, yk:5, kc:4 |
| om | 129 | 4.3028 | ch:30, ok:12, qo:11, sh:10, da:7, ot:6, al:5, ct:5, ol:4, ar:3 |
| an | 87 | 3.9451 | ch:23, qo:10, ok:9, sh:7, ot:5, kc:3, od:3, yk:3, ct:2, ol:2 |
| ls | 80 | 4.2070 | ch:18, da:12, sh:5, ok:4, so:4, sa:3, yk:3, al:2, ct:2, of:2 |
| oy | 72 | 4.0271 | ch:16, ok:8, sh:7, qo:6, ot:5, ke:3, yt:3, cp:2, ds:2, kc:2 |
| sy | 74 | 4.6690 | ch:10, ot:7, ol:6, ok:5, da:4, qo:4, sh:4, kc:2, op:2, or:2 |
| hd | 59 | 3.6532 | qo:15, ch:9, ok:7, ot:4, to:3, da:2, dl:2, fc:2, ks:2, op:2 |
| ek | 25 | 1.2906 | sh:14, ch:9, qo:2 |
| im | 46 | 3.6741 | da:14, ch:3, ka:3, ok:3, qo:3, sa:3, ai:2, op:2, ot:2, yp:2 |
| as | 45 | 3.6240 | qo:9, ch:7, ot:6, ok:5, sh:3, od:2, yt:2, ar:1, da:1, do:1 |
| py | 35 | 2.7692 | ch:15, qo:8, ka:1, kc:1, ko:1, op:1, qe:1, ra:1, sh:1, ts:1 |

### 3-char Prefix -> 3-char Suffix

Top 30 strongest prefix→suffix couplings

| prefix | suffix | count | p(suffix|prefix) | p(prefix|suffix) |
| --- | --- | --- | --- | --- |
| qok | edy | 654 | 0.2894 | 0.2447 |
| qok | eey | 340 | 0.1504 | 0.3520 |
| qok | iin | 295 | 0.1305 | 0.1249 |
| qok | ain | 293 | 0.1296 | 0.3810 |
| oka | iin | 228 | 0.7059 | 0.0966 |
| qot | edy | 204 | 0.2702 | 0.0763 |
| ota | iin | 164 | 0.6165 | 0.0695 |
| chc | khy | 140 | 0.3373 | 0.3406 |
| lch | edy | 129 | 0.6582 | 0.0483 |
| oke | edy | 127 | 0.2900 | 0.0475 |
| cho | iin | 121 | 0.1759 | 0.0512 |
| ote | edy | 114 | 0.2836 | 0.0426 |
| che | ody | 113 | 0.1073 | 0.1405 |
| che | iin | 108 | 0.1026 | 0.0457 |
| she | edy | 102 | 0.1799 | 0.0382 |
| qot | iin | 98 | 0.1298 | 0.0415 |
| qok | chy | 92 | 0.0407 | 0.1905 |
| che | edy | 89 | 0.0845 | 0.0333 |
| olk | edy | 82 | 0.2898 | 0.0307 |
| chc | thy | 81 | 0.1952 | 0.3227 |
| oda | iin | 74 | 0.8605 | 0.0313 |
| qot | chy | 66 | 0.0874 | 0.1366 |
| qot | ain | 65 | 0.0861 | 0.0845 |
| qok | ody | 65 | 0.0288 | 0.0808 |
| qok | hdy | 64 | 0.0283 | 0.1485 |
| che | ain | 63 | 0.0598 | 0.0819 |
| che | khy | 62 | 0.0589 | 0.1509 |
| qok | eol | 61 | 0.0270 | 0.1799 |
| shc | khy | 60 | 0.4000 | 0.1460 |
| oke | ody | 57 | 0.1301 | 0.0709 |

Top 30 most selective prefixes (high frequency + low suffix entropy)

| prefix | total | suffix_entropy | top_suffixes |
| --- | --- | --- | --- |
| qok | 2260 | 3.6918 | edy:654, eey:340, iin:295, ain:293, chy:92, ody:65, hdy:64, eol:61, hey:43, eor:33 |
| che | 1053 | 5.3866 | ody:113, iin:108, edy:89, ain:63, khy:62, dar:45, eey:40, hey:37, thy:37, dal:34 |
| qot | 755 | 4.1044 | edy:204, iin:98, chy:66, ain:65, eey:51, ody:34, hdy:26, hey:23, eol:20, hol:14 |
| cho | 688 | 5.4780 | iin:121, chy:54, eey:37, ain:28, edy:28, khy:25, hey:22, ody:20, thy:20, dar:14 |
| oka | 323 | 2.3424 | iin:228, ldy:11, iir:7, lal:6, chy:5, lar:4, ody:4, ral:4, edy:3, hey:3 |
| she | 567 | 4.8992 | edy:102, ody:55, iin:39, khy:38, ain:27, thy:24, eky:21, eey:20, chy:19, dal:18 |
| chc | 415 | 3.4481 | khy:140, thy:81, hey:41, hdy:25, edy:23, hhy:20, phy:10, hal:7, hol:7, ody:6 |
| oke | 438 | 4.3533 | edy:127, ody:57, eey:34, dal:18, eol:18, iin:17, dar:16, eor:13, oly:10, ain:8 |
| ote | 402 | 4.4406 | edy:114, ody:55, dar:25, iin:24, eos:15, dal:14, eey:13, ain:9, eol:9, hey:8 |
| ota | 266 | 2.9863 | iin:164, ldy:10, rar:6, ain:5, ram:5, hdy:4, lal:4, lam:4, lor:4, dal:3 |
| olk | 283 | 3.4723 | edy:82, eey:49, iin:37, ain:36, eol:9, chy:7, hdy:7, ody:7, hey:6, air:5 |
| lch | 196 | 2.3475 | edy:129, eey:14, eol:8, ody:5, khy:4, dal:3, eam:3, eor:3, iin:3, ain:2 |
| otc | 231 | 4.1704 | edy:36, hdy:33, hey:33, hol:30, hor:17, ody:8, har:7, iin:6, dal:5, ham:5 |
| oda | 86 | 1.0600 | iin:74, iir:2, aly:1, ary:1, hdy:1, idy:1, iil:1, iim:1, iis:1, ily:1 |
| sho | 244 | 4.9237 | iin:53, chy:15, hey:12, thy:12, khy:10, eey:9, ldy:8, ain:7, edy:7, kal:6 |
| shc | 150 | 2.8672 | khy:60, thy:32, hey:19, edy:8, hhy:6, hdy:5, chy:2, heo:2, iin:2, ody:2 |
| opc | 200 | 4.1953 | edy:53, hey:30, hdy:20, iin:10, eol:8, hol:6, ody:6, eey:5, hor:5, ain:3 |
| okc | 185 | 4.1866 | hey:32, hdy:28, edy:24, hor:18, hol:14, ody:8, eey:6, hal:4, har:4, iin:4 |
| pch | 190 | 4.3301 | edy:40, dar:22, iin:18, ody:14, eol:11, dal:8, air:7, ain:6, eor:6, chy:5 |
| lka | 55 | 0.6142 | iin:50, iir:2, har:1, ldy:1, lol:1 |
| yke | 157 | 4.1556 | edy:38, ody:32, eol:10, eey:7, eor:6, ain:4, dar:4, eos:4, hey:4, shy:4 |
| olc | 147 | 3.8765 | edy:42, hey:25, eey:13, hdy:11, eol:8, dar:3, eor:3, hed:3, heo:3, iin:3 |
| ola | 69 | 1.3733 | iin:55, iir:3, iny:2, ldy:2, ade:1, ain:1, khy:1, lor:1, lsy:1, ran:1 |
| dch | 149 | 4.3455 | edy:36, eey:14, iin:11, chy:9, eol:9, ain:6, eos:6, ody:6, eor:5, dar:4 |
| qop | 136 | 3.9132 | edy:37, hdy:17, chy:13, iin:12, hey:10, hol:6, eey:5, ody:4, dal:2, har:2 |
| qoc | 125 | 3.8227 | hey:31, khy:19, hol:11, edy:9, thy:9, eey:6, eol:5, hdy:5, ody:4, hhy:3 |
| yka | 59 | 1.3050 | iin:48, ain:2, iil:1, iir:1, ipy:1, kal:1, lam:1, ldy:1, lky:1, nam:1 |
| ych | 135 | 4.3137 | eey:21, edy:18, eol:12, ain:9, eor:9, iin:9, eeo:8, ody:5, chy:4, ear:4 |
| cth | 138 | 4.4662 | ody:22, iin:17, eey:15, edy:13, eol:10, oly:5, ain:4, eor:4, dal:3, eod:3 |
| tch | 131 | 4.2129 | edy:35, ody:16, iin:11, eey:6, eol:6, dar:5, dor:4, ain:3, chy:3, dal:3 |

Top 30 most selective suffixes (high frequency + low prefix entropy)

| suffix | total | prefix_entropy | top_prefixes |
| --- | --- | --- | --- |
| edy | 2673 | 5.1373 | qok:654, qot:204, lch:129, oke:127, ote:114, she:102, che:89, olk:82, opc:53, lsh:48 |
| iin | 2361 | 5.8068 | qok:295, oka:228, ota:164, cho:121, che:108, qot:98, oda:74, ola:55, sho:53, cha:52 |
| eey | 966 | 4.7297 | qok:340, qot:51, olk:49, che:40, cho:37, oke:34, ych:21, she:20, cth:15, chk:14 |
| ain | 769 | 4.3022 | qok:293, qot:65, che:63, olk:36, cho:28, she:27, chk:12, chd:10, qod:10, ote:9 |
| ody | 804 | 5.3703 | che:113, qok:65, oke:57, ote:55, she:55, qot:34, yke:32, yte:23, cth:22, cho:20 |
| hey | 648 | 5.7759 | qok:43, chc:41, che:37, otc:33, okc:32, qoc:31, opc:30, olc:25, qot:23, cho:22 |
| khy | 411 | 3.3463 | chc:140, che:62, shc:60, she:38, cho:25, qoc:19, sho:10, lch:4, ych:4, dch:3 |
| chy | 483 | 4.9789 | qok:92, qot:66, cho:54, che:25, she:19, sho:15, qop:13, dch:9, chk:8, oke:7 |
| hdy | 431 | 5.3091 | qok:64, otc:33, okc:28, qot:26, chc:25, opc:20, qop:17, olc:11, dal:10, che:9 |
| thy | 251 | 3.3857 | chc:81, che:37, shc:32, she:24, cho:20, sho:12, qoc:9, cph:4, pch:3, qoa:2 |
| eol | 339 | 5.1547 | qok:61, qot:20, oke:18, che:14, she:14, ych:12, pch:11, cth:10, yke:10, dch:9 |
| dar | 294 | 5.1526 | che:45, ote:25, pch:22, qok:18, oke:16, cho:14, she:12, qot:10, oto:6, yte:6 |
| dal | 222 | 5.1536 | che:34, oke:18, she:18, ote:14, cho:10, qok:10, pch:8, kee:6, otc:5, oto:4 |
| hol | 196 | 4.9637 | otc:30, qok:16, okc:14, qot:14, cho:12, qoc:11, chc:7, opc:6, qop:6, ykc:6 |
| eor | 198 | 5.0900 | qok:33, che:17, oke:13, ych:9, kch:7, qot:7, she:7, pch:6, yke:6, dch:5 |
| ldy | 165 | 5.2624 | cho:14, qok:13, oka:11, oto:11, ota:10, oko:9, che:8, sho:8, she:5, yto:4 |
| hor | 151 | 4.9476 | okc:18, otc:17, qot:11, qok:10, ytc:10, cho:9, opc:5, sho:5, ykc:5, chc:4 |
| aly | 122 | 5.2100 | qok:17, che:12, cho:9, oke:6, qot:6, she:5, chd:3, dar:3, oko:3, chk:2 |
| air | 109 | 5.0152 | qok:23, pch:7, qot:6, olk:5, cho:4, chd:3, ote:3, qod:3, che:2, opc:2 |
| eos | 100 | 4.6241 | ote:15, che:10, qok:10, oke:7, dch:6, yke:4, ckh:3, oee:3, pch:3, she:3 |
| eky | 71 | 3.0815 | che:25, she:21, cho:3, rch:3, aik:1, alc:1, dal:1, das:1, dch:1, dep:1 |
| shy | 106 | 5.2083 | qok:12, qot:7, cho:6, oke:6, sho:5, che:4, pol:4, yke:4, okc:3, oko:3 |
| ees | 96 | 5.1689 | qok:11, qot:7, che:5, she:5, oke:4, olk:4, cho:3, ote:3, qoe:3, ych:3 |
| key | 62 | 3.5817 | che:18, she:9, cho:8, sho:6, dch:2, oke:2, aii:1, chp:1, chy:1, ckh:1 |
| eeo | 64 | 3.8917 | qok:18, ych:8, qot:6, olk:5, che:3, cho:2, qoe:2, cph:1, cyk:1, dch:1 |
| hhy | 62 | 3.8096 | chc:20, shc:6, sho:4, cho:3, ocf:3, qct:3, qoc:3, cth:2, ock:2, act:1 |
| kal | 53 | 3.3565 | che:14, cho:10, she:7, sho:6, kal:2, pch:2, cha:1, dai:1, dal:1, eeo:1 |
| kar | 54 | 3.4624 | che:15, cho:10, she:5, sho:5, dal:3, cha:2, chy:2, kao:1, kch:1, kol:1 |
| dam | 73 | 5.0345 | che:10, ote:5, cho:4, oke:4, okc:3, she:3, dol:2, lch:2, olk:2, ota:2 |
| oly | 67 | 4.8019 | oke:10, che:5, cth:5, ote:4, pch:3, qok:3, she:3, cho:2, kch:2, qot:2 |

## Multi-Transcription Comparison\n\nNo comparison dataset provided. Use `--compare <path>`.

## Normalization Robustness

### Entropy Curve Variance Across Modes
| Prefix Length | Entropy Variance |
| --- | --- |
| 1 | 0.0168 |
| 2 | 0.0013 |
| 3 | 0.0002 |
| 4 | 0.0010 |
| 5 | 0.0009 |
| 6 | 0.0011 |
| 7 | 0.0006 |
| 8 | 0.0001 |
| 9 | 0.0000 |
| 10 | 0.0000 |
| 11 | 0.0000 |
| 12 | 0.0000 |
| 13 | 0.0000 |
| 14 | 0.0000 |
| 15 | 0.0000 |

### Prefix Family Stability (Top-10 Overlap)
| Mode Pair | Top-10 overlap L2 | Top-10 overlap L3 | Mean overlap |
| --- | --- | --- | --- |
| A-B | 100.00% | 100.00% | 100.00% |
| A-C | 100.00% | 81.82% | 90.91% |
| A-D | 11.11% | 11.11% | 11.11% |
| B-C | 100.00% | 81.82% | 90.91% |
| B-D | 11.11% | 11.11% | 11.11% |
| C-D | 11.11% | 11.11% | 11.11% |

### Suffix Distribution Stability
| Mode Pair | Suffix distribution stability |
| --- | --- |
| A-B | 100.00% |
| A-C | 100.00% |
| A-D | 41.67% |
| B-C | 100.00% |
| B-D | 41.67% |
| C-D | 41.67% |

### Stability Summary
| Metric | Stability Score |
| --- | --- |
| Entropy curve stability | 0.9985 |
| Prefix family stability | 52.53% |
| Suffix distribution stability | 70.83% |

## Cross-Dataset Comparison

### Similarity Summary
| Dataset | Type | Entropy L2 | Entropy Corr | Ambiguity L2 | Ambiguity Corr | Family Jaccard | Position Bias Diff | Suffix Entropy Diff | Similarity Score | Classification |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| english.txt | natural | 4.6429 | 0.9531 | 0.9760 | 0.9708 | 2.56% | 0.0479 | -0.2833 | 0.5428 | B: similar to structured data |
| latin.txt | natural | 2.1029 | 0.9849 | 1.0117 | 0.9373 | 1.27% | 0.8623 | 0.5710 | 0.5156 | B: similar to structured data |
| ngram.txt | natural | 4.1844 | 0.9134 | 1.3050 | 0.7198 | 2.56% | 0.1376 | 2.4108 | 0.4618 | B: similar to structured data |
| json.txt | natural | 15.4074 | -0.4033 | 2.4524 | -0.3569 | 1.27% | 0.0850 | -2.8315 | 0.2598 | C: similar to random/synthetic text |

### Ranking by Similarity to Voynich
| Rank | Dataset | Similarity Score |
| --- | --- | --- |
| 1 | english.txt | 0.5428 |
| 2 | latin.txt | 0.5156 |
| 3 | ngram.txt | 0.4618 |
| 4 | json.txt | 0.2598 |

### Class-Level Similarity
| Class | Mean Similarity |
| --- | --- |
| natural_language | 0.4450 |
| structured_data | 0.0000 |
| random_or_synthetic | 0.0000 |

### english.txt: entropy/ambiguity difference by prefix length
| Prefix Length | Entropy Diff (Voynich - dataset) | Ambiguity Diff (Voynich - dataset) |
| --- | --- | --- |
| 1 | 2.1372 | -0.0001 |
| 2 | 2.7865 | 0.0023 |
| 3 | 2.5359 | 0.0245 |
| 4 | 1.4250 | 0.1365 |
| 5 | 0.4636 | 0.1203 |
| 6 | -0.1067 | -0.0710 |
| 7 | -0.3190 | -0.2867 |
| 8 | -0.3596 | -0.3398 |
| 9 | -0.3195 | -0.3481 |
| 10 | -0.2802 | -0.3634 |
| 11 | -0.1801 | -0.3203 |
| 12 | -0.1858 | -0.4190 |
| 13 | -0.1341 | -0.2531 |
| 14 | -0.2012 | -0.3476 |
| 15 | 0.0000 | 0.0000 |
| 16 | 0.0000 | 0.0000 |
| 17 | 0.0000 | 0.0000 |
### latin.txt: entropy/ambiguity difference by prefix length
| Prefix Length | Entropy Diff (Voynich - dataset) | Ambiguity Diff (Voynich - dataset) |
| --- | --- | --- |
| 1 | 0.1038 | -0.0001 |
| 2 | 0.8274 | -0.0015 |
| 3 | 0.7481 | 0.0468 |
| 4 | -0.0133 | 0.0462 |
| 5 | -0.5458 | 0.0043 |
| 6 | -0.8429 | -0.2234 |
| 7 | -0.8683 | -0.4078 |
| 8 | -0.7590 | -0.4619 |
| 9 | -0.5936 | -0.4662 |
| 10 | -0.4158 | -0.3395 |
| 11 | -0.3018 | -0.2722 |
| 12 | -0.2391 | -0.1876 |
| 13 | -0.1864 | -0.1381 |
| 14 | -0.1791 | -0.1756 |
| 15 | -0.1312 | -0.1165 |
| 16 | -0.1621 | -0.1765 |
| 17 | -0.2119 | -0.2308 |
| 18 | 0.0000 | 0.0000 |
| 19 | 0.0000 | 0.0000 |
| 20 | 0.0000 | 0.0000 |
### json.txt: entropy/ambiguity difference by prefix length
| Prefix Length | Entropy Diff (Voynich - dataset) | Ambiguity Diff (Voynich - dataset) |
| --- | --- | --- |
| 1 | 4.1672 | 0.1631 |
| 2 | 3.8779 | 0.4574 |
| 3 | 2.7000 | 0.6380 |
| 4 | 1.5040 | 0.7421 |
| 5 | 0.0637 | 0.5651 |
| 6 | -0.9325 | 0.3486 |
| 7 | -2.0183 | -0.0266 |
| 8 | -2.3245 | -0.2248 |
| 9 | -3.7420 | -0.4637 |
| 10 | -3.9765 | -0.4937 |
| 11 | -3.9829 | -0.5000 |
| 12 | -7.8865 | -1.0000 |
| 13 | -7.0909 | -1.0000 |
| 14 | -4.7388 | -0.9797 |
| 15 | -2.0496 | -0.7579 |
| 16 | -0.5099 | -0.2878 |
| 17 | -0.0745 | -0.0555 |
| 18 | 0.0000 | 0.0000 |
| 19 | 0.0000 | 0.0000 |
### ngram.txt: entropy/ambiguity difference by prefix length
| Prefix Length | Entropy Diff (Voynich - dataset) | Ambiguity Diff (Voynich - dataset) |
| --- | --- | --- |
| 1 | -1.8711 | -0.0001 |
| 2 | 0.7256 | 0.0032 |
| 3 | 2.5753 | 0.2389 |
| 4 | 2.2320 | 0.8074 |
| 5 | 1.2371 | 0.8133 |
| 6 | 0.5480 | 0.5252 |
| 7 | 0.1857 | 0.2266 |
| 8 | 0.0505 | 0.0715 |
| 9 | 0.0066 | 0.0069 |
| 10 | 0.0063 | 0.0063 |
| 11 | 0.0000 | 0.0000 |
| 12 | 0.0000 | 0.0000 |
| 13 | 0.0000 | 0.0000 |
| 14 | 0.0000 | 0.0000 |

Natural-language robustness (English vs Latin): consistent across languages (|Δ similarity|=0.0272 <= 0.10).
English-specific structure check: no strong English-specific dependence.

Final summary: Voynich is closest to: natural_language

## Size-Matched Comparison

| Dataset | Type | Matched N | Similarity (mean±std) | Entropy Corr (mean±std) | Ambiguity Corr (mean±std) |
| --- | --- | --- | --- | --- | --- |
| english.txt | natural | 39049 | 0.5502 ± 0.0018 | 0.9500 ± 0.0004 | 0.9522 ± 0.0048 |
| latin.txt | natural | 30880 | 0.5156 ± 0.0000 | 0.9849 ± 0.0000 | 0.9373 ± 0.0000 |
| ngram.txt | natural | 10000 | 0.4618 ± 0.0000 | 0.9134 ± 0.0000 | 0.7198 ± 0.0000 |
| json.txt | natural | 39049 | 0.2725 ± 0.0008 | -0.3143 ± 0.0045 | -0.3475 ± 0.0062 |

Stability interpretation: lower std indicates stronger robustness across size-matched bootstrap samples.

## Statistical Significance

| Dataset | Metric | Observed | Null Mean | Null Std | z-score | p-value | Interpretation | Null debug (first 10) |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| english.txt | entropyCorr | 0.9501 | 0.9332 | 0.0003 | 58.8534 | 0.0099 | significant | 0.9334, 0.9336, 0.9330, 0.9325, 0.9332, 0.9338, 0.9331, 0.9330, 0.9334, 0.9328 |
| english.txt | ambiguityCorr | 0.9532 | 0.7818 | 0.0010 | 165.8260 | 0.0099 | significant | 0.7827, 0.7838, 0.7822, 0.7792, 0.7820, 0.7842, 0.7817, 0.7809, 0.7839, 0.7821 |
| english.txt | similarityScore | 0.9757 | 0.9325 | 0.0003 | 147.1073 | 0.0099 | significant | 0.9328, 0.9331, 0.9326, 0.9317, 0.9326, 0.9332, 0.9325, 0.9323, 0.9331, 0.9325 |
| latin.txt | entropyCorr | 0.9849 | 0.9485 | 0.0002 | 167.7536 | 0.0099 | significant | 0.9480, 0.9487, 0.9489, 0.9482, 0.9485, 0.9485, 0.9486, 0.9482, 0.9486, 0.9488 |
| latin.txt | ambiguityCorr | 0.9373 | 0.8196 | 0.0009 | 124.0345 | 0.0099 | significant | 0.8182, 0.8194, 0.8197, 0.8197, 0.8203, 0.8198, 0.8199, 0.8183, 0.8202, 0.8220 |
| latin.txt | similarityScore | 0.9817 | 0.9452 | 0.0003 | 141.8006 | 0.0099 | significant | 0.9448, 0.9452, 0.9454, 0.9452, 0.9454, 0.9453, 0.9453, 0.9449, 0.9454, 0.9459 |
| json.txt | entropyCorr | -0.3063 | 0.9135 | 0.0003 | -4173.1634 | 0.0099 | significant | 0.9133, 0.9139, 0.9138, 0.9138, 0.9137, 0.9134, 0.9139, 0.9136, 0.9138, 0.9141 |
| json.txt | ambiguityCorr | -0.3356 | 0.7516 | 0.0008 | -1379.2683 | 0.0099 | significant | 0.7516, 0.7517, 0.7517, 0.7518, 0.7516, 0.7518, 0.7512, 0.7514, 0.7529, 0.7532 |
| json.txt | similarityScore | 0.3403 | 0.9203 | 0.0002 | -2435.3171 | 0.0099 | significant | 0.9203, 0.9204, 0.9204, 0.9205, 0.9204, 0.9203, 0.9203, 0.9203, 0.9207, 0.9208 |
| ngram.txt | entropyCorr | 0.9134 | 0.9135 | 0.0005 | -0.1485 | 0.8614 | not-significant | 0.9134, 0.9135, 0.9135, 0.9138, 0.9138, 0.9135, 0.9138, 0.9128, 0.9149, 0.9141 |
| ngram.txt | ambiguityCorr | 0.7198 | 0.7203 | 0.0015 | -0.2804 | 0.7921 | not-significant | 0.7188, 0.7196, 0.7192, 0.7233, 0.7206, 0.7198, 0.7211, 0.7180, 0.7236, 0.7219 |
| ngram.txt | similarityScore | 0.9131 | 0.9133 | 0.0005 | -0.2602 | 0.8317 | not-significant | 0.9129, 0.9131, 0.9130, 0.9141, 0.9134, 0.9132, 0.9136, 0.9126, 0.9144, 0.9138 |

Significance summary: some comparisons are not statistically significant.

### Robustness Summary
- Size control stability: stable after size matching
- Statistical significance: some differences are not significant

## Null Model Comparison

### Divergence Summary (Real vs Null)
| Model | Entropy decay diff (L2) | Candidate diff (L2) | Ambiguity diff (L2) | Prefix-family overlap |
| --- | --- | --- | --- | --- |
| frequency_shuffle | 4.5191 | 570.4916 | 1.0534 | 2.56% |
| prefix_global_suffix | 4.6961 | 823.5766 | 1.3786 | 48.15% |
| length_preserving | 4.4048 | 1528.2032 | 1.0455 | 0.00% |

### Entropy / Ambiguity by Prefix Length
| Prefix Length | Real entropy | Real ambiguity | frequency_shuffle entropy | frequency_shuffle ambiguity | prefix_global_suffix entropy | prefix_global_suffix ambiguity | length_preserving entropy | length_preserving ambiguity |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 7.2084 | 0.9999 | 6.5730 | 1.0000 | 5.5843 | 0.9999 | 10.7702 | 1.0000 |
| 2 | 5.6735 | 0.9978 | 3.3405 | 0.9981 | 3.9776 | 0.9993 | 7.0853 | 0.9991 |
| 3 | 4.0429 | 0.9855 | 1.1832 | 0.9268 | 1.0492 | 0.9534 | 3.4845 | 0.9738 |
| 4 | 2.3852 | 0.9448 | 0.2421 | 0.4408 | 0.0000 | 0.0000 | 0.7567 | 0.5341 |
| 5 | 1.2449 | 0.8209 | 0.0323 | 0.0972 | 0.0000 | 0.0000 | 0.0520 | 0.0504 |
| 6 | 0.5487 | 0.5259 | 0.0033 | 0.0041 | 0.0000 | 0.0000 | 0.0025 | 0.0025 |
| 7 | 0.1857 | 0.2266 | 0.0004 | 0.0005 | 0.0000 | 0.0000 | 0.0000 | 0.0000 |
| 8 | 0.0505 | 0.0715 | 0.0000 | 0.0000 | 0.0000 | 0.0000 | 0.0000 | 0.0000 |
| 9 | 0.0066 | 0.0069 | 0.0000 | 0.0000 | 0.0000 | 0.0000 | 0.0000 | 0.0000 |
| 10 | 0.0063 | 0.0063 | 0.0000 | 0.0000 | 0.0000 | 0.0000 | 0.0000 | 0.0000 |
| 11 | 0.0000 | 0.0000 | 0.0000 | 0.0000 | 0.0000 | 0.0000 | 0.0000 | 0.0000 |
| 12 | 0.0000 | 0.0000 | 0.0000 | 0.0000 | 0.0000 | 0.0000 | 0.0000 | 0.0000 |
| 13 | 0.0000 | 0.0000 | 0.0000 | 0.0000 | 0.0000 | 0.0000 | 0.0000 | 0.0000 |
| 14 | 0.0000 | 0.0000 | 0.0000 | 0.0000 | 0.0000 | 0.0000 | 0.0000 | 0.0000 |
