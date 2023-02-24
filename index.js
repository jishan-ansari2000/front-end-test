function setActive(index) {
  let selectBtn = document.getElementsByClassName("selectBtn");
  let toolContainer = document.getElementsByClassName("toolContainer");

  for (let i = 0; i < 3; i++) {
    if (index == i) {
      selectBtn[index].className += " active";
      toolContainer[index].className += " active";
    } else {
      selectBtn[i].classList.remove("active");
      toolContainer[i].classList.remove("active");
    }
  }
}

// ****************************************************************

class ProfileCollaboration {
  constructor() {
    this.itemArray = [];
    this.finalArray = [];
    this.table = document.getElementById("sellEachtable");
    this.finalTable = document.getElementById("sellFinalTable");
    this.emptyRow = document.getElementById("emptyRow");
    this.totalCost = 0;

    document
      .getElementById("sellPriceEachform")
      .addEventListener("submit", this.addItem.bind(this));

    document
      .getElementById("SellPriceEachProfitform")
      .addEventListener("submit", this.sellPriceCalculator.bind(this));
  }

  addItem(event) {
    event.preventDefault();
    const itemName = event.target["itemName"].value;
    const itemPrice = Number(event.target["itemPrice"].value);

    console.log(itemName, itemPrice);

    this.totalCost += itemPrice;

    let temp = {
      itemName: itemName,
      itemPrice: itemPrice,
    };
    this.itemArray.push(temp);

    let tr = document.createElement("tr");
    tr.innerHTML = `<td>${itemName}</td><td>${itemPrice}</td>`;

    this.table.appendChild(tr);

    event.target["itemName"].value = "";
    event.target["itemPrice"].value = "";
  }

  sellPriceCalculator(event) {
    event.preventDefault();

    const profitMargin = event.target["ProfitMargin"].value;

    this.itemArray.forEach((item) => {
      let percentageWeightage =
        Math.round((item.itemPrice / this.totalCost) * 10000) / 100;

      let item2 = {
        itemName: item.itemName,
        itemPrice: item.itemPrice,
        itemWeightage: percentageWeightage,
        itemSellingPrice:
          Math.round(percentageWeightage * profitMargin) / 100 + item.itemPrice,
      };

      let tr = document.createElement("tr");
      tr.innerHTML = `<td>${item2.itemName}</td><td>${item2.itemPrice}</td><td>${item2.itemWeightage}%</td><td>${item2.itemSellingPrice}</td>`;

      this.finalTable.appendChild(tr);

      this.finalArray.push(item2);
    });

    console.log("sellingPrice: ", profitMargin, this.finalArray);

    let tr = document.createElement("tr");
    tr.innerHTML = `<td>${itemName}</td><td>${itemPrice}</td>`;
  }
}

let myCar = new ProfileCollaboration();
