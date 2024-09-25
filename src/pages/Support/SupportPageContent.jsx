import React, { useEffect, useState } from 'react';
import BlogCard from "../../components/blog/blogCard";
import { Col, Placeholder, Row } from "react-bootstrap";
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { baseURL } from '../../config/config';
import { useSearchParams } from 'react-router-dom';

const SupportBotPage = () => {
  const [searchParams, setSearchParams] = useSearchParams(); // Hook for managing query parameters
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || ''); // Set initial search value from URL
  const searchQuery = searchParams.get('search') || ''; // Extract search query from URL

  // useEffect(() => {
  //   // Step 1: Create the external script element
  //   const script = document.createElement('script');
  //   script.src = "https://humanchat.net/build/js/hb_latest.js?v=1.5.22";
  //   script.async = true;
  //   script.crossOrigin = 'anonymous';

  //   // Step 2: Append the script to the body
  //   document.body.appendChild(script);

  //   // Step 3: Wait until the script is fully loaded, then initialize AiBot
  //   script.onload = () => {
  //     // console.log('Bot script loaded');

  //     // Ensure that AiBot exists before calling it
  //     if (window.AiBot) {
  //       // Step 4: Initialize AiBot
  //       var aiBot = new window.AiBot({
  //         embedId: 'z9MnK5W3syhq',  // Replace with your embedId
  //         remoteBaseUrl: 'https://humanchat.net/',
  //         version: '1.5.22',
  //       });

  //     } else {
  //       console.error('AiBot is not available on window');
  //     }
  //   };

  //   // Step 5: Cleanup - remove the script when the component unmounts
  //   return () => {
  //     document.body.removeChild(script);
  //   };
  // }, []); // Empty dependency array ensures this runs only once


  const { data, isLoading, isError , refetch , isRefetching} = useQuery({
    queryKey: ["blog list", searchParams ],
    queryFn: async () => {
      if (searchQuery) {
        const response = await axios.get(`${baseURL}blogs/search/`, {
          params: searchQuery ? { title: searchQuery } : {}, // Append search query if exists
        });
        const data = await response.data.data;
        return data;
        
      } else {
        const response = await axios.get(`${baseURL}blogs/list/`);
        const data = await response.data.data;
        return data;
      }
    },
    staleTime: 100,
    enabled: !!searchQuery || !searchQuery, 
  });


  useEffect(() => {
    refetch(); // Trigger refetch when searchParams (searchQuery) are updated
  }, [searchQuery, refetch]);
  if (isLoading ) {
    return (
      <div className="container">
        <div className="row gap-2">
          <Placeholder as="p" animation="glow" className="rounded w-25 me-2">
            <Placeholder xs={12} style={{ height: "2rem" }} />
          </Placeholder>
          <Placeholder as="p" animation="glow" className="rounded  w-75 me-2">
            <Placeholder xs={12} style={{ height: "2rem" }} />
          </Placeholder>
          <Placeholder as="p" animation="glow" className="rounded  w-100">
            <Placeholder xs={12} style={{ height: "2rem" }} />
          </Placeholder>
          <Placeholder as="p" animation="glow" className="rounded w-25 me-2">
            <Placeholder xs={12} style={{ height: "2rem" }} />
          </Placeholder>
          <Placeholder as="p" animation="glow" className="rounded  w-75 me-2">
            <Placeholder xs={12} style={{ height: "2rem" }} />
          </Placeholder>
          <Placeholder as="p" animation="glow" className="rounded  w-100">
            <Placeholder xs={12} style={{ height: "2rem" }} />
          </Placeholder>
          <Placeholder as="p" animation="glow" className="rounded w-25 me-2">
            <Placeholder xs={12} style={{ height: "2rem" }} />
          </Placeholder>
          <Placeholder as="p" animation="glow" className="rounded  w-75 me-2">
            <Placeholder xs={12} style={{ height: "2rem" }} />
          </Placeholder>
          <Placeholder as="p" animation="glow" className="rounded  w-100">
            <Placeholder xs={12} style={{ height: "2rem" }} />
          </Placeholder>
          <Placeholder as="p" animation="glow" className="rounded w-25 me-2">
            <Placeholder xs={12} style={{ height: "2rem" }} />
          </Placeholder>
          <Placeholder as="p" animation="glow" className="rounded  w-75 me-2">
            <Placeholder xs={12} style={{ height: "2rem" }} />
          </Placeholder>
          <Placeholder as="p" animation="glow" className="rounded  w-100">
            <Placeholder xs={12} style={{ height: "2rem" }} />
          </Placeholder>
        </div>
      </div>
    );
  }

  if (isError) {
    return <div className="text-dynamic-white">Error: retriving</div>;
  }

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value); // Update search term as the user types
  };

   const handleClearSubmit = (event) => {
    event.preventDefault();
     setSearchTerm("")
   setSearchParams({});
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    // Update the URL with the search term
    if (searchTerm) {
      setSearchParams({ search: searchTerm });
    } else {
      setSearchParams({}); // Clear search query from the URL if empty
    }
  };




  return (
    <div className="support-bot-page">
      <h1>Support Page</h1>

      <form onSubmit={handleSearchSubmit} className='d-flex flex-row flex-nowrap my-4 align-items-center gap-2 mx-3 ' >
        <div className='position-relative w-100'>
          
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchInputChange}
          placeholder="Search ..."
          className="form-control position-relative"
          />
          {searchTerm && (
            <button type="submit" className="btn btn-sm btn-secondary position-absolute end-0 top-0 rounded-pill px-2 py-1" onClick={handleClearSubmit}> <span className="text-danger fs-6">x</span> clear </button>

          )}
       </div>
        <button type="submit" className="btn btn-sm btn-primary">Search</button>
      </form>


      {isRefetching ? <p className='text-center'>Loading...</p> : 
      
      <Row xs={1} sm={2} md={2} lg={3} xl={3} xxl={4}>
        { data && data.length > 0 && data.map((blog) => (
          <Col>
            <BlogCard
              key={blog.id}
              slug={blog.slug}
              image={blog.image}
              title={blog.title}
              description={blog.short_description}
              date={blog.publish}
            />
          </Col>
        ))}
        {data && data.length === 0 && 
          <p>No articles found</p>
        }
      </Row>
      }

    </div>
  );
};

export default SupportBotPage;
