document.addEventListener('DOMContentLoaded', function()
{
  const submitButton = document.querySelector("#check");

  submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    const userName1 = document.querySelector("#user1").value;
    const userName2 = document.querySelector("#user2").value;

    if (userName1 && userName2) {
      Promise.all([fetchUser(userName1), fetchUser(userName2)])
      .then((responses) => {
        // Determine the winner
        const mostPopular = findMostPopularUser(responses);

        // Announce the winner
        const winner = document.querySelector("#winner");
        const announcement = document.createElement("h2");
        announcement.textContent = `The most popular user is ${mostPopular.login} (${mostPopular.name}) with ${mostPopular.followers} followers!`;
        announcement.classList.add("announcement");
        winner.appendChild(announcement);

        // Make the results list
        const results = document.querySelector("#results");
        const list = document.createElement("ol");
        let items = "";

        // Sort the users
        const sortedWinners = sortWinners(responses);

        for (const user of sortedWinners) {
          items += `<li>${user.login} with ${user.followers} followers (started: ${user.startingOrder})</li>`;
        }
        list.innerHTML = items;

        results.appendChild(list);

      })
      .catch((err) => {
        console.log("There was an issue.");
      });
    }
  });

  const fetchUser = (userName) => {
    const url = "https://api.github.com/users/" + userName;

    return fetch(url)
      .then((res) => res.json())
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.log("Error occurred!", error);
        return null;
      });
  };

  const findMostPopularUser = (userData) => {
    const mostPopular = { login: null, name: null, followers: -1 };
    userData.forEach((user) => {
      if (user.followers > mostPopular.followers) {
        mostPopular.login = user.login;
        mostPopular.followers = user.followers;
        mostPopular.name = user.name;
      }
    });

    return mostPopular;
  };

  const sortWinners = (userData) => {
    const results = userData.map((user, index) => ({ startingOrder: index + 1, ...user }));
    results.sort((a, b) => b.followers - a.followers);  // Sort descending

    return results;
  }

});