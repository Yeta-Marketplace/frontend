
import { useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Typography from '@mui/material/Typography';


import { api } from '../services/api'
import { IFeedbackCreate } from '../interfaces/feedback';

type Props = {
  token: string
}

function Feedback({ token }: Props) {

  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };


  const initialValues: IFeedbackCreate = {
    description: '',
  };

  const validationSchema = Yup.object({
    description: Yup.string()
      .required('Description is required')
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (data) => {
      async function createFeedback() {
        const response = await api.createFeedback(token, data);
        formik.resetForm();
        setOpenSnackbar(true);
      }
      createFeedback();
    },
  });

  return (
    <Container>
      {/* TODO: Make below smaller on phones */}
      <Typography sx={{ typography: { sm: 'h3', xs: 'h5' } }} m={2} mt={10} textAlign='center' color='secondary' fontWeight='500'>Send Feedback!</Typography>
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
          multiline
          minRows={12}
        />
        <Button
          color="secondary"
          variant="contained"
          fullWidth
          type="submit"
          size='large'
          sx={{ mt: 1, mb: 12 }}
        >
          Submit
        </Button>
      </form>

      <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'left' }} open={openSnackbar} autoHideDuration={10000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Feedback submitted! Thank YOU!!!
        </Alert>
      </Snackbar>
    </Container>
  )
}

export default Feedback