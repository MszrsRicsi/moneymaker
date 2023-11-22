function getAllAmount(){
    let tbody = document.querySelector('tbody');
    let sumAmount = document.querySelector('#sumAmount');

    axios.get(`${serverURL}/items/userID/eq/${loggedUser.ID}`).then(res=>{
        let i = 0;
        let sum = 0;

        res.data.sort((a,b) => a.date.localeCompare(b.date));
        res.data.forEach(item => {
            let tr = document.createElement('tr');
            let td1 = document.createElement('td');
            let td2 = document.createElement('td');
            let td3 = document.createElement('td');

            i++;

            td1.innerHTML = i + '.';

            td2.innerHTML = item.date.split('T')[0];

            let amount = 0;

            if (item.type == 1)
            {
              amount = item.amount;
            }
            else
            {
              amount = item.amount * -1;
            }

            sum += amount;
            td3.innerHTML = amount;
            td3.classList.add('text-end');

            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tbody.appendChild(tr);
        });

        sumAmount.innerHTML = sum;
    })
}

function renderData(){
    setTimeout(()=>{getAllAmount();}, 200);
}