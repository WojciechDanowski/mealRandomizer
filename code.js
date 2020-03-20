//Button otwierający modal
const openModalBtn = document.getElementById("addModal");
// Modal znajdujący się w divie
const divWithModal = document.getElementById("divModal");
// button zamykający modal
const closeModalBtn = document.getElementById("closeModal");
// button do dodawania ingrendientów
const addIndigrientBtn = document.getElementById("addIngrendientButton");
// div z inputem na składnik
const divWithIngredient = document.getElementsByClassName("addIngredient");
// przycisk do zapisu formy z ingredientsami
const saveFormButton = document.getElementById("savingButton");
// przycisk powrotu do menu głównego
const backToMainMenuButton = document.getElementById("backToMainMenu");
// przycisk do losowania posiłku
const getRandomMealButton = document.getElementById("getRandomMeal");
// container dla posiłku
const addingMealContainer = document.getElementById("formParent");
// wyszukiwarka
const searchInput = document.createElement('input');
// sekcja
const mainSection = document.querySelector('section');

const section = document.querySelector("section");
const footer = document.querySelector("footer");

const header = document.getElementById("titleHeader");

// cały posiłek
let meal = {
  name: "",
  ingredients: []
};

openModalBtn.addEventListener("click", function () {
  divWithModal.classList.add("active");
  footer.classList.add("blurred");

  header.classList.add("blurred");
  console.log("klik");
});

closeModalBtn.addEventListener("click", function () {
  divWithModal.classList.remove("active");
  footer.classList.remove("blurred");

  header.classList.remove("blurred");
  removeAnimationFromSavingButton();
  clearAddingList();
});

// przygotowanie diva z inputem składnika
getPreparedIngridient = () => {
  const ingredientDiv = document.createElement("div");
  let ingredientInput = document.createElement("input");
  ingredientDiv.className = "addIngredient";
  ingredientInput.placeholder = "Dodaj składnik...";

  ingredientInput.className = "ingredientsNames";
  ingredientDiv.appendChild(ingredientInput);

  return ingredientDiv;
};
//funkcja dodające animace
addAnimationToSavingButton = () => {
  saveFormButton.style.animation = "glow 2s infinite linear both";
};
// funkcja wyłączająca animacje
removeAnimationFromSavingButton = () => {
  saveFormButton.style.animation = "";
};

// przygotowany div z inputem ląduje metoda append child do formularza w htmlu
onIngridientAddClick = () => {
  const preparedIngredientDiv = getPreparedIngridient();
  const htmlForm = document.querySelector("form");
  addingMealContainer.appendChild(preparedIngredientDiv);
  addAnimationToSavingButton();
};

addIndigrientBtn.addEventListener("click", onIngridientAddClick);

// Funkcje dodająca posiłek do obiektu meal

let mealNameInput = document.querySelector("#mealName");

const addIngridientsToList = () => {
  const ingredients = document.getElementsByClassName("ingredientsNames");
  for (const ingredient of ingredients) {
    meal.ingredients.push(ingredient.value);
  }
};

const changeMealName = () => {
  meal.name = mealNameInput.value;
};

saveFormButton.addEventListener("click", () => {
  changeMealName();
  addIngridientsToList();
  submitPreparedMeal();
  removeAnimationFromSavingButton();
  divWithModal.classList.remove("active");
  footer.classList.remove("blurred");

  header.classList.remove("blurred");
  clearAddingList();
});

// dodanie obiektu meal do localStorage

const submitPreparedMeal = () => {
  let listOfMealsInStorage = localStorage.getItem("list");

  if (listOfMealsInStorage == "null" || listOfMealsInStorage == null) {
    localStorage.setItem("list", JSON.stringify([]));
    listOfMealsInStorage = localStorage.getItem("list");
  }

  listOfMealsInStorage = JSON.parse(listOfMealsInStorage);

  listOfMealsInStorage = [...listOfMealsInStorage, meal];

  localStorage.setItem("list", JSON.stringify(listOfMealsInStorage));
};

// lista

const showListButton = document.querySelector("#list");

const mealList = document.querySelector("#mealList");
const clearList = () => {
  searchInput.parentNode.removeChild(searchInput)
  document.getElementById("mealList").innerText = "";
};

// h1  z headera
const headerH1 = document.querySelector("h1");
// Div jako kontener na posiłki
const parentElement = document.getElementById("mealList");
// funkcja po otwarciu listy


const openListView = () => {

  mainSection.appendChild(searchInput);
  searchInput.type = "text";
  searchInput.className = "search";

  headerH1.innerText = "List";
  openModalBtn.classList.add("active");
  showListButton.classList.add("active");
  getRandomMealButton.classList.add("active");
  backToMainMenuButton.classList.remove("active");
  let listOfMeals = localStorage.getItem("list");
  listOfMeals = JSON.parse(listOfMeals);
  let mealContainer = null;
  for (let meal of listOfMeals) {
    mealContainer = document.createElement("div");
    mealContainer.innerText = meal.name;
    mealContainer.className = "childElementOfContainer";
    parentElement.appendChild(mealContainer);
  }
};

showListButton.addEventListener("click", openListView);

// funkcja powrotu do menu głównego

openMenuView = () => {
  clearList();
  getRandomMealButton.classList.remove("active");
  openModalBtn.classList.remove("active");
  showListButton.classList.remove("active");
  backToMainMenuButton.classList.add("active");
  headerH1.innerText = "Meal Randomizer";
};

backToMainMenuButton.addEventListener("click", openMenuView);

getRandomMealButton.addEventListener("click", function () {
  alert("Work in progress");
});

// funkcja czyszcząca modal dodawania

clearAddingList = () => {

  addingMealContainer.innerHTML = "";
  const freshDiv = document.createElement("div");
  const freshInput = document.createElement("input");
  mealNameInput = freshInput;
  meal = {
    name: "",
    ingredients: []
  };
  freshDiv.className = "addIndigrient";
  freshInput.id = "mealName";
  freshInput.placeholder = "Dodaj danie...";
  freshDiv.appendChild(freshInput);
  addingMealContainer.appendChild(freshDiv);
};

// lista posiłków 
let mealsInListView = document.getElementsByClassName('childElementOfContainer');

// funkcja wyszukująca posiłki
const searchForMeal = (e) => {
  let searchText = e.target.value.toLowerCase();

  let meals = [...mealsInListView];

  console.log(meals);

  meals = meals.filter(item => item.textContent.toLocaleLowerCase().includes(searchText));
  console.log(meals);
  parentElement.textContent = "";
  meals.forEach(i => parentElement.appendChild(i));


}
searchInput.addEventListener('input', searchForMeal);






// rzeczy do zrobienia:
// - MediaQueries
// - edycja, podgląd i usuwanie z listy
// - losowanie posiłku
// Poprawić wyszukiwarkę by zwracała elementy przy pustej wartości w polu input.