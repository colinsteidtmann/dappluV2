var express = require("express");
var router = express.Router();

router.post("/", function (req, res, next) {
  const sgMail = require("@sendgrid/mail");
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: "colinsteidtmann@gmail.com", // Change to your recipient
    from: "colinsteidtmann@gmail.com", // Change to your verified sender
    cc: req.body.brandEmail,
    subject: "New brand application",
    html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
                <html data-editor-version="2" class="sg-campaigns" xmlns="http://www.w3.org/1999/xhtml">
                    <head>
                      <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
                      <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1">
                      <!--[if !mso]><!-->
                      <meta http-equiv="X-UA-Compatible" content="IE=Edge">
                      <!--<![endif]-->
                      <!--[if (gte mso 9)|(IE)]>
                      <xml>
                        <o:OfficeDocumentSettings>
                          <o:AllowPNG/>
                          <o:PixelsPerInch>96</o:PixelsPerInch>
                        </o:OfficeDocumentSettings>
                      </xml>
                      <![endif]-->
                      <!--[if (gte mso 9)|(IE)]>
                  <style type="text/css">
                    body {width: 600px;margin: 0 auto;}
                    table {border-collapse: collapse;}
                    table, td {mso-table-lspace: 0pt;mso-table-rspace: 0pt;}
                    img {-ms-interpolation-mode: bicubic;}
                  </style>
                <![endif]-->
                      <style type="text/css">
                    body, p, div {
                      font-family: arial,helvetica,sans-serif;
                      font-size: 14px;
                    }
                    body {
                      color: #000000;
                    }
                    body a {
                      color: #1188E6;
                      text-decoration: none;
                    }
                    p { margin: 0; padding: 0; }
                    table.wrapper {
                      width:100% !important;
                      table-layout: fixed;
                      -webkit-font-smoothing: antialiased;
                      -webkit-text-size-adjust: 100%;
                      -moz-text-size-adjust: 100%;
                      -ms-text-size-adjust: 100%;
                    }
                    img.max-width {
                      max-width: 100% !important;
                    }
                    .column.of-2 {
                      width: 50%;
                    }
                    .column.of-3 {
                      width: 33.333%;
                    }
                    .column.of-4 {
                      width: 25%;
                    }
                    ul ul ul ul  {
                      list-style-type: disc !important;
                    }
                    ol ol {
                      list-style-type: lower-roman !important;
                    }
                    ol ol ol {
                      list-style-type: lower-latin !important;
                    }
                    ol ol ol ol {
                      list-style-type: decimal !important;
                    }
                    @media screen and (max-width:480px) {
                      .preheader .rightColumnContent,
                      .footer .rightColumnContent {
                        text-align: left !important;
                      }
                      .preheader .rightColumnContent div,
                      .preheader .rightColumnContent span,
                      .footer .rightColumnContent div,
                      .footer .rightColumnContent span {
                        text-align: left !important;
                      }
                      .preheader .rightColumnContent,
                      .preheader .leftColumnContent {
                        font-size: 80% !important;
                        padding: 5px 0;
                      }
                      table.wrapper-mobile {
                        width: 100% !important;
                        table-layout: fixed;
                      }
                      img.max-width {
                        height: auto !important;
                        max-width: 100% !important;
                      }
                      a.bulletproof-button {
                        display: block !important;
                        width: auto !important;
                        font-size: 80%;
                        padding-left: 0 !important;
                        padding-right: 0 !important;
                      }
                      .columns {
                        width: 100% !important;
                      }
                      .column {
                        display: block !important;
                        width: 100% !important;
                        padding-left: 0 !important;
                        padding-right: 0 !important;
                        margin-left: 0 !important;
                        margin-right: 0 !important;
                      }
                      .social-icon-column {
                        display: inline-block !important;
                      }
                    }
                  </style>
                      <!--user entered Head Start--><!--End Head user entered-->
                    </head>
                    <body>
                      <center class="wrapper" data-link-color="#1188E6" data-body-style="font-size:14px; font-family:arial,helvetica,sans-serif; color:#000000; background-color:#FFFFFF;">
                        <div class="webkit">
                          <table cellpadding="0" cellspacing="0" border="0" width="100%" class="wrapper" bgcolor="#FFFFFF">
                            <tr>
                              <td valign="top" bgcolor="#FFFFFF" width="100%">
                                <table width="100%" role="content-container" class="outer" align="center" cellpadding="0" cellspacing="0" border="0">
                                  <tr>
                                    <td width="100%">
                                      <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                        <tr>
                                          <td>
                                            <!--[if mso]>
                    <center>
                    <table><tr><td width="600">
                  <![endif]-->
                                                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%; max-width:600px;" align="center">
                                                      <tr>
                                                        <td role="modules-container" style="padding:0px 0px 0px 0px; color:#000000; text-align:left;" bgcolor="#FFFFFF" width="100%" align="left"><table class="module preheader preheader-hide" role="module" data-type="preheader" border="0" cellpadding="0" cellspacing="0" width="100%" style="display: none !important; mso-hide: all; visibility: hidden; opacity: 0; color: transparent; height: 0; width: 0;">
                    <tr>
                      <td role="module-content">
                        <p></p>
                      </td>
                    </tr>
                  </table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="9021c408-ffd6-42fa-a494-54703977f60b" data-mc-module-version="2019-10-22">
                    <tbody>
                      <tr>
                        <td style="padding:18px 0px 18px 0px; line-height:22px; text-align:inherit;" height="100%" valign="top" bgcolor="" role="module-content"><div><div style="font-family: inherit; text-align: center"><span style="font-size: 24px">${req.body.brandName} just filled out a brand application</span></div><div></div></div></td>
                      </tr>
                    </tbody>
                  </table><table class="wrapper" role="module" data-type="image" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="0c6c3def-f523-4b78-867f-c542c4b94561">
                    <tbody>
                      <tr>
                        <td style="font-size:6px; line-height:10px; padding:0px 0px 0px 0px;" valign="top" align="center">
                          <img class="max-width" border="0" style="display:block; color:#000000; text-decoration:none; font-family:Helvetica, arial, sans-serif; font-size:16px; max-width:25% !important; width:25%; height:auto !important;" width="150" alt="" data-proportionally-constrained="true" data-responsive="true" src=${req.body.profilePic}>
                        </td>
                      </tr>
                    </tbody>
                  </table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="574b2c46-40f7-4d50-be09-9ccaeb22c45a" data-mc-module-version="2019-10-22">
                    <tbody>
                      <tr>
                        <td style="padding:18px 0px 18px 0px; line-height:22px; text-align:inherit;" height="100%" valign="top" bgcolor="" role="module-content"><div><div style="font-family: inherit; text-align: inherit"><strong>Brand name: </strong>${req.body.brandName}&nbsp;</div><div></div></div></td>
                      </tr>
                    </tbody>
                  </table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="574b2c46-40f7-4d50-be09-9ccaeb22c45a.1" data-mc-module-version="2019-10-22">
                    <tbody>
                      <tr>
                        <td style="padding:18px 0px 18px 0px; line-height:22px; text-align:inherit;" height="100%" valign="top" bgcolor="" role="module-content"><div><div style="font-family: inherit; text-align: inherit"><strong>Email: </strong>${req.body.brandEmail}&nbsp;</div><div></div></div></td>
                      </tr>
                    </tbody>
                  </table><table class="module" role="module" data-type="divider" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="c0350961-3c1f-4724-b48d-a64e5f518254">
                    <tbody>
                      <tr>
                        <td style="padding:0px 0px 0px 0px;" role="module-content" height="100%" valign="top" bgcolor="">
                          <table border="0" cellpadding="0" cellspacing="0" align="center" width="100%" height="10px" style="line-height:10px; font-size:10px;">
                            <tbody>
                              <tr>
                                <td style="padding:0px 0px 10px 0px;" bgcolor="#000000"></td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="574b2c46-40f7-4d50-be09-9ccaeb22c45a.1.1.1.1" data-mc-module-version="2019-10-22">
                    <tbody>
                      <tr>
                        <td style="padding:18px 0px 18px 0px; line-height:22px; text-align:inherit;" height="100%" valign="top" bgcolor="" role="module-content"><div><div style="font-family: inherit; text-align: inherit"><strong>Elevator pitch: </strong>${req.body.brandPitch}&nbsp;</div><div></div></div></td>
                      </tr>
                    </tbody>
                  </table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="574b2c46-40f7-4d50-be09-9ccaeb22c45a.1.1.1.1.1" data-mc-module-version="2019-10-22">
                    <tbody>
                      <tr>
                        <td style="padding:18px 0px 18px 0px; line-height:22px; text-align:inherit;" height="100%" valign="top" bgcolor="" role="module-content"><div><div style="font-family: inherit; text-align: inherit"><strong>Partners they're seeking: </strong>${req.body.brandLooking}&nbsp;</div><div></div></div></td>
                      </tr>
                    </tbody>
                  </table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="574b2c46-40f7-4d50-be09-9ccaeb22c45a.1.1.1.1.1.1" data-mc-module-version="2019-10-22">
                    <tbody>
                      <tr>
                        <td style="padding:18px 0px 18px 0px; line-height:22px; text-align:inherit;" height="100%" valign="top" bgcolor="" role="module-content"><div><div style="font-family: inherit; text-align: inherit"><strong>About their company: </strong>${req.body.brandAbout}&nbsp;</div><div></div></div></td>
                      </tr>
                    </tbody>
                  </table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="574b2c46-40f7-4d50-be09-9ccaeb22c45a.1.1.1.1.1.1.1" data-mc-module-version="2019-10-22">
                    <tbody>
                      <tr>
                        <td style="padding:18px 0px 18px 0px; line-height:22px; text-align:inherit;" height="100%" valign="top" bgcolor="" role="module-content"><div><div style="font-family: inherit; text-align: inherit"><strong>How influencers should contact them: </strong>${req.body.brandContact}&nbsp;</div><div></div></div></td>
                      </tr>
                    </tbody>
                  </table></td>
                                                      </tr>
                                                    </table>
                                                    <!--[if mso]>
                                                  </td>
                                                </tr>
                                              </table>
                                            </center>
                                            <![endif]-->
                                          </td>
                                        </tr>
                                      </table>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                        </div>
                      </center>
                    </body>
                  </html>`,
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
      res.status(200).send("Email successfully sent");
    })
    .catch((error) => {
      console.error(error);
      res.status(400).send("There was an error");
    });
});

module.exports = router;
