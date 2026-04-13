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
        SnapExtensions.urls.push("https://ego-lay-atman-bay.github.io/snap-extensions/");
    }

    // Cleanup function - get ran when the addon is "deleted"
    cleanupFunc() {
        // TODO: add cleanup URL removal code
    }
}
