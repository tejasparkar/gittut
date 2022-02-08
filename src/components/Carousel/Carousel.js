import React, {useState} from "react";
import './Carousel.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight, faAngleLeft, faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
var globalActiveIndex;
var intervalRes;
export const CarouselItem = ({width, data}) => {
    const style = { width };
    return(
        <div className="carousel-item" style={style}>
            <img src={data.img} alt={data.title} />
        </div>
    );
};

const Carousel = ({children}) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [autoPlayStatus, setAutoPlayStatus] = useState(false);
    const updateIndex = (newIndex) => {
        if(newIndex < 0) {
            newIndex = children.length - 1;
        } else if(newIndex >= children.length) {
            newIndex = 0;
        }

        setActiveIndex(newIndex);
    };
    const updateAutoPlayIndex = (status) => {
        let newStatus = status;
        if(newStatus === 0 || (newStatus > 0 && newStatus < children.length)) {
            setActiveIndex(newStatus);
        } else if(newStatus >= children.length) {
            newStatus = 0;
            setActiveIndex(newStatus);
        }
    };

    const updateAutoPlay = (status) => {
        setAutoPlayStatus(!status);
        let newStatus = !status;
        if(newStatus === false) {
            cancelInterval();
        } else {
            intervalRes = setInterval(() => {
                if(globalActiveIndex >= children.length) {
                    globalActiveIndex = 0;
                }
                    else if(globalActiveIndex > 0) {
                    globalActiveIndex ++;
                }  else {
                    globalActiveIndex = activeIndex + 1;
                }
                updateAutoPlayIndex(globalActiveIndex); 
            }, 1000);
        }
    };
    const cancelInterval = () => {
        window.clearInterval(intervalRes);
    };
    return(
        <div className="carousel">
            <button className="prevBtn" aria-label="previous item" onClick={() => updateIndex(activeIndex - 1)}><FontAwesomeIcon icon={faAngleLeft} /></button>
            <button className="nextBtn" aria-label="next item" onClick={() => updateIndex(activeIndex + 1)}><FontAwesomeIcon icon={faAngleRight} /></button>
            <div className="inner"
            style={{transform: `translateX(-${activeIndex * 100}%)`}}>
                {React.Children.map(children, (child, index) => {
                    return React.cloneElement(child, {width: '100%'});
                })}
            </div>
            <div className="indicators">
                {autoPlayStatus && <button className="inactive" aria-label="pause" onClick={() => {updateAutoPlay(autoPlayStatus)}}><FontAwesomeIcon icon={faPause} /></button>}
                {!autoPlayStatus && <button className="inactive" aria-label="play" onClick={() => {updateAutoPlay(autoPlayStatus)}}><FontAwesomeIcon icon={faPlay} /></button>}
                {React.Children.map(children, (child, index) => {
                    return (
                        <button aria-label={`${index + 1} of active items`} className={`${index === activeIndex ? 'active': 'inactive'}`} onClick={() => updateIndex(index)}>
                            {index + 1}
                        </button>
                    )
                })}
            </div>
        </div>
    )
};

export default Carousel;