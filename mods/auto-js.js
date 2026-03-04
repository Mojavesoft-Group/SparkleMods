return {
    id: "auto-js",
    name: "Auto JS",
    description: "Automatically, by default, enable JavaScript extensions.",
    version: "1.0.0",
    author: "codingisfun2831",
    depends: [],
    doMenu: false,

    main() {
        this.startingValue = Process.prototype.enableJS;
        Process.prototype.enableJS = true;
    },

    cleanupFunc() {
        Process.prototype.enableJS = this.startingValue;
    }
}