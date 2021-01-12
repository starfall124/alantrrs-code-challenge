# alantrrs-code-challenge

Run this script

```bash
$ node directories.js
```
All inputs are hard-coded in the following way:

```javascript
/* directories.js */

// TODO: Define dirs logic 

dirs.run("CREATE fruits");
dirs.run("CREATE vegetables");
dirs.run("CREATE grains");
dirs.run("CREATE fruits/apples");
dirs.run("CREATE fruits/apples/fuji");
dirs.run("LIST");
dirs.run("CREATE grains/squash");
dirs.run("MOVE grains/squash vegetables");
dirs.run("CREATE foods");
dirs.run("MOVE grains foods");
dirs.run("MOVE fruits foods");
dirs.run("MOVE vegetables foods");
dirs.run("LIST");
dirs.run("DELETE fruits/apples");
dirs.run("DELETE foods/fruits/apples");
dirs.run("LIST");

```
