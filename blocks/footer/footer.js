import { MobileAppSection } from '../footer/MobileAppSection.js';

export default function decorate(block) {
  const sections = block.querySelectorAll(':scope > div');
  
  sections.forEach((section) => {
    const [title, content] = section.children;
    section.classList.add('footer-section');
    title.classList.add('footer-section-title');
    content.classList.add('footer-section-content');

    if (title.textContent.trim().toUpperCase() === 'MOBILE APP') {
      const mobileAppSection = new MobileAppSection(section);
      mobileAppSection.init();
    } else {
      // Handle other sections (FOLLOW US, CONTACT US)
      const list = document.createElement('ul');
      [...content.children].forEach((item) => {
        const li = document.createElement('li');
        li.append(item);
        list.append(li);
      });
      content.append(list);
    }
  });
}