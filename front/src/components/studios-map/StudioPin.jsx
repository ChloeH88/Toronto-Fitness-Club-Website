import { useEffect, useState } from 'react';
import './Pin.css'

const StudioPin = (props) => {
    const studio = props.studio;
    const setStudioID = props.setStudioID
    // const [mouseOn, sMouseOn] = useState(false);

    const handleClickPin = (id) => {
        // setStudioID(id)
    }

    return (
        <>
            {/* {mouseOn && <Typography>{studio.name}</Typography>}
            {mouseOn && <Typography>{studio.address}</Typography>} */}
            <div className='studio-pin'
                key={studio.id}
                // onClick={handleClickPin(studio.id)}
                // onMouseEnter={()=>sMouseOn(true)}
                // onMouseLeave={()=>sMouseOn(false)}
            >
                {studio.order}
            </div>
        </>
    );
}

export default StudioPin;