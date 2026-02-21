// generate.js
//
// using mods from mods folder, generate mods.json
// with the info from the mods
//

const fs = require('fs');
const path = require('path');
const { compileFunction } = require('vm');

const modsDir = path.join(__dirname, 'mods');
const outputFile = path.join(__dirname, 'mods.json');

const mods = [];

// read all files in the mods directory
const files = fs.readdirSync(modsDir);
files.forEach(file => {
    if (file.endsWith('.js')) {
        const filePath = path.join(modsDir, file);
        const content = fs.readFileSync(filePath, 'utf-8');
        const func = compileFunction(content);
        const mod = func();

        // delete code from the mod object, we only want the info
        delete mod.main;
        delete mod.cleanupFuncs;

        // and doMenu
        delete mod.doMenu;

        mods.push(mod);
    }
});

// write the mods to the output file
fs.writeFileSync(outputFile, JSON.stringify(mods, null, 4), 'utf-8');

console.log(`Generated ${outputFile} with ${mods.length} mods.`);
