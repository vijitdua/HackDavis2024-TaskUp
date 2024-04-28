/* IMPORTANT:
*
[HOW TO USE THIS COMPONENT]
* Add something like {error && <ErrorMessage message={error} errID={errID}/>} wherever you want the error to appear.
*
*
[USAGE EXAMPLE]
* To ensure repeated errors don't count as no new-error hence no new-render, you need to incremenet the error id in whatever component
* you are creating errors in. So you need to do something like:
* const [error, setErr] = useState(null);
* const [errID, setErrID] = useState(0); //Error Message component won't re-render if same error occurs, but if new error ID is sent, it knows it's a new error
* if(something that causes error):
* setErr(success);
* setErrID(prevId => prevId + 1); // Increment errorId to ensure a new key for each error
*/

import React, {useEffect, useState} from 'react';
import {Alert, Fade, Box} from "@mui/material";

function ErrorMessage(props) {
    const [shouldRender, setShouldRender] = useState(true);
    const timeoutMilliseconds = 10*1000; //Total render time, including fade

    useEffect(() => {
        setShouldRender(true); // Ensure the component should render when errID or message changes

        const renderTimer = setTimeout(() => {
            setShouldRender(false)
        }, timeoutMilliseconds);

        return () => clearTimeout(renderTimer);
    }, [props.errID, props.message]);

    if (!shouldRender) {
        return null;
    }

    return (
        <Fade in={shouldRender} timeout={500}>
            <Box>
                <Alert severity="error">{props.message}</Alert>
            </Box>
        </Fade>
    );


}

export default ErrorMessage;
