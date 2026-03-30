export const industrialPro = {
  draw(ctx, data, w, h) {

    // 背景
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, w, h);

    // 外框
    ctx.strokeStyle = "#111";
    ctx.lineWidth = 2;
    ctx.strokeRect(10, 10, w - 20, h - 20);

    // 左下角纹理（设计感关键）
    ctx.strokeStyle = "#111";
    ctx.lineWidth = 1;
    for (let i = 0; i < 20; i++) {
      ctx.beginPath();
      ctx.moveTo(20 + i * 4, h - 40);
      ctx.lineTo(10 + i * 4, h - 20);
      ctx.stroke();
    }

    // BRAND
    ctx.font = "14px Helvetica";
    ctx.textAlign = "left";
    ctx.fillStyle = "#111";
    ctx.fillText(data.brand, 20, 40);

    // MODEL（超大）
    ctx.font = "bold 70px Helvetica";
    ctx.textAlign = "center";
    ctx.fillText(data.model, w / 2, 180);

    // STORAGE（右下）
    ctx.font = "18px Helvetica";
    ctx.textAlign = "right";
    ctx.fillText(data.storage, w - 20, h - 20);
  }
};