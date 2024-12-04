import React, { useEffect, useState } from 'react';
import { Form, Button, Col, Row, Spinner } from 'react-bootstrap';
import { axiosInstance } from '../../../..';
import { moresaloonURL } from '../../../../config/config';
import Select from "react-select";
import { message } from 'antd';
import { useQueryClient } from '@tanstack/react-query';

const customStyles = {
    control: (provided, state) => ({
        ...provided,
        backgroundColor: 'transparent',
        borderColor: state.isFocused ? '#80bdff' : '#ced4da',
        boxShadow: state.isFocused ? '0 0 0 0.2rem rgba(0,123,255,.25)' : null,
        '&:hover': {
            borderColor: state.isFocused ? '#80bdff' : '#ced4da',
        },
    }),
    menu: (provided) => ({
        ...provided,
        backgroundColor: '#f8f9fa',
        borderRadius: '0.25rem',
        boxShadow: '0 0.5rem 1rem rgba(0, 0, 0, 0.15)',
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected
            ? '#007bff'
            : state.isFocused
                ? '#e9ecef'
                : 'white',
        color: state.isSelected ? 'white' : 'black',
        '&:active': {
            backgroundColor: '#007bff',
            color: 'white',
        },
    }),
    multiValue: (provided) => ({
        ...provided,
        backgroundColor: '#007bff',
        color: 'white',
    }),
    multiValueLabel: (provided) => ({
        ...provided,
        color: 'white',
    }),
    multiValueRemove: (provided) => ({
        ...provided,
        color: 'white',
        '&:hover': {
            backgroundColor: '#0056b3',
            color: 'white',
        },
    }),
};

const StaffCreationForm = ({id, onFinish , onCancel}) => {
    const [staff, setStaff] = useState({
        name: '',
        email: '',
        contact: '',
        image: null,
        buffer_time: "00:05:00",
        // break_start_time:"" ,
        // break_end_time: "",
        services: [],
    });
    const [service, setService] = useState([]);
    const [loading, setLoading] = useState(false);
    const queryClient = useQueryClient();

    async function getCuisineList() {
        try {
            const res = await axiosInstance.get(`${moresaloonURL}moreclub/users/saloons/${id}/services/ `);
            const mappedData = res.data.data.map(item => ({
                value: item.id, // Assuming 'id' is the value you want
                label: item.name // Assuming 'name' is the label you want
            }));
            setService(mappedData);
        } catch (err) {
            console.error(err);
            setService([]);
        }
    }

    useEffect(() => {
        getCuisineList();
    }, [id])


    const handleServiceChange = (selectedOptions) => {
        if (selectedOptions) {
            const selectedValues = selectedOptions.map(option => option.value);           
            setStaff({ ...staff, services: selectedValues });
           
        } else {
            setStaff({ ...staff, "services": [] });
            console.log("selected option", selectedOptions)
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setStaff((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        setStaff((prevState) => ({
            ...prevState,
            image: e.target.files[0], // Store the image file
        }));
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        try { 
            const datas = {
                name: staff.name,
                email: staff.email,
                contact_no: staff.contact,
                image: staff.image,
                services: staff.services,
                buffer_time: staff.buffer_time
            }

            axiosInstance
                .post(`${moresaloonURL}moreclub/users/saloons/${id}/staff/`, datas ,{
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((response) => {

                    queryClient.invalidateQueries({
                        queryKey: [`Saloon Staff List ${id}`],
                    });
                  
                    onFinish();
                    message.success('Staff member created successfully');
                })
                .catch((error) => {
                    console.error("There was an error fetching the categories!", error);
                    message.error('Error creating staff member');
                });
        } catch (err) { 
            console.error(err);
            message.error('Error creating staff member');
        } finally {
            setLoading(false);
        }
     
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formStaffName" className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter name"
                    name="name"
                    value={staff.name}
                    onChange={handleInputChange}
                    required
                />
            </Form.Group>

            <Form.Group controlId="formStaffEmail" className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    value={staff.email}
                    onChange={handleInputChange}
                    required
                />
            </Form.Group>

            <Form.Group controlId="formStaffContact" className="mb-3">
                <Form.Label>Contact</Form.Label>
                <Form.Control
                    type="tel"
                    placeholder="Enter contact"
                    name="contact"
                    value={staff.contact}
                    onChange={handleInputChange}
                    required
                />
            </Form.Group>

            
            {/* <div className='d-flex flex-'>
                <div className='d-flex flex-column flex-md-row gap-2'>
                    <div>
                        <Form.Label className=''>Break Start</Form.Label>
                        <Form.Control
                            type='time'
                            name='break_start_time'
                            value={staff.break_start_time}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <Form.Label className=''>Break End</Form.Label>
                        <Form.Control
                            type='time'
                            name='break_end_time'
                            value={staff.break_end_time}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='flex flex-column flex-grow-1'>
                       
                    </div>
                </div>
            </div> */}
            <Form.Group controlId="formStaffContact" className="mb-3">
                <Form.Label>Buffer Time</Form.Label>
                <Form.Control
                    as="select"
                    name="buffer_time"
                    value={staff.buffer_time}
                    onChange={handleInputChange}
                    required
                >
                    <option value={"00:01:00"} >
                        1 min
                    </option>
                    <option value={"00:02:00"} >
                        2 min
                    </option>
                    <option value={"00:03:00"} >
                        3 min
                    </option>
                    <option value={"00:04:00"} >
                        4 min
                    </option>
                    <option value={"00:05:00"} >
                        5 min
                    </option>
                    <option value={"00:10:00"} >
                        10 min
                    </option>
                    <option value={"00:15:00"} >
                        15 min
                    </option>
                    <option value={"00:20:00"} >
                        20 min
                    </option>
                    <option value={"00:30:00"} >
                        30 min
                    </option>
                </Form.Control>
            </Form.Group>
            
            <Form.Group className="mb-4">
                <Form.Label className="mb-2 fz-16">Services types</Form.Label>
                <Select
                    className="mb-4 form-control"
                    placeholder="select services type"
                    styles={customStyles}
                    value={Array.isArray(staff.services)
                        ? service.filter(option => staff.services.includes(option.value))
                        : []}
                    onChange={handleServiceChange}
                    options={service}
                    isMulti={true}
                    required
                />
            </Form.Group>

            <Form.Group controlId="formStaffImg" className="mb-3">
                <Form.Label>Image</Form.Label>
                <Form.Control type="file" name="image" onChange={handleFileChange} required />
            </Form.Group>

           
            <div className='d-flex justify-content-end gap-2'>
                <Button variant="secondary" onClick={onCancel}>
                    Cancel
                </Button>
                <Button variant="success" type="submit" >
                   {loading && <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />} 
                    Add Staff
                </Button>
            </div>
        </Form>
    );
};

export default StaffCreationForm;
