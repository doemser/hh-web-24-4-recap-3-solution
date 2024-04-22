export function NavPagination(content) {
  const navigation = document.createElement("span");
  navigation.classList.add("navigation__pagination");
  navigation.textContent = content;
  return navigation;
}
