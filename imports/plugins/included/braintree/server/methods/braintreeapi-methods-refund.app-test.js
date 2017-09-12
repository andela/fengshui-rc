/* eslint camelcase: 0 */
import { Meteor } from "meteor/meteor";
import { expect } from "meteor/practicalmeteor:chai";
import { sinon } from "meteor/practicalmeteor:sinon";
import { BraintreeApi } from "./braintreeApi";

describe("braintree/refund/create", function () {
  let sandbox;

  beforeEach(function () {
    sandbox = sinon.sandbox.create();
  });

  afterEach(function () {
    sandbox.restore();
  });

  xit("Should call braintree/refund/create with the proper parameters and return saved = true", function (done) {
    const paymentMethod = {
      processor: "Braintree",
      storedCard: "VISA 4242",
      method: "Visa",
      transactionId: "mqcp30p9",
      amount: 99.95,
      status: "completed",
      mode: "capture",
      createdAt: new Date(),
      updatedAt: new Date(),
      workflow: {
        status: "new"
      },
      metadata: {}
    };

    const braintreeRefundResult = {
      saved: true,
      response: {
        transaction: {
          id: "4yby45n6",
          status: "submitted_for_settlement",
          type: "credit",
          currencyIsoCode: "USD",
          amount: 99.95,
          merchantAccountId: "ongoworks",
          subMerchantAccountId: null,
          masterMerchantAccountId: null,
          orderId: null,
          createdAt: "2016-08-10T01:34:55Z",
          updatedAt: "2016-08-10T01:34:55Z"
        }
      }
    };

    sandbox.stub(BraintreeApi.apiCall, "createRefund", function () {
      return braintreeRefundResult;
    });


    let refundResult = null;
    let refundError = null;


    Meteor.call("braintree/refund/create", paymentMethod, paymentMethod.amount, function (error, result) {
      refundResult = result;
      refundError = error;
    });


    expect(refundError).to.be.undefined;
    expect(refundResult).to.not.be.undefined;
    expect(refundResult.saved).to.be.true;
    done();
  });
});
