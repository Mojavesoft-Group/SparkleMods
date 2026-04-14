return class extends Mod {
  // Metadata
  ID = "snap-inspector"; // the id of the addon
  NAME = "Snap! Inspector"; // human-readable name
  DESCRIPTION = "Inspect Snap!'s internals and patch them."; // description
  VERSION = "1.0.0"; // version
  AUTHOR = "PPPDUD"; // author
  DEPENDS = []; // dependencies (addon ids, useful for libraries)
  DO_MENU = true; // whether to add a menu item

  // Main function - gets ran when the addon is loaded
  main() {
    let ide = this.api.ide;
    this.menu.addItem("Execute JavaScript", () => {
      new DialogBoxMorph(
        this,
        (input) => {
          eval(input);
        },
        this,
      ).promptCode(
        "Execute JavaScript",
        "// JavaScript code goes here.",
        world,
      );
    });

    this.menu.addItem("Edit trusted code domains", () => {
      new DialogBoxMorph(
        this,
        (input) => {
          SnapExtensions.urls = input.split("\n");
        },
        this,
      ).promptCode(
        "Edit trusted code domains",
        SnapExtensions.urls.join("\n"),
        world,
      );
    });

    this.menu.addItem("Edit addon code", () => {
      let new_obj = {};
      //let json_obj = JSON.parse(localStorage.getItem("crackle_autoload_mods"));
      Object.keys(window.__crackle__.modCodes).forEach((e) => {
        new_obj[e] = e;
      });
      ide.prompt(
        "Select an addon",
        (name) => {
          console.log(name);
          new DialogBoxMorph(
            this,
            (input) => {
              console.log(input);
              window.__crackle__.modCodes[name] = input;
              if (name in window.__crackle__.autoloadMods) {
                add(name);
              }
              this.api.inform("In order to changes to take effect, you may have to refresh this page.", "Notice");
            },
            this,
          ).promptCode("View code", window.__crackle__.modCodes[name], world);
        },
        new_obj,
        "",
      );
    });

    this.menu.addItem("View primitive code", () => {
      let new_obj = {};
      let primitives_dict = Object.fromEntries(SnapExtensions.primitives);
      Object.keys(primitives_dict).forEach((e) => {
        new_obj[e] = e;
      });
      ide.prompt(
        "Select a primitive",
        (name) => {
          console.log(name);
          new DialogBoxMorph(this, (input) => {}, this).promptCode(
            "View code",
            primitives_dict[name].toString(),
            world,
          );
        },
        new_obj,
        "",
      );
    });
  }

  // Cleanup function - get ran when the addon is "deleted"
  cleanupFunc() {}
};
