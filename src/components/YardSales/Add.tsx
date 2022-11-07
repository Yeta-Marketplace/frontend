
import { ILocation } from '../../interfaces/location';

import Alert from '@mui/material/Alert';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AddYardSaleIcon from '@mui/icons-material/AddLocationAlt';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { useFormik } from 'formik';
import { useState } from 'react';
import { Moment } from 'moment';
import moment from 'moment';

import { YardsalesService, YardSaleCreate } from '../../services/client'


type Props = {
  location: ILocation
  token: string | null
}

function YardSalesAdd({ location, token }: Props) {

  // Use SNACKBAR in the future: https://mui.com/material-ui/react-snackbar/
  const [successMsg, setSuccessMsg] = useState("");
  const [startDate, setStartDate] = useState<Moment>(moment());
  const [endDate, setEndDate] = useState<Moment>(moment());

  const initialValues: YardSaleCreate = {
    description: '',
    latitude: location.latitude,
    longitude: location.longitude,
    start_date: startDate.format('YYYY-MM-DD'),
    end_date: endDate.format('YYYY-MM-DD'),
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      async function createYardSale() {
        if (!token) {
          await YardsalesService.createYardsaleOpen(values);
        } else {
          await YardsalesService.createYardsale(values);
        }
        setSuccessMsg("Yard Sale added Successfully! Refresh page");
      }
      createYardSale();
    },
  });


  const handleStartDateChange = (newDate: string | null) => {
    if (newDate === null) return;

    const newDateMoment = moment(newDate);
    const newDateString = newDateMoment.format('YYYY-MM-DD');

    formik.values.start_date = newDateString;
    setStartDate(newDateMoment);

    // Decided to change start date as well, as it feels more intuitive
    formik.values.end_date = newDateString;
    setEndDate(newDateMoment);
  };


  const handleEndDateChange = (newDate: string | null) => {
    if (newDate === null) return;

    const newDateMoment = moment(newDate);
    const newDateString = newDateMoment.format('YYYY-MM-DD');

    formik.values.end_date = newDateString;
    setEndDate(newDateMoment);
  };


  formik.values.latitude = location.latitude;
  formik.values.longitude = location.longitude;

  return (
    <Container>
      {successMsg && <Alert severity="success"> {successMsg} </Alert>}
      {/* TODO: Make below smaller on phones */}
      <Typography sx={{ typography: { sm: 'h2', xs: 'h4' } }} m={2} mt={4} textAlign='center' color='secondary' fontWeight='500'>Add Yard Sale!</Typography>
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
        <Stack direction="row" spacing={2} mt={2}>
          <DatePicker
            disablePast
            label="Start Date"
            value={formik.values.start_date}
            onChange={handleStartDateChange}
            renderInput={(params) => <TextField style={{ width: "50%", margin: "10px 10px 10px 0px" }} {...params} />}
          />
          <DatePicker
            disablePast
            label="End Date"
            value={formik.values.end_date}
            onChange={handleEndDateChange}
            renderInput={(params) => <TextField style={{ width: "50%", margin: "10px 10px 10px 0px" }} {...params} />}
          />
        </Stack>
        <Typography sx={{ typography: { sm: 'h5', xs: 'body1' } }} m={1} textAlign='left'>Drag <AddYardSaleIcon color='secondary' /> to Change Location</Typography>
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