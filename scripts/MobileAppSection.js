export class MobileAppSection {
    constructor(sectionElement) {
      this.sectionElement = sectionElement;
      this.contentElement = sectionElement.querySelector('.footer-section-content');
    }
  
    init() {
      this.createAppStoreLinks();
      this.createQRCode();
    }
  
    createAppStoreLinks() {
      const appStoreLinks = document.createElement('div');
      appStoreLinks.classList.add('app-store-links');
  
      // Add App Store link
      const appStoreLink = document.createElement('a');
      appStoreLink.href = '#'; // Replace with actual App Store link
      appStoreLink.classList.add('app-store-button');
      appStoreLink.innerHTML = `
        <img src="/path-to-app-store-badge.png" alt="Download on the App Store">
      `;
      appStoreLinks.appendChild(appStoreLink);
  
      // Add Google Play link
      const googlePlayLink = document.createElement('a');
      googlePlayLink.href = '#'; // Replace with actual Google Play link
      googlePlayLink.classList.add('google-play-button');
      googlePlayLink.innerHTML = `
        <img src="/path-to-google-play-badge.png" alt="Get it on Google Play">
      `;
      appStoreLinks.appendChild(googlePlayLink);
  
      this.contentElement.appendChild(appStoreLinks);
    }
  
    createQRCode() {
      const qrCodeContainer = document.createElement('div');
      qrCodeContainer.classList.add('qr-code-container');
  
      // In a real implementation, you would generate or fetch the QR code image
      qrCodeContainer.innerHTML = `
        <img src="/path-to-qr-code.png" alt="Scan to download our app">
        <p>Scan to download</p>
      `;
  
      this.contentElement.appendChild(qrCodeContainer);
    }
  }