import { createOptimizedPicture } from '../../scripts/aem.js';

export class MobileAppSection {
  constructor(sectionElement) {
    this.sectionElement = sectionElement;
    this.contentElement = sectionElement.querySelector('.footer-section-content');
  }

  init() {
    this.createAppStoreLinks();
  }

  createAppStoreLinks() {
    const appStoreLinks = document.createElement('div');
    appStoreLinks.classList.add('app-store-links');

    const [appStoreImg, googlePlayImg] = this.contentElement.querySelectorAll('img');

    if (appStoreImg) {
      const appStoreLink = document.createElement('a');
      appStoreLink.href = appStoreImg.closest('a').href;
      appStoreLink.classList.add('app-store-button');
      appStoreLink.appendChild(createOptimizedPicture(appStoreImg.src, appStoreImg.alt, false, [{ width: '135' }]));
      appStoreLinks.appendChild(appStoreLink);
    }

    if (googlePlayImg) {
      const googlePlayLink = document.createElement('a');
      googlePlayLink.href = googlePlayImg.closest('a').href;
      googlePlayLink.classList.add('google-play-button');
      googlePlayLink.appendChild(createOptimizedPicture(googlePlayImg.src, googlePlayImg.alt, false, [{ width: '135' }]));
      appStoreLinks.appendChild(googlePlayLink);
    }

    // Replace the content with our structured links
    this.contentElement.innerHTML = '';
    this.contentElement.appendChild(appStoreLinks);
  }
}