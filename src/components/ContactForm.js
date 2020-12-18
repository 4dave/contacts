import React, { useState, useEffect } from "react"

const ContactForm = (props) => {
  const initialFieldValues = {
    fullName: "",
    mobile: "",
    email: "",
    address: "",
  }
  var [values, setValues] = useState(initialFieldValues)

  useEffect(() => {
    if (props.currentID == "") setValues({ ...initialFieldValues })
    else
      setValues({
        ...props.contactObjects[props.currentID],
      })
  }, [props.currentID, props.contactObjects])

  const handleInputChange = (e) => {
    var { name, value } = e.target
    setValues({ ...values, [name]: value })
  }
  const handleFormSubmit = (e) => {
    e.preventDefault()
    props.addOrEdit(values)
  }

  return (
    <form autoComplete="off" onSubmit={handleFormSubmit}>
      <div className="form-group input-group">
        <div className="input-group-prepend">
          <div
            className="input-group-text"
            style={{ width: "40px", height: "38px" }}
          >
            <i className="fas fa-user"></i>
          </div>
        </div>
        <input
          className="form-control"
          name="fullName"
          placeholder="Full Name"
          value={values.fullName}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-row">
        <div className="form-group input-group col-md-6">
          <div className="input-group-prepend">
            <div
              className="input-group-text"
              style={{ width: "40px", height: "38px" }}
            >
              <i className="fas fa-mobile-alt"></i>
            </div>
          </div>
          <input
            className="form-control"
            name="mobile"
            placeholder="Mobile"
            value={values.mobile}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group input-group col-md-6">
          <div className="input-group-prepend">
            <div
              className="input-group-text"
              style={{ width: "40px", height: "38px" }}
            >
              <i className="fas fa-envelope"></i>
            </div>
          </div>
          <input
            className="form-control"
            name="email"
            placeholder="Email"
            value={values.email}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="form-group">
        <input
          className="form-control"
          name="address"
          placeholder="Address"
          value={values.address}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <input
          type="submit"
          value={props.currentID == "" ? "Save" : "Update"}
          className="btn btn-primary btn-block"
        />
      </div>
    </form>
  )
}

export default ContactForm
