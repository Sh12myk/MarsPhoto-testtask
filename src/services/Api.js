const API_KEY = 'aKkkjJlNbzUlF1pvUhOMhpL2wIbXhrfsTYheoYFe';

class NasaService {
    url ='https://api.nasa.gov/mars-photos/api/v1/';

    getPhotos = async (rover, sol)=> {
        if(!rover.length){
            return
        }
        console.log(this.url + `rovers/${rover}/photos?&sol=${sol}&api_key=`+API_KEY)
       const promise = await fetch(this.url + `rovers/${rover}/photos?&sol=${sol}&api_key=`+API_KEY);
       const data = await promise.json();
       return data.photos;
    }
}

export default NasaService;