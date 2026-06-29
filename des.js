let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let mood = "create";
let tmp;

//get Total
function getTotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.background = "rgba(16, 149, 16, 0.27)";
  } else {
    total.innerHTML = "Total";
    total.style.background = " #6a0a03";
  }
}

//create product
let datapro;
if (localStorage.product != null) {
  datapro = JSON.parse(localStorage.product);
} else {
  datapro = [];
}

submit.onclick = function () {
  let newpro = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };
  if (mood === "create") {
    if (newpro.count > 1) {
      for (let i = 0; i < newpro.count; i++) {
        datapro.push(newpro);
      }
    } else {
      datapro.push(newpro);
    }
  } else {
    datapro[tmp] = newpro;
    mood = "create";
    submit.innerHTML = "create";
    count.style.display = "block";
  }

  //save localstorge
  localStorage.setItem("product", JSON.stringify(datapro));
  cleardata();
  showdata();
};

//clear input
function cleardata() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "Total";
  count.value = "";
  category.value = "";
}

//read
function showdata() {
  getTotal();
  let table = "";
  for (let i = 0; i < datapro.length; i++) {
    table += ` <tr>
    <td>${i}</td>
    <td>${datapro[i].title}</td>
    <td>${datapro[i].price}</td>
    <td>${datapro[i].taxes}</td>
    <td>${datapro[i].ads}</td>
    <td>${datapro[i].discount}</td>
    <td>${datapro[i].total}</td>
    <td>${datapro[i].category}</td>
    <td><button onclick="updatedata(${i})" id="update">update</button></td>
    <td><button onclick="deletedata(${i})" id="delete">delete</button></td>
    </tr>`;
  }
  document.getElementById("tbody").innerHTML = table;
  let btndelete = document.getElementById("deleteall");
  if (datapro.length > 0) {
    btndelete.innerHTML = `
    <button onclick="deleteall()">delete all(${datapro.length})</button>
    `;
  } else {
    btndelete.innerHTML = "";
  }
}
showdata();

//delete
function deletedata(i) {
  datapro.splice(i, 1);
  localStorage.product = JSON.stringify(datapro);
  showdata();
}
function deleteall() {
  localStorage.clear();
  datapro.splice(0);
  showdata();
}

//count i create it on create product
//update
function updatedata(i) {
  title.value = datapro[i].title;
  price.value = datapro[i].price;
  taxes.value = datapro[i].taxes;
  ads.value = datapro[i].ads;
  discount.value = datapro[i].discount;
  getTotal();
  count.style.display = "none";
  submit.innerHTML = "Update";
  category.value = datapro[i].category;
  mood = "update";
  tmp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}
//search
let searchmood = "title";
function getsearchmood(id) {
  let search = document.getElementById("search");
  if (id === "searchtitle") {
    searchmood = "title";
    search.placeholder = "search by title";
  } else {
    searchmood = "category";
    search.placeholder = "search by category";
  }
  search.focus();
  search.values = "";
  showdata();
}
function searchdata(value) {
  let table = "";
  if (searchmood == "title") {
    for (let i = 0; i < datapro.length; i++) {
      if (datapro[i].title.includes(value.toLowerCase())) {
        table += ` <tr>
    <td>${i}</td>
    <td>${datapro[i].title}</td>
    <td>${datapro[i].price}</td>
    <td>${datapro[i].taxes}</td>
    <td>${datapro[i].ads}</td>
    <td>${datapro[i].discount}</td>
    <td>${datapro[i].total}</td>
    <td>${datapro[i].category}</td>
    <td><button onclick="updatedata(${i})" id="update">update</button></td>
    <td><button onclick="deletedata(${i})" id="delete">delete</button></td>
    </tr>`;
      }
    }
  } else {
    for (let i = 0; i < datapro.length; i++) {
      if (datapro[i].category.includes(value.toLowerCase())) {
        table += ` <tr>
    <td>${i}</td>
    <td>${datapro[i].title}</td>
    <td>${datapro[i].price}</td>
    <td>${datapro[i].taxes}</td>
    <td>${datapro[i].ads}</td>
    <td>${datapro[i].discount}</td>
    <td>${datapro[i].total}</td>
    <td>${datapro[i].category}</td>
    <td><button onclick="updatedata(${i})" id="update">update</button></td>
    <td><button onclick="deletedata(${i})" id="delete">delete</button></td>
    </tr>`;
      }
    }
  }
  document.getElementById("tbody").innerHTML = table;
}
//   التنبيهات الذكية

const toastContainer = document.createElement("div");
toastContainer.className = "toast-container";
document.body.appendChild(toastContainer);

function showToast(message, type = "success") {
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.innerText = message;

  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = "slideIn 0.3s ease reverse forwards";
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ميزة تبديل الوضع
const themeToggle = document.getElementById("theme-toggle");

const currentTheme = localStorage.getItem("theme") || "dark";

document.documentElement.setAttribute("data-theme", currentTheme);
themeToggle.innerText = currentTheme === "light" ? "☀️ Theme" : "🌙 Theme";

themeToggle.onclick = function () {
  let theme = document.documentElement.getAttribute("data-theme");
  if (theme === "dark") {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
    themeToggle.innerText = "☀️ Theme";
    showToast("Switched to Light Mode", "warning");
  } else {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
    themeToggle.innerText = "🌙 Theme";
    showToast("Switched to Dark Mode", "success");
  }
};
