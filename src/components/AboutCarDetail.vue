<script setup>
import {ref, onMounted } from 'vue';
import CarList from '../composable/fetchData.js';
const {fetchData, carYearList} = CarList();
import {useRoute}  from 'vue-router';
const route = useRoute();
const specificCar = ref({})

// Get the url endpoint from env file
const apiBaseUrl= import.meta.env.VITE_API_BASEURL;

// Use the route to get the id 
const id = route.params.id;

// Create the CarSpecific function to get the Specific Car Details based on the car ID.
async function CarSpecific() {
    await fetchData(`${apiBaseUrl}/trims/${id}`);
    specificCar.value = carYearList.value
}

// call the CarSpecific function when component will get mount i.e. load
onMounted(() => {
   CarSpecific();
});
</script>
<template>

    <!-- the whole body -->
        <div class="w-[100%] flex justify-center">
        <div class="lg:w-[80%] xl:w-[70%] bg-white mx-4">
        <div class="mt-4">
        <p class="font-bold text-[26px] px-2 " style="font-family: ui-rounded"> {{ route.params.name }}</p>
        </div>
        <div class="bg-white grid grid-cols-1 md:grid-cols-5">

        <!-- Car Image here (static as I didn't the image from api) -->
        <div class="mt-3 col-span-3 flex justify-center ">
        <img src="https://cdn.pixabay.com/photo/2016/04/01/12/16/car-1300629_640.png" class="h-[30vh] md:h-[60vh] cursor-crosshair"/>
        </div>

        <div class="mt-3 col-span-2">
        <div class="bg-[#dc0000cc] md:w-[75%] md:mx-[10%] lg:w-[100%]">
        <div class="text-center text-[#fff] text-[25px]">
        <p>{{ specificCar.make_model?.name }}</p>
        <p class="text-[20px]">Model {{ specificCar.id }}</p>
        </div>
        </div>

        <!-- Car Body Details -->
        <div class="mt-9 bg-white md:w-[75%] md:mx-[10%] shadow-lg lg:w-[100%] ">
        <div class="flex font-bold text-[#dc0000cc]">
        <img src="../assets/icons8-detail-50.png" class="w-[25px] h-[20px]"/>
        <p class="mx-2"> Body Details:</p>
        </div>

        <div class="grid grid-cols-2 mt-1">
        <div class="bg-[#f7f7f7]">Length:</div>
        <div class="bg-[#fcfcfc]">{{ specificCar.make_model_trim_body?.length }}</div>
        </div>
        <div class="grid grid-cols-2 mt-1">
        <div class="bg-[#f7f7f7]">Body Type: </div>
        <div class="bg-[#fcfcfc]">{{ specificCar.make_model_trim_body?.type }}</div>
        </div>
        <div class="grid grid-cols-2 mt-1">
        <div class="bg-[#f7f7f7]">Wheel Base</div>
        <div class="bg-[#fcfcfc]">{{ specificCar.make_model_trim_body?.wheel_base }}</div>
        </div>
        <div class="grid grid-cols-2  mt-1">
        <div class="bg-[#f7f7f7]">Max Cargo Capacity:</div>
        <div class="bg-[#fcfcfc]"> {{ specificCar.make_model_trim_body?.max_cargo_capacity }}</div>
        </div>

        <div class="grid grid-cols-2 mt-1">
        <div class="bg-[#f7f7f7]">Gross Weight:</div>
        <div class="bg-[#fcfcfc]">{{ specificCar.make_model_trim_body?.gross_weight }}</div>
        </div>
        <div class="grid grid-cols-2 mt-1">
        <div class="bg-[#f7f7f7]">Seats:</div>
        <div class="bg-[#fcfcfc]">{{ specificCar.make_model_trim_body?.seats }}</div>
        </div>
        <div class="grid grid-cols-2 mt-1">
        <div class="bg-[#f7f7f7]">Height:</div>
        <div class="bg-[#fcfcfc]">{{ specificCar.make_model_trim_body?.height }}</div>
        </div>
        <div class="grid grid-cols-2  mt-1">
        <div class="bg-[#f7f7f7]">Doors:</div>
        <div class="bg-[#fcfcfc]">{{ specificCar.make_model_trim_body?.doors }}</div>
        </div>

        </div>

        <!-- Engine Details -->
        <div class="bg-white md:w-[75%] md:mx-[10%] mt-8 lg:w-[100%]">
        <div class="font-bold text-[#dc0000cc] flex">
        <img src="../assets/icons8-car-engine-64.png" class="w-[25px]"/>

        <p class="mx-2"> Engine Details:</p>
        </div>
        <div class="grid grid-cols-2 mt-1">

        <div class="bg-[#f7f7f7]">horsepower_hp: </div>
        <div class="bg-[#fcfcfc]">{{ specificCar.make_model_trim_body?.gross_weight }}</div>

        </div>

        <div class="grid grid-cols-2 mt-1">

        <div class="bg-[#f7f7f7]">Transmission: </div>
        <div class="bg-[#fcfcfc]">{{ specificCar.make_model_trim_engine?.transmission }}</div>
        </div>

        <div class="grid grid-cols-2 mt-1">
        <div class="bg-[#f7f7f7]">Fuel Type: </div>
        <div class="bg-[#fcfcfc]">{{ specificCar.make_model_trim_engine?.fuel_type }}</div>
        </div>

        <div class="grid grid-cols-2 mt-1">
        <div class="bg-[#f7f7f7]">Engine Type: </div>
        <div class="bg-[#fcfcfc]">{{ specificCar.make_model_trim_engine?.engine_type }}</div>
        </div>

        <div class="grid grid-cols-2 mt-1">
        <div class="bg-[#f7f7f7]">Drive Type: </div>
        <div class="bg-[#fcfcfc]"> {{ specificCar.make_model_trim_engine?.drive_type }}</div>
        </div>
        <div class="grid grid-cols-2 mt-1">
        <div class="bg-[#f7f7f7]">Cylinders: </div>
        <div class="bg-[#fcfcfc]">{{ specificCar.make_model_trim_engine?.cylinders }}</div>
        </div>
        </div>
        </div>
        </div>

        <!-- Features and Mileage Details -->
        <div class="bg-white text-[12px] md:mt-[0%] lg:w-[72%] lg:mt-[3%]">
        <div class="flex text-lg text-[#dc0000cc] font-bold">
        <img src="../assets/icons8-feature-48.png" class="w-[25px]"/>
        <p class="mx-2"> Features and Mileage Details: </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 mt-2 text-sm">
        <div>
        <div class="flex">
        <i class="fa-solid fa-check text-red-600 flex items-center"></i>
        <p class="mx-2">Fuel Consumption: {{ specificCar.make_model_trim_mileage?.fuel_tank_capacity }} </p>
        </div>
        <div class="flex">
        <i class="fa-solid fa-check text-red-600 flex items-center"></i>
        <p class="mx-2">Battery Capacity: {{ specificCar.make_model_trim_mileage?.battery_capacity_electric }} </p>
        </div>
        <div class="flex">
        <i class="fa-solid fa-check text-red-600 flex items-center"></i>
        <p class="mx-2">epa_highway_mpg: {{ specificCar.make_model_trim_mileage?.epa_highway_mpg }}  </p>
        </div>
        <div class="flex">
        <i class="fa-solid fa-check text-red-600 flex items-center"></i>
        <p class="mx-2">range_city: {{ specificCar.make_model_trim_mileage?.range_city }}</p>
        </div>
        <div class="flex">
        <i class="fa-solid fa-check text-red-600 flex items-center"></i>
        <p class="mx-2">range_highway: {{ specificCar.make_model_trim_mileage?.range_highway }}</p>
        </div>
        </div>

        <div>
        <div class="flex">
        <i class="fa-solid fa-check text-red-600 flex items-center"></i>
        <p class="mx-2">Interior Color: {{ specificCar?.make_model_trim_interior_colors }}</p>
        </div>
        <div class="flex">
        <i class="fa-solid fa-check text-red-600 flex items-center"></i>
        <p class="mx-2">Exterior Color: {{ specificCar?.make_model_trim_exterior_colors }} </p>
        </div>
        <div class="flex">
        <i class="fa-solid fa-check text-red-600 flex items-center"></i>
        <p class="mx-2">Launching Year:{{ specificCar.year }} </p>
        </div>
        <div class="flex">
        <i class="fa-solid fa-check text-red-600 flex items-center"></i>
        <p class="mx-2">Last Modified:  {{ specificCar.modified }}</p>
        </div>
        <div class="flex">
        <i class="fa-solid fa-check text-red-600 flex items-center"></i>
        <p class="mx-2">range_highway:  {{ specificCar.make_model_trim_mileage?.range_highway }}</p>
        </div>
        </div>
        </div>
        </div>


        <!-- Vehicle Overview -->
        <div class="bg-white text-[12px] mt-6">

        <div class="flex">
        <img src="../assets/icons8-hybrid-50.png" class="w-[25px]"/>
        <p class="text-lg text-[#dc0000cc] mx-2 font-bold">Vehicle Overview: </p>
        </div>
        <p class="text-sm">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quasi, ipsum vel dicta obcaecati porro delectus amet! Illo esse alias quod.In publishing and graphic design</p>
        </div>
        </div>
        </div>
  </template>
  
  