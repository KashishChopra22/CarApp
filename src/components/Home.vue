
<script setup>
import {ref, onMounted} from 'vue';
import CarList from '../composable/fetchData.js';
import {useRouter}  from 'vue-router';
const {fetchData,carMakeList, carYearList} = CarList();

// create ref variables to handle the state
const carMakeNew= ref([]);
const carModelNew= ref([]);
const carYearNew= ref([]);
const searchedCar= ref([]);
const carYear= ref("");
const carMakeId= ref("");
const carModelName= ref("");
const router = useRouter();

// Get the url endpoint from env file
const apiBaseUrl= import.meta.env.VITE_API_BASEURL;

console.log("apiBaseUrl", apiBaseUrl)
// Create a CarMake function to get the list of car names
async function CarMake() {
  await fetchData(`${apiBaseUrl}/makes`);
    carMakeNew.value = carMakeList.value;
}

// Create a CarModel function to get the list of model number(model names are hidden)
async function CarModel() {
await fetchData(`${apiBaseUrl}/models?page=1&limit=1200&sort=id&direction=asc&verbose=yes`);
    carModelNew.value = carMakeList.value
}

// Create a CarYear function to get the list of car year
async function CarYear() {
await fetchData(`${apiBaseUrl}/years`);
    carYearNew.value = carYearList.value
}

// To get the value of particular year and store it in carYear state
const handleYearChange =(e)=>{
    carYear.value = e.target.value;
}

// To get the particular carId onChange and also change the modelId according to car name
const handleMakeChange = async (e)=>{
    carMakeId.value = e.target.value;
    await fetchData(`${apiBaseUrl}/models?page=1&limit=1200&sort=id&direction=asc&verbose=yes&make_id=${carMakeId.value}`);
    carModelNew.value = carMakeList.value

}

// To get the particular modelId and store it in carModelName state
const handleModelChange =(e)=>{
    carModelName.value = e.target.value;
}
async function CarSearchedData() {
    const url = `${apiBaseUrl}/models?page=1&limit=10&sort=id&direction=asc&verbose=yes&year=${carYear.value}&make_id=${carMakeId.value}`;
    await fetchData(url);
    searchedCar.value = carMakeList.value
}
// Move the page to AboutCarDetail named component as mentioned in routes(index.js) file along with the id and name params.
async function handleMoveCar(id, carname) {
    router.push({ 
        name: 'AboutCarDetail',
        params: {name: carname ,id: id },   
    });
}

// the function will call when the component mount or load,
onMounted(() => {
    CarMake();
    CarModel();
    CarYear();
});
</script>
<template>

    <div class="bg-black">
    <p class="font-bold text-center text-white text-[31px] font-serif "> Search Cars</p>

    <div class="flex mt-4 bg-black w-[100%] grid grid-cols-1 md:grid-cols-4 px-4 pb-6">
        
    <!-- Car Make List -->
    <div class="grid-cols-1 mt-2">
    <select class="mx-6 border rounded-md px-4 w-[85%] p-[2%]" @change="handleMakeChange($event)">
    <option hidden>Select Make</option>
    <option v-for="m in carMakeNew" :value="m.id">{{ m.name }}</option>
    </select>
    </div>

    <!-- Car Model List -->
    <div class="grid-cols-1 mt-2">
    <select class="mx-6 border rounded-md px-4 w-[85%] p-[2%]"  @change="handleModelChange($event)" >
    <option hidden>Select Model</option>
    <option v-for="m in carModelNew" :value="m.id">{{ m.id }}</option>
    </select>
    </div>

    <!-- Car Year List -->
    <div class="grid-cols-1 mt-2">
    <select class="mx-6 border rounded-md px-4 w-[85%] p-[2%]" @change="handleYearChange($event)">
    <option hidden>Select Year</option>
    <option v-for="m in carYearNew" :value="m">{{ m }}</option>
    </select>
    </div>

    <!-- Search Button to search the car based on make, and year (I didn't get the model name from api , it was hidden that's why i searched it only from make and year )  -->
    <div class="grid-cols-1 ">
    <button type="button" class="bg-[#dc0000] text-white px-2 py-2 rounded-md mt-2 w-[80%] mx-8" @click="CarSearchedData">Search Car</button>  
    </div>

    </div>
</div>

<!-- Searched Cars appears here  -->
<div v-if="searchedCar.length > 0" class="rounded-t-xl p-10 bg-white mt-5">

<div class="w-[100%] flex justify-center mt-2"  v-for="m in searchedCar">
<div class=" md:w-[100%] lg:w-[80%] bg-white shadow-lg rounded-md ">
<div class="grid grid-cols-1 md:grid-cols-8 lg:grid-cols-6">

    <div class="grid md:col-span-3 lg:col-span-2 bg-white">
    <img src="https://cdn.pixabay.com/photo/2016/04/01/12/16/car-1300629_640.png" alt="Network Error" class="md:h-[25vh] rounded-md relative w-[100%] lg:h-[262px]"/>
    <p class="absolute text-white font-bold lg:mt-[210px] mx-2">Model {{ m.id }}</p>
    </div>

<div class="grid md:col-span-4 py-6 lg:col-span-4">
<div class="mx-4">
    <p class="font-bold text-[25px] " style="font-family: 'Poppins', 'sans-serif' ">{{m.make.name}}</p>

        <div class="flex mt-2">
        <div class="flex lg:w-[15%]">

        <img src="../../src/assets/carIcon.svg" />

        <p class="text-gray-600 text-[11px] font-400 mx-1">Car Number {{m.make.id}}</p>
        </div>

        <div class="flex ">

        <img src="../../src/assets/seatIcon.svg" />

        <p class="text-gray-600 text-[11px] font-400 mx-1">5 seats</p>
        </div>
        </div>

        <div class="flex mt-1">
        <div class="flex lg:w-[15%]">

        <img src="../../src/assets/carIcon.svg" />
        <p class="text-gray-600 text-[11px] font-400 mx-1">{{m.make.name}}</p>
        </div>

        <div class="flex ">

        <img src="../../src/assets/seatIcon.svg" />

        <p class="text-gray-600 text-[11px] font-400 mx-1">5 seats</p>
        </div>
        </div>


        <div class="text-gray-600 text-[14px] leading-[normal] mt-4" style="font-family: 'Poppins', 'sans-serif' ">
        <p>Description: {{m.name}}</p>
        </div>

        <!-- To see the details of the particular car -->
        <div class="mt-3">
        <button type="button" class="bg-[#dc0000] px-3 py-1 rounded-md text-white hover:shadow-lg" @click="handleMoveCar(m.id, m.make.name)">View Details</button>
        </div>
</div>


</div>
</div>
</div>
</div>
</div>

<!-- Handle the else part if there is no matched searched -->
<div v-else>
<p class="text-black font-bold text-[25px] text-center">No Cars found</p>
</div>


</template>

<style scoped>
select:focus {
        outline: none !important;
    }
</style>