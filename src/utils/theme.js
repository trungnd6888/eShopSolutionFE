import { createTheme } from "@mui/material";

const theme = createTheme({
    components: {
        palette: {
            primary: {
                contrastText: '#fff',
            },
        },
    },
});

export default theme;