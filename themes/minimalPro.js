export const minimalPro = {
  draw(ctx, data, w, h) {

    ctx.fillStyle = "#fafafa";
    ctx.fillRect(0,0,w,h);

    ctx.fillStyle = "#111";

    ctx.font = "bold 48px Inter";
    ctx.fillText(data.model, 30, 150);

    ctx.font = "20px Inter";
    ctx.fillText(data.storage, 30, 210);
  }
};