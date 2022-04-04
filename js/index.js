'use strict';

const app = {
  isOpenCategory: false,
  categories: document.querySelectorAll('.home__bottom div'),
  categoriesParent: document.querySelector('.home__bottom'),
  categoryCloned: null,
  currentCategory: null,
  init: () => {
    app.categories.forEach(category => {
      category.addEventListener('click', app.handleCategory);
    });
  },
  handleCategory: function(e) {
    app.currentCategory = e.currentTarget;
    
    if (!app.isOpenCategory) {
      const { top, left, width, height } = app.currentCategory.getBoundingClientRect();

      app.isOpenCategory = true;

      // document.title = `Portfolio - ${app.currentCategory.textContent}`;
      app.categoryCloned = app.currentCategory.cloneNode(false);
      
      app.categoryCloned.style.position = "static";
      app.categoryCloned.style.top = `${top}px`;
      app.categoryCloned.style.left = `${left}px`;
  
      app.currentCategory.style.position = "absolute";
      app.currentCategory.style.top = `${top}px`;
      app.currentCategory.style.left = `${left}px`;
      app.currentCategory.style.width = `${width}px`;
      app.currentCategory.style.height = `${height}px`;
  
      app.categoriesParent.insertBefore(app.categoryCloned, app.currentCategory);
  
      // I use setTimeout because without the animation does not work
      setTimeout(() => {
        requestAnimationFrame(() => {
          app.currentCategory.style.width = "100%";
          app.currentCategory.style.height = "100%";
          app.currentCategory.style.inset = 0;
          app.currentCategory.style.transition = '.3s';
          app.currentCategory.lastElementChild.style.visibility = "visible";
        });
      }, 1);
    } 

    app.currentCategory.lastElementChild.addEventListener('click', app.handleCloseCategory)
  },
  handleCloseCategory: function(e) {
    if (app.isOpenCategory) {
      const { top, left, width, height } = app.categoryCloned.getBoundingClientRect();

      app.currentCategory.style.top = `${top}px`;
      app.currentCategory.style.left = `${left}px`;
      app.currentCategory.style.width = `${width}px`;
      app.currentCategory.style.height = `${height}px`;
      e.currentTarget.style.visibility = "hidden";
      
      setTimeout(() => {
        app.currentCategory.style.position = "static";
        app.currentCategory.style.transition = "none";
        app.currentCategory.style.width = '100%';
        app.currentCategory.style.height = '100%';
        app.categoryCloned.remove();
        document.title = "Portfolio - Accueil";
        app.isOpenCategory = false;
        app.categoryCloned = null;
        app.currentCategory = null;
      }, 300);
    }
  }
};

document.addEventListener('DOMContentLoaded', app.init);

