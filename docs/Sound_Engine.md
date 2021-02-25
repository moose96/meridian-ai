# Sound Engine

Zadaniem silnika jest ładowanie dźwięków (assetów) oraz ich grupowanie w różnego rodzaju struktury drzewa w celu określonej manipulacji sposobu ich odtwarzania oraz nakładania określonych efektów (tzw. processing).

## Wymagania silnika

* Kontrola prędkości odwtarzania pojedyńczego assetu
* Kontrola punktu startu oraz końca assetu
* Odtwarzanie w pętli zarówno pojedyńczego assetu jak i fragmentu drzewa
* Kontrola głośności w dowolnym punkcie drzewa
* Kontrola panoramy w dowolnym punkcie drzewa
* Kontrola opóźnienia odtwarzania (delay) w dowolnym punkcie drzewa
* Możliwość odtwarzania dźwięków w sposób losowy, symultaniczny i sukcesywny
* Możliwość randomizacji dowolnego parametru w dowolnym punkcie drzewa
* Płynne przejścia parametrów takich jak: głośność, panorama, delay oraz możliwość określenia czasu przejścia
* Możliwość nałożenia efektów takich jak: korektor parametryczny oraz pogłos
* Możliwość nasłuchiwania dowolnego parametru w dowolnym punkcie drzewa na globalne ustawienia parametrów dla danego drzewa
* Możliwość odtwarzania wielu drzew dźwiękowych jednocześnie, wraz z kontrolą ich głośności

## Szybkie użycie

Poniższy przykład prezentuje najprostsze wykorzystanie silnika w aplikacji:
```js
import { SoundField } from './sound-engine';
import SoundEngine from './sound-engine/SoundEngine';

const response = await fetch('/data.json');
const data = await response.json();

const [treeView, result, refs] = SoundEngine.createSoundFX(data);
const soundField = new SoundField();
soundField.addSound(result);
soundField.start();

setTimeout(() => soundField.stop(), 10000);
```

Wyjaśnienie krok po kroku:

1. Ładowanie pliku .json opisującego użyte assety, ich przetworzenia oraz sposób odtwarzania:
```js
const response = await fetch('/data.json');
const data = await response.json();
```

2. Tworzenie w pamięci przeglądarki drzewa obiektów silnika dźwiękowego opisanych w załadowanym pliku .json:
```js
const [treeView, result, refs] = SoundEngine.createSoundFX(data);
```
Funkcja zwraca tablicę trzech elementów:
* treeView - drzewo elementów React pozwalające zaoszczędzić ponowne przeszukiwanie drzewa obiektów silnika w celu wyrenederowania drzewa nazw wszystkich obiektów w edytorze. Obecnie nie jest używane ani zaimplementowane.
* result - właściwe drzewo obiektów silnika, które może być bezpośrednio dodane do pola dźwiękowego (SoundField).
* refs - tablica referencji do każdego obiektu w drzewie. Można jej używać w celu zapobiegania ciągłego przeszukiwania drzewa w celu znalezenia konkretnego obiektu który jest głęboko w drzewie.

3. Tworzenie pola dźwiękowego, dodanie do niego uwtorzonego drzewa dźwiękowego, rozpoczęcie odtwarzania, a następnie zatrzymanie po 10 sekundach:
```js
const soundField = new SoundField();
soundField.addSound(result);
soundField.start();

setTimeout(() => soundField.stop(), 10000);
```

## Plik .json

Plik zawiera tablicę obiektów opisujących parametry wszystkich obiektów, które są użyte w danym drzewie dźwiękowym. Przykładowy plik można znaleźć tutaj: [aa2.json](../public/data/aa2.json).

Obiekty w tablicy są postaci:
```ts
{
  type: "sound" | "random container" | "parallel container" | "sequence container" | "sound fx",
  [key in type]: any,
  params: [object],
  randomization: [object]
}
```

* type określa typ obiektu
* [key in type] określa nazwy pól w zależności od użytego typu obiektu

Niezależnie od typu można używać dwóch pól, które dostępne są globalnie: ```params``` oraz ```randomization```.

### params

Pole zawiera tablicę obiektów, które opisują przypisanie danego parametru obiektu silnika do globalnego parametru drzewa dźwiękowego. Jest on postaci:
```ts
{
  name: "intensivity" | "width" | "distance" | "brightness" | "sharpness" | "mobility" | "volume",
  key: [key in SoundObject],
  min: number,
  max: number
}
```

* name określa nazwę globalnego parametru, który zostanie przypisany do parametru danego w ```key```.
* key określa nazwę parametru, który zostanie przypisany do parametru globalnego ```name```. Nazwa jest zależna od użytego typu obiektu.
* min określa minimalną wartość parametru ```key``` dla minimalnej wartości parametru ```name```.
* analogicznie max określa maksymalną wartość parametru ```key``` dla maksymalnej wartości parametru ```name```.

### Dostępne parametry

| nr | eng parameter | nazwa parametru | obiekt | pole 1 | pole 2 | opis | domyślne przypisanie | uwagi |
| -- | ------------- | --------------- | ------ | ------ | ------ | ---- | -------------------- | ----- |
| 1. | intensivity | intensywność | Container | delay | - | czas między kolejnymi odtworzeniami dźwięku | nie | - |
| 2. | width | szerokość | Container(s) | pan	| - | odległość w panoramie między dźwiękami | nie | - |
| 2.1 | width | szerokość | Sounds | pan randomization	| offset | odległość w panoramie między dźwiękami | nie | - |
| 3. | distance | odległość | SoundFX | ext send | - | wysyłka w pogłos (de facto odległość od słuchacza) | tak | - |
| 4. | brightness | jasność | SoundFX	| Equalizer | Filtr HF (8000Hz) | wzmocnienie filtru | tak | - |
| 5. | sharpness | ostrość | SoundFX | Equalizer | Filtr Peak 4Khz | wzmocnienie filtru | tak | - |
| 6. | mobility | ruchliwość | RandomContainer | randomization	offset dla pan i ext send | wielkość losowości dla danych parametrów | nie | może być powiązana z intensywnością (jeszcze nie zaimplementowane) |
| 7. | volume | głośność | SoundFX | gain | - | głośność dźwięku | tak | może być powiązana z odległością |

### randomization

Pole zawiera tablicę obiektów opisujących randomizację dowolnego parametru. Obiekt jest następującej postaci (w komentarzach podano domyślne wartości, jeśli dane pole nie zostanie podane):

```ts
{
  enabled?: boolean, //true
  key: [key in SoundObject],
  offset?: number, // 0
  value?: number, // 0
  loop?: boolean, // false
  time?: number // 2000 (mseconds)
}
```
* enabled określa, czy dany obiekt randomizacji jest aktywny
* key określa który parametr w obiekcie dźwiękowym będzie przypisany do tej randomizacji. Jego wartość zależy od typu obiektu.
* offset wyznacza przedział +/- od ```value``` z którego będą losowane wartości.
* value wyznacza środek przedziału losowania.
* loop określa, czy randomizacja będzie się powtarzać co interwał dany w ```time```.
* time interwał zmian randomizacji, jeśli ```loop === true ```.

### sound engine object (globalne parametry)

Silnik dźwiękowy definiuje kilka rodzajów klas bazowych w zależności od zastosowania. Wyjaśnienie ich różnic znajduje się w [szczegółowej dokumentacji API](#referencja-api). W pliku json używana jest najbardziej zaawansowana z nich. Można powiedzieć, że stosuje się ją do obiektów, które można panoramować i zmieniać im głośność, a takich używa się bezpośrednio w drzewie dźwiękowym. Obiekt ten jest postaci:

```ts
{
  id: string, //uuid
  volume?: number, //<0; 1>, default: 1
  pan?: number, // <-1; - 1>, default: 1
  muted?: boolean, //default: false
  objects?: Array<object | number>,
  effects: Array<Effect>
}
```

* id - identyfikator obiektu. Jest to standard [UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier). Obecnie nie stosuje się go w pliku json - silnik automatycznie dobiera losowe identyfikatory dla danego obiektu. Docelowo identyfikatory będą stałe, gdy powstanie serwer przechowujący dźwięki.
* volume - głośność obiektu
* pan - panorama obiektu
* muted - wyciszenie obiektu
* objects - ta tablica określa dzieci elementu. Sygnał płynie od dzieci określonych w ```objects``` do ```volume```. Umieszcza się tutaj obiekty źródłowe dla danego obiektu silnika dźwiękowego. W tablicy można podać obiekty, bądź liczby - w drugim przypadku zwiększa się czytelność, oraz reużywalność obiektów w głównej tablicy. Liczby określają indeksy poszczególnych obiektów w tablicy głównej. Docelowo zamiast liczb będą znajdować się tam indentyfikatory uuid obiektu.
* effects - tablica efektów. Dokładny opis typu ```Effect``` znajduje się w dalszej części dokumentacji

Parametry tego obiektu można stosować we wszystkich typach obiektów silnika (podobnie jak *params* i *randomization*).

### sound

Obiekt opisuje podstawowy asset dźwiękowy. Obecnie obsługuje te wczytane z pliku, lecz istnieje możliwość syntezy dźwięku. Obiekt jest postaci:

```ts
{
  filename: string,
  attack?: number, //0.04s
  release?: number, //0.04s
  startPoint?: number, //0
  endPoint?: number, //length of sound
  duration?: number, //length of sound
  delay?: number, //0
  detune?: number //0
}
```

* filename - adres pliku
* attack - czas fade-in
* release - czas fade-out
* startPoint - określa faktyczne miejsce rozpoczęcia dźwięku, licząc od jego poczatku. Jednostką jest sampel.
* endPoint - określa miejsce zakończenia dźwięku licząc od jego zakończenia. Jednostką jest sampel.
* duration - określa długość dźwięku licząć od ```startPoint```. Jednostką jest sampel. ```endPoint``` i ```duration``` występują zamiennie, **nigdy** jednocześnie. W przypadku obecności obu pól, brany jest pod uwagę ```endPoint```, a ```duration``` zostanie zignorowany.
* delay - określa czas opóźnienia odtworzenia dźwięku w sekundach
* detune - współczynnik prędkości odtwarzania dźwięku wyrażony w centach.

### container (parametry dla kontenerów)

Parametry dla wszystkich typów kontenerów są identyczne, jednak każdy typ zachowuje się trochę inaczej.

* RandomContainer odtwarza losowo jeden obiekt w swoim ciele.
* SequenceContainer odtwarza dźwięki w swoim ciele po kolei od pierwszego do ostatniego, czekając na zakończenie każdego.
* ParallelContainer odtwarza dźwięki w swoim ciele jednocześnie.

```ts
{
  loop: boolean, //false
  delay: number //0
}
```

* loop - uruchamia tryb odtwarzania w pętli. Tryb odtwarzania w pętli odwtarza dźwięki bez przerwy z opóźnieniem danym w ```delay```. Ważna uwaga: czas opóźnienia liczy się **od początku** poprzedniego dźwięku, a nie od jego końca! Właściwie należałoby uznać to za błędną nazwę, gdyż jest to zachowanie inne od parametru ```delay``` w obiekcie ```Sound``` i być może w przyszłej wersji parametr ```delay``` zostanie przemianowany na ```interval``` oraz zostanie dodany parametr ```delay``` określający to, co powinien określać, tzn opóźnienie odtworzenia liczone od pierwotnego momentu odtworzenia.
* delay - określa wielkość interwału dla trybu loop w sekundach

### sound fx (parametry dla sound fx)

Sound FX nie określa żadnych dodatkowych parametrów w stosunku do Sound Engine Object. Jednakże ze względów wstecznej kompatybilności silnika z prototypowymi wersjami wymagane jest, aby zawierał on pole ```root``` ustawione na ```true```.

```ts
{
  root: true
}
```

## Efekty

Istnieje możliwość wpięcia do każdego obiektu silnika dźwiękowego efektu w sposób szeregowy (jako insert). De facto każdy (przynajmniej z obecnie zaimplementowanych efektów) efekt jest obiektem silnika dźwiękowego, a więc dziedziczy po nim właściwości.

Obecnie zaimplementowane sa następujące efekty:
* Equalizer

### Equalizer

Equalizer to zbiór filtrów, których obiekty umieszcza się w polu ```effects```:
```ts
{
  type: "Equalizer",
  effects: Array<BiquadFilterNode>
}
```

Filtr zawiera te same pola jak w specyfikacji [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/BiquadFilterNode) z wyjątkiem ```detune```. Poniższy obiekt przedstawia domyślne wartości filtra:

```ts
{
  type: 'highpass',
  frequency: 8000,
  gain: 0.0,
  Q: 1.0
};
```

## Sound Field
## Sound Engine

## Tworzenie własnych dźwięków
1. Sklonuj repozytorium
```
git clone https://github.com/moose96/meridian-ai.git
```
lub pobierz najnowsze dane, jeśli masz już sklonowane repozytorium.
```
git pull
```
2. Utwórz nowy folder (w dolnym miejscu)
3. Stwórz plik index.json zachowując zasady zgodne z dokumentacją powyżej
4. Umieść pliki dźwiękowe w tym samym folderze co plik index.json
  * Pamiętaj, aby w polu ```filename``` obiektu ```Sound``` podawać ścieżkę relatywną względem pliku index.json tworzonego dźwięku
5. Przenieś folder do folderu ```/public/data/sounds/``` w katalogu tego projektu.
6. Uruchom polecenie
```
npm run install-sound
```
Skrypt automatycznie doda dźwięki do bazy.
## Contributing
## Referencja API