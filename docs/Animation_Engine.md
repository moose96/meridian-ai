# Animation Engine

Zadaniem tego modułu jest wyświetlanie interaktywnych animacji w zależności od odtwarzanych dźwięków.

## Wymagania modułu
* Generowanie animacji na podstawie skryptu powiązanego z odtwarzanym dźwiękiem (sound fx)
* Reagowanie na zmianę każdego z 7 parametrów zdefiniowanych w [silniku](SoundEngine.md)

## Wymagania skryptu opisującego animacje
* Jak najprostsza składnia umożliwiająca zrozumienie tego, co robi skrypt praktycznie bez nauki

Przykład:
```
draw 16 rect as rects1
  fill hsv rand 0 360 1 1
  border #fff
  position grid 4 col 4 row 1 space
  size 200
change rects1
  fill hsv rand 0 360 1 :params.sharpness
  opacity from 1 to 0 in :time
```

Kod powyżej opisuje 16 prostokątów z losowym kolorem (hue od 0 do 360 stopni), białą ramką, o wielkości 200x200px ustawionych w siatce 4x4, z odstępem, które podczas animacji losowo zmieniają hue oraz nasłuchują wartością _value_ na ```:params.sharpness``` a jego krycie (```opacity```) zmienia się od 1 do 0 przez cały czas trwania animacji.