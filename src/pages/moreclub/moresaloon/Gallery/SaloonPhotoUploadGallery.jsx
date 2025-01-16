import React, { useState } from 'react'
import Saloonlayout from '../setup/Saloonlayout'
import { Button, Modal, Placeholder } from 'react-bootstrap';
import ImageContainer from '../../../../components/Moreclub/Resturant/Gallery/GalleryImageContainer';
import { useParams } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import GalleryImageUpload from '../../../../components/Moreclub/CommonComponents/GalleryImageUpload';
import { message } from 'antd';
import FewImage from '../../../../components/Moreclub/Resturant/Gallery/fewimage';
import { moresalonAuthenticatedAxios } from '../../../../utills/axios/moresalonaxios';

const SaloonPhotoUploadGallery = () => {
  const { id, } = useParams();
  const [showForm, setShowForm] = useState(false);
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: [`Saloon Gallery ${id}`],
    queryFn: async () => {
      const response = await moresalonAuthenticatedAxios.get(
        `moreclub/users/saloons/${id}/gallery/`
      );
      const data = await response.data.data;
      return data;
    },
    staleTime: 480000,
  });

  if (isLoading) {
    return (
      <Saloonlayout className="">
        <div className="row gap-2">
          <Placeholder as="p" animation="glow" className="rounded w-25 me-2">
            <Placeholder xs={12} style={{ height: "8rem" }} />
          </Placeholder>
          <Placeholder as="p" animation="glow" className="rounded  w-25 me-2">
            <Placeholder xs={12} style={{ height: "8rem" }} />
          </Placeholder>
          <Placeholder as="p" animation="glow" className="rounded  w-25">
            <Placeholder xs={12} style={{ height: "8rem" }} />
          </Placeholder>
          <Placeholder as="p" animation="glow" className="rounded w-25 me-2">
            <Placeholder xs={12} style={{ height: "8rem" }} />
          </Placeholder>
        </div>
      </Saloonlayout>
    );
  }

  if (isError) {
    return <Saloonlayout className="text-dynamic-white">Error: retriving</Saloonlayout>;
  }

  const datas = data && data.map((e) => ({ ...e, image:e.images, width: "300", height: "200" }));


  async function showAddPhoto() {
    setShowForm(true);
  }

  async function hideAddPhoto() {
    setShowForm(false);
  }


  const Submit = async (formdata) => {
    try {
      // const res = await onSubmit(formData);
      const res = await moresalonAuthenticatedAxios.post(
        `moreclub/users/saloons/${id}/gallery/`,
        formdata,
          {
              headers: {
                  "Content-Type": "multipart/form-data",
              },
          }
      );
      if (res.status === 201) {
        message.success(res.data.message || "Images added successfully");
        queryClient.invalidateQueries({
          queryKey: [`Saloon Gallery ${id}`],
        });
        setShowForm(false);
        return res;
      } else {
        message.error(res.data.message || "Failed to add images");
        return res;
      }


    } catch (err) {
      console.log(err);
      return err.response;
    } 
   
  }

  return (
    <Saloonlayout>
      <div className="d-flex align-items-center justify-content-end my-2">
        {/* <h4 className="normal-case"> {name} Item</h4> */}
        {showForm ? (
          <Button variant="danger" onClick={() => hideAddPhoto()}>
            Cancel
          </Button>
        ) : (
          <Button variant="warning" onClick={() => showAddPhoto()}>
            Upload Image
          </Button>
        )}
      </div>

      <Modal
        aria-labelledby="contained-modal-title-vcenter"
        size="md"
        centered
        show={showForm}
        onHide={hideAddPhoto}

      >

        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter text-center" className="text-dynamic-white">
            Add Photos
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <GalleryImageUpload onSubmit={Submit} onCancel={hideAddPhoto} />
        </Modal.Body>

      </Modal>


      <div className="d-flex flex-wrap gap-2">
        {datas &&
          datas.length <= 10 &&
          datas.map((item, index) => (
            
            <FewImage key={item.id} item={item} />
            
          ))}
      </div>

      <div className="masonry-gallery">
        {datas &&
          datas.length > 10 &&
          datas.map((item, index) => (
            <ImageContainer
              key={item.id}
              item={item}
              onClick={() => console.log(index)}
            />
          ))}
      </div>

      {datas && datas.length === 0
        && (<p className='text-center text-dynamic-white'>No Image Found</p>
        )}


    </Saloonlayout>
  );
};



export default SaloonPhotoUploadGallery

