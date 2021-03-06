'use strict';

const app = {
  isOpenCategory: false,
  categories: document.querySelectorAll('.categories > div'),
  categoriesParent: document.querySelector('.categories'),
  categoryCloned: null,
  currentCategory: null,
  bodyElement: document.querySelector('body'),
  closeElement: document.querySelector('.close'),
  themes: {
    primary: {
      primary: '#111',
      secondary: 'orange',
      about: '#181818',
      skills: '#1b1b1b',
      xp: '#1e1e1e',
      'skills-card': '#1e1e1e',
      'xp-card': 'rgb(33, 33, 33)',
    },
    secondary: {
      primary: 'rgb(26, 8, 65)', 
      secondary: 'orange',
      about: 'rgb(29, 11, 68)',
      skills: 'rgb(32, 14, 71)',
      xp: 'rgb(35, 17, 74)',
      'skills-card': 'rgb(35, 17, 74)',
      'xp-card': 'rgb(38, 20, 77)',
    },
  },
  init: () => {
    app.categories.forEach(category => {
      category.addEventListener('click', app.handleCategory);
    });

    app.closeElement.addEventListener('click', app.handleCloseCategory);
 
    window.addEventListener('resize', () => {
      const doc = document.documentElement;
      doc.style.setProperty('--app-height', `${window.innerHeight}px`);
    });

    document.querySelectorAll('.themes > div').forEach(theme => {
      theme.addEventListener('click', app.handleClickThemes);
    });

  },
  handleCategory: function(e) {
    app.currentCategory = e.currentTarget;
    
    if (!app.isOpenCategory) {
      const { top, left, width, height } = app.currentCategory.getBoundingClientRect();
      const category = app.currentCategory.dataset.category;
      
      app.isOpenCategory = true;

      document.title = `Portfolio - ${app.currentCategory.dataset.title}`;
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
          app.currentCategory.style.top = 0;
          app.currentCategory.style.left = 0;
          app.currentCategory.style.right = 0;
          app.currentCategory.style.transition = '.2s';
          app.currentCategory.style.cursor = 'grab';
        });
      }, 1);

      setTimeout(() => {
        requestAnimationFrame(() => {
          app.currentCategory.className = `${category}--isActived`;
          app.closeElement.style.visibility = "visible";
        });
      }, 200);
    }
  },
  handleCloseCategory: function(e) {
    if (app.isOpenCategory) {
      const { top, left, width, height } = app.categoryCloned.getBoundingClientRect();
      const category = app.currentCategory.dataset.category;

      document.title = "Portfolio - Accueil";
      app.currentCategory.style.top = `${top}px`;
      app.currentCategory.style.left = `${left}px`;
      app.currentCategory.style.width = `${width}px`;
      app.currentCategory.style.height = `${height}px`;
      
      app.currentCategory.className = category;
      e.currentTarget.style.visibility = "hidden";
      
      setTimeout(() => {
        app.currentCategory.style.position = "static";
        app.currentCategory.style.transition = "none";
        app.currentCategory.style.width = '100%';
        app.currentCategory.style.height = '100%';
        app.currentCategory.style.cursor = 'pointer';

        app.categoryCloned.remove();
        app.isOpenCategory = false;
        app.categoryCloned = null;
        app.currentCategory = null;
      }, 300);
    }
  },
  handleClickThemes: (e) => {
    const theme = e.currentTarget.dataset.theme;
    const root = document.documentElement;

    root.style.setProperty('--primary', app.themes[theme].primary);
    root.style.setProperty('--secondary', app.themes[theme].secondary);
    root.style.setProperty('--about', app.themes[theme].about);
    root.style.setProperty('--skills', app.themes[theme].skills);
    root.style.setProperty('--xp', app.themes[theme].xp);
    root.style.setProperty('--skills-card', app.themes[theme]['skills-card']);
    root.style.setProperty('--xp-card', app.themes[theme]['xp-card']);
  },
};

document.addEventListener('DOMContentLoaded', app.init);

