import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Flex,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Alert,
} from '@chakra-ui/react';
import { useFormik } from 'formik';

import validationSchema from './validations';
import { fetchRegister } from '../../../api';
import { useAuth } from '../../../contexts/AuthContext';

function Signup() {
  const { login } = useAuth();
  let navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      passwordConfirm: '',
    },
    validationSchema,
    onSubmit: async (values, bag) => {
      try {
        const registerResponse = await fetchRegister({
          email: values.email,
          password: values.email,
        });

        login(registerResponse);
        navigate('/profile');
      } catch (error) {
        bag.setErrors({ general: error.response.data.message });
      }
    },
  });
  return (
    <div>
      <Flex align="center" width={'full'} justifyContent={'center'}>
        <Box pt={10}>
          <Box textAlign={'center'}>
            <Heading>Sign Up</Heading>
          </Box>
          <Box my={5}>
            {formik.errors.general && (
              <Alert status="error">{formik.errors.general}</Alert>
            )}
          </Box>
          <Box my={5} textAlign={'left'}>
            <form action="" method="post" onSubmit={formik.handleSubmit}>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                  name="email"
                  required
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  isInvalid={formik.touched.email && formik.errors.email}
                ></Input>
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Password</FormLabel>
                <Input
                  name="password"
                  type={'password'}
                  required
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  isInvalid={formik.touched.password && formik.errors.password}
                ></Input>
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>password Confirm</FormLabel>
                <Input
                  name="passwordConfirm"
                  type={'password'}
                  required
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.passwordConfirm}
                ></Input>
              </FormControl>

              <Button mt={4} width={'full'} type={'submit'}>
                Sign Up
              </Button>
            </form>
          </Box>
        </Box>
      </Flex>
    </div>
  );
}

export default Signup;
