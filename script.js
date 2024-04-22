document.addEventListener("DOMContentLoaded", () => {
  const apiUrl = "https://restcountries.com/v3.1/all";

  // Fetch country data from the API
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      // Random Country Generator Button
      const changeCountryBtn = document.getElementById("btn");
      changeCountryBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const randomCountry = getRandomCountry(data);
        displayCountryInfo(randomCountry);
      });

      // Display top countries by population and size
      displayTopCountries(data, "population", "topCountries");
      displayTopCountries(data, "area", "largestSize");
    })
    .catch((error) => {
      console.error("Error fetching country data:", error);
    });

  // Function to get a random country from the data array
  function getRandomCountry(data) {
    const randomIndex = Math.floor(Math.random() * data.length);
    return data[randomIndex];
  }

  // Function to display country information
  function displayCountryInfo(country) {
    const {
      name: { common: countryName },
      flags: { png: countryFlag },
      capital,
      population,
      languages,
      currencies,
      area,
      region,
    } = country;

    const countryNameElement = document.getElementById("countryName");
    const countryFlagContainer = document.getElementById("countryFlagContainer");
    const countryCapitalElement = document.getElementById("countryCapital");
    const countryPopulationElement = document.getElementById("countryPopulation");
    const countryLanguageElement = document.getElementById("countryLanguage");
    const countryCurrencyElement = document.getElementById("countryCurrency");
    const countrySizeElement = document.getElementById("countrySize");
    const countryRegionElement = document.getElementById("countryRegion");

    // Update DOM elements with country information
    countryNameElement.textContent = countryName;
    countryCapitalElement.textContent = `Capital: ${capital[0]}`;
    countryPopulationElement.textContent = `Population: ${population.toLocaleString()}`;
    countryLanguageElement.textContent = `Language: ${Object.values(languages).join(", ")}`;
    countryCurrencyElement.textContent = `Currency: ${currencies ? Object.values(currencies)[0].name : "Not available"}`;
    countrySizeElement.textContent = `Country Size: ${area ? area.toLocaleString() : "Not available"} square kilometers`;
    countryRegionElement.textContent = `Region: ${region}`;

    // Display country flag
    countryFlagContainer.innerHTML = `
        <img src="${countryFlag}" alt="Country Flag" style="
          width: 280px;
          height: 220px;
          object-fit: cover;
          border-radius: 10px;
          opacity: 0;
          transition: opacity 1s ease-in-out;
          box-shadow: 0px 0px 10px 5px rgba(0,0,0,0.3);
        ">
      `;

    // Fade in country flag
    setTimeout(() => {
      const img = countryFlagContainer.querySelector("img");
      img.style.opacity = 1;
    }, 50);

    // Show the country details container
    const countryDiv = document.querySelector(".random-country");
    countryDiv.style.display = "block";
  }

  // Function to display top countries based on a property (e.g., population or area)
  function displayTopCountries(data, property, containerId) {
    const container = document.getElementById(containerId);

    // Filter out Antarctica
    const filteredData = data.filter((country) => country.name.common !== "Antarctica");

    // Sort countries by the specified property in descending order
    filteredData.sort((a, b) => b[property] - a[property]);

    // Display top 5 countries by the specified property
    filteredData.slice(0, 5).forEach((country) => {
      const countryName = country.name.common;

      // Create a clickable link to display country info
      const link = document.createElement("a");
      link.textContent = `${countryName}`;
      link.href = "#";
      link.addEventListener("click", (e) => {
        e.preventDefault();
        displayCountryInfo(country);
      });

      // Append link to the container
      const div = document.createElement("div");
      div.appendChild(link);
      container.appendChild(div);
    });
  }
});
