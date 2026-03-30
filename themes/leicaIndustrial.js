export const leicaIndustrial = {
  draw(ctx, data, w, h) {
    // 外部画布背景
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, w, h);

    // 细边框（2px）
    const margin = 12;
    const rectW = w - margin * 2;
    const rectH = h - margin * 2;
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 2;
    ctx.strokeRect(margin, margin, rectW, rectH);

    // 裁切安全区（辅助线）
    const safe = margin + 6;
    ctx.strokeStyle = "#999999";
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 3]);
    ctx.strokeRect(safe, safe, w - safe * 2, h - safe * 2);
    ctx.setLineDash([]);

    // 顶部品牌区域
    const topY = margin + 26;
    ctx.fillStyle = "#000000";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.font = "600 16px Helvetica, Arial, sans-serif";
    ctx.fillText(data.brand || "LEICA", w / 2, topY);

    // 顶部下划线
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.moveTo(margin + 14, topY + 16);
    ctx.lineTo(w - margin - 14, topY + 16);
    ctx.stroke();

    // 中央 model
    ctx.font = "bold 72px Helvetica, Arial, sans-serif";
    ctx.fillText(data.model || "M9", w / 2, h * 0.48);

    // 底部可选分割线
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.moveTo(margin + 20, h - margin - 60);
    ctx.lineTo(w - margin - 20, h - margin - 60);
    ctx.stroke();

    // storage 信息
    ctx.font = "500 20px Helvetica, Arial, sans-serif";
    const storageText = (data.storage || "128GB").toUpperCase();
    ctx.fillText(storageText, w / 2, h - margin - 28);
  }
};