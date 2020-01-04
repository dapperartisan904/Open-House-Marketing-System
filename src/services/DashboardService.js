import axios from 'axios';
import { Constants } from '@commons';
const axios_instance = axios.create({
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
  withCredentials: false,
});
const axios_instance1 = axios.create({
  headers: {
    'Content-Type': 'multipart/form-data',
    'Access-Control-Allow-Origin': '*',
  },
  withCredentials: false,
});


class DashboardService {
  doSomething = () => {
    return new Promise((resolve, reject) => {

    })
  }
  getproperties = accountnum => {
    return new Promise((resolve, reject) => {
      axios_instance
        .get(
          `${Constants.BASE_API_URL}/get_properties.php?accountnum=${accountnum}`,
        )
        .then(res => {
          if (res.status === 200) {
            resolve({ data: res.data, IsSuccess: true });
          } else if (res.status !== 200) {
            reject({ data: res.data, IsSuccess: false });
          }
        })
        .catch(error => {
          resolve(error);
        });
    });
  };
  getevent = accountnum => {
    return new Promise((resolve, reject) => {
      axios_instance
        .get(
          `${Constants.BASE_API_URL}/list_events.php?accountnum=${accountnum}`,
        )
        .then(res => {
          console.log('##################')
          console.log(res);
          if (res.status === 200) {
            resolve({ data: res.data, IsSuccess: true });
          } else if (res.status !== 200) {
            reject({ data: res.data, IsSuccess: false });
          }
        })
        .catch(error => {
          resolve(error);
        });
    });
  };

  getMortgage = accountnum => {
    // alert(accountnum);
    return new Promise((resolve, reject) => {
      axios_instance
        .get(
          `${Constants.BASE_API_URL}/get_mortgage_partners.php/?advertisingid=${accountnum}&update=0`,
        )
        .then(res => {
          if (res.status === 200) {
            resolve({ data: res.data, IsSuccess: true });
          } else if (res.status !== 200) {
            reject({ data: res.data, IsSuccess: false });
          }
        })
        .catch(error => {
          resolve(error);
        });
    });
  };

  getmyboard = accountnum => {
    return new Promise((resolve, reject) => {
      axios_instance
        .get(
          `${Constants.BASE_API_URL}/agent_linked_mls.php?accountnum=${accountnum}`,
        )
        .then(res => {
          if (res.status === 200) {
            resolve({ data: res.data, IsSuccess: true });
          } else if (res.status !== 200) {
            reject({ data: res.data, IsSuccess: false });
          }
        })
        .catch(error => {
          resolve(error);
        });
    });
  };

  getelead = accountnum => {
    return new Promise((resolve, reject) => {
      axios_instance
        .get(
          `${Constants.BASE_API_URL}/get_oh_attendees.php?accountnum=${accountnum}`,
        )
        .then(res => {
          if (res.status === 200) {
            resolve({ data: res.data, IsSuccess: true });
          } else if (res.status !== 200) {
            reject({ data: res.data, IsSuccess: false });
          }
        })
        .catch(error => {
          resolve(error);
        });
    });
  };
  unlinkaccount = (item, accountnum) => {
    //alert(accountnum);
    // let bodyFormData = new FormData();
    // bodyFormData.append('accountnum', accountnum);
    // bodyFormData.append('mlsorganizationid', item.mls_organization_id);
    // bodyFormData.append('agentid', item.agentid);

    return new Promise((resolve, reject) => {
      axios_instance1
        .get(
          `${Constants.BASE_API_URL}/unlink_agent_from_mls.php?accountnum=${accountnum}&mlsorganizationid=${item.mls_organization_id}&agentid=${item.agentid}`,
        )
        .then(res => {
          if (res.status === 200) {
            var data = res.data[0];
            // alert(data);
            resolve({ data: res.data, IsSuccess: true });
          } else if (res.status !== 200) {
            reject({ data: res.data, IsSuccess: false });
          }
        })
        .catch(error => {
          resolve(error);
        });
    });
  };
  searchLMSaccount = (item, accountnum, agent_id) => {
    //alert(accountnum);
    // let bodyFormData = new FormData();
    // bodyFormData.append('accountnum', accountnum);
    // bodyFormData.append('mlsorganizationid', item.mls_organization_id);
    // bodyFormData.append('agentid', item.agentid);
    var password = '';
    return new Promise((resolve, reject) => {
      axios_instance1
        .get(
          `${Constants.BASE_API_URL}/searchforagent.php?accountnum=${accountnum}&mlsorganizationid=${item.mls_organization_id}&passsword=${password}&agentid=${agent_id}`,
        )
        .then(res => {
          if (res.status === 200) {
            var data = res.data[0];
            // alert(data);
            resolve({ data: res.data, IsSuccess: true });
          } else if (res.status !== 200) {
            reject({ data: res.data, IsSuccess: false });
          }
        })
        .catch(error => {
          resolve(error);
        });
    });
  };
  LinkLMSaccount = (item, accountnum, mls_organization_id) => {
    //alert(accountnum);
    // let bodyFormData = new FormData();
    // bodyFormData.append('accountnum', accountnum);
    // bodyFormData.append('mlsorganizationid', item.mls_organization_id);
    // bodyFormData.append('agentid', item.agentid);
    var password = '';
    return new Promise((resolve, reject) => {
      axios_instance1
        .get(
          `${Constants.BASE_API_URL}/get_agent_information_from_mls.php?accountnum=${accountnum}&mlsorganizationid=${mls_organization_id}&passsword=${password}&agentid=${item.agentid}`,
        )
        .then(res => {
          if (res.status === 200) {
            var data = res.data[0];
            // alert(data);
            resolve({ data: res.data, IsSuccess: true });
          } else if (res.status !== 200) {
            reject({ data: res.data, IsSuccess: false });
          }
        })
        .catch(error => {
          resolve(error);
        });
    });
  };

  getbroker = accountnum => {
    return new Promise((resolve, reject) => {
      axios_instance
        .get(
          `${Constants.BASE_API_URL}/get_broker_oh_attendees.php?accountnum=${accountnum}`,
        )
        .then(res => {
          if (res.status === 200) {
            resolve({ data: res.data, IsSuccess: true });
          } else if (res.status !== 200) {
            reject({ data: res.data, IsSuccess: false });
          }
        })
        .catch(error => {
          resolve(error);
        });
    });
  };

  update_partner = (accountnum, id) => {
    let bodyFormData = new FormData();
    bodyFormData.append('accountnum', accountnum);
    bodyFormData.append('advertisingid', id);
    return new Promise((resolve, reject) => {
      axios_instance
        .post(`${Constants.BASE_API_URL}/update_advertiserid.php`, bodyFormData
        )
        .then(res => {
          if (res.status === 200) {
            resolve({ data: res.data, IsSuccess: true });
          } else if (res.status !== 200) {
            reject({ data: res.data, IsSuccess: false });
          }
        })
        .catch(error => {
          resolve(error);
        });
    });
  };

  createProperty = (
    accountnum,
    propertytype,
    propertyid,
    propertyaddress,
    propertycity,
    propertystate,
    propertyzipcode,
    propertyprice,
    propertytaxes,
  ) => {

    let bodyFormData = new FormData();
    bodyFormData.append('accountnum', accountnum);
    bodyFormData.append('propertytype', propertytype);
    bodyFormData.append('propertyid', propertyid);
    bodyFormData.append('propertyaddress', propertyaddress);
    bodyFormData.append('propertycity', propertycity);
    bodyFormData.append('propertystate', propertystate);
    bodyFormData.append('propertyzipcode', propertyzipcode);
    bodyFormData.append('propertyprice', propertyprice);
    bodyFormData.append('propertytaxes', propertytaxes);
    console.log('19101411#############');
    console.log(bodyFormData);
    return new Promise((resolve, reject) => {
      axios_instance1
        .post(`${Constants.BASE_API_URL}/create_property.php`, bodyFormData)
        .then(res => {
          if (res.status === 200) {

            console.log(res.data);
            console.log('19101411#############')
            resolve({ data: res.data, IsSuccess: true });
          } else if (res.status !== 200) {
            reject({ data: res.data, IsSuccess: false });
          }
        })
        .catch(error => {
          resolve(error);
        });
    });
  };

  createevent = (data) => {
    let bodyFormData = new FormData();
    bodyFormData.append('accountnum', data.accountnum);
    bodyFormData.append('eventdate', data.eventdate);
    bodyFormData.append('eventname', data.eventname);
    bodyFormData.append('eventuniqueid', data.uniqueid);
    return new Promise((resolve, reject) => {
      axios_instance1
        .post(`${Constants.BASE_API_URL}/create_event.php`, bodyFormData)
        .then(res => {
          if (res.status === 200) {
            resolve({ data: res.data, IsSuccess: true });
          } else if (res.status !== 200) {
            reject({ data: res.data, IsSuccess: false });
          }
        })
        .catch(error => {
          resolve(error);
        });
    });
  };
  // attendeefirstname: attendeefirstname,
  //       attendeelastname: attendeelastname,
  //       attendeeemail: attendeeemail,
  //       attendeetelephone: attendeetelephone,
  //       attendeebrokername: attendeebrokername,
  //       advertisingid: this.props.login.account.advertising_id,
  //       uniqueid: this.state.eventdata.event_uniqueid,
  //       eventid: this.state.eventdata.event_id,

  createnewattendeeevent = data => {
    let bodyFormData = new FormData();
    bodyFormData.append('accountnum', data.accountnum);
    bodyFormData.append('eventattendeefirstname', data.attendeefirstname);
    bodyFormData.append('eventattendeelastname', data.attendeelastname);
    bodyFormData.append('eventattendeeemail', data.attendeeemail);
    bodyFormData.append('eventattendeetelephone', data.attendeetelephone);
    // bodyFormData.append('', data.attendeebrokername);
    bodyFormData.append('advertisingid', data.advertisingid);
    bodyFormData.append('uniqueid', data.uniqueid);
    bodyFormData.append('eventid', data.eventid);

    return new Promise((resolve, reject) => {
      axios_instance1
        .post(`${Constants.BASE_API_URL}/post_event_attendee.php`, bodyFormData)
        .then(res => {
          if (res.status === 200) {
            resolve({ data: res.data, IsSuccess: true });
          } else if (res.status !== 200) {
            reject({ data: res.data, IsSuccess: false });
          }
        })
        .catch(error => {
          resolve(error);
        });
    });
  };

  createnewattendeeagent = data => {
    let bodyFormData = new FormData();
    bodyFormData.append('accountnum', data.accountnum);
    bodyFormData.append('propertyrecordnum', data.propertyrecordnum);
    bodyFormData.append('attendeeagentfullname', data.attendeeagentfullname);
    bodyFormData.append('attendeeagenttelephone', data.attendeeagenttelephone);
    bodyFormData.append(
      'attendeeagentcompanyname',
      data.attendeeagentcompanyname,
    );
    bodyFormData.append('attendeefirstname', data.attendeefirstname);
    bodyFormData.append('attendeelastname', data.attendeelastname);
    bodyFormData.append('attendeeemail', data.attendeeemail);
    bodyFormData.append('attendeetelephone', data.attendeetelephone);
    bodyFormData.append(
      'attendeeworkingwithagentyesorno',
      data.attendeeworkingwithagentyesorno,
    );
    bodyFormData.append('advertisingid', data.advertisingid);
    bodyFormData.append('uniqueid', data.uniqueid);
    bodyFormData.append('attendeetype', data.attendeetype);
    return new Promise((resolve, reject) => {
      axios_instance1
        .post(
          `${Constants.BASE_API_URL}/post_public_oh_attendee_working_with_agent.php`,
          bodyFormData,
        )
        .then(res => {
          if (res.status === 200) {
            resolve({ data: res.data, IsSuccess: true });
          } else if (res.status !== 200) {
            reject({ data: res.data, IsSuccess: false });
          }
        })
        .catch(error => {
          resolve(error);
        });
    });
  };

  updateprofile = (
    accountnum,
    firstname,
    lastname,
    cellphone,
    officename,
    title,
  ) => {
    let bodyFormData = new FormData();
    bodyFormData.append('accountnum', accountnum);
    bodyFormData.append('firstname', firstname);
    bodyFormData.append('lastname', lastname);
    bodyFormData.append('cellphone', cellphone);
    bodyFormData.append('officename', officename);
    bodyFormData.append('title', title);
    bodyFormData.append('officetelephone', '');

    return new Promise((resolve, reject) => {
      axios_instance1
        .post(`${Constants.accounturl}/update_agent_account.php`, bodyFormData)
        .then(res => {
          if (res.status === 200) {
            resolve({ data: res.data, IsSuccess: true });
          } else if (res.status !== 200) {
            reject({ data: res.data, IsSuccess: false });
          }
        })
        .catch(error => {
          resolve(error);
        });
    });
  };
  PostBroker = data => {
    let bodyFormData = new FormData();
    bodyFormData.append('accountnum', data.accountnum);
    bodyFormData.append('propertyrecordnum', data.propertyrecordnum);
    bodyFormData.append('agentfullname', data.agentfullname);
    bodyFormData.append('agenttelephone', data.agenttelephone);
    bodyFormData.append('agentbrokername', data.agentbrokername);
    bodyFormData.append('agentemail', data.agentemail);
    bodyFormData.append('bestsellingfeatures', data.bestsellingfeatures);
    bodyFormData.append(
      'whatdoyouthinkaboutthelistingprice',
      data.whatdoyouthinkaboutthelistingprice,
    );
    bodyFormData.append('anysuggestions', data.anysuggestions);
    bodyFormData.append('willreferproperty', data.willreferproperty);
    bodyFormData.append('keepinform', data.keepinform);
    bodyFormData.append('uniqueid', data.uniqueid);

    return new Promise((resolve, reject) => {
      axios_instance1
        .post(
          `${Constants.BASE_API_URL}/post_broker_oh_attendee.php`,
          bodyFormData,
        )
        .then(res => {
          if (res.status === 200) {
            resolve({ data: res.data, IsSuccess: true });
          } else if (res.status !== 200) {
            reject({ data: res.data, IsSuccess: false });
          }
        })
        .catch(error => {
          resolve(error);
        });
    });
  };
  PostPublicBroker = data => {
    let bodyFormData = new FormData();
    bodyFormData.append('accountnum', data.accountnum);
    bodyFormData.append('propertyrecordnum', data.propertyrecordnum);
    bodyFormData.append(
      'attendeeisanagentfullname',
      data.firstname + ' ' + data.lastname,
    );
    bodyFormData.append('attendeeisanagenttelephone', data.telephone);
    bodyFormData.append('attendeeisanagentbrokername', data.brokername);
    bodyFormData.append('attendeeisanagentemail', data.agentemail);
    bodyFormData.append('attendeeisanagenttelephone', data.telephone);
    bodyFormData.append('advertisingid', data.advertisingid);
    bodyFormData.append('attendeetype', data.attendeetype);
    bodyFormData.append('uniqueid', data.uniqueid);

    return new Promise((resolve, reject) => {
      axios_instance1
        .post(
          `${Constants.BASE_API_URL}/post_public_oh_attendee_agent.php`,
          bodyFormData,
        )
        .then(res => {
          if (res.status === 200) {
            resolve({ data: res.data, IsSuccess: true });
          } else if (res.status !== 200) {
            reject({ data: res.data, IsSuccess: false });
          }
        })
        .catch(error => {
          resolve(error);
        });
    });
  };



  PostData = data => {
    let bodyFormData = new FormData();
    bodyFormData.append('accountnum', data.accountnum);
    bodyFormData.append('propertyrecordnum', data.propertyrecordnum);
    bodyFormData.append('uniqueid', data.uniqueid);
    bodyFormData.append('attendeetype', 'B');
    bodyFormData.append('attendeeworkingwithagentyesorno', '0');
    bodyFormData.append('advertisingid', data.advertisingid);
    bodyFormData.append('attendeefirstname', Constants.attendeefirstname);
    bodyFormData.append('attendeelastname', Constants.attendeelastname);
    bodyFormData.append('attendeeemail', Constants.attendeeemail);
    bodyFormData.append('attendeetelephone', Constants.attendeetelephone);

    bodyFormData.append(
      'attendeepropertylistedyesorno',
      Constants.attendeepropertylistedyesorno,
    );
    bodyFormData.append('attendeeownorrent', Constants.attendeeownorrent);
    bodyFormData.append(
      'attendeeneedtosellyesorno',
      Constants.attendeeneedtosellyesorno,
    );
    bodyFormData.append('attendeereceivecma', Constants.attendeereceivecma);
    bodyFormData.append(
      'attendeeprospectmatch',
      Constants.attendeeprospectmatch,
    );

    bodyFormData.append('attendeeaddress', Constants.attendeeaddress);
    bodyFormData.append('attendeecity', Constants.attendeecity);
    bodyFormData.append('attendeestate', Constants.attendeestate);
    bodyFormData.append('attendeezipcode', Constants.attendeezipcode);

    bodyFormData.append(
      'attendeehowsoonlookingtobuyorrent',
      Constants.attendeehowsoonlookingtobuyorrent,
    );
    bodyFormData.append(
      'attendeehearaboutlisting',
      Constants.attendeehearaboutlisting,
    );
    bodyFormData.append(
      'attendeehowhearaboutlistinganswer',
      Constants.attendeehowhearaboutlistinganswer,
    );
    bodyFormData.append(
      'attendeeareyouprequalified',
      Constants.attendeeareyouprequalified,
    );

    bodyFormData.append(
      'attendeeprequalifiedbankname',
      Constants.attendeeprequalifiedbankname,
    );
    bodyFormData.append(
      'attendeehowgoodisyourcredit',
      Constants.attendeehowgoodisyourcredit,
    );
    bodyFormData.append(
      'attendeehaverealestateattorney',
      Constants.attendeehaverealestateattorney,
    );
    bodyFormData.append('attendeefollowupvia', Constants.attendeefollowupvia);

    return new Promise((resolve, reject) => {
      axios_instance1
        .post(`${Constants.BASE_API_URL}/post_oh_attendee.php`, bodyFormData)
        .then(res => {
          if (res.status === 200) {
            resolve({ data: res.data, IsSuccess: true });
          } else if (res.status !== 200) {
            reject({ data: res.data, IsSuccess: false });
          }
        })
        .catch(error => {
          resolve(error);
        });
    });
  };
}
const instance = new DashboardService();
export default instance;
