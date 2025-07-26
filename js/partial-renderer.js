window.customElements.define('hp-partial', class extends HTMLElement {
  connectedCallback() {
    if (document.readyState !== 'loading') {
      this.render();
      return;
    }
    document.addEventListener('DOMContentLoaded', () => this.render(), {once: true});
  }

  render = () => {
    const template = this.getAttribute('template');
    let path = template.replace('.', '/');
    path = `components/${path}.html`;
    this.getTemplateContent(path).then();
  }

  getTemplateContent = async (path) => {
    try {
      const result = await fetch(path);
      if (!result.ok) {
        this.outerHTML = `<p><strong>Include failed: ${path}</strong></p>`;
        throw new Error('Page not found');
      }
      this.outerHTML = await result.text();
    } catch (e) {
      this.outerHTML = `<p><strong>Include failed: ${path}</strong></p>`;
      console.error(e);
    }
  }
});