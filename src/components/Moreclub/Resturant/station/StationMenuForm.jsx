// import { useQueryClient } from '@tanstack/react-query';
// import React, { useState } from 'react'
// import { axiosInstance } from '../../../..';
// import { morefoodURL } from '../../../../config/config';
// import { useParams } from 'react-router-dom';
// import { Button, Form, Row } from 'react-bootstrap';

// const StationMenuForm = () => {
//     const { res_id, stationId } = useParams();
//     const [menu_name, setmenu_name] = useState("");
//     const [menu_image, setmenu_image] = useState(null);
//     // const [selectedCategory, setSelectedCategory] = useState('');
//     const queryClient = useQueryClient();


//     const handleImageChange = (e) => {
//         setmenu_image(e.target.files[0]);
//     };
    

//     // const handleCategoryChange = (e) => {
//     //     setSelectedCategory(e.target.value);
//     // };


//     const handleSubmit = (e) => {
//         e.preventDefault();
//         axiosInstance
//             .post(`${morefoodURL}moreclub/user/station/${stationId}/menu/`, {
//                 menu_id: selectedCategory
//             })
//             .then((response) => {
//                 setCategories(response.data.data);
//                 queryClient.invalidateQueries({
//                     queryKey: [`Resturant Menu List ${res_id}`],
//                 });
//                 setSelectedCategory("");
//                 // onFinish();
//             })
//             .catch((error) => {
//                 console.error("There was an error fetching the categories!", error);
//             });


//     };

//   return (
//       <div>
//           <Form onSubmit={handleSubmit}>
//               <Row className="gy-3">
                 
//                       <Form.Group controlId="formItemName">
//                           <Form.Label>Menu Name</Form.Label>
//                           <Form.Control
//                               type="text"
//                               placeholder="Enter item name"
//                               name="name"
//                               value={menu_name}
//                               onChange={(e)=>setmenu_name(e.target.value)}
//                           />
//                   </Form.Group>
                  
//                   <Form.Group controlId="formItemImage">
//                       <Form.Label>Item Image</Form.Label>
//                       <br />
//                       {menu_image ? (
//                           <img
//                               src={URL.createObjectURL(menu_image)}
//                               alt="Foodimage"
//                               style={{ height: "5rem", width: "5rem" }}
//                               className=""
//                           />
//                       ) : (
//                           <>
//                               {/* {data.image && (
//                                 <img
//                                     src={data.image}
//                                     alt="Foodimage"
//                                     style={{ height: "5rem", width: "5rem" }}
//                                     className=""
//                                 />
//                             )} */}
//                           </>
//                       )}
//                       <Form.Control type="file" name="image" onChange={handleImageChange} />
//                   </Form.Group>

//                       {/* <Form.Control
//                           as="select"
//                           value={selectedCategory}
//                           onChange={handleCategoryChange}
//                       >
//                           <option value="">Select a category</option>
//                           {categories &&
//                               categories.length > 0 &&
//                               categories?.map((category, index) => (
//                                   <option key={index} value={category.id}>
//                                       {category.name}
//                                   </option>
//                               ))}
//                       </Form.Control> */}
                 
//                   <div>
//                       <Button variant="success" type="submit" disabled={!menu_name}>
//                           Add Menu
//                       </Button>
//                   </div>
//               </Row>
//           </Form>  
    
//       </div>
//   )
// }

// export default StationMenuForm


import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Row } from 'react-bootstrap';
import { morefoodURL } from '../../../../config/config';
import { axiosInstance } from '../../../..';
import { useQueryClient } from '@tanstack/react-query';

const StationMenuForm = ({ res_id, onFinish }) => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const queryClient = useQueryClient();


    async function GetCategories() {
        axiosInstance
            .get(`${morefoodURL}moreclub/main/menu/`)
            .then((response) => {
                setCategories(response.data.data);
            })
            .catch((error) => {
                console.error("There was an error fetching the categories!", error);
            });
    }

    useEffect(() => {
        // Fetch categories from the backend
        GetCategories();
    }, []);

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axiosInstance
            .post(`${morefoodURL}moreclub/user/station/${res_id}/menu/`, {
                menu_id: selectedCategory
            })
            .then((response) => {
                setCategories(response.data.data);
                GetCategories();
                queryClient.invalidateQueries({
                    queryKey: [`Resturant Menu List ${res_id}`],
                });
                setSelectedCategory("");
                onFinish();
            })
            .catch((error) => {
                console.error("There was an error fetching the categories!", error);
            });


    };

    return (
        <Card className="p-3 ">
            <Form onSubmit={handleSubmit}>
                <Row className="gy-3">
                    <Form.Group controlId="formMenuCategory">
                        <Form.Label>Category</Form.Label>

                        <Form.Control
                            as="select"
                            value={selectedCategory}
                            onChange={handleCategoryChange}
                        >
                            <option value="">Select a category</option>
                            {categories &&
                                categories.length > 0 &&
                                categories?.map((category, index) => (
                                    <option key={index} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                        </Form.Control>
                    </Form.Group>
                    <div>
                        <Button variant="success" type="submit" disabled={selectedCategory.trim() === ""}>
                            Add Category
                        </Button>
                    </div>
                </Row>
            </Form>
        </Card>
    );
};

export default StationMenuForm;
