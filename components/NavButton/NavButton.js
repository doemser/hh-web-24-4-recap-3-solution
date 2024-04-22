export function NavButton(title, onClick) {
  const button = document.createElement("button");
  button.textContent = title;
  button.classList.add("button");
  button.addEventListener("click", onClick);
  return button;
}
