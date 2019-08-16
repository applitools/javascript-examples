import { globalPage } from '../pages/Global.page';
import { loginPage } from '../pages/Login.page';
import { contactPage } from '../pages/Contact.page';
import { contactValidation } from '../validations/Contact.validation';
import { context } from '../../data/Context';

describe('Send message to customer service.', () => {
    before(function() {
        loginPage.open();
        loginPage.login(context.logins.user);
    });

    beforeEach( function () {
        var testName = this.currentTest.title;
        globalPage.eyesOpen(testName); 
    });

    it('Displays a message in heading page.', () => {
        contactPage.goToContactPage();
        globalPage.eyesCheckPage("Message", true)
        //contactValidation.checkLabelCustomerService();
    });

    it('Displays successfully after user sends message to customer service.', () => {
        const content = {
            subject: 2,
            message: 'My first test.',
            file: 'test.pdf',
        };
        contactPage.sendMessage(content);
        globalPage.eyesCheckPage("Success Banner", true)
        //contactValidation.checkFeedbackMessageSent();
    });

    afterEach( function () {
        globalPage.eyesClose(false)
    });

    after(function () {
        globalPage.eyesAbortIfNotClosed();
    });
});
