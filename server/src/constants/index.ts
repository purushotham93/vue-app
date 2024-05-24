const COVID_APIS = {
    LATEST_STATS: "https://api.rootnet.in/covid19-in/stats/latest",
    HOSPITALS: "https://api.rootnet.in/covid19-in/hospitals/beds",
  };
const SERVER_STATUS = {
  OK: 200,
  INTERNAL_ERROR: 500
}

const ERROR_MESSAGES = {
  INTERNAL_ERROR: 'Internal Server Error'
}
  export { COVID_APIS, SERVER_STATUS, ERROR_MESSAGES };
  