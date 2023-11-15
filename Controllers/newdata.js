function setMaxDate(){
    let date = document.querySelector('#date');
    date.max =  new Date().toISOString().split("T")[0];
}

function getToday(){
    setTimeout(()=>{setMaxDate()}, 500);
}

function addData(){

    let date = document.querySelector('#date');
    let amount = document.querySelector('#amount');
    let income = document.querySelector("#type");
    let title = document.querySelector("#title");

    if (date.value == "" || amount.value == 0 || income.selectedIndex == 0){
        showMessage("Nem adtál meg minden adatot!");
    }
    else
    {
        let data = {
            userID: loggedUser.ID,
            date: date.value,
            amount: amount.value,
            type: income.value,
            tag: title.value
        };
        axios.post(`${serverURL}/items`, data).then((res)=>{
            alert('Adatok rögzítve!');
            date.value = null;
            amount.value = 0;
            income.selectedIndex = 0;
        });
    }
}

getToday();