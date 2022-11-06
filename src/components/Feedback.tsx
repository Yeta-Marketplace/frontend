
import { useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Typography from '@mui/material/Typography';


import { IFeedbackCreate } from '../interfaces/feedback';

import { FeedbackService } from '../services/client'

type Props = {}

function Feedback({ }: Props) {

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [loading, setLoading] = useState(false);

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
        setLoading(true);
        const response = await FeedbackService.submitFeedback(data).then(_ => {
          formik.resetForm();
          setOpenSnackbar(true);
        }).finally(() => setLoading(false));
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
        <LoadingButton
          loading={loading}
          // loadingIndicator="Sending..."
          color="secondary"
          variant="contained"
          fullWidth
          type="submit"
          size='large'
          sx={{ mt: 1, mb: 12 }}
        >
          Submit
        </LoadingButton>
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