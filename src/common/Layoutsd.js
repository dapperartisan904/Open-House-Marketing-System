import { Dimensions } from 'react-native';
const width = Dimensions.get('window').width > Dimensions.get('window').height ? Dimensions.get('window').width : Dimensions.get('window').height
const height = Dimensions.get('window').width < Dimensions.get('window').height ? Dimensions.get('window').width : Dimensions.get('window').height

// const { width, height } = Dimensions.get('window');

const Layouts = {

    WINDOW_HEIGHT: height,
    WINDOW_WIDTH: width,
    // Sign in Screen Pad /** CREATE ACCOUNT = CRA */

    CRA_TTB_H: height * 0.055,
    CRA_TTB_BI_H: height * 0.03,
    CRA_AVT_S: width * 0.1,
    CRA_LGV_W: width * 0.3,
    CRA_LOGO_S: height * 0.13,
    CREAT_ACCOUNT_LOGO_CONTAINER_VIEW_SIZE: height * 0.17,
    CREATE_ACCOUNT_ITEM_SIZE: width * 0.24 * 0.6,

    //Property Ditail View Screen -Pad /**PRD*/
    PRD_IMG_H: height * 0.4,
    PRD_ITEM_H: height * 0.08,
    PRD_AVT_S: height * 0.08 * 0.8,
    PRD_ARW_S: height * 0.08 * 0.5,

    //Container-Pad
    NAVBAR_HEIGHT: height * 0.07,
    NAV_ICON_SIZE: height * 0.07 * 0.5,
    CONTAINER_SEARCH_BAR_HEIGHT: height * 0.05,
    //Dashboard-Pad
    DASHBOARD_LIST_ITEM_HEIGHT: height * 0.115,
    DASHBOARD_AVARTA_SIZE: height * 0.115 * 0.7,

    //Property-Pad
    ITEM_SIZE: width * 2 / 9 * 0.97,
    SEARCH_BAR_HEIGHT: height * 0.05,
    ITEM_MARGIN: width * 2 / 9 * 0.97 / 30,
    ADD_IMAGE_SIZE: width * 2 / 9 * 0.97 / 4,
    ADD_PROPERTY_TEXT_HEIGHT: width * 2 / 9 * 0.97 / 5,

    PROPERTY_ITEM_TOP_HEIGHT: width * 2 / 9 * 0.97 * 0.1,
    PROPERTY_ITEM_MIDDLE_HEIGHT: width * 2 / 9 * 0.97 * 0.73,
    PROPERTY_ITEM_BOTTOM_HEIGHT: width * 2 / 9 * 0.97 * 0.2,

    PROPERTY_MORDAL_ONE_HEHGIT: height * 0.4,
    PROPERTY_MORDAL_ONE_WIDTH: width * 0.4,
    PROPERTY_MODAL_ONE_ICON_SIZE: height * 0.08 * 0.6,
    PROPERTY_MODAL_ONE_ITEM_HEIGHT: height * 0.08,
    PROPERTY_MORDAL_ONE_HEHGIT2: height * 0.4 - height * 0.08,

    //Event-Pad
    EVENT_ITEM_TOP_HEIGHT: width * 2 / 9 * 0.97 * 0.1,
    EVENT_ITEM_MIDDLE_HEIGHT: width * 2 / 9 * 0.97 * 0.8,
    EVENT_ITEM_BOTTOM_HEIGHT: width * 2 / 9 * 0.97 * 0.1,

    //Lead Management-Pad

    LEAD_ITEM_HEIGHT: height * 0.08,
    LEAD_BUTTON_HEIGHT: height * 0.05,
    LEAD_ITEM_BUTTON_TEXT_SIZE: height * 0.05 * 0.6,
    LEAD_AVARTA_SIZE: height * 0.064,
    LEAD_ARROW_ICON_SIZE: height * 0.04,

    //Lead Detail-Pad

    LEAD_DETAIL_AVARTA_SIZE: height * 0.1,
    LEAD_DETAIL_MARGIN_TEXT_LINE: height * 0.012,
    LEAD_DETAIL_NOTE_HEIGHT: height * 0.2,


    //Open House Questions-Pad

    OPEN_ITEM_HEIGHT: height * 0.12,
    OPEN_SWITCH_TRANSFORM: height * 0.001,


    //My board-Pad

    MLS_AVARTA_SIZE: width * 2 / 9 * 0.9 * 0.5,
    MLS_UNLINK_IMAGE_SIZE: width * 2 / 9 * 0.9 * 0.1,

    ITEM_TOP_HEIGHT: width * 2 / 9 * 0.97 * 0.15,
    ITEM_MIDDLE_HEIGHT: width * 2 / 9 * 0.97 * 0.6,
    ITEM_BOTTOM_HEIGHT: width * 2 / 9 * 0.97 * 0.25,

    //Mortagage Screen-Pad
    MORT_ITEM_HEIGHT: height * 0.16,
    MORT_AVARTA_SIZE: height * 0.15 * 0.8,


    //Create Property-Pad
    CREATE_PROPERTY_MODAL_WIDTH: width * 0.6,
    CREATE_PROPERTY_MODAL_HEIGHT: height * 0.7,
    CREATE_PROPERTY_TITLE_BAR_HEIGHT: height * 0.07,
    CREAT_PROPERTY_ITEM_MARGIN: height * 0.02,

    //Select MLS

    SELECT_MLS_TEXT_INPUT_HEIGHT: height * 0.07,

    //Sart Open House One

    START_OPEN_ONE_LOGO_WIDTH: width * 0.4,
    START_OPEN_ONE_LOGO_HEIGHT: height * 0.15,


    //Profile

    PROFILE_PART_HEIGHT: height * 0.11,
    PROFIEL_PART_WIDTH: width * 0.5,
    PROFIEL_PART_AVARTA_SIZE: height * 0.08,
    PROFILE_PART_BOTTOM: height * 0.05,

    // Open House End

    OPEN_HOUSE_EXIT_AVARTA_SIZE: width * 0.05,
    OPEN_HOUSE_EXIT_AVARTA_MARGIN: width * 0.025,

    //Margins
    MARGIN_LEFT_NORMAL: width * 0.009,
    MARGIN_RIGHT_NORMAL: width * 0.009,
    MARGIN_TOP_NORMAL: height * 0.009,
    MARGIN_BOTTOM_NORMAL: height * 0.009,

    MARGIN_NORMAL: width * 0.01,
    MARGIN_LARGE: width * 0.02,

    MARGIN_TEXT_LINE: height * 0.006,

    MODAL_MARGIN_NORMAL: width * 0.02,


    CREAT_EVENT_MODAL_WIDTH: width * 0.5,
    CREAT_EVENT_MODAL_HEIGTHT: height * 0.8,

    PROFILE_MODAL_WIDTH: width * 0.6,
    PROFILE_MODAL_HEIGTHT: height * 0.8,
    //buttons
    SMALL_BUTTON_HEIGHT: height * 0.06,
    SMALL_BUTTON_WIDTH: width * 0.12,
    NORMAL_BUTTON_HEIGHT: height * 0.08,
    BIG_BUTTON_HEIGHT: height * 0.1,
    BIG_BUTTON_WIDTH: width * 0.24,

    BUTTON_FONT_SIZE_SMALL: height * 0.06 * 0.4,

    //fontsizes  
    TEXT_FONT_SIZE_DISCLAIMER: height * 0.009,
    TEXT_FONT_SIZE_SMALL: height * 0.018,
    TEXT_FONT_SIZE_NORMAL: height * 0.025,
    TEXT_FONT_SIZE_BIG: height * 0.04,
    TEXT_FONT_SIZE_TITLE: height * 0.03,
    TEXT_FONT_SIZE_DETAIL: height * 0.012,


    //input text
    INPUTTEXT_HEIGHT_NORMAL: height * 0.06,
    INPUTTEXT_HEIGHT_BIG: height * 0.07,

    //React-Base Input

    BASE_INPUT_HEIGHT_NORMAL: height * 0.07,

    //Forgot password modal

    FORGOTPASSWORD_MODAL_HEIGHT: height * 0.3,
    FORGOTPASSWORD_MODAL_WIDTH: width * 0.4,
}
export default Layouts;
