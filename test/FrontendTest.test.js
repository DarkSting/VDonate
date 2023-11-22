require("chromedriver");
const { Builder, until, By, Key } = require("selenium-webdriver");
var should = require("chai").expect();
var assert = require("assert");
const { setInterval } = require("timers/promises");

const loginDonor = async (driver) => {
  // navigates to the login page
  await driver
    .findElement(By.xpath('//*[@id="root"]/header/div/div[2]/button[2]'))
    .click();
  //sending text to the email field
  await driver
    .findElement(By.xpath('//*[@id=":r0:"]'))
    .sendKeys("akashgeethanjana320@gmail.com");

  //sending password to the password field
  await driver.findElement(By.xpath('//*[@id=":r1:"]')).sendKeys("akash");

  //clicking login button
  await driver
    .findElement(
      By.xpath('//*[@id="root"]/div[1]/div/div[2]/div/div/div[3]/button')
    )
    .click();
};

const loginAdmin = async (driver) => {
  await driver
    .findElement(By.xpath('//*[@id="root"]/header/div/div[2]/button[2]'))
    .click();

  //navigates to the admin login
  await driver
    .findElement(By.xpath('//*[@id="root"]/div[1]/div/div[1]/div/div/div[2]/a'))
    .click();

  driver.sleep(200).then(async () => {
    //send keys to the lisence
    await driver.findElement(By.xpath('//*[@id=":r2:"]')).sendKeys("123456");

    //sending keys to the password
    await driver.findElement(By.xpath('//*[@id=":r3:"]')).sendKeys("@j5t4");

    //clicking the login
    await driver
      .findElement(
        By.xpath('//*[@id="root"]/div[1]/div/div[2]/div/div/div[3]/button')
      )
      .click();
  });
};

describe("Testing the donor functionality", async () => {
  it("Successful donor login ", async () => {
    let driver = await new Builder().forBrowser("chrome").build();

    await driver.get("http://localhost:3000");

    // navigates to the login page
    await driver
      .findElement(By.xpath('//*[@id="root"]/header/div/div[2]/button[2]'))
      .click();

    //sending text to the email field

    await driver
      .findElement(By.xpath('//*[@id=":r0:"]'))
      .sendKeys("akashgeethanjana320@gmail.com");

    //sending password to the password field
    await driver.findElement(By.xpath('//*[@id=":r1:"]')).sendKeys("akash");

    //clicking login button
    await driver
      .findElement(
        By.xpath('//*[@id="root"]/div[1]/div/div[2]/div/div/div[3]/button')
      )
      .click();

    driver.sleep(2000).then(async () => {
      //clicking the profile button //*[@id="menu"]/div[3]/ul/li[2]
      await driver.findElement(By.xpath('//*[@id="menu-button"]')).click();

      //clicking the menu watch profile button
      await driver
        .findElement(By.xpath('//*[@id="menu"]/div[3]/ul/li[2]'))
        .click();

      await driver
        .findElement(By.xpath("/html/body/div[3]/div[3]/div/div/div/p[1]"))
        .getText()
        .then((value) => {
          console.log(value);

          return value;
        });

      await driver.close();
      assert.strictEqual(value, "Username: Akeesh");
    });
  });

  it("Searching a donor location", async () => {
    let driver = await new Builder().forBrowser("chrome").build();

    await driver.get("http://localhost:3000");

    //logs into the donor page
    await loginDonor(driver);

    driver.sleep(2000).then(async () => {
      await driver.findElement(By.xpath('//*[@id="List"]/li[2]/div')).click();

      driver.sleep(3000).then(async () => {
        //select the all types of blood groups
        await driver
          .findElement(By.xpath('//*[@id="demo-simple-select"]'))
          .click();

        await driver
          .findElement(By.xpath('//*[@id="menu-"]/div[3]/ul/li[9]'))
          .click();

        //asserting
        driver.sleep(2000).then(async () => {
          let outputText = await driver
            .findElement(By.xpath('//*[@id="root"]/div[4]/div'))
            .getText()
            .then((value) => {
              return value;
            });

          await driver.close();
          assert.strictEqual(outputText, "Locations available");
        });
      });
    });
  });

  it("Manipulating blood bag", async () => {
    let driver = await new Builder().forBrowser("chrome").build();

    await driver.get("http://localhost:3000");

    await loginDonor(driver);

    driver.sleep(2000).then(async () => {
      //clicks the blood bag tab //*[@id=":r7:"]
      await driver.findElement(By.xpath('//*[@id="List"]/li[3]/div')).click();

      await driver.findElement(By.xpath('//*[@id=":r7:"]')).click();

      for (let i = 0; i > 3; i++) {
        await driver
          .findElement(By.xpath('//*[@id=":r7:"]'))
          .sendKeys(Key.BACK_SPACE);
      }

      //updating the count
      await driver
        .findElement(By.xpath('//*[@id=":r7:"]'))
        .sendKeys(Key.NUMPAD2);

      await driver
        .findElement(By.xpath('//*[@id=":r7:"]'))
        .sendKeys(Key.NUMPAD0);

      await driver
        .findElement(By.xpath('//*[@id=":r7:"]'))
        .sendKeys(Key.NUMPAD0);

      //clicking the update button
      await driver
        .findElement(
          By.xpath(
            '//*[@id="root"]/div[3]/div[2]/div/div/div/div/div[1]/button[2]'
          )
        )
        .click();

      //asserting
      await driver.sleep(2000).then(async () => {
        let outputText = await driver
          .findElement(By.xpath('//*[@id="root"]/div[4]/div'))
          .getText()
          .then(async (value) => {
            return value;
          });

        await driver.close();
        assert.strictEqual(outputText, "Blood bag capacity updated");
      });
    });
  });

  it("Making a complain", async () => {
    let driver = await new Builder().forBrowser("chrome").build();

    await driver.get("http://localhost:3000");

    //logs into the donor page
    await loginDonor(driver);

    driver.sleep(2000).then(async () => {
      await driver.findElement(By.xpath('//*[@id="List"]/li[6]/div')).click();

      driver.sleep(3000).then(async () => {
        //select the all types of blood groups
        await driver
          .findElement(By.xpath('//*[@id="outlined-multiline-flexible"]'))
          .sendKeys("This is an automated testing");

        await driver
          .findElement(
            By.xpath('//*[@id="root"]/div[3]/div[2]/div/div/div/div[3]/button')
          )
          .click();

        //asserting
        driver.sleep(2000).then(async () => {
          let outputText = await driver
            .findElement(By.xpath('//*[@id="root"]/div[4]/div'))
            .getText()
            .then((value) => {
              return value;
            });

          await driver.close();
          assert.strictEqual(outputText, "Locations available");
        });
      });
    });
  });
});

describe("Testing the admin functionality", async () => {
  it("Sucessful admin login", async () => {
    let driver = await new Builder().forBrowser("chrome").build();

    await driver.get("http://localhost:3000");

    await loginAdmin(driver);

    driver.sleep(3000).then(async () => {
      await driver.close();
    });
  });

  it("Naviagate to campaign tab", async () => {
    let driver = await new Builder().forBrowser("chrome").build();

    await driver.get("http://localhost:3000");

    //entering credintials
    await loginAdmin(driver);

    //navigating to the campaign tab
    driver.sleep(3000).then(async () => {
      await driver.findElement(By.xpath('//*[@id="List"]/li[4]/a')).click();

      driver.sleep(1000).then(async () => {

        await driver
          .findElement(
            By.xpath(
              '//*[@id="root"]/div[2]/div[2]/div/div/div[2]/div/div[1]/div/div/button[1]'
            )
          )
          .click();

        await driver
          .findElement(
            By.xpath(
              '//*[@id="root"]/div[2]/div[2]/div/div/div[2]/div/div[1]/div/div/button[2]'
            )
          )
          .click();

        await driver
          .findElement(
            By.xpath(
              '//*[@id="root"]/div[2]/div[2]/div/div/div[2]/div/div[1]/div/div/button[3]'
            )
          )
          .click();
      });

      await driver.close();
    });
  });

  it("Logging out admin", async () => {
    let driver = await new Builder().forBrowser("chrome").build();

    await driver.get("http://localhost:3000");

    //entering credintials
    await loginAdmin(driver);

    //navigating to the campaign tab
    driver.sleep(3000).then(async () => {
      await driver.findElement(By.xpath('//*[@id="menu-button"]')).click();

      driver.sleep(1000).then(async () => {


        //clicks profile icon
        await driver
          .findElement(
            By.xpath(
              '//*[@id="root"]/div[2]/div[2]/div/div/div[2]/div/div[1]/div[2]/button'
            )
          )
          .click();


          //clicks loggout button
          await driver
          .findElement(
            By.xpath(
              '//*[@id="menu"]/div[3]/ul/li[3]'
            )
          )
          .click();

              //clicks logout
          await driver
          .findElement(
            By.xpath(
              '/html/body/div[14]/div[3]/div/div[2]/button[2]'
            )
          )
          .click();

      
      });

      await driver.close();
    });
  });


  it("Check Complains", async () => {
    let driver = await new Builder().forBrowser("chrome").build();

    await driver.get("http://localhost:3000");

    //entering credintials
    await loginAdmin(driver);

    //navigating to the campaign tab
    driver.sleep(3000).then(async () => {
      await driver.findElement(By.xpath('//*[@id="List"]/li[7]/a')).click();

      driver.sleep(1000).then(async () => {

        await driver
          .findElement(
            By.xpath(
              '//*[@id="root"]/div[2]/div[2]/div/div/div[2]/div/div[1]/div[2]/button'
            )
          )
          .click();

      
      });

      await driver.close();
    });
  });

});
