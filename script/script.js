const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spin-btn");
const finalValue = document.getElementById("final-value");

const rotationValues = [
  { minDegree: 0, maxDegree: 30, value: "Prêmio 2" },
  { minDegree: 31, maxDegree: 90, value: "Prêmio 1" },
  { minDegree: 91, maxDegree: 150, value: "Prêmio 6" },
  { minDegree: 151, maxDegree: 210, value: "Prêmio 5" },
  { minDegree: 211, maxDegree: 270, value: "Prêmio 4" },
  { minDegree: 271, maxDegree: 330, value: "Prêmio 3" },
  { minDegree: 331, maxDegree: 360, value: "Prêmio 2" },
];

const data = [16, 16, 16, 16, 16, 16];

var pieColors = [
  "#8b35bc",
  "#00BCD4",
  "#8b35bc",
  "#00BCD4",
  "#8b35bc",
  "#00BCD4",
];

let myChart = new Chart(wheel, {
  
  plugins: [ChartDataLabels],
  
  type: "pie",
  data: {
    
    labels: ["Prêmio 1", "Prêmio 2", "Prêmio 3", "Prêmio 4", "Prêmio 5", "Prêmio 6"],
    
    datasets: [
      {
        backgroundColor: pieColors,
        data: data,
      },
    ],
  },
  options: {
    
    responsive: true,
    animation: { duration: 0 },
    plugins: {
      
      tooltip: false,
      legend: {
        display: false,
      },
      
      datalabels: {
        color: "#ffffff",
        formatter: (_, context) => context.chart.data.labels[context.dataIndex],
        font: { size: 24 },
      },
    },
  },
});

const valueGenerator = (angleValue) => {
  for (let i of rotationValues) {
    
    if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
      finalValue.innerHTML = `<p>Resultado: ${i.value}</p>`;
      spinBtn.disabled = false;
      break;
    }
  }
};


let count = 0;

let resultValue = 101;

spinBtn.addEventListener("click", () => {
  spinBtn.disabled = true;

  finalValue.innerHTML = `<p>Boa sorte!</p>`;
  
  let randomDegree = Math.floor(Math.random() * (355 - 0 + 1) + 0);
  
  let rotationInterval = window.setInterval(() => {
 
    myChart.options.rotation = myChart.options.rotation + resultValue;
    
    myChart.update();
    
    if (myChart.options.rotation >= 360) {
      count += 1;
      resultValue -= 5;
      myChart.options.rotation = 0;
    } else if (count > 15 && myChart.options.rotation == randomDegree) {
      valueGenerator(randomDegree);
      clearInterval(rotationInterval);
      count = 0;
      resultValue = 101;
    }
  }, 10);
});
