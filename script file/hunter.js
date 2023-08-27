const loadPhone = async (searchPhone, showAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchPhone}`);
    const data = await res.json();
    const phones = data.data;
    // console.log(data.data)
    displayPhones(phones, showAll);
}

const displayPhones = (phones, showAll) => {

    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';

    const showAllContainer = document.getElementById('show-all');
    if(phones.length > 9 && !showAll){
        showAllContainer.classList.remove('hidden');
    }else{
        showAllContainer.classList.add('hidden');
    }

    // how many item show display 
    if(!showAll){
        phones = phones.slice(0,9)
    }
    // console.log(phones);
    phones.forEach(phone => {
        // console.log(phone);

        // 1. create a div.
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-base-100 p-5 shadow-xl`;
        phoneCard.innerHTML = `
        <figure class="px-10 pt-10">
        <img src="${phone.image}" alt="phone img" class="rounded-xl" />
        </figure>
        <div class="card-body items-center text-center">
        <h2 class="card-title">${phone.phone_name}</h2>
        <p>${phone.brand}</p>
        <div class="card-actions">
            <button onclick = "handleShowDetail('${phone.slug}')" class="btn btn-primary">Show Details</button>
        </div>
        </div>
        `;

        phoneContainer.appendChild(phoneCard);

    });
    toggleLoadingSpinner(false);
}

const handleSearch = (showAll) => { 
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('input-field');
    const searchText = searchField.value;
    // searchField.value = '';
    // console.log(searchText);
    loadPhone(searchText, showAll);
}

const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner');
    if(isLoading){
        loadingSpinner.classList.remove('hidden');
    }else{
        loadingSpinner.classList.add('hidden');
    }
}

const handleShowDetail = async (id) =>{
    // console.log('details ok', id)
    const res = await fetch(` https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;
    // console.log(phone);
    showPhoneDetails(phone)
}


const showPhoneDetails = (phone) => {
    console.log(phone)
    const showPhoneName = document.getElementById('show-detail-phone-name');
    showPhoneName.innerText = phone.name;

    const phoneDiscribtion = document.getElementById('phone-describtion');
    phoneDiscribtion.innerHTML = `
    
        <img src = "${phone.image}"/>
        <p><span>Storage : <span> ${phone?.mainFeatures?.storage}</p>
    `;

    show_modal_detail.showModal()
}

const handleShowAll = () => {
    handleSearch(true)
}
// loadPhone();