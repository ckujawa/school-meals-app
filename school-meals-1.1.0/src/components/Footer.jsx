import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { organization } from '../config'

@observer
class Footer extends Component {
  render() {
    return (
      <footer className="page-footer">
        <div className="usa-grid">
          <img className="logo" src={organization.logoUrl} alt="Applewood Logo" />
          <div>{organization.name}</div>
          <div>{organization.contact.phone} / {organization.contact.email}</div>
          <div>{organization.contact.address}</div>
        </div>
      </footer>
    )
  }
}

export default Footer
