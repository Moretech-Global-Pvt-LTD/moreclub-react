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
 
  useEffect(() => {
    // Creating a script element to add the Tawk.to script
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = 'https://embed.tawk.to/66e6f46750c10f7a00aa6185/1i7r2le2k';
    script.charset = 'UTF-8';
    script.setAttribute('crossorigin', '*');

    // Append the script to the body or any other suitable element
    document.body.appendChild(script);

    // Cleanup function to remove the script when the component is unmounted
    return () => {
      document.body.removeChild(script);
    };
  }, []);


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
