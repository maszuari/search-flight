export const getFlightsByNameStops = (name, stops) =>{

    let url = `https://nmflightapi.azurewebsites.net/api/flight/?name=${name}&stops=${stops}`

    return fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`)
        }
        return response.json()
    })
    .then(data => {
        //Find out if the data needs to be filtered locally.
        const isLocalFiltering = JSON.parse(localStorage.getItem('isLocalFiltering'));
       
        if(isLocalFiltering) {
            let newData = null;
            if (name && stops) {
                // find by name and stops
                newData = findByNameAndStops(data, name, stops); 
            }else if (name && !stops) {
                // find by name only
                newData = findByNameOnly(data, name);
            }else if (!name && stops){
                // find by stops only
                newData = findByStopsOnly(data, stops);
            }
            console.log('Local Filtering')
            return newData;
        }else{
            console.log('Remote Filtering')
            return data;
        } 
        
        
    })
    .catch(error => console.log(error))
}

export const getAllAirlineNames = () =>{
    let url = `https://nmflightapi.azurewebsites.net/api/flight`;
    
    return fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`)
        }
        return response.json()
    })
    .then(data => {
        let newData = [];
        data.forEach(obj => {
            newData.push(obj.AirlineName);
        });
        return newData;
    })
    .catch(error => console.log(error))
}

export const findByNameAndStops = (data, name, stops) => {

    let arr = [];
    data.forEach( obj =>{
        // console.log('Add AirlineName and Stops ', obj.AirlineName, name, stops)
        if (obj.AirlineName.toLowerCase().includes(name) && obj.Stops == stops) {
            arr.push(obj);
        }
    })

    return arr;
}

export const findByNameOnly = (data, name) => {
    let arr = []
    data.forEach( obj =>{
        //console.log('Add AirlineName ', obj.AirlineName, name)
        if (obj.AirlineName.toLowerCase().includes(name)) {
            //console.log('ADD ', obj.AirlineName)
            arr.push(obj)
        }
    })
    return arr;
}

export const findByStopsOnly = (data, stops) => {
    let arr = []
    data.forEach( obj =>{
        // console.log('Add stops ', obj.Stops, stops)
        if (obj.Stops == stops ) {
            arr.push(obj)
        }
    })
    return arr;
}

export const filterBySelectedNames = (data, selectedNames) => {
    let newData = [];
    data.forEach( obj => {
        selectedNames.forEach( name => {
            if (name == obj.AirlineName) {
                newData.push(obj)
            }
        })
    });
    return newData;
}