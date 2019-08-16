import { loginPage } from '../pages/Login.page';
import { globalPage } from '../pages/Global.page';
import { loginValidation } from '../validations/Login.validation';
import { context } from '../../data/Context';

describe('Authentication', () => {
    
    before(function() {
        loginPage.open()
    });

    beforeEach( function () {
        var testName = this.currentTest.title;
        globalPage.eyesOpen(testName); 
    });

    it('Home Page', () => {
        globalPage.eyesCheckRegion("Slider", "By.id('homeslider')")
        globalPage.eyesCheckPage("Home Page", false)
        //The eyesClose in the afterEach will replace all assertions
        //loginValidation.checkUserLoggedMessage(); 
    });

    it('Authenticated User', () => {
        loginPage.login(context.logins.user)
        globalPage.eyesCheckPage("Authed Page", false)
    });

    afterEach( function () {
        globalPage.eyesClose(false)
    });

    after(function () {
        globalPage.eyesAbortIfNotClosed();
    });
});
