import React, { useContext } from 'react';
import { Box, Typography } from '@mui/material';
import { ScrollMenu, visibilityContext } from 'react-horizontal-scrolling-menu';

import BodyPart from './bodyPart';
import ExerciseCard from './ExerciseCard';

import RightArrowIcon from '../assets/icons/right-arrow.png';
import LeftArrowIcon from '../assets/icons/left-arrow.png';

const LeftArrow = () => {
    const { scrollPrev } = useContext(visibilityContext);

    return (
        <Typography onClick={() => scrollPrev()} className="right-arrow">
            <img src={LeftArrowIcon} alt="left-arrow" />
        </Typography>
    );
};
const RightArrow = () => {
    const { scrollNext } = useContext(visibilityContext);

    return (
        <Typography onClick={() => scrollNext()} className="left-arrow">
            <img src={RightArrowIcon} alt="right-arrow" />
        </Typography>
    );
};

const HorizontalScrollBar = ({ data, bodyPart, setBodyPart, isBodyParts}) => {
  return (
    <ScrollMenu>
        {data.map((item) => (
            <Box
                key={item.id || item}
                itemId={item.id || item}
                title={item.id || item}
                m="0 40px"
            >
                {isBodyParts ? <BodyPart item={item} bodyPart={bodyPart} setBodyPart={setBodyPart} /> 
                    : <ExerciseCard exercise={item} />}
            </Box>
            )
        )}
    </ScrollMenu>
  )
}

export default HorizontalScrollBar