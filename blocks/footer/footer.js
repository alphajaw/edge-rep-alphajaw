import { fetchPlaceholders } from '../../scripts/aem.js';

function createFooterSection(row, sectionIndex) {
  const section = document.createElement('div');
  section.classList.add('footer-section');
  section.dataset.sectionIndex = sectionIndex;

  row.querySelectorAll(':scope > div').forEach((column, colIdx) => {
    column.classList.add(`footer-section-${colIdx === 0 ? 'title' : 'content'}`);
    section.append(column);
  });

  return section;
}

function toggleFooterSection(section) {
  const content = section.querySelector('.footer-section-content');
  const isExpanded = section.getAttribute('aria-expanded') === 'true';
  
  section.setAttribute('aria-expanded', !isExpanded);
  content.style.maxHeight = isExpanded ? null : `${content.scrollHeight}px`;
}

function bindEvents(footer) {
  const sectionTitles = footer.querySelectorAll('.footer-section-title');
  
  sectionTitles.forEach((title) => {
    title.addEventListener('click', () => {
      const section = title.closest('.footer-section');
      toggleFooterSection(section);
    });

    title.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const section = title.closest('.footer-section');
        toggleFooterSection(section);
      }
    });
  });
}

export default async function decorate(block) {
  const placeholders = await fetchPlaceholders();

  block.setAttribute('role', 'contentinfo');
  block.classList.add('footer');

  const rows = block.querySelectorAll(':scope > div');

  const footerContent = document.createElement('div');
  footerContent.classList.add('footer-content');

  rows.forEach((row, idx) => {
    const section = createFooterSection(row, idx);
    footerContent.append(section);

    // Make sections expandable on mobile
    const title = section.querySelector('.footer-section-title');
    if (title) {
      title.setAttribute('role', 'button');
      title.setAttribute('aria-expanded', 'false');
      title.setAttribute('aria-controls', `footer-section-content-${idx}`);
      title.setAttribute('tabindex', '0');
    }

    const content = section.querySelector('.footer-section-content');
    if (content) {
      content.id = `footer-section-content-${idx}`;
    }

    row.remove();
  });

  block.append(footerContent);

  // Add copyright notice
  const copyright = document.createElement('div');
  copyright.classList.add('footer-copyright');
  copyright.textContent = `© ${new Date().getFullYear()} ${placeholders.companyName || 'Your Company'}. ${placeholders.allRightsReserved || 'All rights reserved.'}`;
  block.append(copyright);

  bindEvents(block);
}