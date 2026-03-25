return class extends Mod {
    // Metadata
    ID = "jameson-compat"; // the id of the mod
    NAME = "Jameson Compatibility"; // human-readable name
    DESCRIPTION = "Patch Snap! and its forks to support Jameson-only primitives."; // description
    VERSION = "1.3.0"; // version
    AUTHOR = "mojavesoft.net"; // author
    DEPENDS = []; // dependencies (mod ids, useful for libraries)
    DO_MENU = false; // whether to add a menu item

    // Main function - gets ran when the mod is loaded
    main() {
        this.api.disallowSnaps("Jameson")
        // Jameson UUID v4 generation and WebCrypto access
        SnapExtensions.primitives.set(
            'generate_uuid()',
            function() {
                return self.crypto.randomUUID();
            }
        );

        SnapExtensions.primitives.set(
            'uuid_available()',
            function() {
                return Boolean(self?.crypto?.randomUUID);
            }
        );

        SnapExtensions.primitives.set(
            'webcrypto_available()',
            function() {
                return Boolean(self.crypto);
            }
        );

        // Jameson self-inspection primitives
        SnapExtensions.primitives.set(
            'trusted_urls()',
            function() {
                return IDE_Morph.prototype.newList(SnapExtensions.urls);
            }
        );


        SnapExtensions.primitives.set(
            'get_primitive_code(name)',
            function(name) {
                return SnapExtensions.primitives.get(name).toString();
            }
        );

        SnapExtensions.primitives.set(
            'all_primitives()',
            function() {
                let my_primitives = Object.fromEntries(SnapExtensions.primitives);
                return IDE_Morph.prototype.newList(Object.getOwnPropertyNames(my_primitives));
            }
        );

        // Jameson WebSocket support; not compatible with Snap! 12's upcoming WebSocket library
        SnapExtensions.primitives.set(
            'websocket_connect(url)',
            function(url) {
                let newWebSocket = new WebSocket(url);
                newWebSocket.jamesonLastMsg = "";
                newWebSocket.jamesonMsgChecked = true;
                newWebSocket.onmessage = function(event) {
                    this.jamesonLastMsg = event.data;
                    this.jamesonMsgChecked = false;
                    console.log("Message from server ", event.data);
                    console.log(this);
                };
                return newWebSocket;
            }
        );

        SnapExtensions.primitives.set(
            'websocket_close(obj, code)',
            function(obj, code) {
                obj.close(code);
                console.log("closed")
            }
        );

        SnapExtensions.primitives.set(
            'websocket_state(obj)',
            function(obj) {
                return obj.readyState;
            }
        );

        SnapExtensions.primitives.set(
            'websocket_send(obj, data)',
            function(obj, data) {
                obj.send(data);
            }
        );

        SnapExtensions.primitives.set(
            'websocket_lastmsg(obj)',
            function(obj, data) {
                obj.jamesonMsgChecked = true;
                return obj.jamesonLastMsg;
            }
        );

        SnapExtensions.primitives.set(
            'websocket_msgchecked(obj)',
            function(obj, data) {
                return obj.jamesonMsgChecked;
            }
        );

        // Jameson-specific APIs for detecting Sparkle
        SnapExtensions.primitives.set(
            "sparkle_detect()",
            function() {
                return typeof window.__crackle__ !== 'undefined'
            },
        );

        SnapExtensions.primitives.set(
            "sparkle_version()",
            function() {
                return window.__crackle__?.version ?? "";
            },
        );

        SnapExtensions.primitives.set(
            "sparkle_source()",
            function() {
                return window.__crackle__?.source ?? "";
            },
        );

        SnapExtensions.primitives.set(
            "sparkle_isdev()",
            function() {
                return window.__crackle__?.isDev ?? false;
            },
        );
    }

    // Cleanup function - get ran when the mod is "deleted"
    cleanupFunc() {
        SnapExtensions.primitives.delete('generate_uuid()');
        SnapExtensions.primitives.delete('uuid_available()');
        SnapExtensions.primitives.delete('webcrypto_available()');
        SnapExtensions.primitives.delete('trusted_urls()');
        SnapExtensions.primitives.delete('all_primitives()');
        SnapExtensions.primitives.delete('websocket_connect(url)');
        SnapExtensions.primitives.delete('websocket_close(obj, code)');
        SnapExtensions.primitives.delete('websocket_state(obj)');
        SnapExtensions.primitives.delete('websocket_send(obj, data)');
        SnapExtensions.primitives.delete('websocket_lastmsg(obj)');
        SnapExtensions.primitives.delete('websocket_msgchecked(obj)');
        SnapExtensions.primitives.delete('sparkle_detect()');
        SnapExtensions.primitives.delete('sparkle_version()');
        SnapExtensions.primitives.delete('sparkle_source()');
        SnapExtensions.primitives.delete('sparkle_isdev()');
    }
}
