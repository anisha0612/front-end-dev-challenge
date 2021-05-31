import "./challenge-chart.js";
import { ChallengeDataService } from "../../ChallengeDataService.js";

// Creating variables for elements in the DOM

const buttons = document.querySelectorAll(".btn-type");

const resetButton = document.getElementById("reset");

const tableContainer = document.querySelector(".data-table");

// Event listener for Reset Button

resetButton.addEventListener("click", () => {
  history.go();
});

const createTableHeader = () => {
  const values = ["x", "y"];
  let tHead = tableContainer.createTHead();
  let row = tHead.insertRow();
  values.forEach((value) => {
    let th = document.createElement("th");
    let text = document.createTextNode(value);
    th.appendChild(text);
    row.appendChild(th);
  });
};

const fetchDataSet = (data) => {
  // console.log(data);
  createTableHeader();
};

// Add functionality to User clicked button

buttons.forEach((button) =>
  button.addEventListener("click", (e) => {
    // create an instance of class ChallengeDataService
    const dataSet = new ChallengeDataService();

    switch (e.target.id) {
      case "small": {
        dataSet.getDataSet("small").then((response) => fetchDataSet(response));
        break;
      }
      case "medium": {
        dataSet.getDataSet("medium").then((response) => fetchDataSet(response));
        break;
      }

      default:
        dataSet.getDataSet("large").then((response) => fetchDataSet(response));
        break;
    }
  })
);
