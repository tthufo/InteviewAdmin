import React, { Fragment } from 'react';
import {
  FormGroup, Label, CustomInput,
} from 'reactstrap';

export default class WizardStep2 extends React.Component {
  render() {
    return (
      <Fragment>
        <div className="form-wizard-content">
          <h3 className="form-heading pt-3 pb-3">
                        Account Information
            <p>Enter your user informations below</p>
          </h3>
          <FormGroup>
            <Label for="exampleCheckbox">Checkboxes</Label>
            <div>
              <CustomInput type="checkbox" id="exampleCustomCheckbox" label="Check this custom checkbox" />
              <CustomInput type="checkbox" id="exampleCustomCheckbox2" label="Or this one" />
              <CustomInput
                type="checkbox"
                id="exampleCustomCheckbox3"
                label="But not this disabled one"
                disabled
              />
            </div>
          </FormGroup>
          <FormGroup>
            <Label for="exampleCheckbox">Radios</Label>
            <div>
              <CustomInput
                type="radio"
                id="exampleCustomRadio"
                name="customRadio"
                label="Select this custom radio"
              />
              <CustomInput type="radio" id="exampleCustomRadio2" name="customRadio" label="Or this one" />
              <CustomInput
                type="radio"
                id="exampleCustomRadio3"
                label="But not this disabled one"
                disabled
              />
            </div>
          </FormGroup>
          <FormGroup>
            <Label for="exampleCheckbox">Inline</Label>
            <div>
              <CustomInput
                type="checkbox"
                id="exampleCustomInline"
                label="An inline custom input"
                inline
              />
              <CustomInput type="checkbox" id="exampleCustomInline2" label="and another one" inline />
            </div>
          </FormGroup>
          <FormGroup>
            <Label for="exampleCustomSelect">Custom Select</Label>
            <CustomInput type="select" id="exampleCustomSelect" name="customSelect">
              <option value="">Select</option>
              <option>Value 1</option>
              <option>Value 2</option>
              <option>Value 3</option>
              <option>Value 4</option>
              <option>Value 5</option>
            </CustomInput>
          </FormGroup>
          <FormGroup>
            <Label for="exampleCustomMutlipleSelect">Custom Multiple Select</Label>
            <CustomInput type="select" id="exampleCustomMutlipleSelect" name="customSelect" multiple>
              <option value="">Select</option>
              <option>Value 1</option>
              <option>Value 2</option>
              <option>Value 3</option>
              <option>Value 4</option>
              <option>Value 5</option>
            </CustomInput>
          </FormGroup>
          <FormGroup>
            <Label for="exampleCustomSelectDisabled">Custom Select Disabled</Label>
            <CustomInput type="select" id="exampleCustomSelectDisabled" name="customSelect" disabled>
              <option value="">Select</option>
              <option>Value 1</option>
              <option>Value 2</option>
              <option>Value 3</option>
              <option>Value 4</option>
              <option>Value 5</option>
            </CustomInput>
          </FormGroup>
          <FormGroup>
            <Label for="exampleCustomMutlipleSelectDisabled">Custom Multiple Select Disabled</Label>
            <CustomInput
              type="select"
              id="exampleCustomMutlipleSelectDisabled"
              name="customSelect"
              multiple
              disabled
            >
              <option value="">Select</option>
              <option>Value 1</option>
              <option>Value 2</option>
              <option>Value 3</option>
              <option>Value 4</option>
              <option>Value 5</option>
            </CustomInput>
          </FormGroup>
          <FormGroup>
            <Label for="exampleCustomFileBrowser">File Browser</Label>
            <CustomInput type="file" id="exampleCustomFileBrowser" name="customFile" />
          </FormGroup>
          <FormGroup>
            <Label for="exampleCustomFileBrowser">File Browser with Custom Label</Label>
            <CustomInput
              type="file"
              id="exampleCustomFileBrowser"
              name="customFile"
              label="Yo, pick a file!"
            />
          </FormGroup>
          <FormGroup>
            <Label for="exampleCustomFileBrowser">File Browser Disabled</Label>
            <CustomInput type="file" id="exampleCustomFileBrowser" name="customFile" disabled />
          </FormGroup>
        </div>
      </Fragment>
    );
  }
}
