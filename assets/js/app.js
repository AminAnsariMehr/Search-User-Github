const fakeSearchBar = document.getElementById("fakeSearchBar");
const realSearchBar = document.getElementById("realSearchBar");
const exitSearchBarBtn = document.getElementById("exitSearchBar");
const inputSearch = document.getElementById("inputSearch");
const form = document.querySelector("form");
const main = document.querySelector("main");
const line = document.querySelector(".line");
const errorBtn = document.querySelector(".errorOk");
const errorBox = document.querySelector(".errorEmptyInput");
const userWrapper = document.querySelector(".userWrapper");

//  Events ===>
fakeSearchBar.addEventListener("click", showSearchBar);
exitSearchBarBtn.addEventListener("click", closeSearchBar);
errorBtn.addEventListener("click", closeErrorBox);
form.addEventListener("submit", searchInputValue);

// fetchRequest Functions ===>
function searchInputValue(e) {
  e.preventDefault();
  let inputValue = inputSearch.value.trim();
  inputValue ? fetchRequest(inputValue) : (errorBox.style.left = "50%");
}

const fetchRequest = async (username) => {
  const res = await fetch(`https://api.github.com/search/users?q=${username}`);
  const allUsers = await res.json();
  renderUser(allUsers);
};

// render user to Ul
const renderUser = (allUsers) => {
  userWrapper.innerHTML = "";
  userWrapper.innerHTML += `
  <div id="closeUsersTab">
  <span id="closeUsersList">&nbsp;</span>
  <div class="arrowOpen">
  <img src="./assets/img/RightArrow.png">
  </div>
  </div>
  `;

  for (let i = 0; i < allUsers.items.length; i++) {
    userWrapper.innerHTML += `
  <div class="users">
  <div class="imageUser"><img src=${allUsers.items[i].avatar_url}></div>
  <p id="userName">${allUsers.items[i].login}</p>
  <div class="profLinks">
  <a href=${allUsers.items[i].html_url} target="_blank">More</a>
  </div>`;
  }
  const arrowOpen = document.querySelector(".arrowOpen");
  const closeUserListBtn = document.getElementById("closeUsersList");
  arrowOpen.addEventListener("click", openCloseUserTab);
  closeUserListBtn.addEventListener("click", closeUserList);
  checkEmptyUserWrapper();
  inputSearch.value = "";
};

// closeErrorBox Functions ===>
function closeErrorBox() {
  errorBox.style.left = "150%";
  inputSearch.focus();
}

// SearchBar Functions ===>
function showSearchBar() {
  checkEmptyUserWrapper();
  realSearchBar.style.display = "block";
  document.body.style.opacity = "0.9";
  inputSearch.focus();
}
function closeSearchBar() {
  checkEmptyUserWrapper();
  realSearchBar.style.display = "none";
  document.body.style.opacity = "1";
}

// checkEmpty userWrapper ===>>
function checkEmptyUserWrapper() {
  userWrapper.innerHTML == ""
    ? (userWrapper.style.padding = "0")
    : (userWrapper.style.padding = "20px 30px");

  userWrapper.innerHTML == ""
    ? (main.style.height = "1100px")
    : (main.style.height = "1460px");

  userWrapper.innerHTML == ""
    ? (line.style.height = "390px")
    : (line.style.height = "750px");
}
function openCloseUserTab() {
  closeUsersTab.style.width = "62px";
  closeUsersTab.style.right = "-6px";
  closeUsersTab.querySelector(".arrowOpen").style.left = "5px";
  closeUsersTab.querySelector(".arrowOpen").querySelector("img").src =
    "./assets/img/BackArrow.png";
}
function closeUserList() {
  userWrapper.innerHTML = "";
  checkEmptyUserWrapper();
}
