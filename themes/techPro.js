export const techPro = {
  draw(ctx, data, w, h) {

    ctx.fillStyle = "black";
    ctx.fillRect(0,0,w,h);

    ctx.fillStyle = "#00ffcc";

    ctx.font = "20px monospace";
    ctx.fillText(data.brand, 20, 40);

    ctx.font = "bold 36px monospace";
    ctx.fillText(data.model, 20, 160);

    ctx.font = "18px monospace";
    ctx.fillText(data.storage, 20, 260);
  }
};