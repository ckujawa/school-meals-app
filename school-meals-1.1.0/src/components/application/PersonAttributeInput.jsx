import React, { Component, PropTypes } from 'react'
import { observer } from 'mobx-react'
import Checkbox from './Checkbox'
import Checkboxes from './Checkboxes'
import InputField from './InputField'
import Select from './Select'

@observer
class PersonAttributeInput extends Component {

  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.props.person[event.target.name] = event.target.value
  }

  render() {
    const { field, person } = this.props
    const selectValue = field[field.name]

    switch (field.dataType) {
      case PropTypes.bool:
        return <div>
          <br />
          <Checkboxes legend="Child attributes">
            <Checkbox
                name={field.name}
                object={person}
            >
              <strong>{field.label}</strong>
            </Checkbox>
          </Checkboxes>
        </div>
      case PropTypes.array:
        return <Select object={person} id={field.name} name={field.name} onChange={this.handleChange} value={selectValue}>
          <option value="" selected disabled>{`${field.name}...`}</option>
          {field.arrayValues.map((value, index) =>
            <option key={index} value={value}> {value}</option>
          )}
        </Select>
      default:
        return <InputField
            label={field.label}
            name={field.name}
            object={person}
            placeholder={field.placeholder}
            required={!!field.required}
               />
    }
  }
}

PersonAttributeInput.propTypes = {
  person: PropTypes.object.isRequired,
  field: PropTypes.object.isRequired
}

export default PersonAttributeInput
