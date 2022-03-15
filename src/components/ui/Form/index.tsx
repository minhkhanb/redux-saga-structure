/* eslint-disable @typescript-eslint/no-explicit-any */
import styled from '@emotion/styled';
import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { FunctionComponent } from 'react';
import ReactDOM from 'react-dom';
import {
  Controller,
  FormProvider,
  FormStateProxy,
  useForm,
  useFormContext,
  UseFormReturn,
} from 'react-hook-form';
import { useId } from 'react-id-generator';
import useDebouncedCallback from '@src/hooks/useDebouncedCallback';
import { withProperties } from '@src/utils/type';
import * as yup from 'yup';
import Button from '../Button';
import DirtyFormContext from '@src/components/Router/DirtyFormContext';
import * as Yup from 'yup';
import Lazy from 'yup/lib/Lazy';

yup.setLocale({
  mixed: {
    default: 'This field is invalid.',
    required: 'This field is required.',
  },
  string: {
    email: 'Please provide a valid email address.',
    url: 'Please provide a valid URL.',
  },
});
enum SubmitMode {
  onSubmitButton = 'onSubmitButton',
  onChangeDebounced = 'onChangeDebounced',
}

type Value = string | number | boolean | DefaultValues;
interface DefaultValues {
  [key: string]: Value | Value[];
}

export interface FormProps {
  className?: string;
  children?: any;
  /**  Specify when onSubmit is called. */
  submitMode?: SubmitMode;
  onSubmit?: (
    values: any,
    defaultValues?: any,
    formState?: FormStateProxy,
    formHandlers?: UseFormReturn<any>,
  ) => any;
  validationSchema?: Yup.AnyObjectSchema | Lazy<any>;
  defaultValues?: any;
  mode?: 'onBlur' | 'onSubmit' | 'onChange' | undefined;
}

interface FieldLabelProps {
  title: any;
  className?: string;
}

interface FormComponent extends React.FC<FormProps> {
  Field: any;
  FieldLabel: React.FunctionComponent<FieldLabelProps>;
  ErrorMessage: React.FunctionComponent<any>;
}

interface Errors {
  [key: string]: string;
}

interface FormOptions {
  submitMode?: SubmitMode;
  onSubmit?: (
    values: any,
    defaultValues?: any,
    formState?: FormStateProxy,
    formHandlers?: UseFormReturn<any>,
  ) => any;
  formId: string;
  imageUpload: { [key: string]: boolean };
  setImageUpload: React.Dispatch<{ [key: string]: any }>;
}

export class SubmitError extends Error {
  errors: Errors;

  constructor(errors: Errors) {
    super('SubmitError');
    this.name = 'SubmitError'; // (2)
    this.errors = errors;
  }
}

export const FormOptionsContext = React.createContext<FormOptions | any>({});

const Form: FormComponent = ({
  mode = 'onSubmit',
  validationSchema,
  submitMode = SubmitMode.onSubmitButton,
  defaultValues = {},
  ...props
}: FormProps) => {
  const formHandlers = useForm({
    mode,
    resolver: validationSchema && yupResolver(validationSchema),
    defaultValues,
  });
  React.useEffect(() => {
    // Don't reset if dirty
    // The reality is this should only reset if any of the fields this form cares
    // about have changed - not any field in defaultValues

    if (defaultValues && !formHandlers.formState.isDirty) {
      formHandlers.reset(defaultValues);
    }
  }, [formHandlers.reset, JSON.stringify(defaultValues)]);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // this part is for stopping parent forms to trigger their submit
    if (event) {
      // sometimes not true, e.g. React Native
      if (typeof event.preventDefault === 'function') {
        event.preventDefault();
      }
      if (typeof event.stopPropagation === 'function') {
        // prevent any outer forms from receiving the event too
        event.stopPropagation();
      }
    }
    return formHandlers.handleSubmit(async values => {
      // const values = formHandlers.getValues({ nest: true })
      try {
        // values && formHandlers.reset(flatObject(values))
        if (props.onSubmit) {
          await props.onSubmit(
            values,
            defaultValues,
            formHandlers.formState,
            formHandlers,
          );
        }

        // const formValues = formHandlers.getValues();
        formHandlers.reset(defaultValues);
      } catch (e) {
        console.info('SUBMIT ERROR: ', typeof e, ' >', e, '<');
        if (e instanceof SubmitError && e.errors) {
          Object.keys(e.errors).map(name =>
            formHandlers.setError(name, {
              type: 'error',
              message: (e as any).errors[name],
            }),
          );
        } else {
          formHandlers.setError('_', {
            type: 'error',
            message: (e as any).toString(),
          });
        }
      }
    })(event);
  };

  // create state for uploading image
  const [imageUpload, setImageUpload] = React.useState({});

  const formRef = React.useRef<HTMLFormElement>(null);
  const [formId] = useId();

  // read dirty form context
  const { forms, setForms } = React.useContext(DirtyFormContext);

  // update dirty form context when dirty state changes
  React.useEffect(
    () =>
      // form unmount
      () => {
        const newState = { ...forms };
        delete newState[formId];
        setForms(newState);
      },
    [formHandlers.formState.isDirty, formHandlers.formState.isSubmitting],
  );

  return (
    <FormOptionsContext.Provider
      value={{ submitMode, onSubmit, formId, imageUpload, setImageUpload }}
    >
      <FormProvider {...formHandlers}>
        <form {...props} id={formId} onSubmit={onSubmit} ref={formRef}>
          {props.children}
        </form>
      </FormProvider>
    </FormOptionsContext.Provider>
  );
};

Form.FieldLabel = ({ title, className }: any) => (
  <div className={`text-md ${className}`}>{title}</div>
);

Form.FieldLabel.displayName = 'FieldLabel';

interface FieldProps {
  name: string;
  component: any;
  errors: any;
  onChange?: any;
  className?: string;
  type?: string;
}

Form.Field = styled(
  ({ name, className, component, errors, ...props }: FieldProps) => {
    const {
      formState: { errors: contextErrors },
    } = useFormContext();

    return (
      <div className={`flex flex-col mb-4 ${className}`}>
        <Form.Field.Input
          {...props}
          name={name}
          component={component}
          onChange={props.onChange}
        />
        {props.type !== 'hidden' && (
          <ErrorMessage
            errors={errors}
            name={name}
            render={({ message }: any) => {
              const msg = message || contextErrors[name]?.value?.message || '';

              return <div className="error-message">{msg}</div>;
            }}
          />
        )}
      </div>
    );
  },
)``;

Form.Field.Input = styled(({ component, inputRef, ...props }: any) => {
  const { onSubmit, submitMode } = React.useContext(FormOptionsContext);
  const formHandlers = useFormContext();

  const onSubmitDebounced = useDebouncedCallback(async () => {
    // const values = formHandlers.getValues({ nest: true })
    if (submitMode === SubmitMode.onChangeDebounced) {
      await onSubmit();
    }
  });

  const { control } = formHandlers;

  const onChange = (evt: any) => {
    onSubmitDebounced();
    if (props.onChange) {
      props.onChange(evt);
    }

    return evt;
  };

  const Component = component;

  return (
    <Controller
      {...props}
      onChange={onChange}
      render={({ field: { value, name, onChange: onChangeField } }) => {
        const onChangeHandler = (evt: any) => {
          onChange(evt);
          onChangeField(evt);
        };

        return (
          <Component
            value={value}
            placeholder={props.placeholder}
            {...props}
            name={name}
            onChange={(evt: any) => onChangeHandler(evt)}
            inputRef={inputRef}
          />
        );
      }}
      control={control}
      {...(inputRef ? { inputRef } : {})}
    />
  );
})``;

interface SubmitButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  dirtyText?: string;
  cleanText?: string;
  children?: any;
  containerId?: string;
  className?: string;
  disabled?: boolean;
  hideOnClean?: boolean;
  button?: FunctionComponent;
  submitting?: boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  containerId,
  hideOnClean,
  submitting,
  ...props
}) => {
  const { formState } = useFormContext();
  const { formId, imageUpload } = React.useContext(FormOptionsContext);

  // is there any image uploading
  const isImageUploading =
    imageUpload && Object.values(imageUpload).includes(true);

  const { isSubmitting, isDirty, isValid, isSubmitted } = formState;

  if (!isDirty && hideOnClean) {
    return null;
  }

  const disabled =
    props.disabled ||
    isSubmitting ||
    (!isDirty && !isValid && isSubmitted) ||
    isImageUploading;

  const hasErrors = !isDirty && !isValid && isSubmitted && !isSubmitting;

  const children = (
    <Button.Submit
      dirty={isDirty}
      submitting={isSubmitting || !!submitting}
      disabled={disabled}
      formId={formId}
      {...props}
      className={`${hasErrors ? 'bg-color-error' : ''} ${props.className}`}
    />
  );

  if (containerId) {
    const el = document.getElementById(containerId);

    return el ? ReactDOM.createPortal(children, el) : null;
  }
  return children;
};

interface FormErrorMessageProps {
  className?: string;
  message?: string;
}

Form.ErrorMessage = ({
  className,
  message = 'Please check required fields and errors in this form.',
}: FormErrorMessageProps) => {
  const {
    formState: { errors },
  } = useForm();

  let errorMessage = '';
  if (Object.entries(errors).length > 0) {
    errorMessage = errors._ ? errors._.message : message;
  }

  if (!errorMessage || errorMessage.length === 0) {
    return null;
  }

  return <div className={className}>{errorMessage}</div>;
};

Form.ErrorMessage.displayName = 'ErrorMessage';

export default withProperties(Form, { SubmitMode, SubmitButton });
