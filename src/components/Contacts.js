import React, { useState, useEffect } from "react"
import ContactForm from "./ContactForm"
import firebaseDB from "../firebase"

export default function Contacts() {
  const [contactObjects, setContactObjects] = useState({})
  const [currentID, setCurrentID] = useState("")

  useEffect(() => {
    firebaseDB.child("contacts").on("value", (snapshot) => {
      if (snapshot.val() != null)
        setContactObjects({
          ...snapshot.val(),
        })
      else setContactObjects({})
    })
  }, [])

  const addOrEdit = (obj) => {
    if (currentID === "")
      firebaseDB.child("contacts").push(obj, (err) => {
        if (err) console.log(err)
        else setCurrentID("")
      })
    else
      firebaseDB.child(`contacts/${currentID}`).set(obj, (err) => {
        if (err) console.log(err)
        else setCurrentID("")
      })
  }

  const onDelete = (key) => {
    if (window.confirm("Are you sure you want to delete?")) {
      firebaseDB.child(`contacts/${key}`).remove((err) => {
        if (err) console.log(err)
        else setCurrentID("")
      })
    }
  }

  return (
    <>
      <div>
        <h1 className="display-4 text-center">Contacts Manager</h1>
      </div>
      <div className="row">
        <div className="col-md-5">
          <ContactForm {...{ addOrEdit, currentID, contactObjects }} />
        </div>
        <div className="col-md-7">
          <table className="table table-borderless table-stripped">
            <thead className="thead-light">
              <tr>
                <th> Full Name</th>
                <th> Mobile</th>
                <th> Email</th>
                <th> Actions</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(contactObjects).map((id) => {
                return (
                  <tr key={id}>
                    <td>{contactObjects[id].fullName}</td>
                    <td>{contactObjects[id].mobile}</td>
                    <td>{contactObjects[id].email}</td>
                    <td>{contactObjects[id].address}</td>
                    <td>
                      <button
                        className="btn text-primary"
                        onClick={() => setCurrentID(id)}
                      >
                        <i className="fas fa-pencil-alt"></i>
                      </button>
                      <button
                        className="btn text-danger"
                        onClick={() => {
                          onDelete(id)
                        }}
                      >
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
