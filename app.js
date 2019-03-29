var config = {
  apiKey: "AIzaSyBYvkSFqOpNJPtUWqGfqHUZaXtc5bcgYq4",
  authDomain: "printany-c3d1e.firebaseapp.com",
  databaseURL: "https://printany-c3d1e.firebaseio.com",
  projectId: "printany-c3d1e",
  storageBucket: "",
  messagingSenderId: "568548382818"
};
firebase.initializeApp(config);

document.addEventListener("DOMContentLoaded", () => {
  console.log("App loaded");

  const searchbar = document.getElementById("searchbar");
  const mapview = document.getElementById("mapview");

  var results = [];

  for (var i = 0; i < 50; i++) {
    $.get(
      "http://faker.hook.io/?property=address.streetAddress&locale=en_US",
      (data, status) => {
        results.push([
          `Result ${i + 1}`,
          data.replace(`"`, "").replace(`"`, "")
        ]);
      }
    );
  }

  const updateResult = query => {
    let resultList = document.querySelector("#results");
    resultList.innerHTML = "";

    results.map(record => {
      query.split(" ").map(word => {
        if (record[1].toLowerCase().indexOf(word.toLowerCase()) != -1) {
          resultList.innerHTML += `<div class="result"><div class="result-desc"><p class="result-title">${
            record[1]
          }</p><p class="result-location">${
            record[0]
          }</p></div><div class="result-options"><i class="fas fa-ellipsis-v"></i></div></div>`;
        }
      });
    });
  };

  searchbar.addEventListener("input", e => {
    updateResult(e.target.value);
  });
});
