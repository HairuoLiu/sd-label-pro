// SD Label Pro - Traditional Version (No Modules)

const brandNames = ["leica", "sony", "canon", "fujifilm", "ricoh"];

const logos = {};

brandNames.forEach(name => {
  const img = new Image();
  img.src = `./logos/${name}.svg`;
  logos[name.toUpperCase()] = img;
});

const leicaIndustrial = {
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

const leicaIndustrialBar = {
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
    const barHeight = 88;
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

  theme.draw(ctx, data, width, height, logos);
}

document.addEventListener("DOMContentLoaded", () => {
  const brand = document.getElementById("brand");
  const model = document.getElementById("model");
  const storage = document.getElementById("storage");
  const themeSelect = document.getElementById("theme");
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

  function update() {
    const data = {
      brand: brand.value,
      model: model.value,
      storage: storage.value
    };

    const theme = themeSelect.value;

    console.log("update", data, theme);
    generate(ctx, data, themes[theme]);
  }

  document.querySelectorAll("input, select").forEach(el => {
    el.addEventListener("input", update);
    el.addEventListener("change", update);
  });

  download.onclick = () => {
    const a = document.createElement("a");
    a.href = canvas.toDataURL("image/jpeg");
    a.download = "label.jpg";
    a.click();
  };

  update();
});