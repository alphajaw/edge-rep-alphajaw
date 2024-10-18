import { fetchPlaceholders } from '../../scripts/aem.js';

export default function decorate(block) {
  const topics = [...block.children];
  block.textContent = '';

  const container = document.createElement('div');
  container.className = 'financial-topics-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4';

  topics.forEach((topic) => {
    const card = document.createElement('div');
    card.className = 'topic-card bg-white rounded-lg shadow-md overflow-hidden';

    const [image, content] = topic.children;

    if (image) {
      const picture = image.querySelector('picture');
      if (picture) {
        const optimizedPicture = createOptimizedPicture(picture.querySelector('img').src, picture.querySelector('img').alt, false, [{ width: '400' }]);
        card.appendChild(optimizedPicture);
      }
    }

    if (content) {
      const title = content.querySelector('h3');
      if (title) {
        title.className = 'topic-title text-xl font-bold p-4';
        card.appendChild(title);
      }

      const date = document.createElement('p');
      date.className = 'topic-date text-sm text-gray-500 px-4 pb-4';
      date.textContent = new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
      card.appendChild(date);

      const socialLinks = document.createElement('div');
      socialLinks.className = 'social-links flex justify-start space-x-2 px-4 pb-4';
      ['facebook', 'twitter', 'whatsapp', 'linkedin'].forEach(platform => {
        const link = document.createElement('a');
        link.href = '#';
        link.className = `${platform}-icon w-6 h-6 bg-gray-300 rounded-full`;
        socialLinks.appendChild(link);
      });
      card.appendChild(socialLinks);
    }

    container.appendChild(card);
  });

  block.appendChild(container);
}