/* eslint-disable @typescript-eslint/no-explicit-any,@typescript-eslint/no-empty-function */
import React from 'react';

export interface DirtyFormStateInterface {
  dirty: boolean;
  isSubmitting: boolean;
  submit: any;
  reset: any;
  triggerValidation?: (
    payload?: string | string[] | undefined,
    shouldRender?: boolean | undefined,
  ) => Promise<boolean>;
}

interface DirtyForm {
  forms: { [key: string]: DirtyFormStateInterface };
  setForms: React.Dispatch<{ [key: string]: DirtyFormStateInterface }>;
}

const DirtyFormContext = React.createContext<DirtyForm>({
  forms: {},
  setForms: () => {},
});

export default DirtyFormContext;
