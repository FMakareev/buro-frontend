export const ButtonVariant = {
  primary: {
    fontFamily: 'Montserrat Medium',
    fontSize: '24px',
    lineHeight: '32px',
    borderRadius: '4px',
    backgroundColor: '#093971',
    color: '#ffffff',
    fill: '#ffffff',
    cursor: 'pointer',
    ':hover': {
      backgroundColor: '#61C3E2',
    },
    '&.isActive': {
      backgroundColor: '#072C57',
    },
    ':active': {
      backgroundColor: '#072C57',
    },
    ':focus': {
      boxShadow: '0 0 0 5px #61C3E2',
    },
    ':disabled': {
      backgroundColor: '#A2A2A2 !important',
      cursor: 'default',
      ':hover': {
        backgroundColor: '#A2A2A2',
      },
      ':active': {
        backgroundColor: '#A2A2A2',
      },
    },
  },
  secondary: {
    fontFamily: 'Montserrat Medium',
    fontSize: '16px',
    lineHeight: '24px',
    borderRadius: '4px',
    backgroundColor: '#E7EDF8',
    color: '#093971',
    fill: '#093971',
    cursor: 'pointer',
    ':hover': {
      backgroundColor: '#0F60BD',
      color: '#ffffff',
      fill: '#ffffff',
    },
    '&.isActive': {
      backgroundColor: '#072C57',
      color: '#ffffff',
      fill: '#ffffff',
    },
    ':active': {
      backgroundColor: '#072C57',
      color: '#ffffff',
      fill: '#ffffff',
    },
    ':focus': {
      boxShadow: '0 0 0 5px #61C3E2',
    },
    ':disabled': {
      backgroundColor: '#E7EDF8',
      color: '#093971',
      cursor: 'default',

      ':hover': {
        backgroundColor: '#E7EDF8',
        color: '#093971',
        cursor: 'default',
      },
      ':active': {
        backgroundColor: '#E7EDF8',
        color: '#093971',
        cursor: 'default',
      },
    },
  },
  transparent: {
    fontFamily: 'Montserrat Medium',
    fontSize: '16px',
    lineHeight: '24px',
    borderRadius: '4px',
    border: '1px solid #093971',
    backgroundColor: '#ffffff',
    color: '#093971',
    fill: '#093971',
    cursor: 'pointer',
    ':hover': {
      backgroundColor: '#0F60BD',
      borderColor: '#0F60BD',
      color: '#ffffff',
      fill: '#ffffff',
    },
    ':active': {
      borderColor: '#072C57',
      backgroundColor: '#072C57',
      color: '#ffffff',
      fill: '#ffffff',
    },
    '&.isActive': {
      borderColor: '#072C57',
      backgroundColor: '#072C57',
      color: '#ffffff',
      fill: '#ffffff',
    },
    ':focus': {
      boxShadow: '0 0 0 5px #61C3E2',
    },
    ':disabled': {
      borderColor: '#E7EDF8',
      backgroundColor: '#E7EDF8',
      color: '#093971',
      cursor: 'default',

      ':hover': {
        borderColor: '#E7EDF8',

        backgroundColor: '#E7EDF8',
        color: '#093971',
        cursor: 'default',
      },
      ':active': {
        borderColor: '#E7EDF8',
        backgroundColor: '#E7EDF8',
        color: '#093971',
        cursor: 'default',
      },
    },
  },
  error: {
    fontFamily: 'Montserrat Medium',
    fontSize: '24px',
    lineHeight: '32px',
    borderRadius: '4px',
    backgroundColor: '#EB5757',
    color: '#ffffff',
    fill: '#ffffff',
    cursor: 'pointer',
    ':hover': {
      backgroundColor: '#61C3E2',
    },
    '&.isActive': {
      backgroundColor: '#EB5757',
    },
    ':active': {
      backgroundColor: '#EB5757',
    },
    ':focus': {
      boxShadow: '0 0 0 5px #61C3E2',
    },
    ':disabled': {
      backgroundColor: '#A2A2A2 !important',
      cursor: 'default',
      ':hover': {
        backgroundColor: '#A2A2A2',
      },
      ':active': {
        backgroundColor: '#A2A2A2',
      },
    },
  },
};

export default ButtonVariant;
