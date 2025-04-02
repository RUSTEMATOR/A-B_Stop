import {expect, Page, test} from "@playwright/test";
import moment = require("moment");
import {qase} from "playwright-qase-reporter";
import vpnController, {VpnController} from "../src/VpnController/vpnController";
import {LinkObject, LinksObject} from "../src/interface/linkObjectInterface";
const linksObject: LinksObject = require('../output.json');

async function formBaseLink(page: Page){
        const fullUrl = await page.url()

        const url = new URL(fullUrl)

        const params = new URLSearchParams(url.search)

        const desiredParams = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];

        let extractedQuery: string[] = [];

        desiredParams.forEach(parameter => {
          if (params.has(parameter)) {
            extractedQuery.push(`${parameter}=${params.get(parameter)}`);
          }
        })


        const baseCurrentUrl:string = `${url.origin}${url.pathname}`

        console.log(baseCurrentUrl)

        return baseCurrentUrl
    }

    async function formQueryParameters(page: Page){
      const fullUrl = await page.url()

      const url = new URL(fullUrl)
      const params = new URLSearchParams(url.search)

      const desiredParams = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];

      let extractedQuery: string[] = [];

      desiredParams.forEach(parameter => {
        if (params.has(parameter)) {
          extractedQuery.push(`${parameter}=${params.get(parameter)}`);
        }
      })

        const receivedParameters: string = extractedQuery.join('&');


        return receivedParameters
    }



    async function connectToVpn(location: string) {
        const vpnController = new VpnController();
        const timeout = 30000;
        const interval = 1000;
        const startTime = Date.now();


        const currentStatus = await vpnController.vpnCheckStatus();
        if (currentStatus === `Connected to ${location}`) {
            console.log('Correct location, proceeding to the test');
        } else if (currentStatus === `Not connected`) {
            console.log('Connecting...');
            await vpnController.vpnConnnect(location);
        } else {
            console.log('Changing location...')
            await vpnController.vpnDisconnect();
            await vpnController.sleepVPN(5000)
            await vpnController.vpnConnnect(location);
        }

        do {
            const statusVPN = await vpnController.vpnCheckStatus();
            console.log(`Current status: ${statusVPN}`);
            if (statusVPN === `Connected to ${location}`) {
                console.log(`Successfully connected to ${location}`);
                break;
            }
            await new Promise(resolve => setTimeout(resolve, interval));
        } while (Date.now() - startTime < timeout);
    }

test.describe('Stop A/B', () => {
    let vpnController: VpnController


    for (const [link, props] of Object.entries(linksObject)) {
        const [utm, locations] = Object.values(props)
        for (const location of locations) {

            test(`${link} and ${location}`, async ({page}) => {
                await connectToVpn(location)
                console.log(location)

                await page.goto(link)

                const currentTime = moment().format("dddd, MMMM Do YYYY, h:mm:ss a")
                const finalUrl = await formBaseLink(page)
                const actualUtm = await formQueryParameters(page)

                qase.comment(`
                    Date: ${currentTime}\n\n URL: ${finalUrl}\n\n
                    
                    Current URL: ${finalUrl}\n Expected links: \n${link}\n
                    \n\n Expected parameters: ${utm}\n Received parameters: ${actualUtm}      
                    `)
                expect(finalUrl).toEqual(link)
                expect(actualUtm).toEqual(utm)
            })
        }
    }

})