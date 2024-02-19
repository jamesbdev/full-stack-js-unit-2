/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/

//console.log(data);
const itemsPerPage = 8;
/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
const showPage = (list, page) => {
  const startIndex = (page * itemsPerPage) - itemsPerPage;
  const endIndex = page * itemsPerPage;
  const studentList = document.querySelector('.student-list');
  studentList.innerHTML = "";
  for(let i = 0; i < list.length; i++) {
    const student = list[i];
    if(i >= startIndex && i < endIndex) {
      const studentItem = document.createElement('li');
      studentItem.classList.add('student-item');
      studentItem.classList.add('cf');
      studentItem.innerHTML = `<div class="student-details">
      <img class="avatar" src="${ student.picture.medium }" alt="${ student.name.first }">
      <h3>${ student.name.first } ${ student.name.last }</h3>
      <span class="email">${ student.email }</span>
    </div>
    <div class="joined-details">
      <span class="date">Joined ${ student.registered.date }</span>
    </div>`
    };
    studentList.insertAdjacentElement('afterbegin', studentItem);
  }
}

showPage(data, 1);


/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/



// Call functions
