import { Dimensions } from 'react-native';
const width = Dimensions.get('window').width > Dimensions.get('window').height ? Dimensions.get('window').width : Dimensions.get('window').height
const height = Dimensions.get('window').width < Dimensions.get('window').height ? Dimensions.get('window').width : Dimensions.get('window').height

const Constants = {
  BASE_API_URL: 'http://www.openhousemarketingsystem.com/application/v2',
  accounturl: 'http://www.openhousemarketingsystem.com/application/',
  shareurl: 'http://www.openhousemarketingsystem.com/',
  IMAGE_BASE_URL: 'http://www.openhousemarketingsystem.com/application/data/images/properties/',
  user_mail: '',
  user_password: '',
  first_name: '',
  last_name: '',
  agent_title: '',
  email_adress: '',
  cell_number: '',
  broker_name: '',
  MlsData: [],
  searchFlag: 0,
  loadLMSflag: 0,
  updateFlag: 0,
  resetflag: 0,
  eventflag: 0,
  AttendeData: [],
  BrokerData: [],
  eventData: [],
  EventDatas: [],
  imageDatas:[],
  propertyData: [],
  uploadPhotoFlag: 0,
  bestsellingfeatures: [],
  postbrokerFlag: 0,
  postpublicbrokerFlag: 0,
  checkArray: [],
  titledata: '',
  brokerdata: '',
  questionScreens: [
    'question1Screen',
    'question2Screen',
    'question3Screen',
    'question4Screen',
    'question5Screen',
    'question6Screen',
    'question7Screen',
    'question8Screen',
    'question9Screen',
    'question10Screen',
    'question11Screen',
    'question12Screen',
  ],
  attendeefirstname: '',
  attendeelastname: '',
  attendeeemail: '',
  attendeetelephone: '',

  attendeepropertylistedyesorno: '0',
  attendeeownorrent: '',
  attendeeneedtosellyesorno: '0',
  attendeereceivecma: '0',
  attendeeprospectmatch: '0',

  attendeeaddress: '',
  attendeecity: '',
  attendeestate: '',
  attendeezipcode: '',

  attendeehowsoonlookingtobuyorrent: '',
  attendeehearaboutlisting: '',
  attendeehowhearaboutlistinganswer: '',
  attendeeareyouprequalified: '',
  attendeeprequalifiedbankname: '',
  attendeehowgoodisyourcredit: '',
  attendeehaverealestateattorney: '0',
  attendeefollowupvia: '',
  postflag: 0,
  mlsflag : 0,
  disclosureArray: [],
  createNewAccount: [],

  create_userfirstname: '',
  create_userlastname: '',
  create_useremailaddress: '',
  create_userephoneNumber: '',
  create_userpassword: '',
  mortgage_flag: 0,
  device_Pad: false,
  selecteditem: '',
  attendeedata: '',
  selectedpropertyitem: '',
  brokerdata: '',
  refreshdata: false,

  temp1: '',
  temp2: '',
  temp3: '',

  checkPermission: false,

  mlsSelectedItem: null,
  mlsOrganize: '',
  createeventflag: 0,
  deviceWidth: 0,
  deviceHeight: 0,
  signfilePath: null,
  company_logo_url: '',

  WINDOW_WIDTH: '',
  WINDOW_HEIGHT: '',
  //modals
  CREAT_EVENT_MODAL_WIDTH: width * 0.5,
  CREAT_EVENT_MODAL_HEIGTHT: height * 0.8,

  PROFILE_MODAL_WIDTH: width * 0.6,
  PROFILE_MODAL_HEIGTHT: height * 0.8,
  //buttons
  SMALL_BUTTON_HEIGHT: height * 0.06,
  SMALL_BUTTON_WIDTH: width * 0.12,

  BIG_BUTTON_HEIGHT: height * 0.12,
  BIG_BUTTON_WIDTH: width * 0.24,

  BUTTON_FONT_SIZE_SMALL: height * 0.06 * 0.4,

  //fontsizes  
  TEXT_FONT_SIZE_SMALL: height * 0.018,
  TEXT_FONT_SIZE_NORMAL: height * 0.025,
  TEXT_FONT_SIZE_BIG: height * 0.04,
  TEXT_FONT_SIZE_TITLE: height * 0.03,
  TEXT_FONT_SIZE_DETAIL: height * 0.018,


  //input text
  INPUTTEXT_HEIGHT_NORMAL: height * 0.06,
  INPUTTEXT_HEIGHT_BIG: height * 0.07,

  UIColor: {
    'lightGray': '#9A9A9A',
    'OHColors': {
      'lightSeaGreen': '#38a2c2',
      'darkSlateBlue': '#345f9f',
      'darkGreen': '#00C300',
      'lightGrayBG': '#f3f4f9',
      'navBarBGcolor': '#f6f6f6',
      'silver': '#C0C0C0',
    }
  },
};

const checkScreenSize = () => {

  var screen = { width, height };
  if (width < height) {
    screen.width = height;
    screen.height = width;
  }
  var LAYOUT = {
    'SCREEN': screen,
    'SIDEMENU': {
      'width': 375,
    },
    'COLLECTIONVIEW': {
      'START': 10,
      'ENDING': 10,
      'SPACE': 10,
      'ROW_ITEMS': 3,
    },
    'ADDPROPERTY': {
      'WIDTH': screen.width * 0.86,
      'HEIGHT': 475, //screen.height * 0.5,
    },
    'MLS': {
      'AVATAR_SIZE': 120,
    },
    'MORTAGE': {
      'AVATAR_SIZE': 60,
    },
    'PROFILE': {
      'WIDTH': 500,
      'HEIGHT': 500, //screen.height * 0.5,
    },
  };
  LAYOUT.COLLECTIONVIEW.ITEM_SIZE = (LAYOUT.SCREEN.width - LAYOUT.SIDEMENU.width
    - LAYOUT.COLLECTIONVIEW.START - LAYOUT.COLLECTIONVIEW.SPACE - LAYOUT.COLLECTIONVIEW.ENDING) / LAYOUT.COLLECTIONVIEW.ROW_ITEMS;
  Constants.LAYOUT = LAYOUT;
}

checkScreenSize();

export default Constants;
