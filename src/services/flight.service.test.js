import {findByNameOnly, findByStopsOnly,findByNameAndStops} from './flight.service'

 const fakeData = [
        {
          AirlineLogoAddress: "http://nmflightapi.azurewebsites.net/Images/AirlineLogo/CZ.gif",
          AirlineName: "China Southern Airlines",
          InboundFlightsDuration: "24:10",
          ItineraryId: "",
          OutboundFlightsDuration: "26:20",
          Stops: 3,
          TotalAmount: 2903.84
        },
        {
          AirlineLogoAddress: "http://nmflightapi.azurewebsites.net/Images/AirlineLogo/EK.gif",
          AirlineName: "Emirates Airline",
          InboundFlightsDuration: "42:55",
          ItineraryId: "",
          OutboundFlightsDuration: "25:40",
          Stops: 3,
          TotalAmount: 2954.14
        },
        {
          AirlineLogoAddress: "http://nmflightapi.azurewebsites.net/Images/AirlineLogo/EK.gif",
          AirlineName: "Emirates Airline",
          InboundFlightsDuration: "42:55",
          ItineraryId: "",
          OutboundFlightsDuration: "27:40",
          Stops: 2,
          TotalAmount: 2954.14
        },
        {
          AirlineLogoAddress: "http://nmflightapi.azurewebsites.net/Images/AirlineLogo/MultiAirline.gif",
          AirlineName: "Multi",
          InboundFlightsDuration: "34:00",
          ItineraryId: "",
          OutboundFlightsDuration: "26:20",
          Stops: 4,
          TotalAmount: 2979.06
        },
        {
          AirlineLogoAddress: "http://nmflightapi.azurewebsites.net/Images/AirlineLogo/EK.gif",
          AirlineName: "Emirates Airline",
          InboundFlightsDuration: "23:25",
          ItineraryId: "",
          OutboundFlightsDuration: "25:40",
          Stops: 2,
          TotalAmount: 3006.14
        },
        {
          AirlineLogoAddress: "http://nmflightapi.azurewebsites.net/Images/AirlineLogo/EK.gif",
          AirlineName: "Emirates Airline",
          InboundFlightsDuration: "30:00",
          ItineraryId: "",
          OutboundFlightsDuration: "25:40",
          Stops: 2,
          TotalAmount: 3006.14
        },
        {
          AirlineLogoAddress: "http://nmflightapi.azurewebsites.net/Images/AirlineLogo/EK.gif",
          AirlineName: "Emirates Airline",
          InboundFlightsDuration: "23:25",
          ItineraryId: "",
          OutboundFlightsDuration: "27:40",
          Stops: 2,
          TotalAmount: 3006.14
        },
        {
          AirlineLogoAddress: "http://nmflightapi.azurewebsites.net/Images/AirlineLogo/EK.gif",
          AirlineName: "Emirates Airline",
          InboundFlightsDuration: "30:00",
          ItineraryId: "",
          OutboundFlightsDuration: "27:40",
          Stops: 2,
          TotalAmount: 3006.14
        },
        {
          AirlineLogoAddress: "http://nmflightapi.azurewebsites.net/Images/AirlineLogo/EK.gif",
          AirlineName: "Emirates Airline",
          InboundFlightsDuration: "25:30",
          ItineraryId: "",
          OutboundFlightsDuration: "25:40",
          Stops: 2,
          TotalAmount: 3006.14
        },
        {
          AirlineLogoAddress: "http://nmflightapi.azurewebsites.net/Images/AirlineLogo/EK.gif",
          AirlineName: "Emirates Airline",
          InboundFlightsDuration: "25:30",
          ItineraryId: "",
          OutboundFlightsDuration: "25:40",
          Stops: 2,
          TotalAmount: 3006.14
        },
        {
            AirlineLogoAddress: "http://nmflightapi.azurewebsites.net/Images/AirlineLogo/QF.gif",
            AirlineName: "Qantas",
            InboundFlightsDuration: "21:55",
            ItineraryId: "",
            OutboundFlightsDuration: "23:30",
            Stops: 1,
            TotalAmount: 5409.6
        },
        {
            AirlineLogoAddress: "http://nmflightapi.azurewebsites.net/Images/AirlineLogo/QF.gif",
            AirlineName: "Qantas",
            InboundFlightsDuration: "25:10",
            ItineraryId: "",
            OutboundFlightsDuration: "23:30",
            Stops: 2,
            TotalAmount: 5431.98
        },
      ];

      function setupFetchStub(data) {
        return function fetchStub(_url) {
          return new Promise((resolve) => {
            resolve({
              json: () =>
                Promise.resolve(fakeData),
            })
          })
        }
      }
      
test('findNameOnly',() =>{
    let arr = findByNameOnly(fakeData,"Qantas")
    expect(arr.length).toEqual(2);
 })

test('findStopsOnly', () => {
    let arr = findByStopsOnly(fakeData,2)
    expect(arr.length).toEqual(8);
  });

test('findByNameAndStops', () => {
    let arr = findByNameAndStops(fakeData, 'Emirates' ,2)
    expect(arr.length).toEqual(7);
  });