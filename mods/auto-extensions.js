return class extends Mod {
    ID = "auto-extensions";
    NAME = "Auto Extension Blocks";
    DESCRIPTION = "Automatically enalbe the \"Extension blocks\" setting.";
    VERSION = "1.0.0";
    AUTHOR = "d016";
    DEPENDS = [];
    DO_MENU = false;

    main() {
        this.startingValue = SpriteMorph.prototype.showingExtensions;
        SpriteMorph.prototype.showingExtensions =
                true;
            this.flushBlocksCache('variables');
            this.refreshPalette();
            this.categories.refreshEmpty();
    }

    cleanupFunc() {
        SpriteMorph.prototype.showingExtensions =
                this.startingValue;
            this.flushBlocksCache('variables');
            this.refreshPalette();
            this.categories.refreshEmpty();
    }
}