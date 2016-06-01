var model = {
    init: function() {
        // With a backend implementation, we would get here the cats
        // and save them to localStorage
        var cats = [];
        var idCounter = 1;
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
                "Bustamiaunte",
                "No encuentro las llaves",
                "Patada en los huevos",
                "Are you talking to me",
                "Carapan"
            ];
            for (var i=0, totalCats=catNames.length; i<totalCats; i++) {
                cats.push({
                    "id": idCounter++,
                    "name": catNames[i],
                    "picture": "img/cat" + (i+1) + ".jpg",
                    "counter": 0,
                });
            }
            localStorage.cats = JSON.stringify(cats);
        // }
        localStorage.currentCat = JSON.stringify(cats[0]);
        localStorage.notificationTimeout = JSON.stringify("undefined");
    },
    getCats: function() {
        return JSON.parse(localStorage.cats);
    },
    getCatWithId: function(catId) {
        var cats = this.getCats();
        for (var i = 0, totalCats = cats.length; i < totalCats; i++) {
            if (cats[i].id === catId) {
                return cats[i];
            }
        }
    },
    getCurrentCat: function() {
        return JSON.parse(localStorage.currentCat);
    },
    setCurrentCat: function(cat) {
        localStorage.currentCat = JSON.stringify(cat);
    },
    updateCatClickCounter: function() {
        var cat = this.getCurrentCat();
        cat.counter += 1;
        this.setCurrentCat(cat);

        var cats = this.getCats();
        cats.getCatWithId(cat.id).counter = cat.counter;
        localStorage.cats = JSON.stringify(cats);
    },
    setNotificationTimeout: function(notificationTimeout) {
        localStorage.notificationTimeout = JSON.stringify(notificationTimeout);
    },
    getNotificationTimeout: function() {
        return JSON.parse(localStorage.notificationTimeout);
    },
    deleteNotificationTimeout: function() {
        localStorage.notificationTimeout = JSON.stringify("undefined");
    }
};


var octopus = {
    initApp: function() {
        model.init();
        var cats = model.getCats();
        catListView.init(cats);
        catAreaView.init(cats[0]);
        clickNotificationView.init();
    },
    getCurrentCat: function() {
        return model.getCurrentCat();
    },
    getCats: function() {
        return model.getCats();
    },
    onListElemClicked: function(catId) {
        clearTimeout(model.getNotificationTimeout());
        var cat = model.getCatWithId(catId);
        model.setCurrentCat(cat);
        catAreaView.render();
        clickNotificationView.render();
    },
    onCatImgClicked: function() {
        clearTimeout(model.getNotificationTimeout());
        model.updateCatClickCounter();
        catAreaView.render();
        clickNotificationView.render();
    },
    getCurrentCatNotification: function() {
        var timeout, message;
        cat = model.getCurrentCat();
        if (cat.counter > 0 && cat.counter%5 === 0) {
            message = "Wow! Keep clicking!";
            timeout = setTimeout(function() {
                clickNotificationView.render("");
            }, 2000);
            model.setNotificationTimeout(timeout);
        }
        return message || '';
    }
};


var catListView = {
    init: function() {
        this.catList = document.getElementById('cat-list');
        this.render();
    },
    render: function() {
        var cats = octopus.getCats();
        var listElem;
        for (var i = 0, totalCats = cats.length; i < totalCats; i++) {
            cat = cats[i];
            listElem = document.createElement('li');
            listElem.textContent = cat.name;
            listElem.addEventListener('click', (function(catCopyId){
                return function(){
                    return octopus.onListElemClicked(catCopyId);
                };
            })(cat.id));
            this.catList.appendChild(listElem);
        }
    }
};


var catAreaView = {
    init: function() {
        this.elem = document.getElementById('cat-area');
        this.elems = {
            "name": document.getElementById('name'),
            "picture": document.getElementById('picture'),
            "counter": document.getElementById('counter'),
        };
        this.elems.picture.addEventListener('click', function(){
            octopus.onCatImgClicked();
        });
        this.render();
    },
    render: function() {
        var cat = octopus.getCurrentCat();
        this.elems.name.textContent = cat.name;
        this.elems.picture.src = cat.picture;
        this.elems.counter.textContent = cat.counter;
    }
};


var clickNotificationView = {
    init: function() {
        this.elem = document.getElementById('message');
        this.render();
    },
    render: function(){
        if (this.elem.textContent === "") {
            this.elem.textContent = octopus.getCurrentCatNotification();
        } else {
            this.elem.textContent = "";
        }
    }
};

