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

function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// ****************************************************************

class SellPriceCalculatorClass {
  constructor() {
    this.itemArray = {};
    this.lastIndex = 0;

    this.finalArray = [];
    this.totalCost = 0;
    this.gstArray = [0, 5, 12, 18];

    this.table = document.getElementById("sellEachtable");
    this.finalTable = document.getElementById("sellFinalTable");
    this.sellPriceEachFinaltableContainer = document.getElementById(
      "sellPriceEachFinaltableContainer"
    );
    this.submitBtn = document.getElementById("sellEachSubmitBtn");

    this.editing = {
      isEditing: false,
      index: 0,
      row: `<th></th>`,
    };

    this.inputFields = {
      itemName: document.getElementById("sellEachitemName"),
      itemPrice: document.getElementById("sellEachitemPrice"),
    };

    document
      .getElementById("sellPriceEachform")
      .addEventListener("submit", this.addItem.bind(this));

    document
      .getElementById("SellPriceEachProfitform")
      .addEventListener("submit", this.sellPriceCalculator.bind(this));
  }

  // *************** Form Methods ****************************

  addItem(event) {
    event.preventDefault();
    const itemName = event.target["itemName"].value;
    const itemPrice = Number(event.target["itemPrice"].value);
    let gst;

    if (this.editing.isEditing) {
      gst = this.itemArray[this.editing.index].gst;
    } else {
      let gstIndex = Math.floor(Math.random() * 4);
      gst = this.gstArray[gstIndex];
    }

    let itemCost = Math.round(itemPrice + (itemPrice * gst) / 100);

    this.totalCost += this.editing.isEditing
      ? itemCost - this.itemArray[this.editing.index].itemTotalPrice
      : itemCost;

    let temp = {
      itemName: itemName,
      itemPrice: itemPrice,
      gst: gst,
      itemTotalPrice: itemCost,
    };

    let l;

    if (this.editing.isEditing) {
      l = this.editing.index;
      this.itemArray[this.editing.index] = temp;
    } else {
      l = this.lastIndex;
      this.itemArray[this.lastIndex] = temp;
      this.lastIndex++;
    }

    let editBtn = `<td class="editBtnBox">
          <button value="${l}" onclick="sellPriceEach.editRow(this)"><i class="fa-solid fa-pen-to-square fa-sm"
                  style="color: rgb(35, 35, 130);"></i></button>
          <button value="${l}" onclick="sellPriceEach.deleteRow(this)"><i class="fa-solid fa-trash-can fa-sm"
                  style="color: rgb(172, 27, 27);"></i></button>
      </td>`;

    let tr = document.createElement("tr");

    tr.innerHTML = `<td>${itemName}</td><td>${itemPrice}</td>${editBtn}`;

    if (this.editing.isEditing) {
      this.editing.row.innerHTML = tr.innerHTML;
      this.editing = {
        isEditing: false,
        editIndex: 0,
      };
      this.submitBtn.innerHTML = "Add Item";
    } else {
      this.table.appendChild(tr);
    }

    event.target["itemName"].value = "";
    event.target["itemPrice"].value = "";
  }

  sellPriceCalculator(event) {
    event.preventDefault();

    const profitMargin = event.target["ProfitMargin"].value;

    // Made table ready for new data

    this.finalArray = [];

    this.finalTable.innerHTML = `<tr>
        <th>Item Name</th>
        <th>Item Price</th>
        <th>Gst(%)</th>
        <th>Item Total Cost</th>
        <th>Weightage(%)</th>
        <th>Selling Price</th>
    </tr>`;

    this.sellPriceEachFinaltableContainer.children[1].innerHTML = `
      Overall Cost: <span style="font-weight: 400; margin-left: 6px">${this.totalCost}</span>
    `;

    this.sellPriceEachFinaltableContainer.style.display = "block";

    // ********************************************

    Object.values(this.itemArray).forEach((item) => {
      let percentageWeightage =
        Math.round((item.itemTotalPrice / this.totalCost) * 10000) / 100;

      let item2 = {
        itemName: item.itemName,
        itemPrice: item.itemPrice,
        gst: item.gst,
        itemTotalPrice: item.itemTotalPrice,
        itemWeightage: percentageWeightage,
        itemSellingPrice:
          Math.round(
            ((percentageWeightage * profitMargin) / 100 + item.itemTotalPrice) *
              100
          ) / 100,
      };

      let tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${item2.itemName}</td>
        <td>${item2.itemPrice}</td>
        <td>${item2.gst}%</td>
        <td>${item2.itemTotalPrice}</td>
        <td>${item2.itemWeightage}%</td>
        <td>${item2.itemSellingPrice}</td>
      `;

      this.finalTable.appendChild(tr);

      this.finalArray.push(item2);
    });

    // console.log("sellingPrice: ", profitMargin, this.finalArray);
  }

  // ********************** Edit inputed methods ****************

  editRow(button) {
    let rowIndex = button.value;
    console.log(rowIndex);

    this.inputFields.itemName.value = this.itemArray[rowIndex].itemName;
    this.inputFields.itemPrice.value = this.itemArray[rowIndex].itemPrice;

    this.editing = {
      isEditing: true,
      index: Number(rowIndex),
      row: button.parentNode.parentNode,
    };

    this.submitBtn.innerHTML = "Edit Row";
  }

  deleteRow(button) {
    let rowIndex = button.value;

    console.log(this.totalCost);
    this.totalCost -= this.itemArray[rowIndex].itemTotalPrice;
    console.log(this.totalCost);

    delete this.itemArray[rowIndex];

    let row = button.parentNode.parentNode;

    // remove the row from the table
    row.remove();
  }
}

let sellPriceEach = new SellPriceCalculatorClass();

// *************************************** sell Price Products ********************************
// *************************************** sell Price Products ********************************
// *************************************** sell Price Products ********************************

class SellPriceProductCalculatorClass {
  constructor() {
    this.itemArray = [];
    this.finalArray = [];
    this.totalCost = 0;
    this.gstArray = [0, 5, 12, 18];

    this.table = document.getElementById("sellProducttable");
    this.finalTable = document.getElementById("sellProductFinalTable");
    this.sellPriceProductFinaltableContainer = document.getElementById(
      "sellPriceProductFinaltableContainer"
    );

    document
      .getElementById("sellPriceProductform")
      .addEventListener("submit", this.addItem.bind(this));

    document
      .getElementById("SellPriceProductProfitform")
      .addEventListener("submit", this.sellPriceCalculator.bind(this));
  }

  addItem(event) {
    event.preventDefault();
    const itemName = event.target["itemName"].value;
    const itemPrice = Number(event.target["itemPrice"].value);

    let gstIndex = Math.floor(Math.random() * 4);

    this.totalCost += Math.round(
      itemPrice + (itemPrice * this.gstArray[gstIndex]) / 100
    );

    let temp = {
      itemName: itemName,
      itemPrice: itemPrice,
      gst: this.gstArray[gstIndex],
      itemTotalPrice: Math.round(
        itemPrice + (itemPrice * this.gstArray[gstIndex]) / 100
      ),
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

    const productName = event.target["productName"].value;
    const productCount = Number(event.target["productCount"].value);
    const profitMargin = Number(event.target["ProfitMargin"].value);

    // Made table ready for new data

    this.finalArray = [];

    this.finalTable.innerHTML = `<tr>
    <th>Item Name</th>
    <th>Item Price</th>
    <th>Gst(%)</th>
    <th>Item Total Cost</th>
    </tr>`;

    this.sellPriceProductFinaltableContainer.children[1].innerHTML = `
    Overall Cost: <span style="font-weight: 400; margin-left: 6px">${this.totalCost}</span>
    `;

    let sellingPrice = Math.round((this.totalCost + profitMargin) * 10) / 100;

    this.sellPriceProductFinaltableContainer.children[2].innerHTML = `
    Selling Price Per Item: <span style="font-weight: 400; margin-left: 6px">${sellingPrice}</span>
    `;

    this.sellPriceProductFinaltableContainer.style.display = "block";

    // ********************************************

    this.itemArray.forEach((item) => {
      let tr = document.createElement("tr");
      tr.innerHTML = `
      <td>${item.itemName}</td>
      <td>${item.itemPrice}</td>
      <td>${item.gst}%</td>
      <td>${item.itemTotalPrice}</td>
      `;

      this.finalTable.appendChild(tr);

      this.finalArray.push(item);
    });
  }
}

let sellPriceProduct = new SellPriceProductCalculatorClass();

// *************************************** sell Price Individual ********************************
// *************************************** sell Price Individual ********************************
// *************************************** sell Price Individual ********************************

class SellPriceIndividualCalculatorClass {
  constructor() {
    this.itemArray = [];
    this.finalArray = [];
    this.totalCost = 0;
    this.totalProfit = 0;
    this.gstArray = [0, 5, 12, 18];

    this.table = document.getElementById("sellIndividualtable");
    this.finalTable = document.getElementById("sellIndividualFinalTable");
    this.sellPriceIndividualFinaltableContainer = document.getElementById(
      "sellPriceIndividualFinaltableContainer"
    );

    document
      .getElementById("sellPriceIndividualform")
      .addEventListener("submit", this.addItem.bind(this));

    document
      .getElementById("SellPriceIndividualProfitform")
      .addEventListener("submit", this.sellPriceCalculator.bind(this));
  }

  addItem(event) {
    event.preventDefault();
    const itemName = event.target["itemName"].value;
    const itemPrice = Number(event.target["itemPrice"].value);
    const profitMargin = Number(event.target["profitMargin"].value);

    let gstIndex = Math.floor(Math.random() * 4);

    let itemTotalPrice = Math.round(
      itemPrice + (itemPrice * this.gstArray[gstIndex]) / 100
    );
    let itemProfitPrice = Math.round(itemTotalPrice * profitMargin) / 100;

    this.totalCost += itemTotalPrice;
    this.totalProfit += itemProfitPrice;

    let temp = {
      itemName: itemName,
      itemPrice: itemPrice,
      gst: this.gstArray[gstIndex],
      itemTotalPrice: itemTotalPrice,
      profitMargin: profitMargin,
      itemSellingPrice: itemTotalPrice + itemProfitPrice,
    };

    this.itemArray.push(temp);

    let tr = document.createElement("tr");
    tr.innerHTML = `<td>${itemName}</td><td>${itemPrice}</td><td>${profitMargin}%</td>`;

    this.table.appendChild(tr);

    event.target["itemName"].value = "";
    event.target["itemPrice"].value = "";
    event.target["profitMargin"].value = "";
  }

  sellPriceCalculator(event) {
    event.preventDefault();

    // Made table ready for new data

    this.finalArray = [];

    this.finalTable.innerHTML = `<tr>
    <th>Item Name</th>
    <th>Item Price</th>
    <th>Gst(%)</th>
    <th>Item Total Cost</th>
    <th>Profit Margin(%)</th>
    <th>Item Selling Price</th>
    </tr>`;

    this.sellPriceIndividualFinaltableContainer.children[1].innerHTML = `
    Overall Cost: <span style="font-weight: 400; margin-left: 6px">${this.totalCost}</span>
    `;

    this.sellPriceIndividualFinaltableContainer.children[2].innerHTML = `
    Overall Profit: <span style="font-weight: 400; margin-left: 6px">${this.totalProfit}</span>
    `;

    this.sellPriceIndividualFinaltableContainer.style.display = "block";

    // ********************************************

    this.itemArray.forEach((item) => {
      let tr = document.createElement("tr");
      tr.innerHTML = `
      <td>${item.itemName}</td>
      <td>${item.itemPrice}</td>
      <td>${item.gst}%</td>
      <td>${item.itemTotalPrice}</td>
      <td>${item.profitMargin}%</td>
      <td>${item.itemSellingPrice}</td>
      `;

      this.finalTable.appendChild(tr);

      this.finalArray.push(item);
    });
  }
}

let sellPriceIndividual = new SellPriceIndividualCalculatorClass();
