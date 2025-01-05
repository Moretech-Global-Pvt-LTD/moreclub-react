import React, { useEffect, useState } from 'react'
import RestaurantLayout from '../../../../components/Layout/RestaurantLayout'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../../../..';
import { morefoodURL } from '../../../../config/config';
import { FoodItemSkeleton } from '../../../../components/Skeleton/SmallCardSkeleton';
import MenuCard from '../../../../components/Moreclub/Resturant/Menu/MenuCard';
import { Col, Row } from 'react-bootstrap';
import Filter from '../../../../components/Moreclub/Resturant/Menu/UpdateMenus/MenuFilter/Filter';
import { fetchCuisines, fetchMenus } from '../../../../redux/api/menuApi';
import MenuList from '../../../../components/Moreclub/Resturant/Menu/MenuList';
import CuisineList from '../../../../components/Moreclub/Resturant/Menu/CuisineList';
import { morefoodAuthenticatedAxios } from '../../../../utills/axios/morefoodaxios';

const FoodItemPage = () => {

    const {res_id , slug} = useParams();
    const [cuisine, setCuisine] = useState('');
    const [menu, setMenu] = useState('');
    const [name , setName] = useState('All Food Items');
    const [view, setView] = useState('');

    const dispatch = useDispatch();
  

    useEffect(() => {
     if(res_id){
        dispatch(fetchMenus(res_id)); 
        dispatch(fetchCuisines(res_id));
     }
    }, [res_id, dispatch]);
  


    const { data, isLoading, isError } = useQuery({
      queryKey: [`Restaurant All Menu ${res_id}`, menu, cuisine],
      queryFn: async () => {
        const response = await morefoodAuthenticatedAxios.get(
          `moreclub/user/all/food/items/${res_id}/`,
          {
            params: {
              menu_id: menu || undefined,
              cuisine_id: cuisine || undefined,
            },
          }
        );
        const data = await response.data.data;
        return data;
      },
      staleTime: 300000,
    });

 

  const handleFilterChange = (filter) => {
    if (filter.filterType === "menu") {
      setMenu(filter.value);
      setCuisine('');
      setName(`${filter.name} Items`);
    } else if (filter.filterType === "cuisine") {
      setMenu('');
      setCuisine(filter.value);
      setName(`${filter.name} Items`);
    }
  };


  const handleViewChange = (views) => {
    if (views.view === "menu") {
      setView( views.showMenus ? "menu" : "");
      setCuisine('');
      setName(views.showMenus ? "Menus" : "All Food Items");
    } else if (views.view === "cuisine") {
      setView( views.showMenus ? "cuisine" : "");
      setMenu('');
      setCuisine("");
      setName(views.showMenus ? "Cuisines" : "All Food Items");
    }
  };

  return (
    <RestaurantLayout>
      <Filter onFilterChange={handleFilterChange} onViewChange={handleViewChange}/>
      <h2 className='text-dynamic-white w-100 text-start my-4 border-bottom border-3 border-secondary '> {name}</h2>
      

      {isLoading && (
      <div >
        <FoodItemSkeleton/>
      </div>
    )
  }

  {isError && (
     <div className="text-dynamic-white">Error: retriving</div>
  )}
  

    {view === "menu" && (
      <MenuList/>
    )}

    {view === "cuisine" && (
      <CuisineList/>
    )}

    {view === "" && (
      <>
      
      {data && data.length > 0 &&   
        <Row
          xs={1}
          sm={1}
          md={1}
          lg={2}
          xl={2}
          xxl={3}
          className="gx-3 gy-3 mb-4"
        >
          {data.map((item) => (
            <Col className="d-flex flex-column" key={item.id}>
              
              <MenuCard
                key={item.id}
                data={item}
                menu={menu}
                cuisine={cuisine}
                id={item.id}
                slug={slug}
              />
            </Col>
          ))}
        </Row>
        }
        
        {data && data.length === 0 && (
          <p className="normal-case text-center">
            Add some food items in your Menu
          </p>
        )}
      </>
    )}
    </RestaurantLayout>
  )
}

export default FoodItemPage
