/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

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
  for (let i = 1; i < numberOfPages; i++ ) {
    //create a button
    const button = document.createElement('li');
    button.classList.add('button');
    //add the button markup
    button.innerHTML = ` <button type="button">${ i }</button>`;
    //append the bottom to the list
    paginationList.insertAdjacentElement('beforeend', button);
  }
  //get the first button element
  const firstBtn = document.querySelector('button');
  firstBtn.classList.add('active');
  
  //add event listener to the button list
  paginationList.addEventListener('click', function(element){
   const buttons = document.querySelectorAll('button');
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
