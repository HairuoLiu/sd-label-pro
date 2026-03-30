export const brandNames = ["leica", "sony", "canon", "fujifilm", "ricoh"];

export function initUI() {
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
    {name:"Leica Pro", val:"leica"},
    {name:"Minimal Pro", val:"minimal"},
    {name:"Tech Pro", val:"tech"},
    {name:"Leica Grid", val:"grid"},
    {name:"Black Bar", val:"bar"},
    {name:"Industrial", val:"industrial"},
    {name:"Leica Industrial", val:"leicaIndustrial"},
    {name:"Leica Industrial Bar", val:"leicaIndustrialBar"}
  ].forEach(t => {
    theme.innerHTML += `<option value="${t.val}">${t.name}</option>`;
  });
}