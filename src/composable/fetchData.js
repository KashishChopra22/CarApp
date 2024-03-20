
import {ref} from 'vue';
import axios from 'axios';

// Create a composable js function so that we can call this function globally to get the api data
export default function CarList()
{
const carMakeList= ref([]);
const carYearList =ref([]);
const fetchData = async (apiUrl) => {
    try {
      const response = await axios.get(apiUrl);
      carMakeList.value = response.data.data;
      carYearList.value= response.data;
    } 
    catch (error) {
      console.error(error);
    }
}
return {fetchData, carMakeList, carYearList}
}
