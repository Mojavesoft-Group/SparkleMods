// generate.js
//
// using mods from mods folder, generate mods.json
// with the info from the mods
//

class FakeMod { // Ugh.
  constructor() {
  }
}
const { compileFunction } = require('vm');
const { createContext } = require('vm');
const parsingContext = createContext({Mod: FakeMod})

const fs = require('fs');
const path = require('path');


const modsDir = path.join(__dirname, 'mods');
const extraDir = path.join(__dirname, 'extra');
const outputFile = path.join(__dirname, 'mods.json');

const mods = [];

// read all files in the mods directory
const files = fs.readdirSync(modsDir);
files.forEach(file => {
  console.log("File: " + file)
    if (file.endsWith('.js')) {
        const filePath = path.join(modsDir, file);
        const content = fs.readFileSync(filePath, 'utf-8');
        const func = compileFunction(content, [], {parsingContext});
        let mod =  new func();
        let modJSON = {}
        console.log(mod);

        if (mod.id) {mod.ID = mod.id; modJSON = {version: mod.VERSION, name: mod.NAME, description: mod.DESCRIPTION, author: mod.AUTHOR, mods.push({mod);}
        else { mod = new mod(); mods.push({mod);}

              console.warn(path.join(extraDir, mod.ID));
        // see if there is a extra folder, and if so whats in it
        const extraPath = path.join(extraDir, mod.ID)
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
        

        
    }
});

// write the mods to the output file
fs.writeFileSync(outputFile, JSON.stringify(mods, null, 4), 'utf-8');

console.log(`Generated ${outputFile} with ${mods.length} mods.`);
