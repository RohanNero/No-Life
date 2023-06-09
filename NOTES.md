# No-Life

Here at **Periwinkle Altiplano Labs**, we conduct some of the highest grade Mana optimizations in the world!
Our new focus is on a special Mana optimizations branch, FBME (Future-block-mana-extraction).
It is a new focus of study with big potential, however, it contains an even larger amount of volatility and uncertainty.

Instead of **resonance cascade** we can use **Phygital Actuation**

"Oh no! a **resonance cascade** in the **Aperature Labs** has caused our world to turn chaotic and left 20% of our matter encoded!"
"We need you Gorgon Treeman armed with our brand new **DECODING GUN**, to set out and help the other scientists in the lab!"
"Once you have helped all the scientists, we must work on helping the rest of the world that has been affected by the **resonance cascade!**"

**This will be a game built with scaffold-eth 2**

- Users will deploy a contract similarily to Ethernaut. The UI will update based on the contract values.
  Variables could get updated to true/solved once conditions are met/ challenges are passed.
- We could mint PAOP NFTs
- Multiple levels (contracts)

## Simple overview

Users will have to interact with objects on UI and input various hexadecimal/string to fix things

### In the game's universe:

- **MAY NEED ONE ADDITIONAL TOOL: **BYTE SAVER**, THIS TOOL ALLOWS USERS TO SAVE A CONVERTED BYTES VALUE FROM THE HEX CONVERTER**
  - THE NEED FOR THIS IS BECAUSE FUNCTION SELECTORS HAVE 4 BYTES THAT COME BEFORE ARGUMENTS. (could save one byte string and prepose it to all **Coding Ray** `blast`s.)
- main character will have **two items**: _(MAYBE 4)_
  - **En/Decoding ray** (maybe change to **Coding Ray**)
    - this will be used for encoding and decoding functions to pass problems and defeat enemies
  - **Hex Converter**
    - will be used to convert string text to hexadecimal and vice versa
    - (preliminary to firing **Ray** you will need to get the correct "bullet")
- objects that are **encoded** can be passed through or moved easily
- objects will need to be decoded to return them back to normal self
  - **For example:** _"help Dr Morris has been encoded and cannot move!"_. You must figure out the correct value to pass that will bring him back to his normal self **(eg. a string "Dr Tom Morris")**
- objects will need to be encoded to pass through barricades or **defeat enemies**
  - **For example:** _"a destroyed wall blocks your path"_, you must figure out the correct encoding not only for the type, but eventually for correct values to pass logic checks!
- MUD style game with pictures/animations on UI to add entertainment value for players.
- Will characters unlock more weapons that allow them to do advanced encoding?
- **SUCH AS:**
  - abi.decode
  - abi.encode
  - **abi.encodePacked**
  - **abi.encodeWithSelector**
  - **abi.encodeWithSignature**
  - **abi.encodeCall** -- behaves a little differently, this is also a low level call.
- in-game guides/tips display on UI at different points during the game
  - guide showing how to use **HEX CONVERTER** to get different values, such as a function selector.
- since solidity can't compare bytes and strings using `==` we will need to either test it in a **js/ts** script before calling the contract, or create a seperate main contract that imports all the levels, then the main contract makes low level calls to the levels.

  - bools can be set after/during function calls to enable us to ensure that values are correct without having to use **js/ts** first.

- Will the **HEX CONVERTER** be a contract with many different encoding functions? **YES**
  - **TWO** main modes for this item: **Encoding mode** and **Decoding mode**
    - each mode will have multiple sub-modes such as one for decoding strings, uints, strings and uints, etc.
  - more encoding functions can be unlocked as the **player** progresses
  - start off by just being allowed to use `abi.encode` and `abi.decode`
  - users will start off by decoding NPCS such as **Dr Morris**, in order to do this **players** need to set their **Hex Converter** to decode string mode

## Encoding

- to use .call, first 4 bytes are function selector. arguments follow starting at byte #5.
- "answers" will need to be hard-coded into `levels` scripts. (this means players can look there if they get stuck as well)

## Frontend

- header and footer can stay the same
- the HUD/weapons will minimize until hovered over, then the players item nav bar will maximize and you can see your options
- click 1-3 to choose which weapon you have equipped

## Flow overview

**Each level will have multiple problems to solve, each problem will be a function inside that `Level` contract.**

- To **keep track of which level and problem a user is on**, we will use a `uint counter`.
  - This uint counter may be inside a "mother" factory contract.
  - This "mother" contract will be a `factory` contract in charge of deploying the game contracts for players.
  - In order to keep track of what players have completed the game, we can have a `mapping(address player => counter) public playerTracker`
  - The `counter`'s max value will be the **total number of problems** in our game.

**some levels can display a function larger so that the player can figure out what they need to decode the value to** (which type: string,uint,etc)

_game will start off easy by having **players** decode strings which will appear as NPCs you need to save (eg. Dr Morris)_

1. **player** begins game by clicking a frontend button (this deploys the needed contracts with the **player** address as owner)

2. **player** sees object/enemy and gets console.logged a task (for example: "You must find a way to **decode** `Dr Morris`!")
   - `Dr Morris` and all other game objects will have a `name` that the **player** can see on the frontend.
   - the
3. **player** uses hex converter to

## Technical side

Right now the **Hex Converter** is the contract players will first need to interact with, this contract is filled with `view` functions that return **encoded/decoded** values that the player can then input to their **Coding Ray**.

The **Coding Ray** only has **one** function: `blast`. This function uses low level `call` to interact with the levels. (player submits value and depending on what their `counter`'s value is, that contract `address` is given as the first value.)

## Extras

- **easy, hard, and normal modes**
  - EASY: no dying
  - NORMAL: dying but stay at same problem
  - HARD: dying means you have to restart the current level, (`count` is set to 0)
- **what if** game branches off into **two endings**, break the matrix/reality by encoding everything, or listen to the `Periwinkle Altiplano Labs` scientists and decode everything back to how it was. After beating the game, users are entered into club(array) with other addresses depending on what ending they chose

## For HazardWarning

- make it so users cant use spacebar in the **Hex Converter**

## For Ferric

- need player to lose/die if they don't input correct information after _n_ seconds. (when fighting enemies)
  - basically a popup could show for like 5-10 seconds with "You Died!" or something like that
- listen for event, and on emit:
  - area under viewport should update with text based on the same event listener
    - in addition to the text popping up can we have a button near the text that says `hint`.
    - these `hint`s will pop up depending on the most previous event listener (so `hint` matches current problem)
  - viewport needs to update image
  - can we play audio on the same event listener? for game sound effects and potentially dialoge.

## Temp Notes

Should solving the final problem in a `level` deploy the next `level`?
Or should starting the game run a script that deploys everything? This way all contracts could live on testnet and let anyone play

- Left off working on smart contract logic aka creating problems _( He fresh ==> **c|:)**_

- For `abi.encodeWithSignature`, the **Hex Converter** will need either more additional functions, or the other functions will need to be **BASS BOOSTED**

### Plan currently

- viewport to display current image // scratched for now.
- current text/task to display inside of viewport instead of below
- both of those to update on correct `blast`
- hex converter to be able to call different functions
- create decoder
- header and footer update
- audio onClick
- need google docs to write dialogue
-

## Lessons

### Level 01

`abi.encodePacked` only saves the essential data so it is impossible to decode unless you have the format/structure of the original content.
UI text explaining that you would probably want to use `abi.encode` in most cases - want to add a lesson on hash collisons with packed encoding. (likely to look like two locked doors or two enemies)

### Level 02

**UI text:** So far you've been passing in raw `bytes` data to the **Coding Ray** and allowing logic in the `level`s `fallback` function to divert your function call to the correct target. However, from this point forward you will be directly calling functions by prefixing your data with **4** `bytes`. These **4** `bytes` are known as the **function selector**. These are how functions are identified so **every** function has one.

## Game high level walkthrough

_encoded/infected people can only speak in `bytes`, so everything they say must be decoded_

### LEVEL 00 (high level FBME (Future-block-mana-extraction) wing)

0. `abi.encode` the `string` **"DoctorMorris"** and call `blast` with the output from the `Hex Converter`.

- save one doctor, _you know the name because you know them_

1. `abi.encode` the `string` **"DoctorKeller"** and call `blast` with the output from the `Hex Converter`.

- save one doctor, _you know the name because you know them_

2. `abi.encode` the `strings` **"Doctor Tom"** and **"Doctor Jerry"**, and then call `blast` with the output from the `Hex Converter`.

- save two doctors that have been encoded/fused together, _you know their names because you know them_

3. `abi.decode` the `bytes` to view the hidden string, then `abi.encode` the password and pass the output to `blast`.

   - **UI BYTES:** `0x0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000001b5468652070617373776f726420697320606c616e64736861726b600000000000`

   - decode the `bytes` that a **locked door** has written on it, this will return a string "The password is `landshark`". Then the player `abi.encode`s the password and passes the output to `blast`.

4. `abi.decode` the `bytes` to view the hidden string, then `abi.encode` the password and pass the output to `blast`.

   - **UI BYTES:**
     `0x000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000195468652070617373776f72642069732060736561626561726000000000000000`

   - decode the `bytes` that a **locked door** has written on it, this will return a string "The password is `seabear`". Then the player `abi.encode`s the password and passes the output to `blast`.

5. `abi.encode` the `string` **"rabidFerris"** and call `blast` with the output from the `Hex Converter`.

   - first **enemy**, x number of seconds to call `blast` or else you lose _(popup saying you lost or something)_

6. `abi.decode` the `bytes` to view the hidden string, then `abi.encode` the passwords and pass the output to `blast`
   - **UI BYTES:** `0x000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000305468652070617373776f726473206172653a20274c696d61272c20274b696c6f272c20616e6420274a756c696574272e00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002b20596f75206d75737420656e746572207468656d20696e20616c7068616265746963616c206f726465722e000000000000000000000000000000000000000000`
   - decode the `bytes` that a **locked door** has written on it, this will return a string "". Then the player `abi.encode`s the password and passes the output to `blast`.

### LEVEL 01 (Packaging wing)

0. `abi.encode` the `string` **"rabidFerris"**

1. use mental prowess to decode the encoded data, then `abi.encode` the data into the `Hex Converter`, finally pass output to `blast`

   - introduction to `abi.encodePacked`, **locked door** has `0x7061636b6564` set as its encoded data, but we can't `abi.decode` this since it is `abi.encodePacked`. We can have the prompt on the UI give the players a hint at what the password could be by saying something like:
   - "Since this door utilizes packed encoding, its almost impossible for us to `decode` it without knowing the format of the data."
   - if player clicks on the `hint` button, this displays: **"a=61, b=62, c=63..."**

2.

3.

4.
