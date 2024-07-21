const cookieNoBarer = "Barer=nonsense";
const cookieInvalidJWT = "Bearer=nonsense";
const cookieNoUserAgent = "Bearer=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub1VzZXJBZ2VudCI6IkZhbkJsYWRlIiwiaWF0IjoxNTE2MjM5MDIyfQ.NVhtxgYYY1NVtxURVM9gHR0kM0ruMrLZXcBOihTCvf0";
const cookieUserAgentIsFanBlade = "Bearer=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyQWdlbnQiOiJGYW5CbGFkZSIsImlhdCI6MTUxNjIzOTAyMn0.-STH79hIw2yFoo4HChIEA2skfxUOQ5hWH6wKWfJrY14";

const url = "http://localhost:3001/apiv0/events";

fetch(url, {
  // method: "POST",
  headers: {
    "user-agent": "FanBlade",
    "cookie": cookieUserAgentIsFanBlade,
    "Content-Type": "application/json",
  },
  // body: JSON.stringify({
  //   userName: "billy",
  //   password: "ahything2983742938742398547",
  //   email: "itisbilly@gmail.com",
  // })
})
  .then((response) => {
    if (!response.ok) {
      console.log("Response NOT OK");
      return response.text();
    } else if (response.ok) {
      console.log("Response OK");
      return response.text();
    }
  })
  .then(data => console.log(data));
