const creationForm = document.querySelector('#CreationForm');
const lista = document.querySelector('#lista');
const table = document.querySelector('#reference')
const btn = document.querySelector('#actualizar');
const editacion = document.querySelector('#editModal');
let valorInput_1 = document.querySelector('#valor_edition_1');
let valorInput_2 = document.querySelector('#valor_edition_2');
let valorInput_3 = document.querySelector('#valor_edition_3');
let valorInput_4 = document.querySelector('#valor_edition_4');
let valor_1 = document.querySelector('#valor_1');
let valor_2 = document.querySelector('#valor_2');
let valor_3 = document.querySelector('#valor_3');
let valor_4 = document.querySelector('#valor_4');
let newData = [];





cargarEvent();



function cargarEvent() {

    document.addEventListener('DOMContentLoaded', () => {

        newData = JSON.parse( localStorage.getItem('arrays')) || [];

        addRowInMainTable();
        
    });

    creationForm.addEventListener('submit', (e) => {

        e.preventDefault();

        onSubmitCreationForm(e);

    

    });


    reference.addEventListener('click', deleteRow);

    btn.addEventListener('click', () =>{

        newData.valor_1 = valorInput_1.value
        newData.valor_1 = valorInput_2.value
        newData.valor_1 = valorInput_3.value
        newData.valor_1 = valorInput_4.value

    });

}




function onSubmitCreationForm (e){


    const inputs = creationForm.querySelectorAll('input[type=number]');

    let newArray = {
        id: '',
        valor_1: '',
        valor_2: '',
        valor_3: '',
        valor_4: ''
    };
     
    newArray.id = generateIdForNewArray();

    inputs.forEach((input, index) => newArray[`valor_${index + 1}`] = input.value);

    addArray(newArray);

    newData = [...newData, newArray]; 

    addRowInMainTable(newData);

    console.log(newData);

    creationForm.reset();

     location.reload();




}


function addArray (newArray){

    const arrays = getArrays();

    arrays.push(newArray);

    localStorage.setItem('arrays', JSON.stringify(arrays));

    

}


function getArrays (generateIdForNewArradata){


    return localStorage.getItem ('arrays') ? JSON.parse (localStorage.getItem('arrays')) : [];

}

 function generateIdForNewArray()
 {
     return getArrays().length + 1; 
 }

 function addRowInMainTable(data)
 {

    cleanHTML();

    newData.forEach( newArray => {

        const {id, valor_1, valor_2, valor_3, valor_4} = newArray;
        const row = document.createElement("tr");

        row.innerHTML = `
            <td class="align-top">
                ${id}
            </td>

            <td class="align-top">
                ${valor_1}
            </td>

            <td class="align-top">
                ${valor_2}
            </td>

            <td class="align-top">
                ${valor_3}
            </td>

            <td class="align-top">
                ${valor_4}
            </td>

            <span id="edition" class="align-top">
                <a type="button" class="borrar w-30 btn btn-danger btn-sm"  data-id="${id}">Eliminar</a>
                <a type="button" class="editar w-30 btn btn-success btn-sm"  data-id="${id}">Editar</a>
        `;
        table.appendChild(row);
    
     
    });

   
  
 }

 function sincronizar(){

    localStorage.setItem('arrays', JSON.stringify(newData));

 }

 function cleanHTML(){

    table.innerHTML = '';
 }

 function deleteRow (e) {

    
    if(e.target.classList.contains('borrar')) {

      const arrayId = e.target.getAttribute('data-id');
 
      console.log(e.target.getAttribute('data-id'));
 
      newData = newData.filter(newArray => newArray.id != arrayId);
 
      console.log(newData);

        sincronizar();
 
      addRowInMainTable();    
 
   }  

  
 function findArray(id)
 {
    return getArrays().find(arrayObject => arrayObject.id === id);
 }

 function deleteArray(id)
 {

    let arrays = getArrays();

    arrays = arrays.filter(arrayObject => arrayObject.id !== id);
    
    localStorage.setItem('arrays', JSON.stringify(arrays));


 }

 table.addEventListener('click', (e) =>{


    if( e.target.classList.contains('editar') ) {

       const id = e.target.getAttribute('data-id');

       let newData = localStorage.getItem("arrays");

       newData = JSON.parse(newData);

       newData = newData.find(newArray => newArray.id == id);

       const myModal = new bootstrap.Modal(document.getElementById("edit"));

       const {valor_1, valor_2, valor_3, valor_4} = newData;
   
           valorInput_1.value = newData.valor_1;
           valorInput_2.value = newData.valor_2;
           valorInput_3.value = newData.valor_3;
           valorInput_4.value = newData.valor_4;

            newData.id = id;
            newData.valor_1 = valor_1;
            newData.valor_2 = valor_2;
            newData.valor_3 = valor_3;
            newData.valor_4 = valor_4;

           myModal.show();


    }


});


 
 
}