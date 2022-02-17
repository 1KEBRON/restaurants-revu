import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import RestaurantDataService from '../services/restaurant';

const RestaurantsList = (props) => {
      const [restaurants,setRestaurants] = useState([]) 
      const [searchName,setSearchName] = useState('') 
      const [searchZip,setSearchZip] = useState('') 
      const [searchCuisine,setSearchCuisine] = useState('') 
      const [cuisines,setCuisine] = useState(["All cuisines"]) 

      useEffect(()=>{
            retrieveRestaurants();
            retrieveCuisines();
      },[])

      const onChangeSearchName = e => {
            const searchName = e.target.value;
            setSearchName(searchName);
      };

      const onChangeSearchZip = e => {
            const searchZip = e.target.value;
            setSearchZip(searchZip);
      };

      const onChangeSearchCuisine = e => {
            const searchCuisine = e.target.value;
            setSearchCuisine(searchCuisine);
      };

      const retrieveRestaurants = () => {
            RestaurantDataService.getAll()
            .then(response =>{
                  console.log(response.data);
                  setRestaurants(response.data.restaurants);
            })
            .catch(e =>{
                  console.log(e);
            })
      };
      
      const retrieveCuisines = () =>{
            RestaurantDataService.getAllCuisine()
            .then(response => {
                  console.log(response.data);
                  setCuisine(['All cuisines'].concat(response.data))
            })
            .catch (e => {
                  console.log(e);
            })
      }

      const refreshList = () =>{
            retrieveRestaurants();
      };

      const find = (query,by) => {
            RestaurantDataService.find(query,by)
            .then(response => {
                  console.log(response.data);
                  setRestaurants(response.data.restaurants);
            })
            .catch(e => {
                  console.log(e);
            });
      };

      const findByName =  () =>{
            find(searchName, 'name');
      };

      const findByZip = () =>{
            find(searchZip,'zipCode');
      };

      const findByCuisine = () =>{
            if(searchCuisine == 'All cuisines'){
                  refreshList();
            }else{
                  find(searchCuisine,'cuisine')

            }
      }

         return (
                  <div className='row pb-1'>
                    <div className='input-group col-lg-4'>
                     <input
                     type={'text'}
                     className='form-control'
                     placeholder='Search by name'
                     value={searchName}
                     onChange={onChangeSearchName}
                     />
                     <div className='input-group-append'>
                     <button 
                     className='btn btn-outline-secondary'
                     type = 'button'
                     onClick={findByName}
                     >
                     Search
                     </button>
                     </div>
                    </div>
                        <div className='input-group col-lg-4'>
                          <input
                                type={'text'}
                                className='form-control'
                                placeholder='Search by zip code'
                                value={searchZip}
                                onChange={onChangeSearchZip}
                          />
                           <div className='input-group-append'>
                          <button
                            className='btn btn-outline-secondary'
                            type = 'button'
                            onClick={findByZip}
                          >
                          Search
                        </button>
                     </div>
                    </div>
                        <div className='input-group col-lg-4'>

                        <select onChange={onChangeSearchCuisine}>
                              {cuisines.map(cuisine =>{
                                    return(
                                          <option value={cuisine}>{cuisine.substring(0,20)}</option>
                                    )
                              })}
                        </select>
                        <div className='input-group-append'>
                        <button
                         className='btn btn-outline-secondary '
                         type='button'
                         onClick={findByCuisine}
                        >
                              Search
                          </button>
                         </div>
                        </div>
                 
            </div>
      )

}

export default RestaurantsList