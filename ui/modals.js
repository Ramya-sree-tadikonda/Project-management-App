export function showError(message) {
  const modal = document.createElement('div');
  modal.className = "error-modal";
  modal.innerHTML = `<p>${message}</p><button onclick="this.parentElement.remove()">Close</button>`;
  document.body.appendChild(modal);
}
export function showConfirmation(message, onConfirm) {
  const modal = document.createElement('div');
  modal.className = "confirm-modal";
  modal.innerHTML = `
    <p>${message}</p>
    <button id="yesBtn">Yes</button>
    <button onclick="this.parentElement.remove()">No</button>
  `;
  document.body.appendChild(modal);
  document.getElementById('yesBtn').onclick = () => {
    onConfirm();
    modal.remove();
  };
}
