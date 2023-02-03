import './styles/styles.scss';

window.onload = () => {
  const heading = document.querySelector('.heading');
  heading.textContent = 'It\'s working!';
};

async function createCompaniesArray() {
  const postResponse = await fetch('http://localhost:3000/users');
  const usersData = await postResponse.json();
  const arrayOfCompanies = [];
  const arrayOfUsers = [];
  const detailedCompaniesArray = [];
  usersData.forEach((user) => {
    const companyUri = user.uris.company;
    const companyId = Number(companyUri.split('/').pop());
    arrayOfUsers.push({name:user.name, email:user.email, company: companyId});
    arrayOfCompanies.push(companyId);
  });
  let noDuplicateCompanies = arrayOfCompanies.filter((element, index) => {
    return arrayOfCompanies.indexOf(element) === index;
  });
  noDuplicateCompanies.sort((a,b)=>a-b);
  noDuplicateCompanies.forEach((company) => {
    const companyData = {};
    const companyNumber = 'title';
    const contentKey = 'workers';
    companyData[companyNumber] = company;
    companyData[contentKey] = [];
    detailedCompaniesArray.push(companyData);
  });
  for (let i = 0; i < arrayOfUsers.length; i++) {
    for (let j = 0; j < detailedCompaniesArray.length; j++) {
      if(arrayOfUsers[i].company === detailedCompaniesArray[j].title) {
        detailedCompaniesArray[j].workers.push(arrayOfUsers[i]);
      }
    }
  }
  console.log(detailedCompaniesArray);
}

const userTable = document.querySelector('#user-table');

const addUserCard = (name, email, userId) => {
  const userCard = document.createElement('div');
  let userName = document.createElement('h1');
  let userEmail = document.createElement('h2');

  userCard.classList.add('user-card');
  userCard.setAttribute('id', userId);

  userName.innerText = name;
  userEmail.innerText = email;
  userCard.append(userName, userEmail);
  userTable.append(userCard);
};

createCompaniesArray();