/**
 * Import Node Modules
 */
import React, { Component } from 'react';
import { func, object, bool } from 'prop-types';
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { withRouter } from "react-router-dom";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import Select from 'react-select';
import { v4 as uuidv4 } from 'uuid';


/**
 * Import Other Dependicies
 */

import { showSuccessMsg } from "utils/notification";
import { addAssignmentList, getSingleAssignment, updateAssignmentList } from 'modules/tasks/actions';
import { getAssignmentDataListing, getIsFecthingAssignmentData } from 'modules/tasks/selectors';
import Spinner from "components/Loader";

const addAndEditSchema = Yup.object().shape({
})

const formSelectForType = props => {
  const { form, options, field, placeholder } = props;
  return (
    <Select
      components={{
        DropdownIndicator: () => null,
        IndicatorSeparator: () => null
      }}
      name={field.name}
      className={props.className}
      isSearchable={true}
      placeholder={placeholder}
      onChange={value => {
        form.setFieldValue(field.name, {id: value.id, label: value.value, value: value.value})
      }}
      value={
        field.value ? 
          {id: field.value.id, label: field.value.value, value: field.value.value } 
        : 
          ''
      }
      styles={customStyles}
      options={formattedArrayForType(options)}
    />
  )
};

const formattedArrayForType = array => {
  return array.map(item => {
    return {
      id: item.id,
      value: item.value,
      label: item.value,
    };
  });
}

const customStyles = {
  control: () => ({
    "border-bottom": "1px solid #ebebeb",
    "font-family": "'Open Sans', sans-serif",
    "padding-bottom": "1px",
    "padding-top": "1px",
    "font-size":"13px",
    "padding-left": "3px",
    "max-height": "42px"
  }),
  placeholder: () => ({
    color: '#7d97ad',
    "font-size":"13px",
  }),
  singleValue: () => ({
    color: '#525c65',
  }),
};

const formTextArea = props => {
  const { form, options, field, placeholder } = props;
  return(
    <textarea 
      rows="5" 
      cols='5' 
      name={field.name}
      onChange={value => {
        form.setFieldValue(field.name, value.target.value)
      }}
      value={field.value} 
      className={props.className} 
      placeholder={placeholder}
    />
  )
}

class AddEditComponent extends Component {
  state = {
    isLoader: false,
    mode: Object.keys(this.props.match.params).length > 0 ? 'Edit' : 'Add'
  };

  componentWillMount() {
    if (Object.keys(this.props.match.params).length > 0) {
      let getData = {
        id: this.props.match.params.id
      }
      this.setState({isLoader: true})
      this.props.getSingleAssignment(getData.id).then((res) => {
        this.setState({
          data: res.task,
          isLoader: false
        })
      }, () => {
        const { history } = this.props;
        if (history) {
          history.push('/user/dashboard')
        }
        this.setState({isLoader: false})
      })
    }
  }

  getFormikInitVal = () => {
    const { singleAssignment } = this.props;
    const { mode, data } = this.state;
    if (mode === 'Edit') {
      const { 
        title,
        description,
        type,
        projectLead,
        priority,
        assignTo,
        client,
        customerRef,
      } = data || {}

      return {
        title: title,
        description: description,
        type: type,
        projectLead,
        priority,
        assignTo,
        client,
        customerRef
      }
    }
    else{
      return {
        params:[{ 
          title: '',
          description: '',
          type: ''
        }]
      }
    }
  }

  addPipelines = (values, { setSubmitting, resetForm }) => {
    const { history } = this.props;
    const { mode, data } = this.state;

    if (mode === 'Edit') {
      var params = {
        id: data.id,
        title: values.title,
        description: values.description,
        type: values.type,
      }
      if(values.projectLead){
        params.projectLead = values.projectLead
      }
      if(values.priority){
        params.priority = values.priority
      }
      if(values.assignTo){
        params.assignTo = values.assignTo
      }
      if(values.client){
        params.client = values.client
      }
      if(values.customerRef){
        params.customerRef = values.customerRef
      }
      
      this.props.updateAssignmentList(params, this.props.match.params.id).then(res => {
        showSuccessMsg('Update Succesfully')
        setSubmitting(false)
        history.push('/user/dashboard')
      })
    }

    if (mode === 'Add') {
      var params = values.params
      if(params && params.length > 0 ){
        params.map(item => (
          item.id = uuidv4(),
          item
        ))
        this.props.addAssignmentList(params).then(res => {
          showSuccessMsg('Added Successfully')
          setSubmitting(false)
          history.push('/user/dashboard')
        })
      }


    }
  }
  
  render() {
    const { isGetPipelineData } = this.props;
    const { mode, isLoader } = this.state;
    let typeOptions = [
      { id: 1, value: 'Bug', label: 'Bug' },
      { id: 2, value: 'Requirement', label: 'Requirement' },
      { id: 3, value: 'Feature', label: 'Feature' },
    ]

    let priorityList = [
      { id: 1, value: 'High', label: 'High' },
      { id: 2, value: 'Medium', label: 'Medium' },
      { id: 3, value: 'Low', label: 'Low' },
    ]

    let assignToList = [
      { id: 1, value: 'Manager', label: 'Manager' },
      { id: 2, value: 'Tech Lead', label: 'Tech Lead' },
      { id: 3, value: 'Sr. Developer', label: 'Sr. Developer' },
    ]
    return (
      <div className="row">
        <div className="col-md-6">
          <div className="row">
            <div className="col-md-12">
              <h6> {mode === 'Edit' ? 'Edit' : 'Add'} Task </h6>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              {(isLoader) && (
                <div className="text-center">
                  <Spinner />
                </div>
              )}
              {!isLoader && (
                <Formik
                  initialValues={this.getFormikInitVal()}
                  validationSchema={addAndEditSchema}
                  onSubmit={this.addPipelines}
                >
                  {({ isSubmitting, setFieldValue, values }) => (
                    <Form className="mt-3">
                      {mode === 'Edit' && (
                        <>
                          <div className="form-group">
                            <label htmlFor=""> Title </label>
                            <Field type="text" name="title" className='form-control' placeholder="Add New Title" />
                            <ErrorMessage name="title" component="div" className="error-msg mt-3" />
                          </div>

                          <div className="form-group">
                            <label htmlFor=""> Task Type </label>
                            <Field as="select" component={formSelectForType} options={typeOptions} name="type" className='form-control' placeholder="Select Task Type" />
                            <ErrorMessage name="type" component="div" className="error-msg mt-3" />
                          </div>

                          {values.type.value === 'Bug' && (
                            <>
                              <div className="form-group">
                                <label htmlFor=""> Task Priority </label>
                                <Field as="select" component={formSelectForType} options={priorityList} name="priority" className='form-control' placeholder="Select Task Priority" />
                                <ErrorMessage name="priority" component="div" className="error-msg mt-3" />
                              </div>
                              
                              <div className="form-group">
                                <label htmlFor=""> Assign To </label>
                                <Field as="select" component={formSelectForType} options={assignToList} name="assignTo" className='form-control' placeholder="Task Assign To" />
                                <ErrorMessage name="assignTo" component="div" className="error-msg mt-3" />
                              </div>
                            </>
                          )}
                          
                          {values.type.value === 'Requirement' && (
                            <>
                              <div className="form-group">
                                <label htmlFor=""> Task Client </label>
                                <Field type="text" name="client" className='form-control' placeholder="Task client" />
                                <ErrorMessage name="client" component="div" className="error-msg mt-3" />
                              </div>
                              
                              <div className="form-group">
                                <label htmlFor=""> Customer Ref </label>
                                <Field type="text" name="customerRef" className='form-control' placeholder="Customer Ref" />
                                <ErrorMessage name="customerRef" component="div" className="error-msg mt-3" />
                              </div>
                            </>
                          )}
                          
                          {values.type.value === 'Feature' && (
                            <div className="form-group">
                              <label htmlFor="">  Project Lead </label>
                              <Field type="text" name="projectLead" className='form-control' placeholder=" Project Lead" />
                              <ErrorMessage name="projectLead" component="div" className="error-msg mt-3" />
                            </div>
                          )}

                          <div className="form-group">
                            <label htmlFor=""> Task Description </label>
                            <Field as="textarea" component={formTextArea} name="description" className='form-control' placeholder="Add Description" />
                            <ErrorMessage name="description" component="div" className="error-msg mt-3" />
                          </div>

                          <button type="submit" disabled={isSubmitting} className="btn btn-outline-primary btn-sm mx-3">
                            {isSubmitting && (
                              <Spinner size={true} />
                            )}
                            {mode === 'Edit' ? 'Update' : 'Save'} Task
                          </button>
                        </>
                      )}

                      {mode === 'Add' && (
                        <FieldArray
                          name="params"
                          render={arrayHelpers => (
                            <div className="">
                              {values.params && values.params.length > 0 ? (
                                values.params.map((params, index) => (
                                  <React.Fragment key={index}>
                                    <div className="form-group">
                                      <div className="row">
                                        <div className="col-11 my-2">
                                          <div className="form-group">
                                            <label htmlFor=""> Title </label>
                                            <Field type="text" name={`params[${index}].title`} className='form-control' placeholder="Add New Title" />
                                            <ErrorMessage name={`params[${index}].title`} component="div" className="error-msg mt-3" />
                                          </div>

                                          <div className="form-group">
                                            <label htmlFor=""> Task Type </label>
                                            <Field as="select" component={formSelectForType} options={typeOptions} name={`params[${index}].type`} className='form-control' placeholder="Select Task Type" />
                                            <ErrorMessage name={`params[${index}].type`} component="div" className="error-msg mt-3" />
                                          </div>

                                          {params.type.value === 'Bug' && (
                                            <>
                                              <div className="form-group">
                                                <label htmlFor=""> Task Priority </label>
                                                <Field as="select" component={formSelectForType} options={priorityList} name={`params[${index}].priority`} className='form-control' placeholder="Select Task Priority" />
                                                <ErrorMessage name={`params[${index}].priority`} component="div" className="error-msg mt-3" />
                                              </div>
                                              
                                              <div className="form-group">
                                                <label htmlFor=""> Assign To </label>
                                                <Field as="select" component={formSelectForType} options={assignToList} name={`params[${index}].assignTo`} className='form-control' placeholder="Task Assign To" />
                                                <ErrorMessage name={`params[${index}].assignTo`} component="div" className="error-msg mt-3" />
                                              </div>
                                            </>
                                          )}
                                          
                                          {params.type.value === 'Requirement' && (
                                            <>
                                              <div className="form-group">
                                                <label htmlFor=""> Task Client </label>
                                                <Field type="text" name={`params[${index}].client`} className='form-control' placeholder="Task client" />
                                                <ErrorMessage name={`params[${index}].client`} component="div" className="error-msg mt-3" />
                                              </div>
                                              
                                              <div className="form-group">
                                                <label htmlFor=""> Customer Ref </label>
                                                <Field type="text" name={`params[${index}].customerRef`} className='form-control' placeholder="Customer Ref" />
                                                <ErrorMessage name={`params[${index}].customerRef`} component="div" className="error-msg mt-3" />
                                              </div>
                                            </>
                                          )}
                                          
                                          {params.type.value === 'Feature' && (
                                            <div className="form-group">
                                              <label htmlFor="">  Project Lead </label>
                                              <Field type="text" name={`params[${index}].projectLead`} className='form-control' placeholder=" Project Lead" />
                                              <ErrorMessage name={`params[${index}].projectLead`} component="div" className="error-msg mt-3" />
                                            </div>
                                          )}

                                          <div className="form-group">
                                            <label htmlFor=""> Task Description </label>
                                            <Field as="textarea" component={formTextArea} name={`params[${index}].description`} className='form-control' placeholder="Add Description" />
                                            <ErrorMessage name={`params[${index}].description`} component="div" className="error-msg mt-3" />
                                          </div>
                                        </div>

                                        <div className="col-1 d-flex align-items-center justify-content-end">
                                            <span className="ml-1">
                                              <button type="button" className="btn btn-danger btn-sm" 
                                                onClick={() => arrayHelpers.remove(index)} 
                                              >
                                                <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="minus" className="w-12" role="img" viewBox="0 0 384 512"><path fill="currentColor" d="M368 224H16c-8.84 0-16 7.16-16 16v32c0 8.84 7.16 16 16 16h352c8.84 0 16-7.16 16-16v-32c0-8.84-7.16-16-16-16z"></path></svg>
                                              </button>
                                            </span>
                                        </div>
                                      </div>
                                    </div>

                                    {(values.params.length === (index + 1)) && (
                                      <>
                                        <button type="submit" disabled={isSubmitting} className="btn btn-outline-primary btn-sm mx-3">
                                          {isSubmitting && (
                                            <Spinner size={true} />
                                          )}
                                          {mode === 'Edit' ? 'Update' : 'Save'} Task
                                        </button>

                                        <button type="button" className="btn btn-primary btn-sm mr-1" onClick={() => arrayHelpers.push({title: '', description: '', task: ''})} >
                                          <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="plus" className="w-12" role="img" viewBox="0 0 384 512"><path fill="currentColor" d="M368 224H224V80c0-8.84-7.16-16-16-16h-32c-8.84 0-16 7.16-16 16v144H16c-8.84 0-16 7.16-16 16v32c0 8.84 7.16 16 16 16h144v144c0 8.84 7.16 16 16 16h32c8.84 0 16-7.16 16-16V288h144c8.84 0 16-7.16 16-16v-32c0-8.84-7.16-16-16-16z"></path></svg>
                                          <span> Add Task </span>
                                        </button>
                                      </>
                                    )}
                                  </React.Fragment>
                                ))
                              ) : 
                                <>
                                  <button type="submit" disabled={isSubmitting} className="btn btn-outline-primary btn-sm mx-3">
                                    {isSubmitting && (
                                      <Spinner size={true} />
                                    )}
                                    {mode === 'Edit' ? 'Update' : 'Save'} Task
                                  </button>

                                  <button type="button" className="btn btn-primary btn-sm mr-1" onClick={() => arrayHelpers.push({title: '', description: '', task: ''})} >
                                    <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="plus" className="w-12" role="img" viewBox="0 0 384 512"><path fill="currentColor" d="M368 224H224V80c0-8.84-7.16-16-16-16h-32c-8.84 0-16 7.16-16 16v144H16c-8.84 0-16 7.16-16 16v32c0 8.84 7.16 16 16 16h144v144c0 8.84 7.16 16 16 16h32c8.84 0 16-7.16 16-16V288h144c8.84 0 16-7.16 16-16v-32c0-8.84-7.16-16-16-16z"></path></svg>
                                    <span> Add Task </span>
                                  </button>
                                </>
                              }
                            </div>
                          )} />
                      )}
                    </Form>
                  )}
                </Formik>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

}

/**
 *  Define component PropTypes
 */
AddEditComponent.propTypes = {
  singleAssignment: object.isRequired,
  isFetchingAssignment: bool.isRequired,
  addAssignmentList: func.isRequired,
  updateAssignmentList: func.isRequired
};

/**
 *  Map redux state to component props
 */
const mapStateToProps = createStructuredSelector({
  singleAssignment: getAssignmentDataListing(),
  isFetchingAssignment: getIsFecthingAssignmentData()
});

export default connect(
  mapStateToProps,
  {
    getSingleAssignment,
    updateAssignmentList,
    addAssignmentList
  }
)(withRouter(AddEditComponent));
