import DeleteIcon from '@mui/icons-material/Delete';
import { Autocomplete, Button, Grid, TextField, Toolbar, Tooltip } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import * as React from 'react';

DistributorTableToolbar.propTypes = {

};

function DistributorTableToolbar(props) {
    const { numSelected } = props;
    const top100Films = [
        { label: 'The Shawshank Redemption', year: 1994 },
        { label: 'The Godfather', year: 1972 },
        { label: 'The Godfather: Part II', year: 1974 },
        { label: 'The Dark Knight', year: 2008 },
        { label: '12 Angry Men', year: 1957 },
        { label: "Schindler's List", year: 1993 },
        { label: 'Pulp Fiction', year: 1994 },
    ];

    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            }}
        >
            {numSelected > 0 ? (
                <>
                    <Typography
                        sx={{ flex: '1 1 100%' }}
                        color="inherit"
                        variant="subtitle1"
                        component="div"
                    >
                        {numSelected} selected
                    </Typography>
                    <Tooltip title="Delete">
                        <IconButton>
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                </>
            ) : (
                <Grid container sx={{ pt: 1 }}>
                    <Grid item xs={12} sm={4} md={4} >
                        <TextField
                            fullWidth
                            label="Từ khóa"
                            size="small"
                            variant="outlined"
                            sx={{
                                minWidth: 200,
                                pb: 2,
                                pr: { sm: 2, md: 2 },
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4} md={4} >
                        <Autocomplete
                            size="small"
                            disablePortal
                            id="combo-box-demo"
                            options={top100Films}
                            sx={{
                                minWidth: 200,
                                pr: { sm: 2, md: 2 },
                                pb: 2
                            }}
                            renderInput={(params) => <TextField {...params} label="Movie" />}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4} md={4}>
                        <Button
                            title="Tìm kiếm"
                            placement="right"
                            variant="outlined"
                            sx={{
                                mb: { xs: 4 },
                                width: {
                                    xs: '100%',
                                    sm: 'auto',
                                    md: 'auto',
                                },
                                minWidth: {
                                    xs: 200,
                                    sm: 'auto',
                                    md: 'auto',
                                }
                            }}
                        >
                            Tìm kiếm
                        </Button>
                    </Grid>
                </Grid>
            )
            }
        </Toolbar >
    );
}

export default DistributorTableToolbar;
