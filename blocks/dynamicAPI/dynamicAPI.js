import { createOptimizedPicture } from "../../scripts/aem";

function createStockCard(container) {
    // Create the stock card element
    const card = document.createElement('div');
    card.className = 'stock-card';
    card.innerHTML = `
      <div class="stock-header">
        <span class="stock-name">NIFTY 50</span>
        <span class="stock-time">11:49 AM</span>
      </div>
      <div class="stock-price">24763.10</div>
      <div class="stock-change">▼ -90.95 (-0.37%)</div>
      <div class="time-buttons">
        <button class="time-button active">1D</button>
        <button class="time-button">1W</button>
        <button class="time-button">1M</button>
        <button class="time-button">3M</button>
      </div>
      <canvas id="stock-chart"></canvas>
    `;
  
    // Append the card to the provided container
    container.appendChild(card);
  
    // Create chart
    const ctx = card.querySelector('#stock-chart').getContext('2d');
    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['09:14', '10:04', '11:04', '11:44'],
        datasets: [{
          label: 'Stock Price',
          data: [24900, 24750, 24800, 24763.10],
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
    card.querySelectorAll('.time-button').forEach(button => {
      button.addEventListener('click', () => {
        card.querySelectorAll('.time-button').forEach(b => b.classList.remove('active'));
        button.classList.add('active');
        // Here you would update the chart data based on the selected time range
      });
    });
  
    return { card, chart };
  }
  
  function fetchStockData() {
    // Simulating an API call - replace with actual data fetching logic
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          name: 'NIFTY 50',
          price: 24763.10,
          change: -90.95,
          percentChange: -0.37,
          time: '11:49 AM',
          historicalData: [
            { time: '09:14', price: 24900 },
            { time: '10:04', price: 24750 },
            { time: '11:04', price: 24800 },
            { time: '11:44', price: 24763.10 }
          ]
        });
      }, 1000);
    });
  }
  
  function updateStockCard(card, chart, data) {
    card.querySelector('.stock-name').textContent = data.name;
    card.querySelector('.stock-time').textContent = data.time;
    card.querySelector('.stock-price').textContent = data.price.toFixed(2);
    card.querySelector('.stock-change').textContent = `▼ ${data.change.toFixed(2)} (${data.percentChange.toFixed(2)}%)`;
    
    chart.data.labels = data.historicalData.map(d => d.time);
    chart.data.datasets[0].data = data.historicalData.map(d => d.price);
    chart.update();
  }
  
  // Edge Delivery Services block function
  function decorate(block) {
    const { card, chart } = createStockCard(block);
    
    // Initial data fetch and update
    fetchStockData().then(data => updateStockCard(card, chart, data));
    
    // Periodic updates
    setInterval(() => {
      fetchStockData().then(data => updateStockCard(card, chart, data));
    }, 60000); // Update every minute
  }
  
  export default decorate;