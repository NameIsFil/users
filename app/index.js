import './styles/styles.scss';

const userTable = document.querySelector('#company-table');

async function createCompaniesArray() {
  const postResponse = await fetch('http://localhost:3000/users');
  const usersData = await postResponse.json();
  const companies = {};

  usersData.forEach((user) => {
    const companyUri = user.uris.company;
    const companyId = Number(companyUri.split('/').pop());
    const employees = companies[companyId]?.employees || [];
    companies[companyId] = {
      id: companyId,
      uri: companyUri,
      employees: [...employees, user],
    };
  });

  const arrayOfCompanies = Object.values(companies);

  arrayOfCompanies.sort((firstCompany, secondCompany) => {
    return firstCompany.employees.length - secondCompany.employees.length;
  });

  for (let i = 0; i < arrayOfCompanies.length; i++) {
    const company = arrayOfCompanies[i];

    const companyCard = document.createElement('div');
    const companyMenu = document.createElement('p');
    const collapseSegment = document.createElement('div');
    let companyName = document.createElement('a');

    collapseSegment.classList.add('collapse');
    collapseSegment.setAttribute(
      'id',
      'collapseExample' + company.id
    );

    companyName.classList.add('btn', 'btn-dark', 'btn-lg', 'btn-block');
    companyName.setAttribute('data-toggle', 'collapse');
    companyName.setAttribute(
      'href',
      '#collapseExample' + company.id
    );
    companyName.setAttribute('role', 'button');
    companyName.setAttribute('aria-expanded', 'false');
    companyName.setAttribute(
      'aria-controls',
      'collapseExample' + company.id
    );
    companyName.innerText = 'Company ' + company.id;

    companyMenu.append(companyName);
    companyCard.append(companyMenu, collapseSegment);

    company.employees.forEach((user) => {
      const employeeCard = document.createElement('div');
      let userName = document.createElement('h2');
      let userEmail = document.createElement('h3');

      employeeCard.classList.add('card', 'card-body');

      userName.innerText = user.name;
      userEmail.innerText = user.email;
      employeeCard.append(userName, userEmail);
      collapseSegment.append(employeeCard);
    });
    userTable.append(companyCard);
  }
}

createCompaniesArray();
