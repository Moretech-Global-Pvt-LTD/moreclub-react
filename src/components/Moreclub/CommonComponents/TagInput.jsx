import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

const TagsInput = ({ label, initialTags, onTagsChange }) => {
    const [tagInput, setTagInput] = useState('');
    const [tags, setTags] = useState(initialTags || []);

    // Handle input change
    const handleTagInputChange = (e) => {
        setTagInput(e.target.value);
    };

    // Add a new tag
    const handleAddTag = () => {
        if (tagInput.trim() && !tags.includes(tagInput)) {
            const updatedTags = [...tags, tagInput];
            setTags(updatedTags);
            setTagInput(''); // Clear the input
            onTagsChange(updatedTags); // Pass updated tags to parent
        }
    };

    // Remove a tag
    const handleRemoveTag = (indexToRemove) => {
        const updatedTags = tags.filter((_, index) => index !== indexToRemove);
        setTags(updatedTags);
        onTagsChange(updatedTags); // Pass updated tags to parent
    };

    return (
        <Form.Group controlId="formTags">
            <Form.Label>{label}</Form.Label>
            <div className="tags-input">
                <div className="add-tag-section">
                    <Form.Control
                        type="text"
                        value={tagInput}
                        placeholder={`Enter ${label.toLowerCase()}`}
                        onChange={handleTagInputChange}
                    />
                    <Button onClick={handleAddTag} className="add-btn">
                        Add
                    </Button>
                </div>
                <div className="tags-container">
                    {tags.map((tag, index) => (
                        <span className="tag" key={index}>
                            {tag}
                            <span
                                className="close-btn"
                                onClick={() => handleRemoveTag(index)}
                            >
                                &times;
                            </span>
                        </span>
                    ))}
                </div>
                
            </div>
        </Form.Group>
    );
};

export default TagsInput;
