console.log('client side js');

const inputLocation =document.querySelector('form');
const search =document.querySelector('input');

const error =document.querySelector('#error');
const data2 =document.querySelector('#data');

inputLocation.addEventListener('submit', (e) => {
    e.preventDefault();
    fetch(`http://localhost:3000/weather?address=${search.value}`).then((res) => {
        res.json().then(data =>{
            if (data.error){
                error.textContent = data.error;
            }else {
                data2.textContent =  JSON.stringify(data);
            }
        });
    });
});
