export const leicaIndustrialBar = {
  draw(ctx, data, w, h) {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, w, h);

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

    // 黑色顶部条
    const barHeight = 44;
    ctx.fillStyle = "#000000";
    ctx.fillRect(margin, margin, rectW, barHeight);

    // 反色品牌文本
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "bold 16px Helvetica, Arial, sans-serif";
    ctx.fillText(data.brand || "LEICA", w / 2, margin + barHeight / 2);

    // 主型号
    ctx.fillStyle = "#000000";
    ctx.font = "bold 70px Helvetica, Arial, sans-serif";
    ctx.fillText(data.model || "M9", w / 2, h * 0.52);

    // 底部 storage 文本（带分隔点）
    ctx.font = "500 18px Helvetica, Arial, sans-serif";
    const storage = (data.storage || "128GB").toUpperCase();
    const footer = `${storage} • SD`;
    ctx.fillText(footer, w / 2, h - margin - 24);
  }
};