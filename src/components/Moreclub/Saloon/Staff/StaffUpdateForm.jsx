import React, { useEffect, useState } from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import Select from "react-select";
import { message } from 'antd';
import { useQueryClient } from '@tanstack/react-query';
import { moresalonAuthenticatedAxios } from '../../../../utills/axios/moresalonaxios';

export const customStyles = {
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

const StaffUpdateForm = ({ sal_id, id, data, onFinish, onCancel }) => {
    const [staff, setStaff] = useState({
        name: data.name ?? '',
        email: data.email ?? '',
        contact: data.contact_no ?? '',
        image: null,
        buffer_time: data.buffer_time ?? "",
        services: data.services.map((item) => item.id) ?? [],
    });
    const [service, setService] = useState([]);
    const [loading, setLoading] = useState(false);
    const queryClient = useQueryClient();

    async function getServiceList() {
        try {
            const res = await moresalonAuthenticatedAxios.get(`moreclub/users/saloons/${sal_id}/services/ `);
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
        getServiceList();
    }, [id])


    const handleServiceChange = (selectedOptions) => {
        if (selectedOptions) {
            const selectedValues = selectedOptions.map(option => option.value);
            setStaff({ ...staff, services: selectedValues });
        } else {
            setStaff({ ...staff, "services": [] });
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
                services: staff.services,
                buffer_time: staff.buffer_time,
                ...(staff.image && { image: staff.image }),
            }

            moresalonAuthenticatedAxios
                .patch(`moreclub/users/saloons/${sal_id}/staff/${id}/`, datas, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((response) => {

                    queryClient.invalidateQueries({
                        queryKey: [`Saloon Staff List ${sal_id}`],
                    });

                    onFinish();
                    message.success('Staff member updated successfully');
                })
                .catch((error) => {
                    message.error('Error updating staff member');
                });
        } catch (err) {
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
                    placeholder="select services"
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

                <div className="image-preview-container">
                    {staff.image ? (
                        <div style={{ display: 'inline-block', marginRight: '10px' }}>
                            <img
                                src={URL.createObjectURL(staff.image)}
                                alt={`Selected `}
                                style={{ height: '5rem', width: '5rem' }}
                                className="my-2"
                            />

                        </div>
                    ) : (
                        <div style={{ display: 'inline-block', marginRight: '10px' }}>
                            <img
                                src={data.image}
                                alt={`Selected `}
                                style={{ height: '5rem', width: '5rem' }}
                                className="my-2"
                            />

                        </div>
                    )}
                </div>

                <Form.Control type="file" name="image" onChange={handleFileChange} />
            </Form.Group>


            <div className='d-flex justify-content-end gap-2'>
                <Button variant="secondary" onClick={onCancel}>
                    Cancel
                </Button>
                <Button variant="success" type="submit" >
                    {loading && <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />}
                    Update
                </Button>
            </div>
        </Form>
    );
};

export default StaffUpdateForm;
