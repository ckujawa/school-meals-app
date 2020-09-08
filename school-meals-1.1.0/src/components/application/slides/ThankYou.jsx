import React, { Component } from 'react'
import Slide from '../Slide'
import Alert from '../Alert'
import download from 'downloadjs'
import { observer } from 'mobx-react'
import { FormattedMessage } from 'react-intl'
@observer
class ThankYou extends Component {

  constructor(props) {
    super(props)
    this.downloadData = this.downloadData.bind(this)
    this.state = { dataSentSuccessfully: false }
  }

  componentDidMount() {
    const { applicationData } = this.props;
      if (applicationData.certifiedCorrect) {
      const stringData = JSON.stringify(applicationData.cleaned)
      const apiUrl = 'http://localhost:3005/submit'

      const options = {
        method: 'POST',
        body: stringData,
        headers: { 'Content-Type': 'application/json' }
      }

      fetch(apiUrl, options).then(() => {
        this.setState({ dataSentSuccessfully: true })
      }).catch(() => {
        this.setState({ dataSentSuccessfully: false })
      })
    }
  }

  componentShouldUpdate() {
    return this.props.tyShouldUpdate
  }

  downloadData() {
    const { applicationData } = this.props
    const stringData = JSON.stringify(applicationData.cleaned, null, 2)

    download(stringData, 'nslp-data.json', 'text/plain');
  }

  render() {

    const headerText =
      <FormattedMessage
        id="app.slides.thankYou.header"
        description="Text for the header of the slide."
        defaultMessage="Thank you for applying for school meal benefits!"
      />

    const alertHeading =
      <FormattedMessage
        id="app.slides.thankYou.submitted"
        description="application has been submitted"
        defaultMessage="Your application has been submitted."
      />

    const warningHeading =
      <FormattedMessage
        id="app.slides.thankYou.cautionHeading"
        description="Warning message heading"
        defaultMessage="Caution"
      />

    const nextText =
      <FormattedMessage
        id="app.slides.thankYou.download"
        description="Button to download data"
        defaultMessage="Download Data"
      />

    return (
          <Slide
            header={headerText} id="thank-you"
            showBack={false} nextText={nextText} handleNext={this.downloadData}
            beginsSection
          >
              {this.state.dataSentSuccessfully ? <Alert heading={alertHeading} type="success">
                <FormattedMessage
                  id="app.slides.thankYou.nextSteps"
                  description="Indication of what happens next."
                  defaultMessage="You will hear from us soon with your certification decision!"
                />
              </Alert>
                : <Alert heading={warningHeading} type="error">
                  <strong>
                    <FormattedMessage
                      id="app.slides.thankYou.caution"
                      description="Warning message"
                      defaultMessage="NO DATA HAS BEEN SAVED. An error has occured while trying to send the data. Please contact us for furether assistance."
                    />
                  </strong>
              </Alert>
              }
            <br />
          </Slide>
    )
  }
}

export default ThankYou
