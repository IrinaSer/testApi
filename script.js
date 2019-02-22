const id = '0b43d40e3aaf1972fb8f7947b8e44d5e13b1f880a4d556eab94f794069cbb08e';
let nextPagen = 2;

function Collection(collectionsResult) {

    this.container = document.createElement('div');
    this.container.className = 'collections__item';

    this.showTop(collectionsResult);

    this.showBottom(collectionsResult);

    /*this.container.addEventListener('click', event => {
        event.stopPropagation();
        let currentCollection = event.currentTarget.getAttribute('data-collection');
        console.log(currentCollection);
        let collections1 = new XMLHttpRequest();
        collections1.open("GET", "https://api.unsplash.com/search/collections?query=" + currentCollection + "&client_id=" + id, false);
        collections1.send(null);
        let collectionsResult1 = JSON.parse(collections1.responseText);
        console.log(collectionsResult1);
        //функция с отрисовкой коллекций
    });*/

}

Collection.prototype.showTop = function (collectionsResult) {
    this.containerTop = document.createElement('div');
    this.containerTop.className = 'collections__item-top';

    this.showPreview(collectionsResult.preview_photos.length - 1, collectionsResult.preview_photos);

    this.container.appendChild(this.containerTop);
}

Collection.prototype.showPreview = function (count,photos) {
    this.photos = [];

    for (let i = 0; i < count; i++) {
        this.photos[i] = photos[i].urls.regular;

        this.imgWrap = document.createElement('div');

        this.imgWrap.setAttribute('class', (i == 0) ? 'collections__item-img-wrap first' : 'collections__item-img-wrap');

        this.newImg = document.createElement('img');
        this.newImg.setAttribute('src', this.photos[i]);

        this.imgWrap.appendChild(this.newImg);
        this.containerTop.appendChild(this.imgWrap);

    }
}

Collection.prototype.showBottom = function (collectionsResult) {

    this.containerBottom = document.createElement('div');
    this.containerBottom.className = 'collections__item-bottom';

    this.name = document.createElement('h2');
    this.name.innerHTML = collectionsResult.title;

    this.collectionsCount = document.createElement('div');
    this.collectionsCount.className = 'collections__item-count';
    this.collectionsCount.innerHTML = collectionsResult.total_photos + ' photos';

    this.collectionsAuthor = document.createElement('div');
    this.collectionsAuthor.className = 'collections__item-author';
    this.collectionsAuthor.innerHTML = 'Curated by ' + collectionsResult.user.name;

    this.containerBottom.appendChild(this.name);
    this.containerBottom.appendChild(this.collectionsCount);
    this.containerBottom.appendChild(this.collectionsAuthor);
    this.container.appendChild(this.containerBottom);

    this.container.setAttribute('data-collection', collectionsResult.title);
}

Collection.prototype.show = function () {
    document.getElementById('result').appendChild(this.container);
}

function request(text) {
    //получаем коллекции
    let collections = new XMLHttpRequest();
    collections.open("GET", text + id, false);
    collections.send(null);
    let collectionsResult = JSON.parse(collections.responseText);

    return collectionsResult;
}

function showCollections (collectionsResult) {
    for (let key in collectionsResult) {
        let t = new Collection(collectionsResult[key]);
        t.show();
    }
}

function isVisible(elem) {

    let coords = elem.getBoundingClientRect();
    let windowHeight = document.documentElement.clientHeight;

    let bottomVisible = coords.bottom < windowHeight && coords.bottom > 0;

    return  bottomVisible;
}

//выводим коллекции
showCollections(request("https://api.unsplash.com/collections/?client_id="));

window.onscroll = function() {

    if (isVisible(document.getElementById('result'))) {

        showCollections(request("https://api.unsplash.com/collections/?page=" + nextPagen + "&client_id="));

        nextPagen++;
    }

}


