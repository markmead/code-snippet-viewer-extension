function reddenPage() {
  let modalEl = document.getElementById("modal");

  let preEls = [...document.getElementsByTagName("pre")].filter(
    (el) => el.innerText.trim() !== ""
  );
  let firstPreEl = preEls[0];

  let bodyBackgroundColor =
    window
      .getComputedStyle(document.body)
      .getPropertyValue("background-color") || null;
  let preBackgroundColor =
    getComputedStyle(firstPreEl).getPropertyValue("background-color");
  let preParentBackgroundColor = getComputedStyle(
    firstPreEl.parentElement
  ).getPropertyValue("background-color");
  let backgroundColors = [
    bodyBackgroundColor,
    preBackgroundColor,
    preParentBackgroundColor,
  ];
  let backgroundColor = backgroundColors.find(
    (color) => color !== "rgba(0, 0, 0, 0)"
  );

  let bodyTextColor = window
    .getComputedStyle(document.body)
    .getPropertyValue("color");
  let preTextColor = getComputedStyle(firstPreEl).getPropertyValue("color");
  let preParentTextColor = getComputedStyle(
    firstPreEl.parentElement
  ).getPropertyValue("color");
  let textColors = [bodyTextColor, preTextColor, preParentTextColor];
  let textColor = textColors.find((color) => color !== "rgb(0, 0, 0)");

  if (modalEl) {
    modalEl.remove();
    return;
  }

  modalEl = document.createElement("div");

  preEls.forEach((preEl) => {
    modalEl.innerHTML += `<div>${preEl.outerHTML}</div>`;
  });

  const modalStyle = {
    "background-color": backgroundColor,
    "grid-template-columns": "1fr",
    "z-index": 99999,
    display: "grid",
    gap: "1rem",
    height: "100vh",
    left: 0,
    overflow: "auto",
    padding: "10vh",
    position: "fixed",
    top: 0,
    width: "100%",
    color: textColor,
  };

  modalEl.setAttribute(
    "style",
    Object.entries(modalStyle)
      .map(([key, value]) => `${key}: ${value}`)
      .join(";")
  );

  modalEl.id = "modal";
  document.body.appendChild(modalEl);
}

chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: reddenPage,
  });
});
