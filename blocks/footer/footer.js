import { createOptimizedPicture } from '../../scripts/aem.js';

/**
 * Decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  // Get all direct child divs which will be our columns
  const columns = block.querySelectorAll(':scope > div');
  
  // Add classes to help with styling
  block.classList.add('footer-wrapper');
  
  columns.forEach((column, index) => {
    column.classList.add('footer-column', `footer-column-${index + 1}`);
    
    // Find and decorate the title
    const title = column.querySelector('h1, h2, h3, h4, h5, h6');
    if (title) {
      title.classList.add('footer-column-title');
    }
    
    // Find and decorate the list
    const list = column.querySelector('ul');
    if (list) {
      list.classList.add('footer-list');
      
      // Add click handlers for mobile accordion if needed
      if (title) {
        title.addEventListener('click', () => {
          column.classList.toggle('expanded');
        });
      }
    }
  });
  
  // Add a container for better styling control
  const wrapper = document.createElement('div');
  wrapper.className = 'footer-columns-wrapper';
  while (block.firstChild) {
    wrapper.appendChild(block.firstChild);
  }
  block.appendChild(wrapper);
}
