async function fetchSunData(lat, lng, date = "today") {
    try {
      const url = `https://api.sunrisesunset.io/json?lat=${lat}&lng=${lng}&date=${date}&timezone=auto`;
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  }
  
  function displayData(data, elementId) {
    const target = document.getElementById(elementId);
  
    if (!data || !data.results) {
      target.innerHTML = `<p style="color:red;">Error fetching data. Please try again.</p>`;
      return;
    }
  
    const { sunrise, sunset, dawn, dusk, solar_noon, day_length, timezone } = data.results;
    target.innerHTML = `
      <p><span>Sunrise:</span> ${sunrise}</p>
      <p><span>Sunset:</span> ${sunset}</p>
      <p><span>Dawn:</span> ${dawn}</p>
      <p><span>Dusk:</span> ${dusk}</p>
      <p><span>Solar Noon:</span> ${solar_noon}</p>
      <p><span>Day Length:</span> ${day_length}</p>
      <p><span>Timezone:</span> ${timezone}</p>
    `;
  }
  
  async function getCityData() {
    const coords = document.getElementById("citySelect").value.split(",");
    const lat = coords[0].trim();
    const lng = coords[1].trim();
  
    const todayData = await fetchSunData(lat, lng);
    const tomorrowData = await fetchSunData(lat, lng, "tomorrow");
  
    displayData(todayData, "today");
    displayData(tomorrowData, "tomorrow");
  }
  
  function getLocationData() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
  
        const todayData = await fetchSunData(lat, lng);
        const tomorrowData = await fetchSunData(lat, lng, "tomorrow");
  
        displayData(todayData, "today");
        displayData(tomorrowData, "tomorrow");
      }, () => {
        alert("Location access denied.");
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }
  