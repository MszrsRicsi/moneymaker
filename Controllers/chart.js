
function showChart(){
    let labels = [];
    PositiveAmounts = [];
    NegativeAmounts = [];

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
        if (item.type == 1)
        {
          PositiveAmounts[labels.indexOf(item.date.toString().split('T')[0])] += amount;
          NegativeAmounts.push(0);
        }
        else
        {
          NegativeAmounts[labels.indexOf(item.date.toString().split('T')[0])] += amount;
          PositiveAmounts.push(0);
        }
      }
      else
      {
        labels.push(item.date.toString().split("T")[0]);

        if (item.type == 1)
        {
          PositiveAmounts.push(amount);
          NegativeAmounts.push(0);
        }
        else
        {
          NegativeAmounts.push(amount);
          PositiveAmounts.push(0);
        }
      }
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
