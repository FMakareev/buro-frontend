import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Select, {components} from 'react-select';
import {Relative} from '../Relative/Relative';
import {Text} from "../Text/Text";
import {SvgDropdownIndicator} from "../Icons/SvgDropdownIndicator";

const DropdownIndicator = (props) => {

  return components.DropdownIndicator && (
    <components.DropdownIndicator {...props}>
      <Text fill={'color5'} lineHeight={0} fontSize={11}>
        <SvgDropdownIndicator/>
      </Text>
    </components.DropdownIndicator>
  );
};
const Option = ({children, ...props}) => (
  <components.Option  {...props} className={`react-select-option-${props.selectProps.name}-${props.value}`}>
    {children}
  </components.Option>
);

const Menu = ({children, ...props}) =>  (
  <components.Menu {...props} className={`react-select-menu-${props.selectProps.name}`}>
    {children}
  </components.Menu>
);


/**
 * Компонент селекта (SelectBase)
 * @example ./SelectBase.example.md
 */

export class SelectBase extends Component {
  static propTypes = {
    /** input */
    input: PropTypes.object.isRequired,
    // label: PropTypes.oneOfType([ PropTypes.object, PropTypes.string ]),
    // type: PropTypes.string.isRequired,
    // mods: PropTypes.oneOfType([ PropTypes.object, PropTypes.bool ]),
    options: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
    // meta: PropTypes.object.isRequired
    labelKey: PropTypes.string,
    /**  value key input */
    valueKey: PropTypes.string,
    /** input value seelct */
    selectValue: PropTypes.string,
    /** loading */
    loading: PropTypes.bool,
    defaultOptions: PropTypes.object,
    placeholder: PropTypes.string,
  };

  static defaultProps = {
    mods: false,
    options: [],
    placeholder: '',
  };

  constructor(props) {
    super(props);
    this.state = this.initialState;
  }

  get initialState() {
    return {};
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (
      nextProps.input.value !== this.props.input.value ||
      nextProps.options.length !== this.props.options.length ||
      nextProps.loading !== this.props.loading
    ) {
      return true;
    }
    return false;
  }

  // componentDidMount() {
  //   const {
  //     input: { onChange },
  //     selectValue,
  //   } = this.props;
  //   if (selectValue) {
  //     onChange(selectValue);
  //   }
  // }

  onChange = event => {
    const {input, valueKey} = this.props;
    input.onChange(event ? event[valueKey] : null);
  };

  render() {
    const {
      input,
      options,
      disabled,
      labelKey,
      valueKey,
      selectValue,
      loading,
      defaultOptions,
      placeholder,
      styles,
      meta
    } = this.props;
    return (
      <Relative
        data-test-id={`select-name-${input.name}`}
      >
        <Select
          defaultOptions={defaultOptions}
          selectValue={selectValue}
          name={input.name}
          meta={meta}
          components={{DropdownIndicator, Option, Menu}}
          onBlur={(event) => input.onBlur(event[valueKey])}
          onFocus={input.onFocus}
          options={options}
          labelKey={labelKey}
          valueKey={valueKey}
          onChange={this.onChange}
          disabled={disabled}
          placeholder={placeholder}
          styles={styles}
          // menuIsOpen={true}
        />
      </Relative>
    );
  }
}

export default SelectBase;
