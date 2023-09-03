const loadPhone = async (searchText='13', isShowAll) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    //console.log(phones);
    displayPhones(phones,isShowAll);
}

function displayPhones(phones,isShowAll){
    //console.log(phones);
    //step-1: get id from HTML ..
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';

    //show All button if items are more than 12 
    const showAllContainer = document.getElementById('show-all-container');
    if(phones.length > 12 && !isShowAll){
        showAllContainer.classList.remove('hidden');
    }
    else{
        showAllContainer.classList.add('hidden');
    }
    //display phone 10 phone data when search if not show all
    if(!isShowAll){
        phones = phones.slice(0,12);
    }
    phones.forEach(phone => {
       // console.log(phone);
    //step-2: create div
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-gray-100 p-4 shadow-xl`;
    //step-3: set HTML element value
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body">
          <h2 class="card-title">${phone.phone_name}</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div class="card-actions justify-center">
            <button onclick="handleShowDetail('${phone.slug}')" class="btn btn-primary">Show Details</button>
          </div>
        </div>
        `;

    //step-4: append child to the container 
    phoneContainer.appendChild(phoneCard);
    });

    toggleLoadingSpinner(false);   //set togglehandler false;
}

//
const handleShowDetail = async(id) =>{
    console.log("clicked",id);
    //load single phone data
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;
    showPhoneDetails(phone);
    console.log(phone);
}

const showPhoneDetails = (phone) => {
   
    const phoneName = document.getElementById('show_phone_details_name');
    phoneName.innerText = phone.name;
    show_details_modals.showModal();

    const showDetailContainer = document.getElementById("show-detail-container");
    showDetailContainer.innerHTML = `
        <img src="''${phone.image}">
        <p><span>Storage: </span> ${phone?.mainFeatures?.storage}</p>
        <p><span>GPS: </span> ${phone?.others?.GPS || 'No GPS'}</p>
        

    `;
}



//search handler button
const searchHandler = (isShowAll) => {
    toggleLoadingSpinner(true);    //call toggleLoadingSpinner 
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhone(searchText,isShowAll);
}
const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner');
    if(isLoading){
        loadingSpinner.classList.remove('hidden');
    }
    else {
        loadingSpinner.classList.add('hidden');

    }

    //handle show all
    const handleShowAll = () => {
        searchHandler(true);
    }

}
loadPhone();