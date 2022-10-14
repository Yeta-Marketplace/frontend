
import { ILocation } from '../../interfaces/location';
import { IYardSaleCreate } from '../../interfaces/yardsale'

import Alert from '@mui/material/Alert';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AddYardSaleIcon from '@mui/icons-material/AddLocationAlt';

import { useFormik } from 'formik';
import { useState } from 'react';

import { api } from '../../services/api';

type Props = {
  location: ILocation
}

function YardSalesAdd({ location }: Props) {

  // Use SNACKBAR in the future: https://mui.com/material-ui/react-snackbar/
  const [successMsg, setSuccessMsg] = useState("");

  const initialValues: IYardSaleCreate = {
    description: '',
    latitude: location.latitude,
    longitude: location.longitude,
    start_date: new Date(),
    end_date: new Date(),
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      async function createYardSale() {
        const response = await api.createYardSaleOpen(values);
        setSuccessMsg("Yard Sale added Successfully!");
      }
      createYardSale();
    },
  });

  formik.values.latitude = location.latitude;
  formik.values.longitude = location.longitude;

  return (
    <Container>
      {successMsg && <Alert severity="success"> {successMsg} </Alert>}
      <Typography variant='h2' m={2} mt={4} textAlign='center' color='secondary' fontWeight='500'>Add Yard Sale!</Typography>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="description"
          name="description"
          label="Description"
          value={formik.values.description}
          onChange={formik.handleChange}
          error={formik.touched.description && Boolean(formik.errors.description)}
          helperText={formik.touched.description && formik.errors.description}
        />
        <Typography variant='h5' m={1} textAlign='left'>Drag <AddYardSaleIcon color='secondary' /> to Change Location</Typography>
        <Stack direction="row" spacing={2}>
          <TextField
            fullWidth
            style={{ width: "50%", margin: "10px 10px 10px 0px" }}
            id="latitude"
            name="latitude"
            label="Latitude"
            type="latitude"
            value={formik.values.latitude}
            error={formik.touched.latitude && Boolean(formik.errors.latitude)}
            helperText={formik.touched.latitude && formik.errors.latitude}
          />
          <TextField
            fullWidth
            style={{ width: "50%", margin: "10px 0px 10px 0px" }}
            id="longitude"
            name="longitude"
            label="Longitude"
            type="longitude"
            value={formik.values.longitude}
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
          size='large'
          sx={{ mt: 1, mb: 12 }}
        >
          Submit
        </Button>
      </form>
    </Container>
  )
}

export default YardSalesAdd