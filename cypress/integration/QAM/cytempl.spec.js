
//---------------------------------------USEFULL-----------------------------------------------------------------------------------------------
applitools // ui testing plugin cypress


describe('E2E description', function(){
    it('Test description', function(){
        
    })    
})

it.only //executes only this test
it.skip //skip a test

const { ceil } = require("cypress/types/lodash")

Cypress.on('uncaught:exception', (err, runnable) => {
        return false // error resolution
})


beforeEach(() => {
    cy.viewport(1024, 768) //hook for screen resolution
    cy.viewport('iphone-xr', 'portrait') //hook for device
})

cy.get('.favorite').first().then(( $elemCount ) => { //extracting text and making an assertion on it
    const count = $elemCount.text();
    expect(parseInt(count)).to.eq(1);
})

cy.get('a#ai1wm-create-backup').as('button'); // ALIAS: DOM elements as variables
cy.get('@button').should('be.enabled'); // then usage
cy.get('.menu').children().as('menu'); // ALIAS: DOM elements as variables - another situation
cy.get('@menu').contains('News').click(); // then usage


cy.get('.someitem').click({force:true}) //force click


cy.get('.owl-dt-popup')
  .should('be.visible')
  .wait(500)//explicit wait

  cy.log(message) // prints to the cypress log

  cy.reload() // reloads the page

  cy.go('back'); // navigates 1 step back

  Cypress.config('pageLoadTimeout', 10000); // sets default timeout

  cy.screenshot('actions/login/clicking-login') //SCREENSHOT SAVED TO A PATH
  cy.get('.post').first().screenshot({ padding: 10 }) //SCREENSHOT OF EL WITH PADDING
  cy.get('button').first().screenshot().click() // SCREENSHOT BEFORE CLICK


  cy.get('.new-todo').type('write tests{enter}') //SHORTCUT TO ENTER

//---------------------------------------VISIT THE PAGE-----------------------------------------------------------------------------------------------


cy.visit('https://www.adweek.com/');  //page visit
 
{
    "baseUrl": "https://www.adweek.com"  //page visit with base URL in CYPRESS.JSON
}
cy.visit('/');  

npx cypress run --config baseUrl=https://www.adweek.com  //cli version


//----------------------------------------TYPES OF CHECKS-------------------------------------------------------------------

 
cy.url().should('incude', 'partOfTheAddressLink') //check the link

cy.title().should('eq', 'Adweek'); //title check

cy.hash().should('include','#!/projects/new');  //check the link

cy.location('protocol').should('eq', 'http:'); //protocol

cy.get('nav').should('be.visible') // visibility

cy.get('.class').should('have.css', 'color', 'rgb(217,217,217)')//CSS attributes check

cy.request('/admin').its('body').should('include', '<h1>Admin</h1>') //check if element is in the body


//----------------------------------------SEARCH FOR ELEMENTS-----------------------------------------------------------------------------------------------


cy.get('form').within(() => { //search multiple items within the element
    cy.get('input').first().type('text') //search first input
    cy.get('input').last().type('text') //search last input
    cy.get('input').eq(0).type('text') //search el #1
})

cy.get('#parent').find('li') //search within the element

cy.get('div').contains('ABC', { matchCase: false }) //search within the element with text (non case sensitive)

cy.get('ul li:first') //search first child li


// attribute search
cy.get('a[href*="word"]') // search for an element with attribute CONTAINING a word
cy.get('[id^=word]') // search for an element with attribute STARTS from a word
cy.get('[id$=-remote]') // search for an element with attribute ENDS from a word


//-----------------------------------------UTILIZING DIFF CONTROL ELEMENTS----------------------------------------------------------------------------------------------


//checkboxes
cy.get('#checkbox123').check().should(be.checked).and('have.value', 'valuename') // one
cy.get('input[type=checkbox]').check(['firstBox', 'secondBox']) //multiple
cy.get('#checkbox123').uncheck().should(not.be.checked).and('have.value', 'valuename') //uncheck

//combobox
cy.get('#combobox').select('ItemName').should('have.value', 'valueWeNeed') 

//multible choice combobox
cy.get('#combobox').click()
cy.get('.items').contains('firstItem').click()
cy.get('.items').contains('secondItem').click()

//combobox with typing
cy.get('#combobox').click()
cy.get('.fieldWhereToType').type('TextToFindInTheOptions')
cy.get('.fieldWhereToType').type('{enter}')

//radio buttons
cy.get('input[value=ourRadio]').should(be.checked) 
cy.get('input[value=otherRadio]').should(not.be.checked).click() // uncheck - to check

// alert OK handling
cy.on('window:alert', (str)=>
    {
        expect(str)
        .to
        .equal('Some text');
    }
)

// alert 2 options handling
cy.on('window:confirm', (str)=>
    {
        expect(str)
        .to
        .equal('Some text');
    }
)


//-----------------------------------------API utilization----------------------------------------------------------------------------------------------


cy.request('POST', 'http://localhost:8888/users/admin', { name: 'Jane' })
  .then((response) => {
    // response.body is automatically serialized into JSON
    expect(response.body).to.have.property('name', 'Jane') // true
  })


//-----------------------------------------API v2 utilization----------------------------------------------------------------------------------------------


  describe('API Testing', () => {
    
    Cypress.config('baseUrl', 'http://dummy.restapiexample.com/api/v1')
    
    it('GET - read', () => {
        cy.request('/employees').then((response) => {
            expect(response).to.have.property('status', 200)
            expect(response.body).to.not.be.null
            expect(response.body.data).to.have.length(24)
        })
    })

    it('POST - create', () => {
        const item = {"name":"test","salary":"123","age":"23"}
        cy.request('POST', '/create', item)
        .its('body')
        .its('data')
       .should('include', {name:'test'})
    })

    it('PUT - update', () => {
        const item = {"name":"test1"}
        cy.request({method:'PUT', url:'/update/1', body:item, failOnStatusCode: false}).its('status').should('eq', 401)
    })
})


  //-----------------------------------------FILES MANIPULATION----------------------------------------------------------------------------------------------


  cy.request({
    url: 'http://ABC.COM/some-document.pdf',
    encoding: 'binary',
  })
  .then((response) => {
    cy.writeFile('path/to/save/document.pdf', response.body, 'binary') //DOWNLOADING A FILE
  })

  cy.writeFile('111.txt','Hello world\n') //making a file
  cy.writeFile('111.txt', 'Hello, Hello', {flag: 'a+'}) //adding to a file 
  cy.readFile('sampleFile').should('contains', 'Hello World') //reading a file


  //-----------------------------------------FIXTURES MANIPULATION----------------------------------------------------------------------------------------------


  // using credentials from fixtures
  cy.fixture('userLoginDetails').then((user)=>{
    cy.get('input[type="email"]').type(user.email)
    cy.get('input[type="password"]').type(user.password)
  })

  // adding credentials from fixtures from hook
  beforeEach(() => {
    cy.fixture('userLoginDetails').then((user) => { 
        userDetails = user
    })
  })
it('Sign in', function () {
cy.visit('/login')
    cy.get('input[type="email"]').type(userDetails.email)
    cy.get('input[type="password"]').type(userDetails.password)
    cy.get('.btn').contains('Sign in').should('be.visible').click()
})

// adding credentials from fixtures from hook V2
beforeEach(function () {
    cy.fixture('userLoginDetails').as('user')
})
it('Sign in', function () {
    cy.visit('/login')
    cy.get('input[type="email"]').type(this.user.email)
    cy.get('input[type="password"]').type(this.user.password)
    cy.get('.btn').contains('Sign in').should('be.visible').click()
})


//-----------------------------------------ASSERTIONS----------------------------------------------------------------------------------------------
  expect(text).to.match('foo')
  expect(text).to.include('foo')
  expect(text).not.to.include('bar')
  cy.get('p#abcd').should('have.text',"Wildness")
  cy.contains('.todo-list li', 'write tests').should('have.class', 'completed') //IF CLASS WAS ADDED AFTER MANIPULATION