function createSnippets() {
  let modalEl = document.getElementById("modal");

  if (modalEl) {
    modalEl.remove();
    return;
  }

  let modalInnerEl = document.createElement("div");

  const preEls = [...document.getElementsByTagName("pre")].filter(
    (el) => el.innerText.trim() !== ""
  );

  const firstPreEl = preEls[0];

  const backgroundColor = [
    getColor(firstPreEl, "background-color"),
    getColor(firstPreEl?.parentElement, "background-color"),
    getColor(document.body, "background-color"),
  ].find((color) => color !== "rgba(0, 0, 0, 0)");

  const textColor = [
    getColor(firstPreEl, "color"),
    getColor(firstPreEl?.parentElement, "color"),
    getColor(document.body, "color"),
  ].find((color) => color !== "rgba(0, 0, 0, 0)");

  const borderColor = textColor.replace("rgb", "rgba").replace(")", ", 0.2)");

  const preStyle = `
    padding: 1rem;border-radius: 0.5rem;width:100%;overflow:auto;box-sizing:border-box;border: 1px solid ${borderColor};
  `;

  modalEl = document.createElement("div");
  modalEl.appendChild(modalInnerEl);

  preEls.forEach(
    (preEl) =>
      (modalInnerEl.innerHTML += `<div style="${preStyle}">${preEl.outerHTML}</div>`)
  );

  const modalStyle = {
    "background-color": backgroundColor,
    "box-sizing": "border-box",
    "z-index": 99999,
    color: textColor,
    height: "100vh",
    left: 0,
    padding: "2rem",
    position: "fixed",
    top: 0,
    width: "100%",
    display: "flex",
    "align-items": "center",
    "justify-content": "center",
  };

  const modalInnerStyle = {
    "grid-template-columns": "1fr",
    "max-height": "calc(100vh - 4rem)",
    "max-width": "65ch",
    display: "grid",
    gap: "1rem",
    overflow: "auto",
    margin: "auto",
    width: "100%",
  };

  modalEl.setAttribute(
    "style",
    Object.entries(modalStyle)
      .map(([key, value]) => `${key}: ${value}`)
      .join(";")
  );

  modalInnerEl.setAttribute(
    "style",
    Object.entries(modalInnerStyle)
      .map(([key, value]) => `${key}: ${value}`)
      .join(";")
  );

  modalEl.id = "modal";
  document.body.appendChild(modalEl);

  function getColor(el, property) {
    if (!el) return;

    return getComputedStyle(el).getPropertyValue(property);
  }
}

chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: createSnippets,
  });
});
