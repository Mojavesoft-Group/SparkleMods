# Sparkle Mods
Collection of Sparkle addons, downloaded/installed by the menu in Sparkle.

## Submitting a mod
Fork this repo, add the addon in the "mods" directory as `[id].js`. Then, create a pull request with that fork to this repo, where we will review it. If it is, it'll be merged in the main repo where people can install it!

Mods are submitted with the [GNU General Public License v3.0](https://www.gnu.org/licenses/gpl-3.0.en.html), if not said otherwise.

Submitting an update to an addon is the same, just fork the repo again, and update the addon file.

Whenever changes are pushed to the `master` branch, a GitHub Actions bot will automatically regenerate the `mods.json` file using the `generate.js` script (historically, mod developers were expected to do this on their own).

## A note about manmade code
The owner of this project believes in good faith that it complies with [The Manmade Software Declaration 1.0](https://mojavesoft.net/ai-policy/1.0).
Contributors are encouraged to follow the guidelines described at the aforementioned link when proposing any code changes, and patches that appear to violate those rules may be rejected at any time.
