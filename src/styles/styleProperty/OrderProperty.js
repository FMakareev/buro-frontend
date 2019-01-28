export const OrderProperty = ({theme, order, ...rest}) => {

  console.log('OrderProperty:', rest);
  console.log('OrderProperty:', theme);
  try {
    if (order) {
      if (Array.isArray(order)) {
        let style = ``;
        order.forEach((item, index) => {
          if (index === 0) {
            style += `order: ${item};`;
          } else {
            if (theme && theme.breakpoints && Array.isArray(theme.breakpoints) && index < theme.breakpoints.length) {
              style += `@media(min-width: ${theme.breakpoints[index]}){
		          order: ${item};
		        }`;
            }
          }
        });
        return style;
      } else if (order) {
        return `order: ${order};`;
      }
    }
  } catch (error) {
    console.log(error);
    return '';
  }
};

export default OrderProperty;
