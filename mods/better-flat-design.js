return {
  id: "better-flat-design",
  name: "Better Flat Design",
  description: "Makes flat design BETTER!",
  version: "1.0.0",
  author: "d016",
  depends: [],
  doMenu: false,
  main() {
    this.api.disallowSnaps("Split"); // split already has a better flat design, so disallow it to prevent conflicts
    
    InspectorMorph.prototype.init_ = InspectorMorph.prototype.init;
    InspectorMorph.prototype.init = function (...args) {
      this.init_(...args);
      this.edge = 5;
    };
    DialogBoxMorph.prototype.render = function (ctx) {
      var gradient,
        w = this.width(),
        h = this.height(),
        th = Math.floor(fontHeight(this.titleFontSize) + this.titlePadding * 2),
        shift = this.corner / 2,
        x,
        y,
        isFlat = MorphicPreferences.isFlat && !this.is3D;

      // this.alpha = isFlat ? 0.9 : 1;

      // title bar
      if (isFlat) {
        ctx.fillStyle = this.titleBarColor.toString();
      } else {
        gradient = ctx.createLinearGradient(0, 0, 0, th);
        gradient.addColorStop(
          0,
          this.titleBarColor.lighter(this.contrast / 2).toString(),
        );
        gradient.addColorStop(
          1,
          this.titleBarColor.darker(this.contrast).toString(),
        );
        ctx.fillStyle = gradient;
      }
      ctx.beginPath();
      this.outlinePathTitle(ctx, this.corner); //isFlat ? 0 : this.corner);
      ctx.closePath();
      ctx.fill();

      // flat shape
      // body
      ctx.fillStyle = this.color.toString();
      ctx.beginPath();
      this.outlinePathBody(ctx, this.corner); //isFlat ? 0 : this.corner);
      ctx.closePath();
      ctx.fill();

      if (isFlat) {
        return;
      }

      // 3D-effect
      // bottom left corner
      gradient = ctx.createLinearGradient(0, h - this.corner, 0, h);
      gradient.addColorStop(0, this.color.toString());
      gradient.addColorStop(1, this.color.darker(this.contrast.toString()));

      ctx.lineWidth = this.corner;
      ctx.lineCap = "round";
      ctx.strokeStyle = gradient;

      ctx.beginPath();
      ctx.moveTo(this.corner, h - shift);
      ctx.lineTo(this.corner + 1, h - shift);
      ctx.stroke();

      // bottom edge
      gradient = ctx.createLinearGradient(0, h - this.corner, 0, h);
      gradient.addColorStop(0, this.color.toString());
      gradient.addColorStop(1, this.color.darker(this.contrast.toString()));

      ctx.lineWidth = this.corner;
      ctx.lineCap = "butt";
      ctx.strokeStyle = gradient;

      ctx.beginPath();
      ctx.moveTo(this.corner, h - shift);
      ctx.lineTo(w - this.corner, h - shift);
      ctx.stroke();

      // right body edge
      gradient = ctx.createLinearGradient(w - this.corner, 0, w, 0);
      gradient.addColorStop(0, this.color.toString());
      gradient.addColorStop(1, this.color.darker(this.contrast).toString());

      ctx.lineWidth = this.corner;
      ctx.lineCap = "butt";
      ctx.strokeStyle = gradient;

      ctx.beginPath();
      ctx.moveTo(w - shift, th);
      ctx.lineTo(w - shift, h - this.corner);
      ctx.stroke();

      // bottom right corner
      x = w - this.corner;
      y = h - this.corner;

      gradient = ctx.createRadialGradient(x, y, 0, x, y, this.corner);
      gradient.addColorStop(0, this.color.toString());
      gradient.addColorStop(1, this.color.darker(this.contrast.toString()));

      ctx.lineCap = "butt";

      ctx.strokeStyle = gradient;

      ctx.beginPath();
      ctx.arc(x, y, shift, radians(90), radians(0), true);
      ctx.stroke();

      // left body edge
      gradient = ctx.createLinearGradient(0, 0, this.corner, 0);
      gradient.addColorStop(0, this.color.lighter(this.contrast).toString());
      gradient.addColorStop(1, this.color.toString());

      ctx.lineCap = "butt";
      ctx.strokeStyle = gradient;

      ctx.beginPath();
      ctx.moveTo(shift, th);
      ctx.lineTo(shift, h - this.corner * 2);
      ctx.stroke();

      // left vertical bottom corner
      gradient = ctx.createLinearGradient(0, 0, this.corner, 0);
      gradient.addColorStop(0, this.color.lighter(this.contrast).toString());
      gradient.addColorStop(1, this.color.toString());

      ctx.lineCap = "round";
      ctx.strokeStyle = gradient;

      ctx.beginPath();
      ctx.moveTo(shift, h - this.corner * 2);
      ctx.lineTo(shift, h - this.corner - shift);
      ctx.stroke();
    };
    SliderMorph.prototype.init_ = SliderMorph.prototype.init;
    SliderMorph.prototype.init = function (...args) {
      this.init_(...args);
      this.button.alpha = MorphicPreferences.isFlat ? 0.7 : 1;
      this.button.color = MorphicPreferences.isFlat
        ? new Color(100, 100, 100)
        : new Color(200, 200, 200);
      this.button.highlightColor = new Color(210, 210, 255);
      this.button.pressColor = new Color(180, 180, 255);
      this.alpha = MorphicPreferences.isFlat ? 0.08 : 0.3;
    };
    MenuMorph.prototype.createItems_ = MenuMorph.prototype.createItems;
    MenuMorph.prototype.createItems = function () {
      this.createItems_();
      this.edge = 5;
    };
    PushButtonMorph.prototype.drawBackground_ =
      PushButtonMorph.prototype.drawBackground;
    PushButtonMorph.prototype.drawBackground = function (ctx, color) {
      var isFlat = MorphicPreferences.isFlat && !this.is3D;

      ctx.fillStyle = color.toString();
      ctx.beginPath();
      this.outlinePath(
        ctx,
        Math.max(this.corner - this.outline, 0),
        this.outline,
      );
      ctx.closePath();
      ctx.fill();
      ctx.lineWidth = this.outline;
    };
    PushButtonMorph.prototype.drawOutline_ =
      PushButtonMorph.prototype.drawOutline;
    PushButtonMorph.prototype.drawOutline = function (ctx) {
      var outlineStyle,
        isFlat = MorphicPreferences.isFlat && !this.is3D,
        isTransparent = this.color.a < 1;

      if (!this.outline) {
        return null;
      }
      if (false) {
        //this.outlineGradient && !(!this.outline || isFlat)) {
        outlineStyle = ctx.createLinearGradient(0, 0, 0, this.height());
        outlineStyle.addColorStop(0, this.outlineColor.darker().toString());
        outlineStyle.addColorStop(1, "white");
      } else {
        outlineStyle = this.outlineColor.toString();
      }
      ctx.fillStyle = outlineStyle;
      ctx.strokeStyle = outlineStyle;
      ctx.lineWidth = this.outline;
      ctx.beginPath();
      this.outlinePath(ctx, this.corner, isTransparent ? this.outline / 2 : 0);
      ctx.closePath();
      isTransparent ? ctx.stroke() : ctx.fill();
    };
    MorphicPreferences.isFlat = true;
    this.api.ide.refreshIDE();
  },
  cleanupFuncs: [
    function () {
      MenuMorph.prototype.createItems = MenuMorph.prototype.createItems_;
      SliderMorph.prototype.init = SliderMorph.prototype.init_;
      PushButtonMorph.prototype.drawBackground =
        PushButtonMorph.prototype.drawBackground_;
      PushButtonMorph.prototype.drawOutline =
        PushButtonMorph.prototype.drawOutline_;
      InspectorMorph.prototype.init = InspectorMorph.prototype.init_;
    },
  ],
};