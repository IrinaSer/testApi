const id = '0b43d40e3aaf1972fb8f7947b8e44d5e13b1f880a4d556eab94f794069cbb08e';

//получаем коллекции
let collections = new XMLHttpRequest();
collections.open("GET", "https://api.unsplash.com/collections/?client_id="+id, false);
collections.send(null);
let collectionsResult = JSON.parse(collections.responseText);
//console.log(collectionsResult);
for (let key in collectionsResult) {
    let collectionItemContainer = document.createElement('div');
    collectionItemContainer.setAttribute('class','collections__item');

    let collectionItemTop = document.createElement('div');
    collectionItemTop.setAttribute('class','collections__item-top');

    let collectionsPhotos = [];
    let collectionsItems = collectionsResult[key].title;
    let collectionsCount = collectionsResult[key].total_photos;
    let collectionsAuthor = collectionsResult[key].user.name;

    let countImages = 3;//collectionsResult[key].preview_photos.length - 1;

    for (let i = 0; i < countImages; i++)  {
        collectionsPhotos[i] = collectionsResult[key].preview_photos[i].urls.regular;

        let imgWrap = document.createElement('div');

        imgWrap.setAttribute('class',(i==0)?'collections__item-img-wrap first':'collections__item-img-wrap');

        let newImg = document.createElement('img');
        newImg.setAttribute('src',collectionsPhotos[i]);

        imgWrap.appendChild(newImg);
        collectionItemTop.appendChild(imgWrap);
        
    }

    collectionItemContainer.appendChild(collectionItemTop);
    
    let newCollectionItem = document.createElement('h2');
    newCollectionItem.textContent = collectionsItems;

    let newCollectionCount = document.createElement('div');
    newCollectionCount.setAttribute('class','collections__item-count');
    newCollectionCount.textContent = collectionsCount + ' photos';

    let newCollectionsAuthor = document.createElement('div');
    newCollectionsAuthor.setAttribute('class','collections__item-author');
    newCollectionsAuthor.textContent = 'Curated by ' + collectionsAuthor;
    
    collectionItemContainer.setAttribute('data-collection',collectionsItems);
    collectionItemContainer.appendChild(newCollectionItem);
    collectionItemContainer.appendChild(newCollectionCount);
    collectionItemContainer.appendChild(newCollectionsAuthor);

    collectionItemContainer.addEventListener('click', event => {
        event.stopPropagation();
        let currentCollection = event.currentTarget.getAttribute('data-collection');
        console.log(currentCollection);
        let collections1 = new XMLHttpRequest();
        collections1.open("GET", "https://api.unsplash.com/search/collections?query=" + currentCollection + "&client_id=" + id, false);
        collections1.send(null);
        let collectionsResult1 = JSON.parse(collections1.responseText);
        console.log(collectionsResult1);
        //функция с отрисовкой коллекций
    });

    document.getElementById('result').appendChild(collectionItemContainer);
}


let collectionsItems = "Dancers";

//попытка поиска

//

