# Meridian AI
Self-generating ASMR Web App

## Introduction
Nazwa jest związana ze zjawiskiem ASMR, skrótem od Autonomous Sensory Meridian Response  czyli „samoistnej odpowiedzi meridianów czuciowych”.  ASMR to zjawisko przyjemnego mrowienia w okolicach głowy, szyi i innych obszarach ludzkiego ciała. Może zostać wywołane poprzez wizualne, słuchowe, dotykowe i zapachowe bodźce zewnętrzne. Czasami określane jest również jako orgazm mózgu. Obecnie ASMR jest jednym z najchętniej oglądanych rodzajów filmów na platformie YouTube.

## Assumptions
Nasza aplikacja, Meridian AI, jak sugeruje jej nazwa będzie korzystała z inteligentnych algorytmów optymalizujących, pseudo sztucznej inteligencji. Jej celem będzie maksymalizacja przyjemności poprzez uwzględnianie reakcji odbiorcy. Aplikacja będzie generowała ciąg specyficznych warstw dźwiękowych, które będą między sobą się przeplatać w kreatywny i kompozycyjnie harmonijny sposób. Będą to warstwy dźwięków znanych z filmów ASMR ale również z bardziej abstrakcyjnych, przetworzonych lub innych, dłuższych dźwięków przypominających relaksacyjną muzykę. Dodatkowo zadbamy o spójny wystrój graficzny i możliwe, minimalistyczne animacje oparte o świecenie punktowe na różnych tłach.

Generacja dźwiękowych warstw będzie opierała się na interaktywnej manipulacji krótkimi fragmentami. Będziemy w nich wyróżniać takie cechy jak m.in. długość, intensywność, zagęszczenie, barwa i charakter. Dźwięki trafią do odpowiednich grup podzielonych według skali tych parametrów.

Po włączeniu aplikacji odbiorca będzie miał do wyboru dwa tryby - 'generacji od nowa' lub 'kontynuowania'. W pierwszym trybie generacja zacznie się od użycia losowych parametrów z naciskiem na te bardziej uśrednione. W czasie gdy kompozycja będzie się generowała pojawiać się będą nowe bodźce dźwiękowe. Zadaniem odbiorcy będzie reagowanie na nie klikając na przycisk odpowiadającemu odczuwania miłych wrażeń. Sesja będzie się odbywała tak długo jak odbiorca będzie chciał. Jej celem jest zbudowanie personalnej bazy ulubionych bodźców odbiorcy. Po zakończonej sesji będzie możliwość zapisu swojego profilu i ponowne, późniejsze odwiedzenie strony w trybie kontynuacji sesji.

Doszliśmy do wniosku że w dzisiejszych czasach i szczególnie w tym trudnym okresie czasu, aplikacja webowa to dobry sposób na podzielenie się ze wszystkimi swoimi wynikami pracy. Dziś praktycznie każdy ma dostęp do internetu i każdy miałby możliwość otworzenia naszej strony, również na swoim telefonie. Nie znaleźliśmy podobnej aplikacji do naszej. Mamy nadzieję że jest to pomysł z potencjałem i przy założeniu że nam się uda, istniałoby zapotrzebowanie na używanie takiej aplikacji.

## Installation
Before installation be sure that you have following applications:
* Node.js - [download here](https://nodejs.org/en/)
* Git - [download here](https://git-scm.com/downloads)
* VSCode (preffered editor) - [download here](https://code.visualstudio.com/download)

Then go by following instructions:
1. Copy these commands into cmd or Power Shell:
```
git clone https://github.com/moose96/meridian-ai.git
cd meridian-ai
npm install
```

If you want to run type ```npm start```. Go to [http://localhost:3000/](http://localhost:3000/) to watch app.

## Live View
You can view the current version of app [here](https://meridian-ai.netlify.app/).

## Modules
The Meridian-Ai consists of modules below:
1. [Sound Engine](./docs/Sound_Engine.md)
2. [AI Composer](./docs/AI_Composer.md)
3. [Animation Engine](./docs/Animation_Engine.md)
4. [Main UI](./docs/Main_UI.md)
5. [Editor UI](./docs/Editor_UI.md)
6. [Sound and user data database](./docs/Server.md)

## Technology
* ReactJS
* Redux
* Pizzicato (Audio Web API)
* P5.js