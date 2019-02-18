import React from 'react';
import { ScrollView, Text } from "react-native";

import MenuBackButton from './MenuBackButton'
import Colors from '../constants/Colors';

export default class AboutUs extends React.Component {
    static navigationOptions = {
        header:null
    };

    render() {
        return (
            <ScrollView style={{ backgroundColor: '#FCFFFD', height: '100%' }}>
                <MenuBackButton style={{marginTop:20}} navigation={this.props.navigation} />
                <Text style={{ fontFamily:'Droid Arabic Kufi',color: Colors.mainColor,textAlign:'center', backgroundColor: 'transparent', fontWeight: 'bold', fontSize: 18, margin: 12, marginTop: 20}}>About almahra App</Text>
                <Text style={{fontFamily:'Droid Arabic Kufi',textAlign:'center', color: Colors.secondaryColor, backgroundColor: '#F5FAF7', fontSize: 16, padding: 12, marginTop: 10}}>
                PRIVACY AND COOKIE POLICY
                ("Sivvi", "we", "our", "us") is a trading name of ALMAHRA FASHION GROUP. We respect the privacy rights of its online visitors ("you", "your", "yours") and recognise the importance of protecting the information collected about them. We have adopted a corporate wide Privacy Policy that guides how we collect, store, and use the information that you provide us with.
                The following information is provided by Almahra fashion group to enable our online visitors to be fully informed of our Privacy Policies. By visiting ALMAHRA FASHION GROUP website or application, you are accepting and consenting to the practices described in this Privacy Policy and the Terms and Conditions.
                This Privacy Policy does not apply to websites or applications maintained by other companies or organisations to which we link and ALMAHRA FASHION GROUP is not responsible for any personal information you submit to third parties via our website or application. Please ensure that you read the Privacy Policy of such other companies or organizations before submitting your details.
                WHAT PERSONAL INFORMATION DO WE COLLECT FROM YOU AND HOW?
                ALMAHRA FASHION GROUP collects personal information in several ways when you place an order, buy a gift voucher for a friend or register for a service offered by ALMAHRA FASHION GROUP. By registering, you are consenting to the collection of your personal data. If an order is placed with us, we need to hold personal information including your name, email address, phone numbers, home address, shipping and credit/debit card billing address(es) so that we can process and fulfill your order.
                Saved card details will never be shared with third parties and will only be used to process your order, using our payment partner's systems. Additionally, we may also obtain information as a result of authentication or identity checks. Sometimes we may ask for your telephone number. This number may be given to our courier for delivery services. These details allow us to process your order and to let you know the status of your order.
                HOW THIS INFORMATION MAY BE USED, INCLUDING ANYONE IT MIGHT BE SHARED WITH?
                ALMAHRA FASHION GROUP may use your personal information for the processing of orders, payments and to provide you with a personalised shopping experience. We will also use your details to fulfill and deliver your orders and manage your account. Personal information that you provide may be disclosed to a credit reference or fraud prevention agency, which may keep a record of that information. Where there is a legal obligation to do so, we may disclose your information to any relevant regulatory body.
                We may also use your personal information to send you marketing updates but only ever in accordance with your preferences (as detailed in the next section). We do not sell or provide your details to third party marketing companies.
                Finally, we may use your personal information for our internal marketing and demographic studies, together with non-personal data to monitor customer patterns so we can consistently improve our site and application design to better meet our visitors' needs.
                MARKETING OPT-IN AND OPT-OUT PROVISION
                When you register, you will be given the option to opt-out of subscribing to our regular update service which will send you:
                (i) Email alerts for new products, special offers, events of interest and one-off marketing promotions. Such alerts may include marketing information about ALMAHRA FASHION GROUP, our subsidiaries or selected business partners.
                (ii) Direct mail alerts for new products, special offers, events of interest, and one-off marketing promotions. Such alerts will only include marketing information about ALMAHRA FASHION GROUP.
                We do not sell or otherwise pass your details to third parties for marketing purposes. Marketing communications you subscribe to will only be sent by ALMAHRA FASHION GROUP.
                At all times, we will offer you the opportunity to unsubscribe out of any service or update to which you have subscribed, if you change your mind. Any e-mail we send you will contain an easy automated unsubscribe link so that you can opt-out of that particular mailshot. Simply follow the indications in the e-mail. Alternatively, you can change your email preferences or opt out of all emails by logging into My Account. To opt out of direct mail service or updates, please contact our ALMAHRA FASHION GROUP Customer Care team on
                ‪+97339643343‬
                 (from a mobile or internationally) or by email at ❌email لازم
                EMAIL COMMUNICATIONS
                To unsubscribe from ALMAHRA FASHION GROUP email communications, please click the unsubscribe link within the email you have received.
                HOW YOU CAN ACCESS AND IF NECESSARY, CHANGE THE PERSONAL INFORMATION ALMAHRA FASHION GROUP MAINTAINS?
                If, for any reason, you are concerned that the personal information held by ALMAHRA FASHION GROUP is not correct, please visit the website or application and, after logging into the site or application using the "Sign In" menu, your personal information will be made available for review and change in the "My Account" section. Only you or, upon your request, the Customer Care team, may access your personal data from the website using your password and User ID. Information may be changed online within My Details, Shipping Details, and My Email Preferences. You can change or delete saved credit/debit card.
                WHERE AND HOW TO ASK QUESTIONS OR FILE COMPLAINTS?
                If you require further information about our Privacy Policy, please go to the FAQs section of the website or application where frequently asked questions are answered. If you require more information, please send an email to our ALMAHRA FASHION GROUP Customer Care team. If you wish to talk to a member of our ALMAHRA FASHION GROUP Customer Care team, please call +97339643343 (from a mobile or internationally) or write to: c/o Data Protection Officer at:
                ALMAHRA FASHION GROUP
                Building 473g
                road 1411
                block 914
                riffa alshamali
                                </Text>
            </ScrollView>
        );
    }
}
