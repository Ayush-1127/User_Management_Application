import React, { useEffect } from 'react';
import { Modal, Button, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import validator from 'validator';

const ModalForm = ({ open, handleClose, addUser, editUser, isEditing, currentUser }) => {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      username: 'USER-' + Math.random().toString(36).substring(2, 7).toUpperCase(),
      address: { street: '', city: '' },
      companyName: '',
      website: '',
    },
    validate: (values) => {
      const errors = {};
      
      if (!values.name) {
        errors.name = 'Name is required';
      } else if (values.name.length < 3) {
        errors.name = 'Name must be at least 3 characters';
      }

      if (!values.email) {
        errors.email = 'Email is required';
      } else if (!isValidEmail(values.email)) {
        errors.email = 'Invalid email format';
      }

      if (!values.phone) {
        errors.phone = 'Phone number is required';
      } else if (!isValidPhone(values.phone)) {
        errors.phone = 'Phone number must be valid';
      }

      if (!values.address.street) {
        errors.address = errors.address || {};
        errors.address.street = 'Street address is required';
      }

      if (!values.address.city) {
        errors.address = errors.address || {};
        errors.address.city = 'City is required';
      }

      if (values.companyName && values.companyName.length < 3) {
        errors.companyName = 'Company Name must be at least 3 characters';
      }

      if (values.website && !isValidURL(values.website)) {
        errors.website = 'Invalid URL format';
      }

      return errors;
    },
    onSubmit: (values) => {
      if (isEditing) {
        editUser(values);
      } else {
        addUser(values);
      }
      handleClose();
    },
  });

  useEffect(() => {
    if (isEditing && currentUser) {
      formik.setValues({
        ...currentUser,
      });
    } else {
      formik.resetForm();
    }
  }, [isEditing, currentUser, formik]);

  const isValidEmail = (email) => validator.isEmail(email);
  const isValidPhone = (phone) => validator.isMobilePhone(phone, 'any', { strictMode: false });
  const isValidURL = (url) => validator.isURL(url);

  return (
    <Modal open={open} onClose={handleClose}>
      <div style={{ padding: '20px', maxWidth: '500px', margin: 'auto', backgroundColor: '#fff' }}>
        <Typography variant="h6">{isEditing ? 'Edit User' : 'Create User'}</Typography>
        
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            label="Name"
            {...formik.getFieldProps('name')}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <TextField
            fullWidth
            label="Email"
            {...formik.getFieldProps('email')}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            fullWidth
            label="Phone"
            {...formik.getFieldProps('phone')}
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            helperText={formik.touched.phone && formik.errors.phone}
          />
          <TextField
            fullWidth
            label="Username"
            {...formik.getFieldProps('username')}
            InputProps={{
              readOnly: isEditing, // Make it non-editable only when editing
            }}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />
          <TextField
            fullWidth
            label="Street"
            {...formik.getFieldProps('address.street')}
            error={formik.touched.address?.street && Boolean(formik.errors.address?.street)}
            helperText={formik.touched.address?.street && formik.errors.address?.street}
          />
          <TextField
            fullWidth
            label="City"
            {...formik.getFieldProps('address.city')}
            error={formik.touched.address?.city && Boolean(formik.errors.address?.city)}
            helperText={formik.touched.address?.city && formik.errors.address?.city}
          />
          <TextField
            fullWidth
            label="Company Name"
            {...formik.getFieldProps('companyName')}
            error={formik.touched.companyName && Boolean(formik.errors.companyName)}
            helperText={formik.touched.companyName && formik.errors.companyName}
          />
          <TextField
            fullWidth
            label="Website"
            {...formik.getFieldProps('website')}
            error={formik.touched.website && Boolean(formik.errors.website)}
            helperText={formik.touched.website && formik.errors.website}
          />
          
          <div style={{ marginTop: '20px' }}>
            <Button type="submit" variant="contained" color="primary" style={{ marginRight: '10px' }}>
              {isEditing ? 'Update User' : 'Create User'}
            </Button>
            <Button variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default ModalForm;
