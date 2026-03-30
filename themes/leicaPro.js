export const leicaPro = {
  draw(ctx, data, w, h, logos) {

    ctx.fillStyle = "white";
    ctx.fillRect(0,0,w,h);

    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    ctx.strokeRect(10,10,w-20,h-20);

    // logo
    const logo = logos[data.brand];
    if (logo.complete) {
      ctx.drawImage(logo, w/2-40, 20, 80, 20);
    }

    ctx.textAlign = "center";

    ctx.font = "bold 42px Helvetica";
    ctx.fillStyle = "black";
    ctx.fillText(data.model, w/2, 160);

    ctx.font = "18px Helvetica";
    ctx.fillText(data.storage, w/2, 260);
  }
};