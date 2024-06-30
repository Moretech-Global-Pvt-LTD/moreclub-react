import React, { useState } from 'react';
import './Accordins.css';

const AccordionItem = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="accordion-item">
            <button
                className={`accordion-button ${isOpen ? 'active' : ''}`}
                onClick={() => setIsOpen(!isOpen)}
            >
                {title}
            </button>
            <div
                className="accordion-content"
                style={{ maxHeight: isOpen ? `${children.length * 1.5}em` : '0px' }}
            >
                {children}
            </div>
        </div>
    );
};

const Accordion = ({ items }) => {
    return (
        <div className="accordion">
            {items && items.map((item, index) => (
                <AccordionItem key={index} title={item.title}>
                    {item.content}
                </AccordionItem>
            ))}
        </div>
    );
};

export default Accordion;
