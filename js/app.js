!function() {

  'use strict';

  var model = {
    showAdmin: false,
    currentCat: {},
    cats: [
      {
        id: 0,
        name: 'Garfield',
        image: './images/cat.jpg',
        clickCount: 0
      },
      {
        id: 1,
        name: 'Miyu',
        image: './images/cat2.jpg',
        clickCount: 0
      },
      {
        id: 2,
        name: 'Wanda',
        image: './images/cat3.jpg',
        clickCount: 0
      },
      {
        id: 3,
        name: 'Jessica Cirio',
        image: './images/cat4.jpg',
        clickCount: 0
      },
      {
        id: 4,
        name: 'Victoria Vanucci',
        image: './images/cat5.jpg',
        clickCount: 0
      }
    ]
  };

  var controller = {

    getCurrentCat: function() {
      return model.currentCat;
    },

    getCats: function() {
      return model.cats;
    },

    showAdmin: function() {
      model.showAdmin = true;
      viewAdmin.render();
    },

    hideAdmin: function() {
      model.showAdmin = false;
      viewAdmin.render();
    },

    saveCat: function(name, image, click) {
      var currentCat = this.getCatById(model.currentCat.id);
      currentCat.name = name;
      currentCat.image = image;
      currentCat.clickCount = click;
      model.currentCat = currentCat;

      this.hideAdmin();
      viewCatList.render();
      viewCatItem.render(currentCat);

    },

    isAdminShown: function() {
      return model.showAdmin;
    },

    getCatById: function(id) {
      for (var i = 0; i < model.cats.length; i++) {
        if (model.cats[i].id == id) {
          return model.cats[i];
        }
      }
    },

    incrementCounter: function(id) {
      var cat = this.getCatById(id);
      cat.clickCount++;
      viewCatItem.render(cat);
    },

    showCat: function(id) {
      var cat = this.getCatById(id);
      model.currentCat = cat;
      if (cat) {
        //call render method
        viewCatItem.render(cat);
        //in case choose another cat from the list
        this.hideAdmin();
        // viewAdmin.render();
      }
    },

    init: function() {
      viewCatList.init();
      viewCatItem.init();
      viewAdmin.init();
    }
  };

  var viewAdmin = {
    init: function() {

      var that = this;


      //Cache DOM
      this.HTMLadminContainer = document.querySelector('.action-admin');
      this.HTMLadminForm = document.querySelector('.admin-form');
      this.HTMLadminBtn = document.querySelector('.js-open-form');
      this.HTMLadminBtnCancel = document.querySelector('.js-cancel-form');
      this.HTMLadminFormContainer = document.querySelector('.admin-form-container');

      //form input
      this.HTMLadminInputName = document.querySelector('#name');
      this.HTMLadminInputURL = document.querySelector('#imageUrl');
      this.HTMLadminInputClick = document.querySelector('#click');

      this.HTMLadminBtn.addEventListener('click', function(ev) {
        controller.showAdmin();
        // that.HTMLadminFormContainer.classList.remove('hidden');
        ev.preventDefault();
      });

      this.HTMLadminBtnCancel.addEventListener('click', function(ev) {
        that.HTMLadminFormContainer.classList.add('hidden');
        ev.preventDefault();
      });

      this.HTMLadminForm.addEventListener('submit', function(ev) {
        ev.preventDefault();
        debugger;
        var name = that.HTMLadminInputName.value,
            url = that.HTMLadminInputURL.value,
            click = that.HTMLadminInputClick.value;
        controller.saveCat(name, url, click);
      });

      //check form submit and save changes congroller

      this.cleanView();
    },

    cleanView: function() {
      this.HTMLadminFormContainer.classList.add('hidden');
    },

    render: function() {
      var cat = controller.getCurrentCat();
      this.HTMLadminContainer.classList.remove('hidden');

      //load cat info to form
      this.HTMLadminInputName.value = cat.name;
      this.HTMLadminInputURL.value = cat.image;
      this.HTMLadminInputClick.value = cat.clickCount;

      if (controller.isAdminShown()) {
        this.HTMLadminFormContainer.classList.remove('hidden');
      } else {
        this.HTMLadminFormContainer.classList.add('hidden');
      }
    }
  };

  var viewCatList = {

    init: function() {

      //Cache DOM
      this.HTMLcloneListItem = '';
      this.HTMLcatList = document.querySelector('.cat-list');
      this.HTMLcatListItem = document.createElement('li');
      this.HTMLcatListItemImg = document.createElement('img');
      this.HTMLcatListItemName = document.createTextNode('');

      this.HTMLcatListItem.className = 'cat-list-item';


      this.render();
    },

    cleanView: function() {
      while(this.HTMLcatList.firstChild) {
        this.HTMLcatList.removeChild(this.HTMLcatList.firstChild);
      }
    },

    render: function() {
      var that = this,
          listContent,
          listItems = '';

      this.cleanView();

      var cats = controller.getCats();

      for (var i=0; i < cats.length; i++) {
        var cat = cats[i];

      // controller.getCats().forEach( function(cat, index) {
        //set cat data to item
        that.HTMLcatListItemName.textContent = cat.name;
        that.HTMLcatListItemImg.src = cat.image;

        //append content to DOM list
        that.HTMLcatListItem.appendChild(that.HTMLcatListItemImg);
        that.HTMLcatListItem.appendChild(that.HTMLcatListItemName);

        that.HTMLcloneListItem = that.HTMLcatListItem.cloneNode(true);

        that.HTMLcatList.appendChild(that.HTMLcloneListItem);

        that.HTMLcloneListItem.addEventListener('click', (function(cat) {
          return function(){controller.showCat(cat.id);};
        }(cat)));
      }
      // });
    }
  };

  var viewCatItem = {
    init: function() {
      //Cache DOM
      this.HTMLcatContentDefault = document.querySelector('.content-default');
      this.HTMLcloneCatImageContainer = '';
      this.HTMLcatEntry = document.querySelector('.cat-entry');
      this.HTMLcatImageContainer = document.createElement('figure');
      this.HTMLcatImage = document.createElement('img');
      this.HTMLcatName = document.createElement('figcaption');
      this.HTMLcatCounter = document.createElement('b');
    },

    render: function (cat) {
      this.cleanView();
      this.HTMLcatContentDefault.style.display = 'none';

      this.HTMLcatImage.src = cat.image;
      this.HTMLcatCounter.textContent = cat.clickCount;
      this.HTMLcatName.textContent = cat.name;

      this.HTMLcatImageContainer.appendChild(this.HTMLcatImage);
      this.HTMLcatImageContainer.insertBefore(this.HTMLcatName, this.HTMLcatImage);

      this.HTMLcloneCatImageContainer = this.HTMLcatImageContainer.cloneNode(true);

      this.HTMLcatEntry.appendChild(this.HTMLcloneCatImageContainer);
      this.HTMLcatEntry.appendChild(this.HTMLcatCounter);

      this.HTMLcloneCatImageContainer.addEventListener('click', function(ev) {
        controller.incrementCounter(cat.id);
      });


    },

    cleanView: function() {
      while(this.HTMLcatEntry.firstChild) {
        this.HTMLcatEntry.removeChild(this.HTMLcatEntry.firstChild);
      }
    }

  };

  controller.init();

}();
