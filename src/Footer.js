import React from 'react';
import json2mq from 'json2mq';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const Footer = () => {
  // Sadly browser specific logic
  const isFirefox = typeof InstallTrigger !== 'undefined';
  const maxWidth = isFirefox ? "-moz-available" : "-webkit-fill-available";
  const matches = useMediaQuery( json2mq({minWidth:750}) );
  return (
    <>
      <div className="second-footer">
        <div className="container">
          <div className="row"
               style={{display:'flex',
                       flexFlow:(matches ? 'row' : 'column'),
                       justifyContent: "space-evenly",
                       marginLeft: "auto",
                       marginRight: "auto",
                       width:"960px",
                       maxWidth: maxWidth,
                      }}>
            <div className="contact-footer">
              <div className="footer-border ">
                <h1>Social Network</h1>
                <ul>
                  <li>
                    <a href="https://www.facebook.com/tokyo.gaijins.group" target="_blank" rel="noopener noreferrer">
                      <img src="/images/facebook.png" alt="facebook" />Like us on Facebook</a>
                  </li>
                  <li>
                    <a href="https://www.twitter.com/gaijins" target="_blank" rel="noopener noreferrer">
                      <img src="/images/twitter.png" alt="twitter"/>Follow us on Twitter</a>
                  </li>
                  <li>
                    <a href="https://www.meetup.com/tokyogaijins" target="_blank" rel="noopener noreferrer">
                      <img src="/images/meet-up.png" alt="meet-up"/>Join our Meetup Group</a>
                  </li>
                  <li>
                    <a href="https://www.youtube.com/channel/UCdCYiz30dA6hqWayu_jHq7w" target="_blank" rel="noopener noreferrer">
                      <img src="/images/youtube.png" alt="youtube"/>Watch us on Youtube</a>
                  </li>
                  <li>
                    <a href="https://www.flickr.com/photos/132654787@N03/" target="_blank" rel="noopener noreferrer">
                      <img src="/images/flickr.png" alt="flickr" />Photos on Flickr</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="contact-footer">
              <div className="footer-border ">
                <h1>Contact Us</h1>
                <p>
                  <i className="fa fa-paper-plane">
                  </i> Email:
                  <a href="mailto:info@tokyogaijins.com " title="Email Us" className="bottom-icon ">info@tokyogaijins.com </a>
                  <br />
                  <i className="fa fa-phone">
                  </i> Telephone: 03-6435-0494<br />
                  <i className="fa fa-fax">
                  </i> Fax: 03-6435-0408<br />
                  <i className="fa fa-map-marker">
                  </i> Address: &#12306;108-0014 Tokyo-to Minato-ku<br/> Shiba 4-3-2 Mita Fuyou Heights 409<br/>
                </p>
                <h1>Join our Newsletter</h1>
                <script type="text/javascript" src="//app.icontact.com/icp/static/form/javascripts/validation.js">
                </script>
                <script type="text/javascript" src="//app.icontact.com/icp/static/form/javascripts/tracking.js">
                </script>
                <style type="text/css" id="signupBuilderAdvancedStyles">
                </style>
                <form action="https://app.icontact.com/icp/core/mycontacts/signup/designer/form/?id=18&cid=188281&lid=236" id="ic_signupform" method="POST">
                  <div className="elcontainer tight inline-label-right left-aligned">
                    <div className="sortables">
                      <div data-label="Email" data-validation-type="1" style={{display: "inline-block", width: "100%"}} className="formEl fieldtype-input required">
                        <input placeholder="Join our newsletter! Enter email here" name="data[email]" type="text"/>
                        <div className="submit-container">
                          <input value="Submit" className="btn btn-submit" type="submit"/>
                        </div>
                      </div>
                      <div data-label="Lists" data-validation-type="1" style={{display: "none", width: "100%"}} dataname="listGroups" className="formEl fieldtype-checkbox required">
                        <h3>Lists<span className="indicator required">*</span>
                        </h3>
                        <div className="option-container">
                          <label className="checkbox">
                            <input alt="" name="data[listGroups][]" value="303" checked="checked" type="checkbox" readOnly/>Outdoor Parties</label>
                        </div>
                      </div>
                    </div>
                    <div className="hidden-container">
                    </div>
                  </div>
                </form>
                <img src="//app.icontact.com/icp/core/signup/tracking.gif?id=18&cid=188281&lid=236" alt="not sure"/>
              </div>
            </div>
    <div className="contact-footer" style={{margin:"10px"}}>
              <div className="footer-border ">
                <h1>Affiliation</h1>
                <p>
                  <img src="/images/affilliation-2.png" alt="affiliation-2" style={{maxWidth:maxWidth}}/><br/>
                  Licensed Travel Agent<br/>&#26481;&#20140;&#37117;&#30693;&#20107;&#30331;&#37682;&#26053;&#34892;&#26989;&#31532;2-6815&#21495;</p>
                <img src="/images/affilliation-1.png" alt="affiliation-1" style={{maxWidth:maxWidth}}/>
                <p>Registered Member
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="copyright-area">
            <div className="bottom-footer">
              &copy; Copyright 2020 <a href="http://www.tokyogaijins.com">Tokyo Gaijins</a>. All Rights Reserved.
              <div className="footer-menu">
                <ul>
                  <li>
                    <a href="/">Home</a>
                  </li>
                  <li >
                    <a href="../about.php" title="About">About</a>
                  </li>
                  <li>
                    <a href="../faq.php" title="Faqs">FAQ</a>
                  </li>
                  <li>
                    <a href="../privacy.php" title="Privacy Policy">Privacy Policy</a>
                  </li>
                  <li>
                    <a href="../tour-conditions.php" target="_blank" rel="noopener noreferrer" title="Tour Conditions">Tour Conditions</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
