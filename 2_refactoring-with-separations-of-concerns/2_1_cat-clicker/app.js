var model = {
    init: function() {
        var catsData = [];
        // Uncomment this to keep data after page reload
        // if (!localStorage.cats) {
            catNames = [
                "Tom",
                "Garfield",
                "Misi",
                "Pancho",
                "Colorines",
                "Maachimoo, cabeza de gamba",
                "Me caigo p´atrás",
                "Ganz cool",
                "Hastaluego Kitty",
                "Man Duchao",
                "Cago n tu puta madre",
                "Bustamiaunte"
            ];
            for (var i=0, totalCats=catNames.length; i<totalCats; i++) {
                catsData.push({
                    "index": catsData.length+1,
                    "name": catNames[i],
                    "imgPath": "img/cat" + (i+1) + ".jpg",
                    "counter": 0,
                });
            }
            localStorage.cats = JSON.stringify(catsData);
        // }
        localStorage.notificationTimeout = "{}";
    },
    getData: function() {
        return JSON.parse(localStorage.cats);
    },
    getCatByName: function(catName) {
        var cats = this.getData();
        for (var i = 0, totalCats = cats.length; i < totalCats; i++) {
            if (cats[i].name === catName) {
                return cats[i];
            }
        }
    },
    updateCat: function(cat) {
        var cats = this.getData();
        cats[cat.index] = cat;
        localStorage.cats = JSON.stringify(cats);
    },
    setNotificationTimeout: function(notificationTimeout) {
        localStorage.notificationTimeout = JSON.stringify(notificationTimeout);
    },
    getNotificationTimeout: function() {
        return JSON.parse(localStorage.notificationTimeout);
    }
};


var octopus = {
    initApp: function() {
        model.init();
        var cats = model.getData();
        catListView.init(cats);
        catAreaView.init(cats[0]);
    },
    onListElemClicked: function(catName) {
        clearTimeout(model.getNotificationTimeout());
        var cat = model.getCatByName(catName);
        catAreaView.init(cat);
    },
    onCatImgClicked: function(catName) {
        var cat = model.getCatByName(catName);
        cat.counter += 1;
        model.updateCat(cat);
        cat = this.updateCatWithSpecialMessage(cat);
        catAreaView.init(cat);
    },
    updateCatWithSpecialMessage: function(cat) {
        if (cat.counter%5 === 0) {
            cat.message = "Wow! Keep clicking!";
            var timeout = setTimeout(function() {
                cat.message = "";
                catAreaView.init(cat);
            }, 2000);
            model.setNotificationTimeout(timeout);
        }
        return cat;
    }
};


var catListView = {
    init: function(cats) {
        this.render(cats);
    },
    render: function(cats) {
        var catList = document.getElementById('cat-list');
        var htmlStr = "";
        for (var i = 0, totalCats = cats.length; i < totalCats; i++) {
            htmlStr += "<li class='cat-elem' onclick='octopus.onListElemClicked(\"" + cats[i].name + "\")'>" + cats[i].name + "</li>";
        }
        catList.innerHTML = htmlStr;
    }
};


var catAreaView = {
    init: function(cat) {
        cat.message = cat.message || "";
        this.elem = document.getElementById('cat-area');
        this.render(cat);
    },
    render: function(catData) {
        htmlStr = "<p class='name cat-param'>" + catData.name + "</p>" +
                        "<img class='picture cat-param' onclick='octopus.onCatImgClicked(\"" + catData.name + "\")' src='" + catData.imgPath + "'></img>" +
                        "<p class='counter cat-param'>" + catData.counter + "</p>" +
                        "<p id='message cat-param'>" + catData.message + "</p>";
        this.elem.innerHTML = htmlStr;
    }
};



