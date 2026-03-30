export const gridPro = {
  draw(ctx, data, w, h) {

    // 背景
    ctx.fillStyle = "#f8f8f8";
    ctx.fillRect(0, 0, w, h);

    // 外框
    ctx.strokeStyle = "#111";
    ctx.lineWidth = 2;
    ctx.strokeRect(8, 8, w - 16, h - 16);

    // 分割线
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(20, 70);
    ctx.lineTo(w - 20, 70);

    ctx.moveTo(20, 240);
    ctx.lineTo(w - 20, 240);
    ctx.stroke();

    // BRAND（不会挡）
    ctx.font = "16px Helvetica";
    ctx.textAlign = "center";
    ctx.fillStyle = "#111";
    ctx.fillText(data.brand, w / 2, 45);

    // MODEL（填满空间）
    ctx.font = "bold 72px Helvetica";
    ctx.fillText(data.model, w / 2, 180);

    // STORAGE
    ctx.font = "20px Helvetica";
    ctx.fillText(data.storage, w / 2, 290);
  }
};