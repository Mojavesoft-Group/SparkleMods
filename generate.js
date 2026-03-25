// generate.js
//
// using mods from mods folder, generate mods.json
// with the info from the mods
//

class FakeMod { // Ugh.
  constructor() {
  }
}

const parsingContext = vm.createContext({Mod: FakeMod})

const fs = require('fs');
const path = require('path');
const { compileFunction } = require('vm');

const modsDir = path.join(__dirname, 'mods');
const extraDir = path.join(__dirname, 'extra');
const outputFile = path.join(__dirname, 'mods.json');

const mods = [];

// read all files in the mods directory
const files = fs.readdirSync(modsDir);
files.forEach(file => {
    if (file.endsWith('.js')) {
        const filePath = path.join(modsDir, file);
        const content = fs.readFileSync(filePath, 'utf-8');
        const func = compileFunction(content, [], {parsingContext});
        const mod = func();

        // delete code from the mod object, we only want the info
        delete mod.main;
        delete mod.cleanupFuncs;

        // and doMenu
        delete mod.doMenu;

        // see if there is a extra folder, and if so whats in it
        const extraPath = path.join(extraDir, mod.id)
        if (fs.existsSync(extraPath)) {
            const extra = fs.readdirSync(extraPath);

            mod.extra = [];

            if (extra.includes("logo.png")) {
                mod.extra.push("logo");
            }
            
            if (extra.includes("readme.txt")) {
                mod.extra.push("readme");
            }
        } else {
            mod.extra = null;
        }
        

        mods.push(mod);
    }
});

// write the mods to the output file
fs.writeFileSync(outputFile, JSON.stringify(mods, null, 4), 'utf-8');

console.log(`Generated ${outputFile} with ${mods.length} mods.`);
