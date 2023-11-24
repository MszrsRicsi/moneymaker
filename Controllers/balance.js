function showBalance(){
    let labels = [];
    let datas = [];

  axios.get(`${serverURL}/items/userID/eq/${loggedUser.ID}`).then((res) => {
    res.data.sort((a,b) => a.date.localeCompare(b.date));
    res.data.forEach((item) => {
      let amount = 0;
      if (item.type == 1)
      {
        amount = item.amount;
      }
      else
      {
        amount = item.amount * -1;
      }

      let contains = labels.find(element => element == item.date.toString().split('T')[0])
      if (contains != null)
      {
        datas[labels.indexOf(item.date.toString().split('T')[0])] += amount;
      }
      else
      {
        labels.push(item.date.toString().split("T")[0]);
        datas.push(amount);
      }
    });
  });

  setTimeout(() => {
    const ctx = document.getElementById("myBalanceCanvas");

    new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Egyenleg:",
            data: datas,
            borderWidth: 3,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: false,
          },
        },
      },
    });
  }, 500);
}

showBalance();