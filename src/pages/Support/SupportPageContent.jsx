import React, { useEffect } from 'react';

const SupportBotPage = () => {
 

    // useEffect(() => {
    //     // Create and load the bot script
    //     const script = document.createElement('script');
    //     script.src = 'https://humanchat.net/build/js/hb_latest.js?v=1.5.22';
    //     script.crossOrigin = 'anonymous';
    //     script.setAttribute('data-cfasync', 'false');
    //     script.async = true;

    //     // Append the script to the body
    //     document.body.appendChild(script);

    //     // Ensure the script is fully loaded before trying to initialize AiBot
    //     script.onload = () => {
    //         console.log('Bot script loaded');

    //         // Wait until AiBot is attached to the window object before calling init
    //         const checkAiBot = setInterval(() => {
    //             if (window.AiBot) {
    //                 clearInterval(checkAiBot); // Stop checking when AiBot is available
    //                 console.log('AiBot is available, initializing...');
    //                 console.log('aibot', window.AiBot);
    //                 window.AiBot({
                    
    //                     embedId: '3JmSPAjD5MBj',
    //                     remoteBaseUrl: 'https://humanchat.net/',
    //                     version: '1.5.22',
    //                 });
    //             }
    //         }, 100); // Check every 100ms until AiBot is available
    //     };

    //     // Cleanup script when component unmounts
    //     return () => {
    //         const scriptTag = document.querySelector(`script[src="https://humanchat.net/build/js/hb_latest.js?v=1.5.22"]`);
    //         if (scriptTag) document.body.removeChild(scriptTag);
    //     };
    // }, []);


    return (
        <div className="support-bot-page">
            <h1>Support Page</h1>
           
          
        </div>
    );
};

export default SupportBotPage;
