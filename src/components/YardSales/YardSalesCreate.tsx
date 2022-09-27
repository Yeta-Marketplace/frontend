// https://formik.org/docs/examples/typescript
// https://github.com/jquense/yup
import { colors } from '../../styles/colors'
import styled from 'styled-components'
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import { useFormik } from 'formik';

import { api } from '../../services/api';
import { IYardSaleCreate } from '../../interfaces/yardsale'
import { ILocation } from '../../interfaces/location';
import { useState } from 'react';


type Props = {
    location: ILocation
}

const Sidebar = styled(Container)`
    background-color: ${colors.lightgrey};
    height: 100%;
    text-align: center;
`


function YardSalesCreate({ location, }: Props) {

    const [successMsg, setSuccessMsg] = useState("");

    const initialValues: IYardSaleCreate = {
        description: '',
        latitude: location.latitude,
        longitude: location.longitude,
        start_date: new Date(),
        end_date: new Date(),
    }

    const formik = useFormik({
        initialValues: initialValues,
        //   validationSchema: validationSchema,
        onSubmit: (values) => {

            async function createYardSale() {
                const response = await api.createYardSaleOpen(values);
                setSuccessMsg("Yard Sale added Successfully!");
            }
            createYardSale();
        },
    });

    return (
        <Sidebar>
            {/* <SidebarBox alignContent='center'> */}
            {successMsg && <Alert severity="success"> {successMsg} </Alert>}
            <h1> Add Yard Sale!</h1 >
            <form onSubmit={formik.handleSubmit}>
                <TextField
                    fullWidth
                    style={{ width: "80%", margin: "10px" }}
                    id="description"
                    name="description"
                    label="Description"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    error={formik.touched.description && Boolean(formik.errors.description)}
                    helperText={formik.touched.description && formik.errors.description}
                />
                <h3>Current Location - Drag on Map to Change</h3>
                <Stack direction="row" spacing={2}>
                    <TextField
                        fullWidth
                        style={{ width: "50%", margin: "10px" }}
                        id="latitude"
                        name="latitude"
                        label="Latitude"
                        type="latitude"
                        value={formik.values.latitude}
                        // onChange={formik.handleChange}
                        error={formik.touched.latitude && Boolean(formik.errors.latitude)}
                        helperText={formik.touched.latitude && formik.errors.latitude}
                    />
                    <TextField
                        fullWidth
                        style={{ width: "50%", margin: "10px" }}
                        id="longitude"
                        name="longitude"
                        label="Longitude"
                        type="longitude"
                        value={formik.values.longitude}
                        // onChange={formik.handleChange}
                        error={formik.touched.longitude && Boolean(formik.errors.longitude)}
                        helperText={formik.touched.longitude && formik.errors.longitude}
                    />
                </Stack>
                {/* Date Picker Integration https://mui.com/x/react-date-pickers/getting-started/ */}
                <Button
                    color="primary"
                    variant="contained"
                    fullWidth
                    type="submit"
                    style={{ width: "90%", margin: "10px" }}
                >
                    Submit
                </Button>
            </form>
        </Sidebar>
    )
}

export default YardSalesCreate