const boys = {
    categories: ['cloths', 'shoes', 'accessories', 'ethnic'],
    types: [
        ['jeans', 'trousers and chinos', 'shirts', 't-shirts', 'jerseys', 'jackets', 'coats', 'rain-gear', 'ethnic'],
        ['sneakers', 'dressing-shoes', 'boots', 'sandals', 'hawainas', 'gum-boots and others', 'ethnic'],
        ['caps and hats', 'clocks', 'belts', 'socks', 'under-garments', 'mufllers', 'gloves', 'body-warmers'],
        ['kurtas and pijamas', 'vests', 'dhoti kurtas', 'sherwanis', 'lohis' ]
    ]
}

const girls = {
    categories: ['cloths', 'shoes', 'accessories', 'ethnic'],
    types: [
        ['jeans', 'trousers and chinos', 'shirts', 't-shirts', 'jerseys', 'jackets', 'coats', 'skirts', 'rain-gear', 'ethnic'],
        ['sneakers', 'dressing-shoes', 'boots', 'sandals', 'hawainas', 'gum-boots and others', 'ethnic'],
        ['caps and hats', 'clocks', 'belts', 'socks', 'leggings', 'under-garments', 'mufllers', 'gloves', 'body-warmers', 'hair accessories', 'shawls'],
        ['salwar-kurta', 'lehnga-cholis / ghagra-cholis', 'vests', 'jacekts', 'saaris'],
    ]
}

const prodClassification = document.getElementById('prodClassification');
const genderList = document.getElementById('prodGender');
const catList = document.getElementById('prodCategory');
const typeList = document.getElementById('prodType');

console.log('selected gender ' + genderList.selectedIndex);
console.log('selected category ' + catList.selectedIndex);


const audience = function () {
    return (genderList.value === 'male' ? boys : girls);
};

prodClassification.addEventListener('change', getLists);

function getLists(evt) {
    console.log(evt.target);
    if(evt.target.classList.contains('genderSelection')) {
        console.log(evt.target.value);
        getCat(audience());
        getType(catList.selectedIndex);
    } else if(evt.target.classList.contains('catSelection')) {
        getType(catList.selectedIndex);
    }       
}


// Creates list of all categories that belong to selected audience/gender
function getCat(gender) {
    catList.innerHTML = '';
    gender.categories.forEach( (category, index) => {
        const option = document.createElement('option');
        option.classList.add('selectOption');
        option.appendChild(document.createTextNode(category));
        option.value = category;
        catList.appendChild(option);
    });
    catList.selectedIndex = 0;
}

// Creates list of all product-types that belong to the selected category
function getType(index) {
    typeList.innerHTML = '';
    audience().types[index].forEach(type => {
        const option = document.createElement('option');
        option.appendChild(document.createTextNode(type));
        option.value = type;
        typeList.appendChild(option);
        typeList.selectedIndex = 0;
    });
    typeList.selectedIndex = 0;
}