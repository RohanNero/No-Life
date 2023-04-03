## Game guide

This guide serves as a source of information for players who get stuck or just want to learn!

### Level 00

The first problem you come across in **No-Life** is presented on the UI as an NPC you must save, but on the smart contract `DrMorris` is actually pretty simple.

_You can easily tell what problem you're on by looking at the second `playTheRules` variable._

```
function DoctorMorris() external onlyFallback playTheRules(count, 0){
        count = 1;
    }
```

The first \_\_\_ problems are a little different than most of the other ones because the functions aren't actually called by the player. These functions with the `onlyFallback` parameter are called by the `Level00` contract after the player's **Coding Ray** `blast` sends `calldata` to the contract's `fallback()` function.

```
if(keccak256(msg.data) == keccak256(DrMorris)) {
            this.DoctorMorris();
    }
```

This is the first problem's logic check to ensure that you passed the correct input. (Inside `fallback()`)
