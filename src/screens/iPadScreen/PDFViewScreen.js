import React from 'react';
import { View } from 'native-base';
import PDFView from 'react-native-view-pdf';
import connect from 'react-redux/es/connect/connect';
import { Images, Fonts, Constants } from '@commons';
class PDFViewScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const resourceType = 'url'
    const sources = Constants.selecteditem.attendee_pdf_url;
    return (
      <View style={{ flex: 1, borderColor: 'grey', borderWidth: 0.5 }}>
        <PDFView
          fadeInDuration={250.0}
          style={{ flex: 1 }}
          resourceType={resourceType}
          resource={sources}
        />
      </View>
    );
  }
}

function mapStateToProps({ login, dashboard, ipad }) {
  return {
    ipad: ipad,
    login: login,
    dashboard: dashboard,
  };
}
export default connect(
  mapStateToProps,
)(PDFViewScreen);
