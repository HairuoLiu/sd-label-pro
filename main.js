// SD Label Pro - Traditional Version (No Modules)

const brandNames = [
  "leica",
  "sony",
  "canon",
  "fujifilm",
  "ricoh",
  "nikon",
  "hasselblad",
  "pentax",
  "panasonic",
  "kodak",
  "olympus",
  "sigma",
  "zeiss",
  "tamron"
];

const brandFontMap = {
  leica: "600 32px 'Arial', sans-serif",
  sony: "600 32px 'Arial', sans-serif",
  canon: "600 32px 'Arial', sans-serif",
  fujifilm: "600 32px 'Arial', sans-serif",
  ricoh: "600 32px 'Arial', sans-serif",
  nikon: "600 32px 'Arial', sans-serif",
  hasselblad: "600 32px 'Arial', sans-serif",
  pentax: "600 32px 'Arial', sans-serif",
  panasonic: "600 32px 'Arial', sans-serif",
  olympus: "600 32px 'Arial', sans-serif",
  sigma: "600 32px 'Arial', sans-serif",
  zeiss: "600 32px 'Arial', sans-serif",
  tamron: "600 32px 'Arial', sans-serif"
};

const logos = {};
let backgroundImage = null;
let backgroundStyle = "none";

function clearTextHole(ctx, text, x, y, font, padding = 8) {
  ctx.save();
  ctx.font = font;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  const metrics = ctx.measureText(text);
  const width = metrics.width + padding * 2;
  const fontSize = parseInt(font.match(/(\d+)px/)[1], 10);
  const height = fontSize + padding * 2;
  const x0 = x - width / 2;
  const y0 = y - height / 2;

  ctx.globalCompositeOperation = "destination-out";
  ctx.fillStyle = "rgba(0,0,0,1)";
  ctx.fillRect(x0, y0, width, height);
  ctx.restore();
}

const brandLogoConfig = {
  leica: { width: 90, height: 32 },
  sony: { width: 100, height: 28 },
  canon: { width: 100, height: 28 },
  fujifilm: { width: 90, height: 28 },
  ricoh: { width: 80, height: 26 },
  nikon: { width: 90, height: 26 },
  hasselblad: { width: 110, height: 28 },
  pentax: { width: 90, height: 28 },
  panasonic: { width: 100, height: 28 },
  olympus: { width: 90, height: 28 },
  sigma: { width: 90, height: 28 },
  zeiss: { width: 90, height: 28 },
  tamron: { width: 90, height: 28 }
};

function drawBrandLogo(ctx, brand, centerX, centerY, rectW, maxW = null, maxH = null) {
  const key = (brand || "leica").toLowerCase();
  const cfg = brandLogoConfig[key] || { width: 90, height: 28 };

  const img = logos[key.toUpperCase()];
  if (img && img.complete && img.naturalWidth > 0) {
    const logoRatio = img.naturalWidth / img.naturalHeight;
    let drawW = cfg.width;
    let drawH = cfg.height;

    // 根据传入限制调整尺寸
    if (maxW) {
      const scaleW = maxW / drawW;
      if (scaleW < 1) {
        drawW *= scaleW;
        drawH *= scaleW;
      }
    }
    if (maxH) {
      const scaleH = maxH / drawH;
      if (scaleH < 1) {
        drawW *= scaleH;
        drawH *= scaleH;
      }
    }

    if (drawW / drawH > logoRatio) {
      drawW = drawH * logoRatio;
    } else {
      drawH = drawW / logoRatio;
    }

    let x0 = centerX - drawW / 2;
    const y0 = centerY - drawH / 2;
    const maxX0 = centerX - rectW / 2 + 8;
    const maxX1 = centerX + rectW / 2 - 8;

    if (x0 < maxX0) x0 = maxX0;
    if (x0 + drawW > maxX1) drawW = Math.min(drawW, maxX1 - x0);

    ctx.drawImage(img, x0, y0, drawW, drawH);
    return true;
  }

  return false;
}

function getBrandFontFamily(brand) {
  const font = getBrandFont(brand);
  const family = font.replace(/^\d+\s*\d+px\s*/, "");
  return family || "'Helvetica Neue', 'Arial', sans-serif";
}

function fitFontToArea(ctx, text, weight, family, maxWidth, maxHeight, minSize = 16, maxSize = 120) {
  let size = Math.min(maxSize, maxHeight);
  while (size >= minSize) {
    ctx.font = `${weight} ${Math.floor(size)}px ${family}`;
    const metrics = ctx.measureText(text);
    const height = Math.floor(size * 1.1);

    if (metrics.width <= maxWidth && height <= maxHeight) {
      return ctx.font;
    }
    size -= 1;
  }
  return `${weight} ${minSize}px ${family}`;
}

function drawTopBrandSafeZone(ctx, margin, rectW) {
  const safeHeight = 62;
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(margin, margin, rectW, safeHeight);
}

function getBrandFont(brand) {
  const key = (brand || "leica").toLowerCase();
  return brandFontMap[key] || "600 32px 'Helvetica Neue', 'Arial', sans-serif";
}

function drawTextBackground(ctx, text, x, y, font, padding = 6, backgroundColor = "rgba(255,255,255,0.9)") {
  ctx.save();
  ctx.font = font;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  const metrics = ctx.measureText(text);
  const width = metrics.width + padding * 2;
  const fontSize = parseInt(font.match(/(\d+)px/)[1], 10);
  const height = fontSize + padding * 2;  // 基于 fontSize，忽略 ascent/descent，确保上下边距一致

  const x0 = x - width / 2;
  const y0 = y - height / 2;

  ctx.fillStyle = backgroundColor;
  const radius = 12;
  ctx.beginPath();
  ctx.moveTo(x0 + radius, y0);
  ctx.lineTo(x0 + width - radius, y0);
  ctx.quadraticCurveTo(x0 + width, y0, x0 + width, y0 + radius);
  ctx.lineTo(x0 + width, y0 + height - radius);
  ctx.quadraticCurveTo(x0 + width, y0 + height, x0 + width - radius, y0 + height);
  ctx.lineTo(x0 + radius, y0 + height);
  ctx.quadraticCurveTo(x0, y0 + height, x0, y0 + height - radius);
  ctx.lineTo(x0, y0 + radius);
  ctx.quadraticCurveTo(x0, y0, x0 + radius, y0);
  ctx.closePath();
  ctx.fill();

  ctx.restore();
}


brandNames.forEach(name => {
  const img = new Image();
  img.src = `./logos/${name}.svg`;
  logos[name.toUpperCase()] = img;
});

function resolveFont(brand, role) {
  const fallback = role === "title" ? "600 32px 'Helvetica Neue', 'Arial', sans-serif" : "500 24px 'Helvetica Neue', 'Arial', sans-serif";
  const brandKey = (brand || "leica").toLowerCase();
  if (!brandFontMap[brandKey]) return fallback;
  const base = brandFontMap[brandKey].replace(/\d+px/, "");
  if (role === "title") return `${base} 32px`;
  if (role === "model") return `${base} 76px`;
  if (role === "storage") return `${base} 24px`;
  return fallback;
}


const leicaIndustrial = {
  draw(ctx, data, w, h) {
    // 背景由 drawBackground 处理，只有没有背景图时才填白
    if (!data.backgroundImage) {
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, w, h);
    }

    const margin = 12;
    const rectW = w - margin * 2;
    const rectH = h - margin * 2;

    // 顶部品牌安全区域 - 白底
    drawTopBrandSafeZone(ctx, margin, rectW);

    // 细边框（2px）
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 2;
    ctx.strokeRect(margin, margin, rectW, rectH);

    const isHighContrast = data.backgroundStyle === "high-contrast";
    const textColor = isHighContrast ? "#ffffff" : "#000000";

    // 顶部品牌区域：优先绘制 SVG logo，fallback 为文本
    const brandKey = (data.brand || "leica").toLowerCase();
    const brandCfg = brandLogoConfig[brandKey] || { width: 90, height: 28 };
    const maxLogoWidth = rectW * 0.5;
    const maxLogoHeight = Math.max(28, rectH * 0.11);
    const topY = margin + Math.max(brandCfg.height, maxLogoHeight) / 2 + 8;

    const brandLogoDrawn = drawBrandLogo(ctx, data.brand, w / 2, topY, rectW, maxLogoWidth, maxLogoHeight);
    if (!brandLogoDrawn) {
      const brandLabel = (data.brand || "LEICA").toUpperCase();
      const family = getBrandFontFamily(data.brand);
      const brandFont = fitFontToArea(ctx, brandLabel, "700", family, rectW * 0.75, maxLogoHeight + 12, 20, 72);
      drawTextBackground(ctx, brandLabel, w / 2, topY, brandFont, 6, "rgba(255,255,255,0.85)");
      ctx.fillStyle = textColor;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = brandFont;
      ctx.fillText(brandLabel, w / 2, topY);
    }

    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.moveTo(margin + 14, topY + brandCfg.height / 2 + 10);
    ctx.lineTo(w - margin - 14, topY + brandCfg.height / 2 + 10);
    ctx.stroke();

    // 中央 model 文本 + 底色（尽量填满中心区域）
    const modelText = (data.model || "M9").toUpperCase();
    const modelAreaHeight = h * 0.30;
    const modelFontFamily = getBrandFontFamily(data.brand);
    const modelFont = fitFontToArea(ctx, modelText, "700", modelFontFamily, rectW - 28, modelAreaHeight, 32, 140);
    const modelY = h * 0.48;
    drawTextBackground(ctx, modelText, w / 2, modelY, modelFont, 6, "rgba(248,245,240,0.92)");
    ctx.fillStyle = textColor;
    ctx.font = modelFont;
    ctx.fillText(modelText, w / 2, modelY);

    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.moveTo(margin + 20, h - margin - 58);
    ctx.lineTo(w - margin - 20, h - margin - 58);
    ctx.stroke();

    // 底部 storage 文本 + 底色
    const storageText = (data.storage || "128GB").toUpperCase();
    const storageFontFamily = getBrandFontFamily(data.brand);
    const storageFont = fitFontToArea(ctx, storageText, "600", storageFontFamily, rectW * 0.75, h * 0.10, 20, 46);
    const storageY = h - margin - 18;
    drawTextBackground(ctx, storageText, w / 2, storageY, storageFont, 6, "rgba(255,255,255,0.85)");
    ctx.fillStyle = textColor;
    ctx.font = storageFont;
    ctx.fillText(storageText, w / 2, storageY);
  }
};

const leicaIndustrialBar = {
  draw(ctx, data, w, h) {
    // 背景由 drawBackground 处理，只有没有背景图时才填白
    if (!data.backgroundImage) {
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, w, h);
    }

    const margin = 12;
    const rectW = w - margin * 2;
    const rectH = h - margin * 2;
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 2;
    ctx.strokeRect(margin, margin, rectW, rectH);

    const isHighContrast = data.backgroundStyle === "high-contrast";
    const textColor = isHighContrast ? "#ffffff" : "#000000";

    // 裁切安全区（辅助线）
    const safe = margin + 6;
    ctx.strokeStyle = "#999999";
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 3]);
    ctx.strokeRect(safe, safe, w - safe * 2, h - safe * 2);
    ctx.setLineDash([]);

    // 黑色顶部条
    const barHeight = 88;
    ctx.fillStyle = "#000000";
    ctx.fillRect(margin, margin, rectW, barHeight);

    // 反色品牌区域：logo 优先，文字 fallback
    const brandKey = (data.brand || "leica").toLowerCase();
    const brandCfg = brandLogoConfig[brandKey] || { width: 90, height: 28 };
    const maxLogoWidth = rectW * 0.45;
    const maxLogoHeight = Math.max(28, barHeight * 0.75);
    const brandLogoDrawn2 = drawBrandLogo(ctx, data.brand, w / 2, margin + barHeight / 2, rectW, maxLogoWidth, maxLogoHeight);
    if (!brandLogoDrawn2) {
      const brandLabelBar = (data.brand || "LEICA").toUpperCase();
      const familyBar = getBrandFontFamily(data.brand);
      const titleFontBar = fitFontToArea(ctx, brandLabelBar, "700", familyBar, rectW * 0.8, barHeight * 0.85, 22, 58);
      ctx.fillStyle = "#ffffff";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = titleFontBar;
      ctx.fillText(brandLabelBar, w / 2, margin + barHeight / 2);
    }

    // 主型号（模型字体与 leicaIndustrial 同步）
    const modelText = (data.model || "M9").toUpperCase();
    const modelFontBar = fitFontToArea(ctx, modelText, "700", getBrandFontFamily(data.brand), rectW - 24, h * 0.28, 32, 140);
    const modelYbar = h * 0.52;
    drawTextBackground(ctx, modelText, w / 2, modelYbar, modelFontBar, 6, "rgba(255,255,255,0.95)");
    ctx.fillStyle = textColor;
    ctx.font = modelFontBar;
    ctx.fillText(modelText, w / 2, modelYbar);

    // 底部 storage 文本（仅存储大小）
    const storageText = (data.storage || "128GB").toUpperCase();
    const storageFontBar = fitFontToArea(ctx, storageText, "600", getBrandFontFamily(data.brand), rectW * 0.75, h * 0.09, 20, 46);
    drawTextBackground(ctx, storageText, w / 2, h - margin - 18, storageFontBar, 6, "rgba(255,255,255,0.9)");
    ctx.fillStyle = textColor;
    ctx.font = storageFontBar;
    ctx.fillText(storageText, w / 2, h - margin - 24);
  }
};

function applyImageStyle(ctx, w, h, style) {
  if (style === "none") return;

  try {
    const imageData = ctx.getImageData(0, 0, w, h);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const avg = (r + g + b) / 3;

      if (style === "grayscale") {
        data[i] = data[i + 1] = data[i + 2] = avg;
      } else if (style === "high-contrast") {
        const val = avg > 128 ? 255 : 0;
        data[i] = data[i + 1] = data[i + 2] = val;
      } else if (style === "minimal") {
        const val = avg > 128 ? 220 : 30;
        data[i] = data[i + 1] = data[i + 2] = val;
      }
    }

    ctx.putImageData(imageData, 0, 0);
  } catch (e) {
    console.warn("Canvas tainted, skipping image style application:", e);
  }
}

function drawBackground(ctx, data, w, h) {
  const margin = 12;
  const topBarHeight = 62; // 保证 brand bar 位置不被背景覆盖
  const safeMargin = 6;

  if (!data.backgroundImage) {
    if (data.backgroundStyle === "grayscale") {
      ctx.fillStyle = "#e6e6e6";
    } else if (data.backgroundStyle === "high-contrast") {
      ctx.fillStyle = "#111111";
    } else if (data.backgroundStyle === "minimal") {
      ctx.fillStyle = "#f7f6f3";
    } else {
      ctx.fillStyle = "#ffffff";
    }
    ctx.fillRect(0, 0, w, h);

    // Top brand safe zone 仍保持干净白色（不被模式色污染）
    drawTopBrandSafeZone(ctx, margin, w - margin * 2);
    return;
  }

  const img = data.backgroundImage;
  // cover, keep aspect ratio for the inner area
  const clipX = margin + safeMargin;
  const clipY = margin + topBarHeight;
  const clipW = w - (margin + safeMargin) * 2;
  const clipH = h - clipY - (margin + safeMargin);

  ctx.save();
  ctx.beginPath();
  ctx.rect(clipX, clipY, clipW, clipH);
  ctx.clip();

  const aspect = img.width / img.height;
  const areaAspect = clipW / clipH;
  let drawW, drawH, offsetX, offsetY;

  if (aspect > areaAspect) {
    drawH = clipH;
    drawW = clipH * aspect;
    offsetX = clipX - (drawW - clipW) / 2;
    offsetY = clipY;
  } else {
    drawW = clipW;
    drawH = clipW / aspect;
    offsetX = clipX;
    offsetY = clipY - (drawH - clipH) / 2;
  }

  ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
  ctx.restore();

  // 应用风格（灰度/高对比/简化）
  if (data.backgroundStyle && data.backgroundStyle !== "none") {
    try {
      applyImageStyle(ctx, w, h, data.backgroundStyle);
    } catch (e) {
      console.warn("背景滤镜应用失败：", e);
    }
  }

  // 画顶部安全区盖住底图，避免 bleed
  drawTopBrandSafeZone(ctx, margin, w - margin * 2);

  // 画虚线区域提示（可选）
  ctx.save();
  ctx.strokeStyle = "#999999";
  ctx.lineWidth = 1;
  ctx.setLineDash([4, 3]);
  ctx.strokeRect(clipX, clipY, clipW, clipH);
  ctx.restore();
}

// Include other themes here if needed, but for simplicity, only new ones

const themes = {
  leicaIndustrial: leicaIndustrial,
  leicaIndustrialBar: leicaIndustrialBar
};

function initUI() {
  const brand = document.getElementById("brand");
  const storage = document.getElementById("storage");
  const theme = document.getElementById("theme");

  brandNames.map(name => name.toUpperCase()).forEach(b => {
    brand.innerHTML += `<option>${b}</option>`;
  });

  ["32GB","64GB","128GB","256GB","512GB"].forEach(s => {
    storage.innerHTML += `<option>${s}</option>`;
  });

  [
    {name:"Leica Industrial", val:"leicaIndustrial"},
    {name:"Leica Industrial Bar", val:"leicaIndustrialBar"}
  ].forEach(t => {
    theme.innerHTML += `<option value="${t.val}">${t.name}</option>`;
  });
}

function generate(ctx, data, theme) {
  const { width, height } = ctx.canvas;

  ctx.clearRect(0, 0, width, height);

  try {
    drawBackground(ctx, data, width, height);
  } catch (bgErr) {
    console.error("drawBackground error:", bgErr);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, width, height);
  }

  try {
    theme.draw(ctx, data, width, height, logos);
  } catch (themeErr) {
    console.error("theme.draw error:", themeErr);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const brand = document.getElementById("brand");
  const model = document.getElementById("model");
  const storage = document.getElementById("storage");
  const themeSelect = document.getElementById("theme");
  const bgStyleSelect = document.getElementById("bgStyle");
  const bgFileInput = document.getElementById("bgFile");
  const clearBgBtn = document.getElementById("clearBg");
  const download = document.getElementById("download");

  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  if (!brand || !model || !storage || !themeSelect || !download || !canvas || !ctx) {
    console.error("UI 元素未找到，请确认 index.html 结构正确。");
    return;
  }

  canvas.width = 300;
  canvas.height = 375;

  initUI();

  console.log("initUI completed", { brand: brand.value, model: model.value, storage: storage.value, theme: themeSelect.value });

  // 默认值
  brand.value = "LEICA";
  model.value = "M9";
  storage.value = "128GB";
  themeSelect.value = "leicaIndustrial";
  backgroundStyle = "grayscale";
  if (bgStyleSelect) bgStyleSelect.value = "grayscale";

  function update() {
    const data = {
      brand: brand.value,
      model: model.value,
      storage: storage.value,
      backgroundImage: backgroundImage,
      backgroundStyle: backgroundStyle
    };

    const theme = themeSelect.value;

    console.log("update", data, theme);
    generate(ctx, data, themes[theme]);
  }

  document.querySelectorAll("input, select").forEach(el => {
    el.addEventListener("input", update);
    el.addEventListener("change", update);
  });

  bgStyleSelect.addEventListener("change", () => {
    backgroundStyle = bgStyleSelect.value;
    update();
  });

  bgFileInput.addEventListener("change", event => {
    const file = event.target.files && event.target.files[0];
    if (!file) return;

    const img = new Image();
    img.onload = () => {
      backgroundImage = img;
      update();
      URL.revokeObjectURL(img.src);
    };
    img.onerror = () => {
      console.error("无法加载背景图片");
      backgroundImage = null;
      update();
    };

    img.src = URL.createObjectURL(file);
  });

  clearBgBtn.addEventListener("click", () => {
    backgroundImage = null;
    bgFileInput.value = "";
    update();
  });

  download.onclick = () => {
    const a = document.createElement("a");
    a.href = canvas.toDataURL("image/jpeg");
    a.download = "label.jpg";
    a.click();
  };

  update();
});