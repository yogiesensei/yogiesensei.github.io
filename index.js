const getData = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&appid=11eb364f83d1702bd1d4664cd94ea212`
      );
      const data = await res.json();
      console.log(data);
      document.getElementById("city").append(`${data.name}`);
      document
        .getElementById("weather")
        .append(`${data.weather[0].description}`);
    });
  }
};

getData();
