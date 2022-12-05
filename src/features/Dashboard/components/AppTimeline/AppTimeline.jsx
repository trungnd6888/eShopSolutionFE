import React from 'react';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Timeline from '@mui/lab/Timeline';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { PropTypes } from 'prop-types';

AppTimeline.propTypes = {
    list: PropTypes.array,
};

AppTimeline.defaultValues = {
    list: [],
};

const CustomizeTimelineItem = styled(TimelineItem)`
&::before {
    flex: 0;
}`;

function AppTimeline({ list }) {
    return (
        <Paper>
            <Timeline sx={{ mt: 0, mb: 0 }}>
                {list?.map((item, index) =>
                    <CustomizeTimelineItem key={item.color + index} >
                        <TimelineSeparator>
                            <TimelineDot color={item.color} />
                            {index !== list.length - 1 ? <TimelineConnector /> : ""}
                        </TimelineSeparator>
                        <TimelineContent variant='body2' sx={{ pt: 1 }}>{item.title}</TimelineContent>
                    </CustomizeTimelineItem>
                )}
            </Timeline>
        </Paper>
    );
}

export default AppTimeline; 