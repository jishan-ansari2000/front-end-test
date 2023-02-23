function setActive(index) {
  let selectBtn = document.getElementsByClassName("selectBtn");
  let tableContainer = document.getElementsByClassName("tableContainer");

  for (let i = 0; i < 3; i++) {
    if (index == i) {
      selectBtn[index].className += " active";
      tableContainer[index].className += " active";
    } else {
      selectBtn[i].classList.remove("active");
      tableContainer[i].classList.remove("active");
    }
  }
}

let SellAllArray = [];
let SellAllFinalArray = [];
let SellAllTable = document.getElementById("SellAlltable");
let SellAllTotalCost = 0;

document
  .getElementById("SellPriceAllform")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const itemName = event.target["itemName"].value;
    const itemPrice = Number(event.target["itemPrice"].value);

    SellAllTotalCost += itemPrice;

    let temp = {
      itemName: itemName,
      itemPrice: itemPrice,
    };
    SellAllArray.push(temp);

    let tr = document.createElement("tr");
    // p.className = "subtext";
    tr.innerHTML = `<td>${itemName}</td><td>${itemPrice}</td>`;

    SellAllTable.appendChild(tr);

    event.target["itemName"].value = "";
    event.target["itemPrice"].value = "";
  });

document
  .getElementById("SellPriceAllProfitform")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const profitMargin = event.target["ProfitMargin"].value;

    SellAllArray.forEach((item) => {
      console.log();
      let item2 = {
        itemName: item.itemName,
        itemPrice: item.itemPrice,
        itemWeightage:
          Math.round((item.itemPrice / SellAllTotalCost) * 10000) / 100,
        itemSellingPrice:
          (Math.round((item.itemPrice / SellAllTotalCost) * 100) / 100) *
            profitMargin +
          item.itemPrice,
      };

      SellAllFinalArray.push(item2);
    });

    console.log(
      "sellingPrice: ",
      SellAllFinalArray,
      profitMargin,
      SellAllTotalCost
    );

    let tr = document.createElement("tr");
    // p.className = "subtext";
    tr.innerHTML = `<td>${itemName}</td><td>${itemPrice}</td>`;
  });
