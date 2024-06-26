import { test, expect } from '@playwright/test';
import newUser from '../data/request/users.json'
import ENV from '../config/env-setup/env.ts'
import createUserSchema from '../schema/schemaList/createUserSchema.ts'
import { createECDH } from 'crypto';



const random_joke = 'https://official-joke-api.appspot.com/random_joke';
const create_user = 'https://dummy.restapiexample.com/api/v1/create';

test.describe('This is the describe', async () => {
    test('This is the test for method get', async ({ request }) => {
        const response = await request.get(random_joke);
        const respJson = await response.json();
        console.log('The setup is: ' + respJson.setup);
        console.log('The whole response as string: ' + JSON.stringify(respJson));
    })

    test('This is the status code check', async ({ request }) => {
        const response = await request.get(random_joke);
        expect(await response.ok()).toBeTruthy();
        expect(await response.status()).toEqual(200);
        expect(await response.statusText()).toEqual('OK');
    })

    test('This is the test for POST method with manual request body', async ({ request }) => {
        const response = await request.post(create_user, {
            data: {
                name: 'Abraham',
                salary: '1 million',
                age: '36'
            }
        })
        const respJson = await response.json();
        console.log("The response for POST metohod is: " + await JSON.stringify(respJson));
    })

    test('This is the test for POST metod with imported request body', async ({ request }) => {
        const response = await request.post(create_user, { data: newUser });
        const respJson = await response.json();
        expect(response.ok).toBeTruthy();
        expect(response.statusText()).toEqual('OK');
        console.log("The response is: " + respJson);
    })

    test.only('This is the test for environment variable', async ({ request }) => {
        const response = await request.post(`${ENV.CREATE_USER_URL}`, { data: newUser })
        const respJson = await response.json();
        expect(response.ok).toBeTruthy();
        expect(response.statusText()).toEqual('OK');
        console.log('The response is: ' + JSON.stringify(respJson));
        const currentSchema = createUserSchema;
        const valid =  currentSchema(respJson);
        if(!valid){
            console.log(currentSchema.errors)
        }
        console.log("Valid or not: "+valid);
        expect(valid).toBeTruthy();
    })

})