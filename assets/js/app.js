//
//
const fakeSearchBar = document.getElementById("fakeSearchBar");
const realSearchBar = document.getElementById("realSearchBar");
const exitSearchBarBtn = document.getElementById("exitSearchBar");
const inputSearch = document.getElementById("inputSearch");
const userWrapper = document.querySelector(".userWrapper");

//  Events ===>
fakeSearchBar.addEventListener("click", showSearchBar);
exitSearchBarBtn.addEventListener("click", closeSearchBar);
inputSearch.addEventListener("keyup", searchInputValue);

// Functions ====>

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
    const inputValue = inputSearch.value;
    fetchRequest(inputValue);
  }
}

function fetchRequest(username) {
  checkEmptyUserWrapper();
  fetch(`https://api.github.com/search/users?q=${username}`)
    .then((res) => res.json())
    .then((allUsers) => {
      userWrapper.innerHTML = "";
      for (let i = 0; i < allUsers.items.length; i++) {
        userWrapper.innerHTML += `
        <div class="users">
          <div class="imageUser"><img src=${allUsers.items[i].avatar_url}></div>
          <p id="userName">${allUsers.items[i].login}</p>
          <div class="profLinks">
            <a href=${allUsers.items[i].html_url} target="_blank">More</a>
          </div>`;
      }
    });
}

// checkEmpty userWrapper ===>>
function checkEmptyUserWrapper() {
  // userWrapper.innerHTML == ""
  //   ? (userWrapper.style.padding = "0")
  //   : (userWrapper.style.padding = "20px 30px");

  if (userWrapper.innerHTML == "") {
    userWrapper.style.padding = "0";
  } else {
    userWrapper.style.padding = "20px 30px";
  }
}
