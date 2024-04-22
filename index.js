import { renderCharacterCards } from "./components/CharacterCard/CharacterCard.js";
import { fetchCharacterPage } from "./utils/fetcher.js";
import { NavButton } from "./components/NavButton/NavButton.js";
import { NavPagination } from "./components/NavPagination/NavPagination.js";
import { SearchBar } from "./components/SearchBar/SearchBar.js";

const navigation = document.querySelector('[data-js="navigation"]');
const pagination = NavPagination("x / x");
const prevButton = NavButton("Prev", () => handlePageChange(-1));
const nextButton = NavButton("Next", () => handlePageChange(1));
navigation.append(prevButton, pagination, nextButton);

const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const searchBar = SearchBar(handleSearchQuery);
searchBarContainer.append(searchBar);

// States
let maxPage = 1;
let page = 1;
let searchQuery = "";

async function handleSearchQuery(event) {
  event.preventDefault();
  searchQuery = event.target.elements.query.value;
  const startPage = 1;
  const characters = await fetchCharacterPage(startPage, searchQuery);
  setPagination(startPage, characters.info.pages);
  renderCharacterCards(characters);
}

function setPagination(newPage, maximumPage) {
  page = newPage;
  maxPage = maximumPage;
  pagination.textContent = `${page}/${maxPage}`;
}

async function handlePageChange(step) {
  const newPage = page + step;
  if (newPage > 0 && newPage <= maxPage) {
    const characters = await fetchCharacterPage(newPage, searchQuery);
    setPagination(newPage, characters.info.pages);
    renderCharacterCards(characters);
  } else {
    console.log(
      step > 0 ? "No more pages to display." : "Whoops, you can't go to page 0."
    );
  }
}

async function App() {
  const characters = await fetchCharacterPage(page, searchQuery);
  setPagination(page, characters.info.pages);
  renderCharacterCards(characters);
}

App();
