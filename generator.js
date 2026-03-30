import { brandNames } from "./ui.js";

const logos = {};

brandNames.forEach(name => {
  const img = new Image();
  img.src = `./logos/${name}.svg`;
  logos[name.toUpperCase()] = img;
});

export function generate(ctx, data, theme) {
  const { width, height } = ctx.canvas;

  ctx.clearRect(0, 0, width, height);

  theme.draw(ctx, data, width, height, logos);
}