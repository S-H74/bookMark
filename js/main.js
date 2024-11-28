var siteNameInput = document.getElementById("siteNameId");
var siteUrlInput = document.getElementById("siteUrlId");
var firstCharacterCapital = "";
var link;
var webSites_Collection = [];
var content;
var regex;
var text;
//------------------ checking if there is anydata saved
if (localStorage.getItem("links") != null) {
  webSites_Collection = JSON.parse(localStorage.getItem("links"));
  displaylinks();
}
//--------------------------------add link
function addlink() {
  if (
    validationInputs(siteNameInput) == true &&
    validationInputs(siteUrlInput) == true
  ) {
    firstCharacterCapital = siteNameInput.value;
    firstCharacterCapital =
      firstCharacterCapital.charAt(0).toUpperCase() +
      firstCharacterCapital.slice(1);

    var siteUrl = siteUrlInput.value.trim();
    //cehecking if user enter https or not
    if (!/^https?:\/\//i.test(siteUrl)) {
      siteUrl = `https://${siteUrl}`;
    }
    link = {
      siteName: firstCharacterCapital,
      siteUrl: siteUrl,
    };
    webSites_Collection.push(link);
    localStorage.setItem("links", JSON.stringify(webSites_Collection));
    console.log(webSites_Collection);
    displaylinks();
    clearInputs();
  } else {
    Swal.fire({
      title:
        "<h4>Site Name or Url is not valid, Please follow the rules below :</h4>",
      html: `<div class="d-flex justify-content-start align-items-center my-3">
      <i class="fa-solid fa-circle-right me-2" style="color: #ff0000;"></i> <span>Site name must contain at least 3 characters</span>
      </div>
      <div class="d-flex justify-content-start align-items-center my-2">
      <i class="fa-solid fa-circle-right me-2" style="color: #ff0000;"></i> <span>Site URL must be a valid one</span>
      </div>
  `,
    });
  }
}
//---------------------------delete link
function deleteLink(index) {
  webSites_Collection.splice(index, 1);
  localStorage.setItem("links", JSON.stringify(webSites_Collection));
  displaylinks();
}

//--------------------------clear inputs
function clearInputs() {
  siteNameInput.value = null;
  siteUrlInput.value = null;
  siteNameId.classList.remove("is-valid");
  siteUrlId.classList.remove("is-valid");
}
// ------------------------ display links
function displaylinks() {
  content = "";
  var i;
  for (i = 0; i < webSites_Collection.length; i++) {
    content += `
                  <tr>
            <td>${i + 1}</td>
            <td>${webSites_Collection[i].siteName}</td>
            <td>
              <a href="${webSites_Collection[i].siteUrl}"
                class="btn-visit text-decoration-none text-white py-2 px-3 border border-0 rounded"
                target="_blank"
              >
                <i class="fa-solid fa-eye me-1"></i>Visit
              </a>
            </td>
            <td>
              <button
              onclick ="deleteLink(${i})"
                class="btn-delete text-white py-2 px-3 border border-0 rounded"
              >
                <i class="fa-solid fa-trash-can me-1"></i>Delete
              </button>
            </td>
          </tr>
        `;
  }
  document.getElementById("showAllLinks").innerHTML = content;
}

//--------------------validationInputs
function validationInputs(element) {
  regex = {
    siteNameId: /^[a-zA-Z]{3,}$/,
    siteUrlId:
      /^((http(s?)?):\/\/)?([wW]{3}\.)?[a-zA-Z0-9\-.]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})\/??$/i,
  };
  text = element.value;
  if (regex[element.id].test(text)) {
    console.log("valid");
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    console.log("vaild : " + element.id);
    return true;
  } else {
    element.classList.remove("is-valid");
    element.classList.add("is-invalid");
    console.log("invaild : " + element.id);
    return false;
  }
}
