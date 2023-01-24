let inputs = document.querySelectorAll('input');

let error  = {
    "ime_prezime" : [],
    "korisnicko_ime" : [],
    "email" : [],
    "lozinka" : [],
    "ponovi_lozinku" : []
}


inputs.forEach(input =>{
    input.addEventListener('change', e =>{
        let currentInput = e.target;
        let inputValue = currentInput.value;
        let inputName = currentInput.getAttribute('name');
        
        if(!(inputValue.length >4)){
            error[inputName] = ['Polje mora imati vise od 5 karaktera']
        }else{
            error[inputName] = []
            switch(inputName){
                case 'ime_prezime':
                    let validation = inputValue.split(' ');
                    if(validation.length<2){
                        error[inputName] = ['polje mora da sadrzi ime i prezime']
                    }else if(!(/^[a-zA-Z ]/g.test(inputValue) && /[a-zA-Z ]$/g.test(inputValue))){
                        error[inputName] = ['polje moze da sadrzi samo slova']
                    }
                    break;
                case 'email':
                    if(!validateMail(inputValue)){
                        error[inputName] = ['email nije validan']
                    }
                    break;
                case "ponovi_lozinku":
                    let lozinka = document.querySelector('input[name="lozinka"]').value;

                    if(lozinka !== inputValue){
                        error[inputName] = ['lozinke nisu iste']
                    }
            }
            
        }

        ispisiPolja();
    })
})

const validateMail = value =>{
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)
}
const ispisiPolja = () =>{

    for(let elem of document.querySelectorAll('ul')){
        elem.remove();
    }
    for(key  in error){
        let div = document.querySelector(`input[name="${key}"]`).parentElement;
        let errorElement = document.createElement('ul');

        error[key].forEach(e =>{
            let li = document.createElement('li');
            li.innerText = e;
            errorElement.appendChild(li)
        })
        div.appendChild(errorElement)
    }   
}