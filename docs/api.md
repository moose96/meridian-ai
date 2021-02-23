# API

## Sound Engine
Silnik dźwiękowy jest napisany z wykorzystaniem biblioteki Pizzicato. Umożliwia on tworzenie sekwencji i kompozycji dźwiękowych z pojedyńczych, prostych dźwięków. Dźwięki mogą być umieszczane w wirtualnym polu dźwiękowym i odtwarzane. Silnik dźwiękowy składa się z poniższych obiektów:

### Randomization
Ta klasa zapewnia interfejs umożliwiający losowanie wartości wskazanych parametrów w klasach potomnych.

#### Metody
* constructor
```js
constructor([initObject]);
```
Służy do tworzenia instancji obiektu Randomization. Opcjonalnie można przekazać do jego argumentu obiekt, który go zainicjuje konkretnymi wartościami. Struktura tego obiektu wygląda następująco:

```js
const initObject = {
  key: String,
  offset: Number
}
```
* *key* - tu przechowywana jest nazwa pola klasy potomnej, którego wartości mają być losowane.
* *offset* - wskazuje na zakres losowania, począwszy od wartości środkowej. Wtedy zakres losowania przedstawia się następująco: (middle - offset; middle + offset). Wartość *middle* jest to aktualna wartość pola klasy wskazanego przez *key* w klasie potomnej.

* addRandomization
```js
addRandomization(key, offset);
```
Ta metoda służy do dodawania randomizacji parametru wskazanego w *key* o zakresie *offset* po stworzeniu obiektu.

* randomize
```js
randomize();
```
Ta metoda jest używana przez klasy potomne do wylosownaia nowej wartości.

### SoundEngineObject
To jest bazowa klasa dla wszystkich obiektów silnika. Zapewnia jednolity interfejs pól i metod, a także narzuca odpowiedni przepływ sygnału przez obiekty. Klasa dziedziczy po klasie **Randomization**, by każdy obiekt sound engine miał dostęp do losowania parametrów.

#### Pola
* source - surowy dostęp do źródłowych węzłów obiektów silnika, bądź Web Audio API.
* outputNode - to pole wskazuje na pierwszy węzeł głównej gałęzi wyjściowej. Obecnie jest to węzeł panoramy.

#### Metody
* constructor
```js
constructor([initObject]);

const initObject = {
  randomization: Object,
  volume: Number,
  pan: Number,
  muted: Boolean
}
```

* _connectSource
```js
_connectSource(destination);
```

Ta metoda łączy źródło / źródła z obiektem wskazanym w *destination*. Musi zostać nadpisana przez klasy potomne, ponieważ źródło może być typu **Array** lub **Object**. Metoda musi być wywołana w kontstruktorze, ponieważ domyślnie źródła nie są połączone z wyjściem. Zwyczajowo jako argument podaje się *this.outputNode*, jendakże istnieje możliwość rozbudowania wyjścia każdego obiektu o szyny pomocnicze.

* _disconnectSource
```js
_disconnectSource();
```

Ta metoda rozłącza źrodło / źrodła z aktualnie połączonym obiektem. Ona również musi być nadpisana przes klasy potomne z tego samego powodu co *_connectSource*.

Obydwu metod nie powinno się używać na zewnątrz klasy. W przyszłości będą one oznaczone jako prywatne.

* connect
```js
connect(destination);
```
Ta metoda łączy obiekt z innym obiektem danym w *destination* (np Master Gain).

* disconnect
```js
disconnect();
```

Ta metoda rozłącza obiekt z aktualnie połączonym obiektem.

* get | set volume
Te metody kontrolują poziom głośności sygnału na wyjściu obiektu (analogia do tłumika wyjściowego kanału).

* get | set pan
Te metody kontrolują panoramę sygnału przed tłumikiem.

* get | set muted
Włącza, bądź wyłącza wyciszenie.

* _connectEffects
```js
_connectEffects();
```

Ta metoda łączy ze sobą efekty w tablicy *effects*. Jest używana w *addEffect* i nie należy jej używać na zewnątrz klasy. Docelowo będzie oznaczona jako prywatna.

* _disconnectEffects
```js
_disconnectEffects();
```

Ta metoda jest przeciwieństwem do *_connectEffect*. Również nie należy jej używać na zewnąrz klasy.

* addEffect
```js
addEffect(effect);
```

Ta metoda dodaje efekt do łańcucha efektów.

* removeEffect(effect)
```js
removeEffect(effect);
```

Ta metoda usuwa efekt z łańcucha efektów.

* play
```js
play();
```

Ta metoda zapewnia interfejs umożliwiajacy odtwarzanie dźwięku danego w *source*. Powinna być wedle potrzeb nadpisywana przez klasy potomne, jednak metoda z klasy nadrzędnej powinna być wywołana.

* stop
```js
stop();
```

Ta metoda zapewnia interfejs umożliwiający zatrzymanie dźwięku danego w *source*. Musi być nadpisana przez klasy pochodne.

### Container
Jest to klasa bazowa dla wszelkiego rodzaju kontenerów - grup dźwięków, które mogą być odtwarzane w dowolny sposób (klasa dziedzicząca po **Container** decyduje o sposobie odtwarzania.). Dziedziczy po **SoundEngineObject**.

* constructor
```js
constructor([initObject]);

const initObject = {
  randomization: Object,
  volume: Number,
  pan: Number,
  muted: Boolean,
  objects: Array
}
```

* setPan i setVolume
```js
setPan(pan);
setVolume(volume);
```
Są to wrappery umożliwiajace ustawianie wartości poprzez funkcję, a nie przypisanie ich do pola.

Ta klasa dziedziczy również po klasie **SoundEngineObject**.

### SoundObject
To jest klasa bazowa zapewniająca interfejs dla obiektów umieszczanych w polu dźwiękowym. Dziedziczy po **SoundEngineObject**.

#### Pola
* attenuation - oznacza maksymalną odległość, dla której dźwięk jest wciąż słyszalny.

#### Metody

* constructor
```js
constructor([initObject]);

const initObject = {
  randomization: Object,
  volume: Number,
  pan: Number,
  muted: Boolean,
  objects: Array,
  position: {
    x: Number,
    y: Number,
    z: Number
  }
}
```

* _calculate
```js
_calculate();
```

Ta metoda jest szablonem dla klas potomnych. Z założenia musi się w niej znaleźć implementacja przeliczania pozycji wyrażonej w trójwymiarowym wektorze (x, y, z) na odpowiednie wrażenie w dźwięku. Parametr *x* zamienia się na pozycję w panoramie i głośność dźwięku, a parametr *y* na głośność dźwięku. Oba parametry wpływają także na barwę dźwięku (udział wysokich częstotliwości) i ilość wysyłki na pogłos, lecz nie jest to jeszcze zaimplementowane. Parametr *z* obecnie nie jest używany.

* get | set position
Pobiera, bądź ustawia pozycję obiektu.

* setPosition
```js
setPozition(x, y, z);
```

Wrapper na setter pola *position*, jednak umożliwia on ustawianie trzech wartości bez tworzenia obiektu.

* setPositonX, setPositionY, setPositionZ
```js
setPositionX(x);
setPositionY(y);
setPositionZ(z);
```

Ustawia kolejno pozycję X, Y i Z obiektu.

* setAttenuation
```js
setAttenuation(attenuation);
```

Ustawia maksymalną słyszalną odległość obiektu.

Ta klasa dziedziczy także po klasie **SoundEngineObject**.

### Sound
To jest podstawowa klasa, która reprezentuje pojedyńczy, odtwarzalny dźwięk. Za swoje źródło (ustawiane w polu *source*) przyjmuje obiekt klasy Pizzicato.Sound. Dzięki owrapowaniu tego obiektu możliwa jest kontrola nad parametrami takimi jak: prędkosć odtwarzania, długosć dźwięku, panorama, czy randomizacja parametrów. Klasa dziedziczy po **SoundEngineObject**.

#### Pola
* *buffer* - obiekt klasy AudioBuffer reprezentujący dźwięk w pamięci przeglądarki. Odnosi się do bufora wewnątrz obiektu Pizzicato.Sound. Nie powinien być używany na zewnątrz klasy.
* *node* - obiekt klasy AudioBufferSourceNode reprezentujący węzeł źródłowy. Odnosi się do węzła wewnątrz obiektu Pizzicato.Sound. Nie powinien być używany na zewnątrz klasy.
* *detune* - *odstrojenie*, prędkość odtwarzania. Wartość wyrażona w centach określająca zmianę wysokości dźwięku poprzez zmianę próbkowania (ze zmianą prędkości odtwarzania dźwięku). Domyślnie: 0.
* startPoint - punkt startu dźwięku wyrażony w samplach. Odnosi się do *offset* w Pizzicato.Sound.
* endPoint - punkt zatrzymania dźwięku wyrażony w saplach od początku dźwięku (**NIE od startPoint**).
* duration - długość dźwięku wyrażona w samplach od wartości *startPoint*.

#### Metody

* constructor
```js
constructor([initObject]);

const initObject = {
  randomization: Object,
  volume: Number,
  pan: Number,
  muted: Boolean,
  filename: String,
  attack: Number,
  release: Number,
  startPoint: Number,
  endPoint: Number | duration: Number
}
```

* *filename* - adres URL pliku.
* *attack* - fade in dźwięku.
* *release* - fade out dźwięku. *attack* i *release* wyrażone są w sekundach.

*endPoint* i *duration* występują zamiennie. Jeśli pojawią się oba w obiekcie, pod uwagę brany jest tylko *endPoint*.

* _getRawSourceNode
```js
_getRawSourceNode();
```

Metoda nadpisująca getRawSourceNode w Pizzicato.Sound. Nie należy jej używać.

### Random Container
Rodzaj kontenera dźwiękowego losowo wybierający dźwięk z listy przy każdym wywołaniu metody *play*, który odtwarza. Dziedziczy po **Container**.

### Sequence Container
Rodzaj kontenera dźwiękowego, który umożliwia sukcesywne odtwarzanie dźwięków umieszczonych w liście jednokrotnie, bądź w pętli. Dziedziczy po **Container**. Obecna rozdzielczość wynosi 25ms i jest to najkrótszy czas przerwy między dźwiękami.

#### Pola
* *loop* - flaga włączająca, bądź wyłączająca odtwarzanie dźwięku w pętli.
* *delay* - czas przerwy między kolejnymi odtworzeniami. Reprezentowany w milisekundach.

#### Metody

* constructor
```js
constructor([initObject]);
const initObject = {
  ...Container,
  delay: Number,
  loop: Boolean
}
```

* _run
```js
_run();
```

Jest to metoda używana jako argument funkcji *setInterval*, która odtwarza dźwięk w pętli. Nie należy jej używać na zewnątrz klasy.

### Single Sound Object
Jest to klasa reprezentująca pojedyńczy obiekt, który można umieścić w polu dźwiękowym. Dziedziczy po **SoundObject**.

### Multiple Sound Object
Jest to klasa reprezentująca grupę obiektów, które można umieścić w polu dźwiękowym. Dziedziczy po **SoundObject**.

### Sound Field
Jest to klasa reprezentująca obiekt pola dźwiękowego, na którym można umieszczać obiekty generujące dźwięk.

## React Integration Sound Engine
```jsx
<SoundEngine data={data} play={true} />
```

* *data* it is a raw object with sound descriptions.
* *play* can have two values *true* and *false* which tells sound engine to play or not the sounds.

## Uwagi do pliku .json
1. Każdy obiekt w pliku powinien mieć zdefiniowany parametr *type*, który powie aplikacji, jakiego typu obiekt stworzyć. Poniżej lista typów i nazw je reprezentujących:
  * sound - Sound
  * random container - RandomContainer
  * sequence container - SequenceContainer
  * single sound object - SingleSoundObject
  * multiple sound object - MultipleSoundObject
2. Jeśli do pola *objects* poda się tablicę z liczbami, zamiast z obiektami, aplikacja będzie szukać obiektów w tablicy w pliku z którego pochodzi.
```json
"objects": [4, 5, 6]
```
zamiast:
```json
"objects": [{
  "type": "sound,
  ...
}]
```
3. Pole *root* ustawione na **true** w obiekcie wskazuje dla aplikacji, że jest to początek drzewa i od tego miejsca budowane jest drzewo obiektów.