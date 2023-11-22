
function showChart(){
    let labels = [];
    let datas = [];
    PositiveAmounts = [];
    NegativeAmounts = [];

  axios.get(`${serverURL}/items/userID/eq/${loggedUser.ID}`).then((res) => {
    res.data.sort((a,b) => a.date.localeCompare(b.date));
    res.data.forEach((item) => {
      labels.push(item.date.toString().split("T")[0]);
      let amount;
      
      if (item.type == 1)
      {
        PositiveAmounts.push(item.amount);
        NegativeAmounts.push(0);
      }
      else
      {
        NegativeAmounts.push(item.amount * -1);
        PositiveAmounts.push(0);
      }

      datas.push(amount);
    });
  });
  console.log(PositiveAmounts, NegativeAmounts)

  setTimeout(() => {
    const ctx = document.getElementById("myChart");

    new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Bevételek",
            data: PositiveAmounts,
            borderWidth: 3,
            backgroundColor: "Green",
            borderColor: "Green",
          },
          {
            label: "Kiadások",
            data: NegativeAmounts,
            borderWidth: 3,
            backgroundColor: "Red",
            borderColor: "Red",
          }
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: false,
          },
          x: {
            stacked: true,
          }
        },
      },
    });
  }, 500);
}
