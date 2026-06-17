async function loadData() {
  const res = await fetch('./data.json');
  return await res.json();
}

function calcPercent(a, b) {
  if (!b) return 0;
  return Math.round((a / b) * 100);
}

function renderProgress(data) {
  const progressItems = [
    {
      label: 'Desarrollo de concepto de CRM',
      percent: calcPercent(data.CRMCompletedPages, data.CRMCPageAmmount),
      detail: `${data.CRMCompletedPages} / ${data.CRMCPageAmmount}`,
    },
    {
      label: 'CRM',
      percent: calcPercent(data.CRMReady, data.CRMCPageAmmount),
      detail: `${data.CRMReady} / ${data.CRMCPageAmmount}`,
    },
    {
      label: 'Desarrollo de concepto CHB',
      percent: calcPercent(data.CHBCompletedPages, data.CHBPageAmmount),
      detail: `${data.CHBCompletedPages} / ${data.CHBPageAmmount}`,
    },
    {
      label: 'CHB',
      percent: calcPercent(data.CHBReady, data.CHBPageAmmount),
      detail: `${data.CHBReady} / ${data.CHBPageAmmount}`,
    },
  ];

  const container = document.getElementById('progress-container');
  container.innerHTML = progressItems
    .map(
      (item) => `
    <div class="progress-item">
      <div class="progress-header">
        <span class="progress-label">${item.label}</span>
        <span class="progress-value">${item.percent}% &nbsp;(${item.detail})</span>
      </div>
      <div class="progress-track">
        <div class="progress-bar" style="width: ${item.percent}%"></div>
      </div>
    </div>
  `
    )
    .join('');
}

function renderLastAvance(data) {
  const container = document.getElementById('last-avance-container');
  container.innerHTML = data.lastAvance
    .map((item) => `<div class="last-update-item">${item}</div>`)
    .join('');
}

function renderActualPages(data) {
  const container = document.getElementById('actual-pages-container');
  container.innerHTML = data.actualPages
    .map((page) => `<div class="screen-item">${page}</div>`)
    .join('');
}

function renderLinks(data) {
  const container = document.getElementById('links-container');
  container.innerHTML = data.utilLink
    .map(
      (item) =>
        `<a href="${item.link}" class="link-btn">${item.linkName}</a>`
    )
    .join('');
}

function renderBlocks(data) {
  const container = document.getElementById('blocks-container');
  container.innerHTML = data.blocks
    .map(
      (item) => `
    <div class="pending-item">
      <div class="pending-title">${item.block}</div>
      <div class="pending-impact">${item.blockAffection}</div>
    </div>
  `
    )
    .join('');
}

async function init() {
  const data = await loadData();
  renderProgress(data);
  renderLastAvance(data);
  renderActualPages(data);
  renderLinks(data);
  renderBlocks(data);
}

init();