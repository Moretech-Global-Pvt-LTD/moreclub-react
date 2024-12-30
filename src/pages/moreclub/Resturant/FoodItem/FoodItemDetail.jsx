import React, { useEffect } from "react";
import FoodCard from "../../../../components/Moreclub/Resturant/Menu/UpdateMenus/FoodCard";
import RestaurantLayout from "../../../../components/Layout/RestaurantLayout";
import VariaentCard from "../../../../components/Moreclub/Resturant/Menu/UpdateMenus/VariaentCard";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchFoodItemDetail } from "../../../../redux/api/FoodDetailApi";
import {
  fetchCuisines,
  fetchMenus,
  fetchVariationtype,
} from "../../../../redux/api/menuApi";
import VariationUpdateForm from "../../../../components/Moreclub/Resturant/Menu/UpdateMenus/VariationUpdate";
import RelatedFoodItem from "../../../../components/Moreclub/Resturant/Menu/UpdateMenus/RelatedFoodItem";
import { Button } from "react-bootstrap";

const FoodItemDetail = () => {
  const { res_id, food_id } = useParams();
  const dispatch = useDispatch();
  const [editVariation, setEditVariation] = React.useState(false);

  const FoodDetail = useSelector((state) => state.FoodDetail);

  useEffect(() => {
    if (res_id && food_id) {
      dispatch(fetchFoodItemDetail(food_id, res_id));
    }
  }, [res_id, food_id, dispatch]);

  useEffect(() => {
    if (res_id) {
      dispatch(fetchMenus(res_id));
      dispatch(fetchCuisines(res_id));
      dispatch(fetchVariationtype(res_id));
    }
  }, [res_id, dispatch]);



  return (
    <RestaurantLayout>
      {FoodDetail.foodItemDetailLoading[food_id] && (
        <div className="text-dynamic-white">Loading...</div>
      )}
      {FoodDetail.foodItemDetailError[food_id] && (
        <div className="text-dynamic-white">
          Error: {FoodDetail.foodItemDetailError[food_id]}
        </div>
      )}
      {FoodDetail.foodItemDetail[food_id] && (
        <div className="food-detail-container">
          <div>
            <h6 className="text-dynamic-black mt-4">Food Item Details</h6>
            <FoodCard item={FoodDetail.foodItemDetail[food_id]} />
            <div className="d-none d-lg-block">
              <RelatedFoodItem item={FoodDetail.foodItemDetail[food_id]} />
            </div>
          </div>

          {/* new changes  */}
          <div>
            <div
              className="d-flex align-items-center justify-content-between "
              style={{ maxWidth: "500px" }}
            >
              <h6 className="text-dynamic-white my-3">Variation</h6>
              {FoodDetail.foodItemDetail[food_id].variations &&
                FoodDetail.foodItemDetail[food_id].variations.length >= 0 && (
                  <button
                    className=" edit-varient-button"
                    onClick={() => setEditVariation(true)}
                  >
                    &#9997;
                  </button>
                )}
            </div>

            {editVariation ? (
              <VariationUpdateForm
                item={FoodDetail.foodItemDetail[food_id]}
                onCancel={() => setEditVariation(false)}
              />
            ) : (
              <div className="related-card-container">
                {FoodDetail.foodItemDetail[food_id].variations &&
                  FoodDetail.foodItemDetail[food_id].variations.length > 0 &&
                  FoodDetail.foodItemDetail[food_id].variations.map(
                    (items) => (
                      <VariaentCard
                        item={items}
                        image={FoodDetail.foodItemDetail[food_id].image}
                      />
                    ))
                  
                  }

                {FoodDetail.foodItemDetail[food_id].variations &&
                  FoodDetail.foodItemDetail[food_id].variations.length === 0 && (
                    <div className="d-flex flex-column justify-content-center">
                      <p className="text-center">No Variations of Food Items</p>
                      <Button
                        className="mt-2"
                        size="sm"
                        onClick={() => setEditVariation(true)}
                        variant="warning"
                      >
                        Add New Variation
                      </Button>
                    </div>
                  )}
              </div>
            )}
          </div>
          <div className="d-block d-lg-none">
            <RelatedFoodItem item={FoodDetail.foodItemDetail[food_id]} />
          </div>
        </div>
      )}
    </RestaurantLayout>
  );
};

export default FoodItemDetail;
