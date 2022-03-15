/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import { Form, Input } from 'src/components/ui';
import { FormProps } from 'src/components/ui/Form';

const ApolloForm: React.FC<FormProps> = ({ ...props }) => (
  <Form
    {...props}
    onSubmit={async (values, defaultValues, formState, formHandlers) => {
      try {
        if (props.onSubmit) {
          await props.onSubmit(values, defaultValues, formState, formHandlers);
        }
      } catch (e: any) {
        console.error('Form Error: ', e);

        if (e.name === 'SubmitError') {
          throw e;
        }

        throw e;
      }
    }}
  >
    <Form.Field name="id" component={Input} type="hidden" className="hidden" />
    {props.children}
  </Form>
);

export default ApolloForm;
