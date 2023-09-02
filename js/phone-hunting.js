const loadPhone = async (searchText) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    //console.log(phones);
    displayPhones(phones);
}

function displayPhones(phones){
    //console.log(phones);
    //step-1: get id from HTML ..
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';

    //show All button if items are more than 12 
    const showAllContainer = document.getElementById('show-all-container');
    if(phones.length > 12){
        showAllContainer.classList.remove('hidden');
    }
    else{
        showAllContainer.classList.add('hidden');
    }
    //display phone 10 phone data when search
    phones = phones.slice(0,12);
    phones.forEach(phone => {
        console.log(phone);
    //step-2: create div
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-gray-100 p-4 shadow-xl`;
    //step-3: set HTML element value
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body">
          <h2 class="card-title">${phone.phone_name}</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div class="card-actions justify-end">
            <button class="btn btn-primary">Buy Now</button>
          </div>
        </div>
        `;

    //step-4: append child to the container 
    phoneContainer.appendChild(phoneCard);
    });

    toggleLoadingSpinner(false);   //set togglehandler false;
}

//search handler
const searchHandler = () => {
    toggleLoadingSpinner(true);    //call toggleLoadingSpinner 
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhone(searchText);
}
const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner');
    if(isLoading){
        loadingSpinner.classList.remove('hidden');
    }
    else {
        loadingSpinner.classList.add('hidden');

    }

}
//loadPhone();