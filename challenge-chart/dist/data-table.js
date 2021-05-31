import "./challenge-chart.js";
import { ChallengeDataService } from "../../ChallengeDataService.js";

// Creating variables for elements in the DOM

const buttons = document.querySelectorAll(".btn-type");

const resetButton = document.getElementById("reset");
const tableContainer = document.querySelector(".data-table");

const reset = () => {
  history.go();
};

// Event listener for Reset Button

resetButton.addEventListener("click", () => {
  reset();
});

// function to create and populate table header
const createTableHeader = (values) => {
  let tHead = tableContainer.createTHead();
  let row = tHead.insertRow();
  values.forEach((value) => {
    let th = document.createElement("th");
    let text = document.createTextNode(value);
    th.classList.add("p-2", "h4");
    th.appendChild(text);
    row.appendChild(th);
  });
};

// function to populate table content
const createTable = (columnX, columnY) => {
  for (let i = 0; i < columnX.length; i++) {
    let row = tableContainer.insertRow();
    let cellX = row.insertCell();
    cellX.classList.add("p-2");
    let textX = document.createTextNode(columnX[i]);
    cellX.appendChild(textX);
    let cellY = row.insertCell();
    cellY.classList.add("p-2");
    let textY = document.createTextNode(columnY[i]);
    cellY.appendChild(textY);
  }
};

// function to create and populate chart

const createChart = (columnX, columnY) => {
  const chart = document.querySelector("challenge-chart");
  let chartData = [];
  for (let i = 0; i < columnX.length; i++) {
    chartData.push({ x: columnX[i], y: columnY[i] });
  }
  chart.data = chartData;
};

// function to create table content and create chart
const fetchDataSet = (data) => {
  // console.log(data);
  tableContainer.innerHTML = ``;
  const chartType = document.querySelector(".chart-type");
  chartType.innerHTML = ``;
  chartType.innerHTML = `${data._name}`;
  const headerValues = [data._xColumn._name, data._yColumn._name];
  const columnX = data._xColumn._values;
  const columnY = data._yColumn._values;
  createTableHeader(headerValues);
  createTable(columnX, columnY);
  createChart(columnX, columnY);
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
