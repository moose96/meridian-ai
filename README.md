# Meridian AI
Self-generating ASMR Web App

## Introduction
Nazwa jest związana ze zjawiskiem ASMR, skrótem od Autonomous Sensory Meridian Response  czyli „samoistnej odpowiedzi meridianów czuciowych”.  ASMR to zjawisko przyjemnego mrowienia w okolicach głowy, szyi i innych obszarach ludzkiego ciała. Może zostać wywołane poprzez wizualne, słuchowe, dotykowe i zapachowe bodźce zewnętrzne. Czasami określane jest również jako orgazm mózgu. Obecnie ASMR jest jednym z najchętniej oglądanych rodzajów filmów na platformie YouTube.

## Assumptions
Nasza aplikacja, Meridian AI, jak sugeruje jej nazwa będzie korzystała z inteligentnych algorytmów optymalizujących, pseudo sztucznej inteligencji. Jej celem będzie maksymalizacja przyjemności poprzez uwzględnianie reakcji odbiorcy. Aplikacja będzie generowała ciąg specyficznych warstw dźwiękowych, które będą między sobą się przeplatać w kreatywny i kompozycyjnie harmonijny sposób. Będą to warstwy dźwięków znanych z filmów ASMR ale również z bardziej abstrakcyjnych, przetworzonych lub innych, dłuższych dźwięków przypominających relaksacyjną muzykę. Dodatkowo zadbamy o spójny wystrój graficzny i możliwe, minimalistyczne animacje oparte o świecenie punktowe na różnych tłach.

Generacja dźwiękowych warstw będzie opierała się na interaktywnej manipulacji krótkimi fragmentami. Będziemy w nich wyróżniać takie cechy jak m.in. długość, intensywność, zagęszczenie, barwa i charakter. Dźwięki trafią do odpowiednich grup podzielonych według skali tych parametrów.

Po włączeniu aplikacji odbiorca będzie miał do wyboru dwa tryby - 'generacji od nowa' lub 'kontynuowania'. W pierwszym trybie generacja zacznie się od użycia losowych parametrów z naciskiem na te bardziej uśrednione. W czasie gdy kompozycja będzie się generowała pojawiać się będą nowe bodźce dźwiękowe. Zadaniem odbiorcy będzie reagowanie na nie klikając na przycisk odpowiadającemu odczuwania miłych wrażeń. Sesja będzie się odbywała tak długo jak odbiorca będzie chciał. Jej celem jest zbudowanie personalnej bazy ulubionych bodźców odbiorcy. Po zakończonej sesji będzie możliwość zapisu swojego profilu i ponowne, późniejsze odwiedzenie strony w trybie kontynuacji sesji.

Doszliśmy do wniosku że w dzisiejszych czasach i szczególnie w tym trudnym okresie czasu, aplikacja webowa to dobry sposób na podzielenie się ze wszystkimi swoimi wynikami pracy. Dziś praktycznie każdy ma dostęp do internetu i każdy miałby możliwość otworzenia naszej strony, również na swoim telefonie. Nie znaleźliśmy podobnej aplikacji do naszej. Mamy nadzieję że jest to pomysł z potencjałem i przy założeniu że nam się uda, istniałoby zapotrzebowanie na używanie takiej aplikacji.

## Technology
* ReactJS
* Pizzicato (Audio Web API)
* P5.js

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

If you want to run type *npm start*. Go to [http://localhost:3000/](http://localhost:3000/) to watch app.

## Live View
You can view the current version of app [here](https://meridian-ai.netlify.app/).

# API

## Sound Engine
The Sound Engine is written by Pizzicato. It enables creating sequences and compositions from simple sounds. The sounds could placed in virtual field and play. The Sound Engine consists of following objects:

### Sound
It is a basic object which represents single simple sound which can be played. It extends Pizzicato.Sound by adding panning by default and allow to randomize parameters.

Constructor object (example):
```json
{
  "type": "sound",
  "filename": "/data/drip_01.wav",
  "randomization": {
    "key": "pan",
    "value": 0,
    "offset": 0.1
  }
}
```

### Container
It is basic object for containers which provides some interface for them. It has to be extended.

### Random Container
It is a kind of container which allow play sounds from list randomly.

Constructor object (example):
```json
{
  "type": "random container",
  "objects": [{
    "type": "sound",
    "filename": "/data/drip_01.wav",
    "randomization": {
      "key": "pan",
      "value": 0,
      "offset": 0.1
    }
  }]
}
```

### Sequence Container
It is a kind of container which allow play sound from list succesively once or in loop.

Constructor object (example):
```json
{
  "type": "sequence container",
  "delay": 100,
  "loop": true,
  "randomization": {
    "key": "delay",
    "value": 100,
    "offset": 20
  },
  "objects": [0]
}
```

* *delay* in milliseconds
* If you pass number into *objects* table unlike object, the React Integration Sound Engine changes that numbers into specific object. Number is an index number in data table.

### Sound Object
It is a object which represents sound source in sound field.

Constructor object (example):
```json
{
  "type": "single sound object",
  "position": {
    "x": -0.5,
    "y": 0.0,
    "z": 0.0
  },
  "objects": [1]
}
```
or
```json
{
  "type": "multiple sound object",
  "name": "drip",
  "root": true,
  "objects": [2, 3]
}
```
* *root* key tells React Integration Sound Engine that it is a root node and it is to find other nodes from it.

### Sound Field
It is a object which represents sound field, in which sound objects can be played.

## React Integration Sound Engine
```jsx
<SoundEngine data={data} play={true} />
```

* *data* it is a raw object with sound descriptions.
* *play* can have two values *true* and *false* which tells sound engine to play or not the sounds.