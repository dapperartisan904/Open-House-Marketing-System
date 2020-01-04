import React from 'react';
import { Image } from 'react-native-elements';
import { View } from 'native-base';
import { Images, Constants } from '@commons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import PDFView from 'react-native-view-pdf';
import Orientation from 'react-native-orientation'
class PDFViewScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title:navigation.state.params.firstname+' '+navigation.state.params.lastname,
      headerTitleStyle: {
        fontSize: 18,
        fontWeight: 'bold',
        alignSelf: 'center',
        textAlign: 'center',
        flex: 1,
      },
      // headerRight: (
      //   <TouchableOpacity
      //     style={{
      //       marginRight: 20,
      //       flex: 1,
      //       alignSelf: 'center',
      //       justifyContent: 'center',
      //     }}
      //   //   onPress={navigation.getParam('handelMail')}
      //   >
      //     {/* <Icon type="AntDesign" name="pluscircle" style={{color:'#2D3ABF'}}/> */}
      //     <Image
      //       source={Images.ic_upload}
      //       imageStyle={{ width: 28, height: 28 }}
      //       style={{ width: 28, height: 28 }}
      //     />
      //   </TouchableOpacity>
      // ),
    };
  };
  constructor(props) {
    super(props);
    this.state = {};
      if (Constants.device_Pad) {
        Orientation.lockToLandscape();
      } else {
        Orientation.lockToPortrait();
      }
  }
  _onLayout = event => {
    if (Constants.device_Pad) {
      Orientation.lockToLandscape();
    } else {
      Orientation.lockToPortrait();
    }
  }
  render() {
    const resourceType = 'url'
    const sources = this.props.navigation.state.params.pdf_url;
    return (
      <View style={{ flex: 1 }} onLayout={this._onLayout}>
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
const styles = {
};
export default PDFViewScreen;
