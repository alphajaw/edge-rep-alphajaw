import { getMetadata } from '../../scripts/aem.js';
// Example data for the 4 cards
const cardData = [
    {
        image: 'https://via.placeholder.com/150',
        title: 'Card 1',
        description: 'This is the first card description.'
    },
    {
        image: 'https://via.placeholder.com/150',
        title: 'Card 2',
        description: 'This is the second card description.'
    },
    {
        image: 'https://via.placeholder.com/150',
        title: 'Card 3',
        description: 'This is the third card description.'
    },
    {
        image: 'https://via.placeholder.com/150',
        title: 'Card 4',
        description: 'This is the fourth card description.'
    }
];

// Function to create a card element
function createCard(card) {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');

    cardElement.innerHTML = `
        <img src="${card.image}" alt="${card.title}">
        <h3>${card.title}</h3>
        <p>${card.description}</p>
    `;

    return cardElement;
}

// Append cards to the container
const cardContainer = document.getElementById('card-container');
cardData.forEach(card => {
    const cardElement = createCard(card);
    cardContainer.appendChild(cardElement);
});
