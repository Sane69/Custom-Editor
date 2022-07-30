const inputRange = document.querySelector('.filter__range'),
      RangeSpanResult = document.querySelector('.filter__result-span'),
      filterLabel = document.querySelector('.filter__label'),
      filterButton = document.querySelectorAll('.filter__item'),
      loadInput = document.querySelector('.load__input'),
      previewImage = document.querySelector('.result__image-preview'),
      chooseImage = document.querySelector('.result__choose'),
      filterRotate = document.querySelectorAll('.filter__rotate button'),
      filterReset = document.querySelector('.filter__reset-btn');

let brightness = 100,
    saturation = 100,
    inversion = 0,
    grayscale = 0;      

let rotate = 0, flipHorizontal = 1, flipVertical = 1;

const applyFilters = () => {
    previewImage.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal}, ${flipVertical})`
    previewImage.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`
}

const loadImage = () => {
    let file = loadInput.files[0];  
    if(!file) return;
    previewImage.src = URL.createObjectURL(file);
    previewImage.style.maxWidth = '100%';
    previewImage.addEventListener('load', () => {
        document.querySelector('.filter').classList.remove('disable')
    })
}

const updateFilter = () => {
    RangeSpanResult.innerText = `${inputRange.value}%`;
    const selectedFilter = document.querySelector('.filter__items .active');
    if (selectedFilter.id === 'brightness') {
        brightness = inputRange.value;
    } else if (selectedFilter.id === 'saturation') {
        saturation = inputRange.value;
    } else if (selectedFilter.id === 'inversion') {
        inversion = inputRange.value;
    } else {
        grayscale = inputRange.value;
    }
    applyFilters()
}

filterButton.forEach(item => item.addEventListener('click', function() {
    currentBtn = item;
    if (!currentBtn.classList.contains('active')) {
        filterButton.forEach(currentBtn => {
            currentBtn.classList.remove('active')
        })
    }
    filterLabel.textContent = currentBtn.innerText;
    currentBtn.classList.add('active')

    if (item.id === 'brightness') {
        inputRange.max = '200'
        inputRange.value = brightness
        RangeSpanResult.innerText = `${brightness}%`
    } else if (item.id === 'saturation') {
        inputRange.max = '200'
        inputRange.value = saturation
        RangeSpanResult.innerText = `${saturation}%`
    } else if (item.id === 'inversion') {
        inputRange.max = '100'
        inputRange.value = inversion
        RangeSpanResult.innerText = `${inversion}%`
    } else {
        inputRange.max = '100'
        inputRange.value = grayscale
        RangeSpanResult.innerText = `${grayscale}%`
    }
}))

filterRotate.forEach((option) => {
    option.addEventListener('click', () => {
        if (option.id === 'left') {
            rotate -= 90;
        } else if (option.id === 'right') {
            rotate += 90;
        } else if (option.id === 'horizontal') {
            flipHorizontal = flipHorizontal === 1 ? -1 : 1;
        } else {
            flipVertical = flipVertical === 1 ? -1 : 1;
        }
        applyFilters()
    })
})

const resetFilter = () => {
    brightness = 100; saturation = 100; inversion = 0; grayscale = 0;   
    rotate = 0, flipHorizontal = 1, flipVertical = 1; 
    filterButton[0].click();
    applyFilters();
}

inputRange.addEventListener('input', updateFilter);
filterReset.addEventListener('click', resetFilter)
chooseImage.addEventListener('click', () => loadInput.click());
loadInput.addEventListener('change', loadImage);