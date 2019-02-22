const id = '0b43d40e3aaf1972fb8f7947b8e44d5e13b1f880a4d556eab94f794069cbb08e';
let nextPagen = 2;

class Collection {

    constructor(collectionsResult) {
        this.collectionsList = document.getElementById('result');
        this.collectionPhotoList = document.getElementById('currentCollection');

        this.container = document.createElement('div');
        this.container.className = 'collections__item';

        this.photoContainer = document.createElement('div');
        this.photoContainer.className = 'collection__photos';

        this.showTop(collectionsResult);

        this.showBottom(collectionsResult);

        this.container.addEventListener('click', event => {
            event.stopPropagation();
            let currentCollection = event.currentTarget.getAttribute('data-collection');
            this.showCollectionPhotos(request(`https://api.unsplash.com/collections/${currentCollection}/photos?per_page=12&client_id=`));
        });
    }

    showTop(collectionsResult) {
        this.containerTop = document.createElement('div');
        this.containerTop.className = 'collections__item-top';

        this.showPreview(collectionsResult.preview_photos.length - 1, collectionsResult.preview_photos);

        this.container.appendChild(this.containerTop);
    }

    showPreview(count, photos) {
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

    showBottom(collectionsResult) {

        this.containerBottom = document.createElement('div');
        this.containerBottom.className = 'collections__item-bottom';

        this.name = document.createElement('h2');
        this.name.innerHTML = collectionsResult.title;

        this.collectionsCount = document.createElement('div');
        this.collectionsCount.className = 'collections__item-count';
        this.collectionsCount.innerHTML = `${collectionsResult.total_photos} photos`;

        this.collectionsAuthor = document.createElement('div');
        this.collectionsAuthor.className = 'collections__item-author';
        this.collectionsAuthor.innerHTML = `Curated by <b>${collectionsResult.user.name}</b>`;

        this.containerBottom.appendChild(this.name);
        this.containerBottom.appendChild(this.collectionsCount);
        this.containerBottom.appendChild(this.collectionsAuthor);
        this.container.appendChild(this.containerBottom);

        this.container.setAttribute('data-collection', collectionsResult.id);
    }

    show() {
        this.collectionsList.appendChild(this.container);
    }

    showCollectionPhotos(photos) {
        this.collectionPhotos = [];

        for (let i = 0; i < photos.length; i++) {

            this.collectionPhotos[i] = photos[i].urls.regular;

            this.newPhotoWrap = document.createElement('div');
            this.newPhotoWrap.className = 'collections__item-img-wrap';

            this.newPhoto = document.createElement('img');
            this.newPhoto.setAttribute('src', this.collectionPhotos[i]);

            this.newPhotoWrap.appendChild(this.newPhoto);
            this.photoContainer.appendChild(this.newPhotoWrap);

        }

        this.collectionsList.classList.add('hide');
        this.collectionPhotoList.appendChild(this.name);
        this.collectionPhotoList.appendChild(this.photoContainer);
        this.collectionPhotoList.classList.add('show');

        this.collectionPhotoList.addEventListener('click', event => {
            this.hideCollectionPhotos();
        });
    }
    hideCollectionPhotos() {
        this.collectionPhotoList.innerHTML = "";
        this.collectionsList.classList.remove('hide');
        this.collectionPhotoList.classList.remove('show');
    }
}

function request(text) {
    //получаем коллекции
    let collections = new XMLHttpRequest();
    collections.open("GET", text + id, false);
    collections.send(null);
    let collectionsResult = JSON.parse(collections.responseText);

    return collectionsResult;
}

function showCollections(collectionsResult) {
    for (let key in collectionsResult) {
        let t = new Collection(collectionsResult[key]);
        t.show();
    }
}

function isVisible(elem) {
    let coords = elem.getBoundingClientRect();
    let windowHeight = document.documentElement.clientHeight;

    let bottomVisible = coords.bottom < windowHeight && coords.bottom > 0;

    return bottomVisible;
}

function showNextPage() {
    let collections = document.getElementById('result');

    if (isVisible(collections)) {
        showCollections(request(`https://api.unsplash.com/collections/?page=${nextPagen}&client_id=`));
        console.log('showNextPage');
        nextPagen++;
    }

}

//выводим коллекции
showCollections(request("https://api.unsplash.com/collections/?client_id="));

window.onscroll = showNextPage;


