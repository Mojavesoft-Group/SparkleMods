# Sparkle Mods
> [!WARNING]
> Historically, Crackle addons were written to use a system in which each addon returned an object. Near the end of Crackle's development, this system was replaced but was never properly removed from the code.
> 
> Starting with Sparkle v0.3, such addons will no longer function properly. No new addons written this way will be accepted to the `SparkleMods` repo.


Collection of Sparkle addons, downloaded/installed by the menu in Sparkle.

## Submitting an addon
Fork this repo, add the addon in the "mods" directory as `[id].js`. Then, create a pull request with that fork to this repo, where we will review it. If it is, it'll be merged in the main repo where people can install it!

Mods are submitted with the [GNU General Public License v3.0](https://www.gnu.org/licenses/gpl-3.0.en.html), if not said otherwise.

Submitting an update to an addon is the same, just fork the repo again, and update the addon file.

Whenever changes are pushed to the `master` branch, a GitHub Actions bot will automatically regenerate the `mods.json` file using the `generate.js` script (historically, mod developers were expected to do this on their own).

### Code formatting
Don't worry about formatting your addon code; a GitHub Actions bot will clean it up automatically when your pull request is merged!

## A note about manmade code
The owner of this project believes in good faith that it complies with [The Manmade Software Declaration 1.0](https://mojavesoft.net/ai-policy/1.0).
Contributors are encouraged to follow the guidelines described at the aforementioned link when proposing any code changes, and patches that appear to violate those rules may be rejected at any time.
