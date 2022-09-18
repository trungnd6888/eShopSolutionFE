import * as React from "react";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { PropTypes } from 'prop-types';
import { styled } from "@mui/material";
import { Controller } from "react-hook-form";

IndeterminateCheckbox.propTypes = {
    label: PropTypes.string,
    nameControl: PropTypes.string,
    control: PropTypes.object.isRequired,
    onCheckAllClick: PropTypes.func,
    onCheckItemClick: PropTypes.func,
};

IndeterminateCheckbox.defaultValues = {
    label: '',
    nameControl: '',
    onCheckAllClick: null,
    onCheckItemClick: null,
};

const CustomizeFormControlLabel = styled(FormControlLabel)(() => ({
    '& .MuiFormControlLabel-label': {
        fontWeight: '500',
    },
}));

const rows = [
    {
        id: 1,
        title: 'Xem',
        suffix: 'View'
    },
    {
        id: 2,
        title: 'Tạo mới',
        suffix: 'Create'
    },
    {
        id: 3,
        title: 'Cập nhật',
        suffix: 'Update'
    },
    {
        id: 4,
        title: 'Xóa',
        suffix: 'Remove'
    }
];

function IndeterminateCheckbox({
    label,
    control,
    nameControl,
    onCheckAllClick,
    onCheckItemClick,
}) {
    const children = (
        <Box sx={{ display: "flex", flexDirection: "column", ml: 3 }}>
            {rows.map(x =>
                <FormControlLabel
                    key={x.id + x.suffix}
                    label={x.title}
                    control={
                        <Controller
                            control={control}
                            name={`${nameControl}${x.suffix}`}
                            render={({ field: { name, onChange, value } }) =>
                                <Checkbox
                                    name={name}
                                    checked={value}
                                    onChange={(event, value) => {
                                        onChange(value);
                                        if (onCheckItemClick) onCheckItemClick(value, name, nameControl);
                                    }}
                                />
                            }
                        />
                    }
                />
            )}
        </Box>
    );

    return (
        <div>
            <CustomizeFormControlLabel
                label={label}
                control={
                    <Controller
                        name={nameControl}
                        control={control}
                        render={({ field: { name, value, onChange } }) =>
                            <Checkbox
                                name={name}
                                checked={value}
                                onChange={(event, value) => {
                                    onChange(value);
                                    if (onCheckAllClick) onCheckAllClick(value, name);
                                }}
                            />}
                    />
                }
            />
            {children}
        </div>
    );
}

export default IndeterminateCheckbox;