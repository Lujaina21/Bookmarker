var siteName = document.getElementById("siteName");
var siteLink = document.getElementById("siteLink");
var tableRow = document.getElementById("tableRows");
var addBtn = document.getElementById("addBtn");
var updateBtn = document.getElementById("updateBtn");
var globalIndex;
var bookmarksList;

if (localStorage.getItem("Bookmarks List")) {
  bookmarksList = JSON.parse(localStorage.getItem("Bookmarks List"));
  displayBookmarks(bookmarksList);
} else {
  bookmarksList = [];
}

function addBookmarks() {
  var inputs = {
    siteName: siteName.value,
    siteLink: siteLink.value,
  };

  bookmarksList.push(inputs);
  displayBookmarks(bookmarksList);
  clearInputs();
  saveToLocalStorage();
}

function displayBookmarks(blist) {
  var cartoona = "";
  for (var i = 0; i < blist.length; i++) {
    cartoona += `<tr>
                  <td class="py-3">${i + 1}</td>
                  <td class="py-3">${blist[i].siteName}</td>
                  <td class="text-center ps-4 py-3">
                    <button
                      class="btn-visit border-0 p-2 d-flex justify-content-center align-items-center text-center rounded-circle"
                    >
                      <i class="fa-solid fa-eye"></i>
                    </button>
                  </td>
                  <td class="text-center ps-3 py-3">
                    <button
                      onclick="setFormToUpdate(${i})" class="btn-edit border-0 p-2 d-flex justify-content-center align-items-center text-center rounded-circle"
                    >
                      <i class="fa-solid fa-pen"></i>
                    </button>
                  </td>
                  <td class="text-center ps-3 py-3">
                    <button
                      onclick="deleteBookmark(${i})" class="btn-delete border-0 p-2 d-flex justify-content-center align-items-center text-center rounded-circle"
                    >
                      <i class="fa-solid fa-trash-can"></i>
                    </button>
                  </td>
                </tr>`;
  }
  tableRow.innerHTML = cartoona;
}

function clearInputs() {
  siteName.value = null;
  siteLink.value = null;
}

function saveToLocalStorage() {
  localStorage.setItem("Bookmarks List", JSON.stringify(bookmarksList));
  displayBookmarks(bookmarksList);
}

function deleteBookmark(idx) {
  bookmarksList.splice(idx, 1);
  console.log(bookmarksList);
  displayBookmarks(bookmarksList);
  saveToLocalStorage(bookmarksList);
}

function setFormToUpdate(idx) {
  globalIndex = idx;
  siteName.value = bookmarksList[idx].siteName;
  siteLink.value = bookmarksList[idx].siteLink;
  addBtn.classList.add("d-none");
  updateBtn.classList.remove("d-none");
}

function updateBookmark() {
  bookmarksList[globalIndex].siteName = siteName.value;
  bookmarksList[globalIndex].siteLink = siteLink.value;
  console.log(bookmarksList);
  displayBookmarks(bookmarksList);
  saveToLocalStorage(bookmarksList);
  addBtn.classList.remove("d-none");
  updateBtn.classList.add("d-none");
  clearInputs();
}
