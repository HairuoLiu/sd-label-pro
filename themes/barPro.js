export const barPro = {
  draw(ctx, data, w, h) {

    // 背景
    ctx.fillStyle = "#f8f8f8";
    ctx.fillRect(0, 0, w, h);

    // 顶部黑条（模板核心）
    ctx.fillStyle = "#111";
    ctx.fillRect(0, 0, w, 70);

    // BRAND（反白）
    ctx.fillStyle = "white";
    ctx.font = "18px Helvetica";
    ctx.textAlign = "center";
    ctx.fillText(data.brand, w / 2, 45);

    // MODEL（大）
    ctx.fillStyle = "#111";
    ctx.font = "bold 80px Helvetica";
    ctx.fillText(data.model, w / 2, 200);

    // 分隔线
    ctx.strokeStyle = "#111";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(40, 240);
    ctx.lineTo(w - 40, 240);
    ctx.stroke();

    // STORAGE
    ctx.fillStyle = "#111";
    ctx.font = "22px Helvetica";
    ctx.fillText(data.storage, w / 2, 300);
  }
};