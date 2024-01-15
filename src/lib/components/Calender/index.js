import React from 'react';
import dayjs from 'dayjs';
import ReplayIcon from '@mui/icons-material/Replay';
import { useState } from 'react';
import { Box, Divider, Button, Menu, IconButton, Tooltip } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DateCalendar, PickersDay } from '@mui/x-date-pickers';
import { styled } from "@mui/material/styles";

const StyledMenu = styled((props) => (
    <Menu
        elevation={0}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horgitizontal: "right" }}
        {...props}
    />
))(({ theme }) => ({
    "& .MuiPaper-root": {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        color: theme.palette.mode === "light" ? "rgb(55, 65, 81)" : theme.palette.grey[300],
        boxShadow: "rgb(255 255 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    },
}));

const CalendarComponent = ({ onChange, value, ...props }) => (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
            onChange={value => onChange(value)}
            views={['month', 'day']}
            onViewChange={() => null}
            {...props}
        />
    </LocalizationProvider>
);

const dates = new Date();
const currentDate = dates.getDate();
const currentMonth = dates.getMonth();
const currentYear = dates.getFullYear();

function d() {
    const padToTwoDigits = (num) => num.toString().padStart(2, "0");

    const day = padToTwoDigits(currentDate);
    const startMonth = padToTwoDigits(currentMonth === 0 ? 12 : currentMonth);
    const endMonth = padToTwoDigits(currentMonth + 1);

    const startYear = currentMonth === 0 ? currentYear - 1 : currentYear;
    const endYear = currentYear;

    const startValues = `${startYear}-${startMonth}-${day}`;
    const endValues = `${endYear}-${endMonth}-${day}`;

    return { startValues, endValues };
}

const CalenderModel = ({ open, anchorEl, onClose, onChange, onApplyDateChanges }) => {
    const [datesValues, setDatesValues] = useState({ sd: null, ed: null });
    const { sd, ed } = datesValues;

    const handleChangeDay = (values, type) => {
        if (!sd) {
            setDatesValues(prev => ({ ...prev, sd: values }))
        } else {
            if (values?.$D !== sd?.$D) {
                setDatesValues(prev => ({ ...prev, ed: values }))
            }
        }

        onChange(type, values);
    };

    const handleSelection = (day) => {
        if (!ed || !sd) return { f: null, s: null };

        const startDay = sd.$D;
        const endDay = ed.$D;
        const isSameMonth = sd.$M === ed.$M;

        const createDayRange = (start, end) => Array.from({ length: end - start + 1 }, (_, i) => start + i);

        const daysWithinFirstCalendar = isSameMonth ? createDayRange(startDay, endDay) : createDayRange(1, startDay - 1);
        const daysWithinSecondCalendar = isSameMonth ? [] : createDayRange(1, endDay);

        const isInFirstCalendar = daysWithinFirstCalendar.includes(day.$D);
        const isInSecondCalendar = daysWithinSecondCalendar.includes(day.$D);

        return {
            f: isSameMonth ? isInFirstCalendar : !isInFirstCalendar,
            s: isInSecondCalendar
        };
    };

    return (
        <StyledMenu anchorEl={anchorEl} open={open} onClose={onClose} id="calender-range">
            <Box sx={{ backgroundColor: "white", pt: 2, px: 3, borderRadius: 3, width: "max-content" }}>
                <Box display="flex" mb={1}>
                    <Box sx={{ display: "flex" }}>
                        <CalendarComponent
                            referenceDate={dayjs(d().startValues)}
                            slots={{
                                nextIconButton: () => null,
                                switchViewIcon: () => null,
                                day: (params) => {
                                    const { day, isFirstVisibleCell, isLastVisibleCell, outsideCurrentMonth } = params;
                                    const selected = handleSelection(day).f;

                                    return (
                                        <PickersDay
                                            day={day}
                                            isFirstVisibleCell={isFirstVisibleCell}
                                            isLastVisibleCell={isLastVisibleCell}
                                            outsideCurrentMonth={outsideCurrentMonth}
                                            selected={day === sd || day === ed || selected}
                                            onDaySelect={values => handleChangeDay(values, "startDate")}
                                        />
                                    )
                                }
                            }}
                        />

                        <Divider orientation="vertical" flexItem />

                        <CalendarComponent
                            referenceDate={dayjs(d().endValues)}
                            slots={{
                                leftArrowIcon: () => null,
                                switchViewIcon: () => null,
                                day: (params) => {
                                    const { day, isFirstVisibleCell, isLastVisibleCell, outsideCurrentMonth } = params;
                                    const selected = handleSelection(day).s;

                                    const disabled = () => {
                                        const { $D, $M } = day;
                                        return $M === currentMonth && $D > currentDate
                                    };

                                    return (
                                        <PickersDay
                                            day={day}
                                            disabled={disabled()}
                                            isFirstVisibleCell={isFirstVisibleCell}
                                            isLastVisibleCell={isLastVisibleCell}
                                            outsideCurrentMonth={outsideCurrentMonth}
                                            selected={day === sd || day === ed || selected}
                                            onDaySelect={values => handleChangeDay(values, "endDate")}
                                        />
                                    )
                                }
                            }}
                        />
                    </Box>
                </Box>

                <Divider />

                <Box sx={{ display: "flex", justifyContent: "right", py: 2.5, gap: 2 }}>
                    <Tooltip title="Reset dates">
                        <IconButton
                            onClick={() => setDatesValues({ sd: null, ed: null })}
                        >
                            <ReplayIcon />
                        </IconButton>
                    </Tooltip>

                    <Button
                        size="small"
                        sx={{ textTransform: "capitalize" }}
                        variant="outlined"
                        onClick={onClose}
                    >
                        Cancel
                    </Button>
                    <Button
                        size="small"
                        sx={{ textTransform: "capitalize" }}
                        variant="contained"
                        onClick={() => { onApplyDateChanges(); onClose() }}
                    >
                        Apply dates
                    </Button>
                </Box>
            </Box>
        </StyledMenu>
    );
};

export default CalenderModel;
