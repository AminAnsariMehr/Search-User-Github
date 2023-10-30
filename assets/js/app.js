const fakeSearchBar = document.getElementById("fakeSearchBar");
const realSearchBar = document.getElementById("realSearchBar");
const exitSearchBarBtn = document.getElementById("exitSearchBar");
const inputSearch = document.getElementById("inputSearch");
const userWrapper = document.querySelector(".userWrapper");

//  Events ===>
fakeSearchBar.addEventListener("click", showSearchBar);
exitSearchBarBtn.addEventListener("click", closeSearchBar);
inputSearch.addEventListener("keyup", searchInputValue);

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

// fetchRequest Functions ===>
function searchInputValue(e) {
  checkEmptyUserWrapper();
  if (inputSearch.value && e.key == "Enter") {
    let inputValue = inputSearch.value;
    fetchRequest(inputValue);
  }
}

function fetchRequest(username) {
  fetch(`https://api.github.com/search/users?q=${username}`)
    .then((res) => res.json())
    .then((allUsers) => {
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
    });
}

// checkEmpty userWrapper ===>>
function checkEmptyUserWrapper() {
  userWrapper.innerHTML == ""
    ? (userWrapper.style.padding = "0")
    : (userWrapper.style.padding = "20px 30px");
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
