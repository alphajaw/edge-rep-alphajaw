import { getMetadata } from '../../scripts/aem.js';
export default function decorate(block) {
    const cards = [...block.children];
    block.textContent = '';
  
    const container = document.createElement('div');
    container.className = 'four-card-block container mx-auto px-4 py-8';
  
    const gridContainer = document.createElement('div');
    gridContainer.className = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6';
  
    cards.forEach((card) => {
      const cardElement = document.createElement('div');
      cardElement.className = 'bg-white rounded-lg shadow-md overflow-hidden';
  
      const [image, content] = card.children;
      
      if (image) {
        const picture = image.querySelector('picture');
        if (picture) {
          const optimizedPicture = createOptimizedPicture(picture.querySelector('img').src, picture.querySelector('img').alt, false, [{ width: '400' }]);
          const imageContainer = document.createElement('div');
          imageContainer.className = 'h-48 overflow-hidden';
          imageContainer.appendChild(optimizedPicture);
          cardElement.appendChild(imageContainer);
        }
      }
  
      const contentContainer = document.createElement('div');
      contentContainer.className = 'p-4';
  
      if (content) {
        const [title, description, cta] = content.children;
        
        if (title) {
          const titleElement = document.createElement('h3');
          titleElement.className = 'text-xl font-semibold mb-2';
          titleElement.textContent = title.textContent;
          contentContainer.appendChild(titleElement);
        }
  
        if (description) {
          const descriptionElement = document.createElement('p');
          descriptionElement.className = 'text-gray-600';
          descriptionElement.textContent = description.textContent;
          contentContainer.appendChild(descriptionElement);
        }
  
        if (cta) {
          const ctaLink = cta.querySelector('a');
          if (ctaLink) {
            ctaLink.className = 'inline-block mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors';
            contentContainer.appendChild(ctaLink);
          }
        }
      }
  
      cardElement.appendChild(contentContainer);
      gridContainer.appendChild(cardElement);
    });
  
    container.appendChild(gridContainer);
    block.appendChild(container);
  }
  