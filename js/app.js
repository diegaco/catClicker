!function() {

  'use strict';

  var initialCats = [
    {
      clickCount: 0,
      name: 'Tabby',
      imgSrc: 'images/cat.jpg',
      imgAttr: 'www.google.com',
      nickNames: [
        'TabTab',
        'T-Bone',
        'T-Bone2',
        'Mr. T',
        'Miyu',
        'Miau Miau'
      ]
    },
    {
      clickCount: 0,
      name: 'Tiger',
      imgSrc: 'images/cat2.jpg',
      imgAttr: 'www.google.com',
      nickNames: ['Tigger']
    },
    {
      clickCount: 0,
      name: 'Scaredy',
      imgSrc: 'images/cat3.jpg',
      imgAttr: 'www.google.com',
      nickNames: ['Casper']
    },
    {
      clickCount: 0,
      name: 'Shadow',
      imgSrc: 'images/cat4.jpg',
      imgAttr: 'www.google.com',
      nickNames: ['Zzzzzzz']
    }
  ];

  var Cat = function(data){
    var self = this;

    this.clickCount = ko.observable(data.clickCount);
    this.name = ko.observable(data.name);
    this.nickName = ko.observableArray(data.nickNames);
    this.imgSrc = ko.observable(data.imgSrc);
    this.imgAttribution = ko.observable(data.imgAttr);

    this.level = ko.computed(function(){
      var level = '';
      if (self.clickCount() <= 10) {
        level = 'NewBorn';
      } else if (self.clickCount() > 10 && self.clickCount() < 50) {
        level = 'Infant';
      } else {
        level = 'Teen';
      }
      return level;
    });
  };

  var ViewModel = function() {
    var self = this;

    this.catList = ko.observableArray([]);

    initialCats.forEach(function(cat) {
      self.catList.push(new Cat(cat));
    });

    this.currentCat = ko.observable(this.catList()[0]);

    this.incrementCounter = function() {
      self.currentCat().clickCount(self.currentCat().clickCount() + 1);
    };

    this.changeCurrentCat = function(data, ev) {
      self.currentCat(data);
    };
  };

  ko.applyBindings(new ViewModel());

}();
