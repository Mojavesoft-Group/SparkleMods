/*MIT License

Copyright (c) 2026 PPPDUD

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.*/

let whitelistURL = "https://ego-lay-atman-bay.github.io/snap-extensions/";

return class extends Mod {
    // Metadata
    ID = "whitelist-egolayatmanbay"; // the id of the addon
    NAME = "Whitelist ego-lay-atman-bay"; // human-readable name
    DESCRIPTION = "Whitelist ego-lay-atman-bay's custom primitives for Snap!."; // description
    VERSION = "1.0.0"; // version
    AUTHOR = "PPPDUD"; // author
    DEPENDS = []; // dependencies (addon ids, useful for libraries)
    DO_MENU = false; // whether to add a menu item

    // Main function - gets ran when the addon is loaded
    main() {
        SnapExtensions.urls.push(whitelistURL);
    }

    // Cleanup function - get ran when the addon is "deleted"
    cleanupFunc() {
        SnapExtensions.urls = SnapExtensions.urls.filter(url => url !== whitelistURL);
    }
}
