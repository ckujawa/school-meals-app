import React, { Component } from 'react'
import { observer } from 'mobx-react'

import Welcome from './slides/Welcome'
import BeforeYouBegin from './slides/BeforeYouBegin'
import LegalStatements from './slides/LegalStatements'
import Attestation from './slides/Attestation'
import Students from './slides/Students'
import AssistancePrograms from './slides/AssistancePrograms'
import NoAssistancePrograms from './NoAssistancePrograms'
import Contact from './slides/Contact'
import Demographics from './slides/Demographics'
import Summary from './slides/Summary'
import ThankYou from './slides/ThankYou'

@observer
class Application extends Component {

  constructor(props) {
    super(props)
    this.handleTyShouldUpdateChange = this.handleTyShouldUpdateChange(this)
  }

  state = {
    tyShouldUpdate: false
  }

  handleTyShouldUpdateChange(shouldUpdate) {
    this.setState({
      tyShouldUpdate: { shouldUpdate }
    })
  }

  render() {
    const { applicationData } = this.props
    const {
      attestation,
      students,
      contact,
      adults,
      assistancePrograms
    } = applicationData

    return (
      <div>
        <Welcome />
        <BeforeYouBegin />
        <Attestation attestation={attestation} attestor={adults.first} />
        <Students students={students} />
        <AssistancePrograms applicationData={applicationData} />

        {assistancePrograms.hasAny !== true &&
        <NoAssistancePrograms applicationData={this.props.applicationData} />
        }

        <Contact contact={contact} />
        <Demographics students={students} />
        <LegalStatements />
        <Summary applicationData={this.props.applicationData} onTyShouldUpdateChange={this.handleTyShouldUpdateChange} />
        <ThankYou applicationData={this.props.applicationData} tyShouldUpdate={this.state.tyShouldUpdate} />
      </div>
    )
  }
}

export default Application
