import { createOptimizedPicture } from "../../scripts/aem";

function createStockCard(container, stockName) {
    // Preserve the existing div and its content
    const nameDiv = container.querySelector('div');
    
    // Create new elements for the stock card
    const priceDiv = document.createElement('div');
    priceDiv.className = 'stock-price';
    
    const changeDiv = document.createElement('div');
    changeDiv.className = 'stock-change';
    
    const timeButtonsDiv = document.createElement('div');
    timeButtonsDiv.className = 'time-buttons';
    timeButtonsDiv.innerHTML = `
      <button class="time-button active">1D</button>
      <button class="time-button">1W</button>
      <button class="time-button">1M</button>
      <button class="time-button">3M</button>
    `;
    
    const chartCanvas = document.createElement('canvas');
    
    // Append new elements
    container.appendChild(priceDiv);
    container.appendChild(changeDiv);
    container.appendChild(timeButtonsDiv);
    container.appendChild(chartCanvas);
    
    // Create chart
    const chart = new Chart(chartCanvas.getContext('2d'), {
      type: 'line',
      data: {
        labels: [],
        datasets: [{
          label: 'Stock Price',
          data: [],
          borderColor: '#ff9999',
          backgroundColor: 'rgba(255, 153, 153, 0.2)',
          borderWidth: 2,
          pointRadius: 0,
          fill: true,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { display: true },
          y: {
            display: true,
            position: 'right',
            ticks: { callback: value => value.toFixed(2) }
          }
        }
      }
    });
  
    // Add event listeners to time buttons
    timeButtonsDiv.querySelectorAll('.time-button').forEach(button => {
      button.addEventListener('click', () => {
        timeButtonsDiv.querySelectorAll('.time-button').forEach(b => b.classList.remove('active'));
        button.classList.add('active');
        // Here you would update the chart data based on the selected time range
      });
    });
  
    return { container, chart };
  }
  
  function fetchStockData(stockName) {
    // Simulating an API call - replace with actual data fetching logic
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          name: stockName,
          price: 24763.10 + Math.random() * 1000,
          change: -90.95 + Math.random() * 100,
          percentChange: -0.37 + Math.random(),
          time: new Date().toLocaleTimeString(),
          historicalData: Array.from({length: 20}, (_, i) => ({
            time: new Date(Date.now() - (19-i)*15*60000).toLocaleTimeString(),
            price: 24000 + Math.random() * 1000
          }))
        });
      }, 1000);
    });
  }
  
  function updateStockCard(container, chart, data) {
    container.querySelector('div').textContent = `${data.name} ${data.time}`;
    container.querySelector('.stock-price').textContent = data.price.toFixed(2);
    container.querySelector('.stock-change').textContent = 
      `${data.change > 0 ? '▲' : '▼'} ${Math.abs(data.change).toFixed(2)} (${data.percentChange.toFixed(2)}%)`;
    
    chart.data.labels = data.historicalData.map(d => d.time);
    chart.data.datasets[0].data = data.historicalData.map(d => d.price);
    chart.update();
  }
  
  function decorate(block) {
    const stockCards = [];
    
    block.querySelectorAll(':scope > div').forEach(container => {
      const stockName = container.textContent.trim();
      const { container: updatedContainer, chart } = createStockCard(container, stockName);
      stockCards.push({ container: updatedContainer, chart, name: stockName });
    });
  
    function updateAllCards() {
      stockCards.forEach(({ container, chart, name }) => {
        fetchStockData(name).then(data => updateStockCard(container, chart, data));
      });
    }
  
    // Initial update
    updateAllCards();
  
    // Periodic updates
    setInterval(updateAllCards, 60000); // Update every minute
  }
  
  export default decorate;