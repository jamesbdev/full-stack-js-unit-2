

//declare the number of items per page
const itemsPerPage = 9;
/*
This function adds html content to the page creating student cards for 9 students. 
*/
const showPage = (list, page) => {
  const startIndex = (page * itemsPerPage) - itemsPerPage;
  const endIndex = page * itemsPerPage;
  //get the student list element from the DOM
  const studentList = document.querySelector('.student-list');
  //reset the html of the student list to empty
  studentList.innerHTML = "";
  //loop through the students data array
  for(let i = 0; i < list.length; i++) {
    const student = list[i];
    if(i >= startIndex && i < endIndex) {
      //create the html for the student card
      const studentItem = document.createElement('li');
      studentItem.classList.add('student-item');
      studentItem.classList.add('cf');
      //create the markup for the student card div
      studentItem.innerHTML = `<div class="student-details">
      <img class="avatar" src="${ student.picture.medium }" alt="${ student.name.first }">
      <h3>${ student.name.first } ${ student.name.last }</h3>
      <span class="email">${ student.email }</span>
    </div>
    <div class="joined-details">
      <span class="date">Joined ${ student.registered.date }</span>
    </div>`;
    //append student card to list
    studentList.insertAdjacentElement('afterbegin', studentItem);
    };
  }
}


/*
This function dynamically creates the mark up for the pagination buttons
*/

const addPagination = (list) => {
  //calculate the number of pages 
  const numberOfPages = Math.floor(list.length / itemsPerPage) + 1;

  //get the list element on the page
  const paginationList = document.querySelector('.link-list');
  //clear the existing content of the list
  paginationList.innerHTML = "";
  //loop through the number of pages 
  for (let i = 0; i < numberOfPages; i++ ) {
    //create a button
    const button = document.createElement('li');
    button.classList.add('button');
    //add the button markup
    button.innerHTML = `<button type="button">${ i + 1 }</button>`;
    //append the bottom to the list
    paginationList.insertAdjacentElement('beforeend', button);
  }
  //get the first button element
  const firstBtn = document.querySelector('.link-list button');
  //check if first button is on the page
  if (firstBtn) {
    firstBtn.classList.add('active');
  }

  
  //add event listener to the button list
  paginationList.addEventListener('click', function(element){
   const buttons = document.querySelectorAll('.link-list button');
   //check if the click element is a button
     if(element.target.tagName.toLowerCase() === "button") {
       for(let i = 0; i < buttons.length; i++) {
         //remove the active class from all buttons
         buttons[i].classList.remove('active');
       }
       //add the active class to the clicked element
       element.target.classList.add('active');
       const btnText = element.target.innerText;
       //show the page with the button's number
       showPage(list, btnText);
     }
  })
}


//display the first page of data
showPage(data, 1);
//add the pagination buttons
addPagination(data, 1);

/* function that adds a search input element on the page
*/
const addSearch = () => {
   //get the heading element
   const heading = document.getElementsByTagName('h2');
   const searchContainer = document.createElement('div');
   //create the markup for the search input
   searchContainer.innerHTML = `<label for="search" class="student-search">
   <span>Search by name</span>
   <input id="search" placeholder="Search by name...">
   <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
 </label>`;
   //append the search input to the DOM
   heading[0].insertAdjacentElement('afterend', searchContainer);
}

addSearch();

const input = document.querySelector('#search');
const submitBtn = document.querySelector('.student-search button');

/* function: 
- filters the students by comparing the student's name with the search string
- adds an error message if no student is found 
- changes the pagination buttons according to the new data 
*/
const filterBySearch = () => {
   //remove the error message if it exists
   const message = document.querySelector('.error-message');
   if (message) {
      message.remove();
   }
   //get the input value from the input 
   const searchValue = input.value.toLowerCase();
   //declare a new list for the data;
   const newList = [];
   //loop through list of students
   for(let i = 0; i < data.length; i++) {
      const firstName = data[i].name.first.toLowerCase();
      const lastName = data[i].name.last.toLocaleLowerCase();
      const fullName = `${firstName} ${lastName}`;
      //check if the student's name contains the input's string
      if (fullName.includes(searchValue)) {
         //add the student to the new list
         newList.push(data[i]);
      }
   }
   //call the page function with the new list
   showPage(newList, 1);
   //add pagination buttons
   addPagination(newList, 1);
   
 
   if (newList.length == 0) {
      //create error message
      const message = document.createElement('p');
      message.classList.add('error-message');
      message.innerText = "Sorry, no matches were found. Please try again.";
      const studentList = document.querySelector('.student-list');
      //append error message to the DOM
      studentList.insertAdjacentElement('beforebegin', message);
   } 
   //check if there are less than 9 items in the new data
   if (newList.length <= itemsPerPage) {
    //remove pagination buttons
    const paginationList = document.querySelector('.link-list');
    paginationList.innerHTML = "";
   }

}

input.addEventListener('keyup', filterBySearch);
submitBtn.addEventListener('click', filterBySearch);




