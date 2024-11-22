import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../../../..';
import { morefoodURL } from '../../../../config/config';
import StationLayout from '../../Station/StationLayout';
import RestaurantLayoutSkeleton from '../../../../components/Skeleton/RestaurantLayout';
import { Button, Col, Modal, Row } from 'react-bootstrap';
import StationMyMenuItemsForm from '../../../../components/Moreclub/Resturant/station/StationMyMenuFoodItemsForm';
import StationMenuItemCard from '../../../../components/Moreclub/Resturant/station/StationMenuItemCard2';
import Cookies from "js-cookie";

const NearbyStationMyMenuPage = () => {
    const { resid, stationid, name } = useParams();
    const stationName = name.replace(/-/g, " ");
    const [showForm, setShowForm] = useState(false);
    const [cuisineOption, setCuisineOption] = useState([]);

    async function getCuisineList() {
        try {
            const res = await axiosInstance.get(
                `${morefoodURL}moreclub/station/restro/${stationid}/by/restaurant/menu/`, {
                headers: {
                    'x-country-code': Cookies.get("countryCode"),
                }
            }
            );
            setCuisineOption(res.data.data);
        } catch (err) {
            console.error(err);
            setCuisineOption([]);
        }
    }

    useEffect(() => {
        getCuisineList();
    }, [stationid]);

    const { data, isLoading, isError } = useQuery({
        queryKey: [`Nearby Station my menu ${stationid}`],
        queryFn: async () => {
            const response = await axiosInstance.get(
                `${morefoodURL}moreclub/station/${stationid}/restaurant/${resid}/food-items/restro/`
            );
            const data = await response.data.data;
            return data;
        },
        staleTime: 10000,
    });

    if (isLoading) {
        return (
            <StationLayout title={`${stationName}`}>
                <RestaurantLayoutSkeleton />
            </StationLayout>
        );
    }

    if (isError) {
        return <StationLayout title={`${stationName}`} className="text-dynamic-white">Error: retriving</StationLayout>;
    }

    async function showAddCategory() {
        setShowForm(true);
    }

    async function hideAddCategory() {
        setShowForm(false);
    }



  return (
      <StationLayout title={`${stationName}`}>
          <div className="d-flex align-items-center justify-content-end my-2">

              {showForm ? (
                  <Button variant="danger" onClick={() => hideAddCategory()}>
                      Cancel
                  </Button>
              ) : (
                  <Button variant="warning" onClick={() => showAddCategory()}>
                    Add Your MenuItems
                  </Button>
              )}
          </div>

          <Modal
              aria-labelledby="contained-modal-title-vcenter"
              size="lg"
              centered
              show={showForm}
              onHide={hideAddCategory}
          >
              <Modal.Header>
                  <Modal.Title id="contained-modal-title-vcenter text-center" className="text-dynamic-white">
                      Add Your MenuItems
                  </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                  <StationMyMenuItemsForm res_id={resid}  stationId={stationid} onFinish={hideAddCategory} cuisineOption={cuisineOption}/>
              </Modal.Body>
          </Modal>
        
          <Row
              xs={1}
              sm={1}
              md={1}
              lg={2}
              xl={2}
              xxl={3}
              className="gx-3 gy-3 my-4"
          >
              {data.map((item) => (
                  <Col className="d-flex flex-column">

                      <StationMenuItemCard
                        cuisineOption={cuisineOption}
                          foodid={item.id}
                          logo={item.image}
                          name={item.name}
                          price={item.item_price}
                          short_description={item.short_description}
                          currency_Symbol={item.currency_symbol}
                          actual_price={item.actual_price}
                          discount_percentage={item.discount_percentage}
                          retailer_price={item.retailer_price}
                          menu={item.menu}
                          ingredient={item.ingredient}
                      />
                  </Col>
              ))}
          </Row>

          {data && data.length === 0 && (
              <p className="normal-case text-center">
                  Add some food items in your {name} Menu
              </p>
          )}


    </StationLayout>
  )
}

export default NearbyStationMyMenuPage