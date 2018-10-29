import dateFormat from 'dateformat';
import config from '../config';
export const getAllUnit=()=> {
  

    var object = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + sessionStorage.getItem('jwt') + ''
      }
    }
    
      var api_url = `${config.API_URL}`;
      fetch(api_url + '/vendor/getUnits', object)
        .then(res => res.json())
        .then(json => {

          var pushunits=[];

          json.map(function(itemUnit,index) {
            pushunits.push({value: itemUnit.name, label: itemUnit.name});
            
          });
           console.log("there are the listing for this",pushunits)
          return pushunits;
        

        }).catch(error => {
          
        });
    
  }
  export const PAGELIMIT = 10;


