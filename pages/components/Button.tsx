import styled from "@emotion/styled";

const myButtonStyles: any = {
  primary: {
    backgroundColor: 'rgba(255, 255, 255, 1)',
    color: 'rgba(25, 118, 210, 1)',

    ':hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
    }
  },
  cancel: {
    borderColor: 'rgba(0, 0, 0, 1)',
    color: 'rgba(0, 0, 0, 1)',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',

    ':hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
    }
  },
  submit: {
    borderColor: 'rgba(25, 118, 210, 1)',
    color: 'rgba(255, 255, 255, 1)',
    backgroundColor: 'rgba(25, 118, 210, 1)',

    ':hover': {
      backgroundColor: 'rgba(22, 103, 184, 1)',
    }
  },
  link: {
    border: 'none',
    color: 'rgba(0, 0, 0, 1)',
    backgroundColor: 'rgba(255, 255, 255, 1)',
    textDecoration: 'underline',

    ':hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
    }
  },
  disabled: {
    border: 'rgba(0, 0, 0, 0.2)',
    color: 'rgba(0, 0, 0, 0.2)',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    
    ':hover': {
      cursor: 'not-allowed',
    },
  },
};

const Button = styled.button({
  padding: '4px 8px',
  borderRadius: '6px',
  border: 'solid 1px rgba(0, 0, 0, 0.1)',

  ':hover': {
    cursor: 'pointer',
  },
},
(props: ButtonPropType) => {
  if (props.disabled) return 
  return myButtonStyles[props.variant!]
});

interface ButtonPropType extends React.ComponentPropsWithoutRef<"button"> {
  isDisabled?: boolean,
  isLoading?: boolean,
  children: string,
  variant?: string,
};

const MyButton = ({ children, isLoading, isDisabled, variant = 'primary', ...props }: ButtonPropType) => (
  <Button disabled={isDisabled || isLoading} variant={variant} { ...props }>
    {isLoading ? 'Loading' : children}
  </Button>
);

export default MyButton;