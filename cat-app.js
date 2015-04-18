$(function(){

  var Cat = function(name, image, count){
    this.count = count;
    this.name = name;
    this.image = image;
  }

  var data = {
    cats: [],
    selectedCat: null
  };

  var octopus = {
    populateModel: function(){
      data.cats.push(new Cat("Doodle", "assets/cat.jpg", 0));
      data.cats.push(new Cat("Twoodle", "assets/cat2.jpg", 0));
    },

    getCats: function(){
      return data.cats;
    },

    setCurrentCat: function(currentCat){
        data.selectedCat = currentCat;
        catView.render();
    },

    incrementCounter: function(){
      data.selectedCat.count++;
      catView.render();
    },

    getSelectedCat: function(){
      return data.selectedCat;
    },

    editCat: function(){
      adminView.init();
    },

    saveCat: function(name, image, count){
      data.selectedCat.name = name;
      data.selectedCat.image = image;
      data.selectedCat.count = count;
      listView.render();
      catView.render();
    },

    init: function(){
      this.populateModel();
      listView.init();
      catView.init();
    }
  };

  var listView = {
    init: function(){
      this.catListContainer = $("#cat-list");
      this.render();
    },

    render: function(){
      this.catListContainer.html("");
      var cats = octopus.getCats();
      for(var i=0; i<cats.length; i++){
        var newNode = $("<li>" + cats[i].name +"</li>");
        newNode.on("click", (function(catRef){
          return function(){
            octopus.setCurrentCat(catRef);
          }
        })(cats[i]));
        this.catListContainer.append(newNode);
      }
    }
  };

  var catView = {
    init: function(){
      this.catImgContainer = $("#cat-image");
      this.catNameContainer = $("#cat-name");
      this.catCountContainer = $("#click-count");

      this.catImgContainer.on("click", function(){
        octopus.incrementCounter();
      });
      //Admin controls
      this.adminButton = $('#admin-btn');
      this.adminButton.on("click", function(){
        octopus.editCat();
      });
    },

    render: function(){
      var selectedCat = octopus.getSelectedCat();
      this.catImgContainer.attr("src", selectedCat.image);
      this.catNameContainer.text(selectedCat.name);
      this.catCountContainer.text(selectedCat.count);
      $("#admin-access").hide();
    }
  };

  var adminView = {
    init: function(){

      this.name = $("#edit-cat-name");
      this.image = $("#edit-cat-image");
      this.count = $("#edit-cat-count");

      $("#save-cat").on("click", function(){
        octopus.saveCat($("#edit-cat-name").val(),
        $("#edit-cat-image").val(),
        $("#edit-cat-count").val());
      });
      this.render();
    },

    render: function(){
      var selectedCat = octopus.getSelectedCat();
      this.name.val(selectedCat.name);
      this.image.val(selectedCat.image);
      this.count.val(selectedCat.count);
      $("#admin-access").show();
    }

  }
  octopus.init();
});
