# Caesar cipher CLI tool

**A CLI tool that encodes and decodes a text by [Caesar cipher](https://en.wikipedia.org/wiki/Caesar_cipher)**.

1. Checkout to the `caesar-cipher-cli-tool` branch.  
2. Run `npm install`.
3. Have fun!

## Caesar cipher

CLI tool accepts 4 options (short alias or full name):

1.  **-s, --shift**: a shift
2.  **-i, --input**: an input file
3.  **-o, --output**: an output file
4.  **-a, --action**: an action encode/decode

**Shift** (an integer) and **action** (_encode_ or _decode_) are required. 

If the **input** file is missed - stdin is used as an input source.  
If the **output** file is missed - stdout is used as an output destination.

## Usage examples
1. _-a (--action)_ is **encode**

```bash
$ node my_caesar_cli -a encode -s 7
```
> input:
> `This is secret. Message about "_" symbol!`

> output:
> `Aopz pz zljyla. Tlzzhnl hivba "_" zftivs!`

```bash
$ node my_caesar_cli -a encode -s 7 -i "./input.txt" -o "./output.txt"
```
> input.txt
> `This is secret. Message about "_" symbol!`

> output.txt
> `Aopz pz zljyla. Tlzzhnl hivba "_" zftivs!`

```bash
$ node my_caesar_cli --action encode --shift 7 --input plain.txt --output encoded.txt
```
> plain.txt
> `This is secret. Message about "_" symbol!`

> encoded.txt
> `Aopz pz zljyla. Tlzzhnl hivba "_" zftivs!`

2. _-a (--action)_ is **decode**  
_Decoding encoded initial string with the same -s(--shift) number produces the initial string._

```bash
$ node my_caesar_cli --action decode --shift 7 --input encoded.txt --output plain.txt
```

> encoded.txt
> `Aopz pz zljyla. Tlzzhnl hivba "_" zftivs!`

> plain.txt
> `This is secret. Message about "_" symbol!`

3. _Negative shift handling_

```bash
$ node my_caesar_cli --action encode --shift -1 --input plain.txt --output encoded.txt
```

> plain.txt
> `This is secret. Message about "_" symbol!`

> encoded.txt
> `Sghr hr rdbqds. Ldrrzfd zants "_" rxlank!`
