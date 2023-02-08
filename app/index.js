import "./styles/styles.scss";

window.onload = () => {
  const heading = document.querySelector(".heading");
  heading.textContent = "It's working!";
};

const userTable = document.querySelector("#company-table");

async function createCompaniesArray() {
  const postResponse = await fetch("http://localhost:3000/users");
  const usersData = await postResponse.json();
  const companies = {};
  const arrayOfUsers = [];

  usersData.forEach((user) => {
    const companyUri = user.uris.company;
    const companyId = Number(companyUri.split("/").pop());
    arrayOfUsers.push({
      name: user.name,
      email: user.email,
      company: companyId,
    });
    // arrayOfCompanies.push(companyId);
    const employees = companies[companyId]?.employees || [];
    companies[companyId] = {
      uri: companyUri,
      employees: [...employees, user],
    };
  });

  const arrayOfCompanies = Object.entries(companies);
  console.log(arrayOfCompanies);

  for (let i=0; i < arrayOfCompanies.length; i++) {

    const companyCard = document.createElement("div");
    const companyMenu = document.createElement("p");
    const collapseSegment = document.createElement("div");
    let companyName = document.createElement("a");

    collapseSegment.classList.add("collapse");
    collapseSegment.setAttribute('id', "collapseExample");

    companyName.classList.add('btn', 'btn-primary');
    companyName.setAttribute('data-toggle', "collapse");
    companyName.setAttribute('href', "#collapseExample");
    companyName.setAttribute('role', "button");
    companyName.setAttribute('aria-expanded', "false");
    companyName.setAttribute('aria-controls', "collapseExample");
    companyName.innerText = "Company " + arrayOfCompanies[i][0];


    companyMenu.append(companyName);
    companyCard.append(companyMenu, collapseSegment);

    arrayOfCompanies[i][1].employees.forEach((user) => {
      const employeeCard = document.createElement("div");
      let userName = document.createElement("h2");
      let userEmail = document.createElement("h3");

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
