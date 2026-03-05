# Crackle Mods
Collection of Crackle mods, downloaded/installed by the menu in Crackle.

## Submitting a mod
Of course, you'll need the mod. After that, fork this repo, add the mod in the "mods" directory as `[id].js`. Then, create a pull request with that fork to this repo, where we would look at the mod and make sure its fit. If it is, it'll be merged in the main repo where people can install it.

You can also add extra logo and a README file (currently only TXT, maybe I'll create a Markdown to Snap! Morph thing soon.. more like never) for your mod. Simply create a folder with the same ID of your mod in the extra folder, and add those files there. The logo is best as PNG, as other formats might not be supported. Make sure its a square image (it'll be cropped otherwise), try to avoid super big images, a sweet spot is probably around 256x256.

Mods are submitted over the [GNU General Public License v3.0](https://www.gnu.org/licenses/gpl-3.0.en.html), if not said otherwise.

Submitting a UPDATE to a mod is the same, just fork the repo again, update the mod file, and make sure the commit, in its extra information, contains info about the new update. This will eventually be shown in the mod page in Crackle.

After submitting a new mod or a update, please run generate.js with node, to generate the mods.json that Crackle uses!

## A note about manmade code
The owner of this project believes in good faith that it complies with [The Manmade Software Declaration 1.0](https://mojavesoft.net/ai-policy/1.0).
Contributors are encouraged to follow the guidelines described at the aforementioned link when proposing any code changes, and patches that appear to violate those rules may be rejected at any time.