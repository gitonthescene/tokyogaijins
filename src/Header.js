import React, { useState } from 'react';
//import {baseurl as BASEURL} from './config.json';

const Header = () => {
  const [email, setEmail] = useState( "" );

  const onChange = e => {
    const val = e.target.value;
    setEmail( val );
  };

// FIXME!!!  This for the mailing list once we understand how it's supposed to work.
//  const defaults = {
//    redirect: BASEURL+"/maillists-confirmation.php",
//    errorredirect: "https://www.icontact.com/www/signup/error.html",
//    listid: "236",
//    'specialid:236': "E1U3",
//    clientid: "188281",
//    formid: "176",
//    reallistid: "1",
//    doubleopt: "1",
//  };

  const handleSubmit = () => {
  };
  // Sadly browser specific logic
  const isFirefox = typeof InstallTrigger !== 'undefined';
  const maxWidth = isFirefox ? "-moz-available" : "-webkit-fill-available";
  return (
    <>
    <div className="top-header-flag"></div>
      <div id="topmenu" className="navbar navbar-fixed-top">
        <div className="container">

          <a className="brand" href="../index.php"><img src="/images/logo.png" alt="Tokyo Gaijins" style={{maxWidth:maxWidth}} /></a>
          <div className="span6 pull-right">
            <div className="header-contact pull-right">

              <div className="join-us">


                <div className="join-us">
                  <div id="subscribe">
                    <form captcha-key="6LeCZCcUAAAAALhxcQ5fN80W6Wa2K3GqRQK6WRjA" captcha-theme="light" new-captcha="true" method="post" action="https://app.icontact.com/icp/core/mycontacts/signup/designer/form/?id=176&cid=188281&lid=236" name="icpsignup" id="ic_signupform" className="form-inline form-search pull-right" acceptCharset="UTF-8">
                      <input id="eEmail" className="member" type="text" name="fields_email" placeholder="Enter email here" value={email} onChange={onChange}></input>
                      <button className="join-button" type="submit" onClick={handleSubmit}>JOIN</button>
                      <div className="clear">
                      </div>
                    </form>



                    <script type="text/javascript" src="//app.icontact.com/icp/static/form/javascripts/validation-captcha.js"></script>

                    <script type="text/javascript" src="//app.icontact.com/icp/static/form/javascripts/tracking.js"></script>


                  </div>



                </div>



              </div>
            </div>
          </div>
        </div>
      </div>
      <section>
        <div className="sticky">
          <div  className="navbar navbar-fixed-top">
            <div className="container">
              <div className="col17">
                <div className=" nav-menu" style={{zIndex:4}}>
                  <nav className="clearfix">
                    <div className="nav-collapse">
                      <ul className="clearfix">
                        <li className=" menu"><a href="../index.php">Home</a></li>

                        <li className=" menu" data-role='dropdown'><a href="../upcoming.php">Upcoming <b className="caret"></b></a>
                          <ul>
                            <li><a href="../upcoming.php" >JANUARY</a></li>
                            <li><a href="../upcoming-february.php" >FEBRUARY</a></li>
                            <li><a href="../upcoming-march.php" >MARCH</a></li>
                            <li><a href="../upcoming-april.php" >APRIL</a></li>
                            <li><a href="../upcoming-may.php" >MAY</a></li>
                          </ul>
                        </li>

                        <li className=" menu" data-role='dropdown'><a href="/">Events <b className="caret"></b></a>
                          <ul>
                            <li><a href="../ski-snowboard.php">Skiing/Snowboarding</a></li>
                            <li><a href="../fuji-hikes.php">Mt. Fuji Hikes</a></li>
                            <li><a href="../island-adventures.php">Island Adventures</a></li>
                            <li><a href="../kayaking-rafting.php">Kayaking & Rafting</a></li>
                            <li><a href="../salsa.php">Salsa Party</a></li>
                            <li><a href="../basketball.php">Basketball</a></li>
                            <li><a href="../volleyball.php">Volleyball</a></li>
                          </ul>
                        </li>
                        <li className="menu"><a href="../reservations">Reserve</a></li>
                        <li className="menu"><a href="/">Gallery <b className="caret"></b></a>
                          <ul>
                            <li><a href="../photos.php">Photos</a></li>
                            <li><a href="../videos.php">Videos</a></li>
                          </ul>
                        </li>
                        <li className="menu"><a href="../membership.php">Membership</a></li>
                        <li className="menu"><a href="../contact.php">Contact</a></li>
                      </ul>

                    </div>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>

  );
};

export default Header;
