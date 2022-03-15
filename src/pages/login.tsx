import React from 'react';
import { navigate } from 'gatsby';
import AppForm from '@src/components/AppForm';
import { Button, Form, Input } from '@src/components/ui';
import * as yup from 'yup';

const validationSchema = yup.object().shape({
  email: yup.string().required('Email invalid'),
  password: yup.string(),
});

const LoginPage = () => {
  const clientId = process.env.GATSBY_GITHUB_CLIENT_ID;

  const githubAuthorize = (email: string) =>
    navigate(
      `https://github.com/login/oauth/authorize?scope=${email}&client_id=${clientId}`,
    );

  type LoginData = {
    email: string;
    password: string;
  };

  const defaultValues: LoginData = {
    email: '',
    password: '',
  };

  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign In
          </h2>
        </div>
        <AppForm
          className="mt-8"
          validationSchema={validationSchema}
          defaultValues={defaultValues}
          onSubmit={async (data: LoginData) => {
            try {
              console.log('submit data: ', data);
              githubAuthorize(data.email);
            } catch (err) {
              console.log('err api: ', err);
            }
          }}
        >
          <Form.Field
            name="remember"
            type="hidden"
            value="true"
            placeholder="Email address"
            component={Input}
          />

          <Form.FieldLabel title="Email address" />
          <Form.Field
            name="email"
            type="email"
            placeholder="Email address"
            component={Input}
          />

          <Form.FieldLabel className="sr-only" title="Password" />
          <Form.Field
            name="password"
            type="password"
            placeholder="Password"
            component={Input}
            className="sr-only"
          />

          <div className="flex items-center justify-between my-6 sr-only">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                {' '}
                Remember me{' '}
              </label>
            </div>

            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                {' '}
                Forgot your password?{' '}
              </a>
            </div>
          </div>

          <div className="text-center">
            <Button
              type="submit"
              className="group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign In
            </Button>
          </div>
        </AppForm>
      </div>
    </div>
  );
};

export default LoginPage;
