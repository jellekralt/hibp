/* eslint-env mocha */
/* global describe, it, before, after */

// Polyfill global Promise if necessary
import {polyfill} from 'es6-promise';
if (global.Promise === undefined) {
  polyfill();
}

import expect from 'expect.js';
import fetchMock from 'fetch-mock/es5/server';
import mockery from 'mockery';

// Test data
const URL_PATTERN = '^https://haveibeenpwned.com/api';
const INVALID_HEADER = 'invalidheader';
const DOMAIN = 'foo.bar';
const ACCOUNT_BREACHED = 'foo';
const ACCOUNT_CLEAN = 'bar';
const BREACH_FOUND = 'foo';
const BREACH_NOT_FOUND = 'bar';
const EMAIL_PASTED = 'foo@bar.com';
const EMAIL_CLEAN = 'baz@qux.com';
const EMAIL_INVALID = 'foobar';

describe('hibp', () => {
  let hibp;

  before(() => {
    // Configure mocked fetch calls and results
    fetchMock.get(`${URL_PATTERN}/breachedaccount/${ACCOUNT_BREACHED}`, {});
    fetchMock.get(`${URL_PATTERN}/breachedaccount/${ACCOUNT_CLEAN}`, 404);
    fetchMock.get(`${URL_PATTERN}/breachedaccount/${INVALID_HEADER}`, 403);
    fetchMock.get(`${URL_PATTERN}/breaches`, []);
    fetchMock.get(`${URL_PATTERN}/breach/${BREACH_FOUND}`, {});
    fetchMock.get(`${URL_PATTERN}/breach/${BREACH_NOT_FOUND}`, 404);
    fetchMock.get(`${URL_PATTERN}/dataclasses`, []);
    fetchMock.get(`${URL_PATTERN}/pasteaccount/${EMAIL_PASTED}`, []);
    fetchMock.get(`${URL_PATTERN}/pasteaccount/${EMAIL_CLEAN}`, 404);
    fetchMock.get(`${URL_PATTERN}/pasteaccount/${EMAIL_INVALID}`, 400);

    // Mock out node-fetch to prevent real network calls
    mockery.enable({
      useCleanCache: true,
      warnOnUnregistered: false
    });
    mockery.registerMock('node-fetch', fetchMock.fetchMock);
    hibp = require('../lib/hibp');
  });

  after(() => {
    mockery.deregisterMock('node-fetch');
    mockery.disable();
  });

  describe('breachedAccount (breached account, no parameters)', () => {
    it('should return a Promise', (done) => {
      let query = hibp.breachedAccount(ACCOUNT_BREACHED);
      expect(query).to.be.a(Promise);
      expect(query).to.have.property('then');
      done();
    });

    it('should resolve with an object', (done) => {
      hibp.breachedAccount(ACCOUNT_BREACHED)
          .then((breachData) => {
            expect(breachData).to.be.an('object');
            done();
          })
          .catch(done);
    });
  });

  describe('breachedAccount (breached account, with truncateResults)', () => {
    it('should return a Promise', (done) => {
      let truncatedQuery = hibp.breachedAccount(ACCOUNT_BREACHED, true);
      expect(truncatedQuery).to.be.a(Promise);
      expect(truncatedQuery).to.have.property('then');
      done();
    });

    it('should resolve with an object', (done) => {
      hibp.breachedAccount(ACCOUNT_BREACHED, true)
          .then((breachData) => {
            expect(breachData).to.be.an('object');
            done();
          })
          .catch(done);
    });
  });

  describe('breachedAccount (breached account, with domain)', () => {
    it('should return a Promise', (done) => {
      let filteredQuery = hibp.breachedAccount(ACCOUNT_BREACHED, DOMAIN);
      expect(filteredQuery).to.be.a(Promise);
      expect(filteredQuery).to.have.property('then');
      done();
    });

    it('should resolve with an object', (done) => {
      hibp.breachedAccount(ACCOUNT_BREACHED, DOMAIN)
          .then((breachData) => {
            expect(breachData).to.be.an('object');
            done();
          })
          .catch(done);
    });
  });

  describe('breachedAccount (breached account, with domain and' +
      ' truncateResults)', () => {
    it('should return a Promise', (done) => {
      let comboQuery = hibp.breachedAccount(ACCOUNT_BREACHED, DOMAIN, true);
      expect(comboQuery).to.be.a(Promise);
      expect(comboQuery).to.have.property('then');
      done();
    });

    it('should resolve with an object', (done) => {
      hibp.breachedAccount(ACCOUNT_BREACHED, DOMAIN, true)
          .then((breachData) => {
            expect(breachData).to.be.an('object');
            done();
          })
          .catch(done);
    });
  });

  describe('breachedAccount (clean account, no parameters)', () => {
    it('should return a Promise', (done) => {
      let query = hibp.breachedAccount(ACCOUNT_CLEAN);
      expect(query).to.be.a(Promise);
      expect(query).to.have.property('then');
      done();
    });

    it('should resolve with undefined', (done) => {
      hibp.breachedAccount(ACCOUNT_CLEAN)
          .then((breachData) => {
            expect(breachData).to.be(undefined);
            done();
          })
          .catch(done);
    });
  });

  describe('breachedAccount (clean account, with truncateResults)', () => {
    it('should return a Promise', (done) => {
      let truncatedQuery = hibp.breachedAccount(ACCOUNT_CLEAN, true);
      expect(truncatedQuery).to.be.a(Promise);
      expect(truncatedQuery).to.have.property('then');
      done();
    });

    it('should resolve with undefined', (done) => {
      hibp.breachedAccount(ACCOUNT_CLEAN, true)
          .then((breachData) => {
            expect(breachData).to.be(undefined);
            done();
          })
          .catch(done);
    });
  });

  describe('breachedAccount (clean account, with domain)', () => {
    it('should return a Promise', (done) => {
      let filteredQuery = hibp.breachedAccount(ACCOUNT_CLEAN, DOMAIN);
      expect(filteredQuery).to.be.a(Promise);
      expect(filteredQuery).to.have.property('then');
      done();
    });

    it('should resolve with undefined', (done) => {
      hibp.breachedAccount(ACCOUNT_CLEAN, DOMAIN)
          .then((breachData) => {
            expect(breachData).to.be(undefined);
            done();
          })
          .catch(done);
    });
  });

  describe('breachedAccount (clean account, with domain and truncateResults)',
      () => {
        it('should return a Promise', (done) => {
          let comboQuery = hibp.breachedAccount(ACCOUNT_CLEAN, DOMAIN, true);
          expect(comboQuery).to.be.a(Promise);
          expect(comboQuery).to.have.property('then');
          done();
        });

        it('should resolve with undefined', (done) => {
          hibp.breachedAccount(ACCOUNT_CLEAN, DOMAIN, true)
              .then((breachData) => {
                expect(breachData).to.be(undefined);
                done();
              })
              .catch(done);
        });
      });

  describe('breachedAccount (invalid request header)', () => {
    it('should return a Promise', (done) => {
      let invalidQuery = hibp.breachedAccount(INVALID_HEADER);
      expect(invalidQuery).to.be.a(Promise);
      expect(invalidQuery).to.have.property('then');
      done();
    });

    it('should throw an Error starting with "Forbidden"', (done) => {
      hibp.breachedAccount(INVALID_HEADER)
          .catch((err) => {
            expect(err.message).to.match(/^Forbidden/);
            done();
          })
          .catch(done);
    });
  });

  describe('breaches (no parameters)', () => {
    it('should return a Promise', (done) => {
      let query = hibp.breaches();
      expect(query).to.be.a(Promise);
      expect(query).to.have.property('then');
      done();
    });

    it('should resolve with an array', (done) => {
      hibp.breaches()
          .then((breachData) => {
            expect(breachData).to.be.an('array');
            done();
          })
          .catch(done);
    });
  });

  describe('breaches (with domain)', () => {
    it('should return a Promise', (done) => {
      let query = hibp.breaches(DOMAIN);
      expect(query).to.be.a(Promise);
      expect(query).to.have.property('then');
      done();
    });

    it('should resolve with an array', (done) => {
      hibp.breaches('adobe.com')
          .then((breachData) => {
            expect(breachData).to.be.an('array');
            done();
          })
          .catch(done);
    });
  });

  describe('breach (found)', () => {
    it('should return a Promise', (done) => {
      let query = hibp.breach(BREACH_FOUND);
      expect(query).to.be.a(Promise);
      expect(query).to.have.property('then');
      done();
    });

    it('should resolve with an object', (done) => {
      hibp.breach(BREACH_FOUND)
          .then((breachData) => {
            expect(breachData).to.be.an('object');
            done();
          })
          .catch(done);
    });
  });

  describe('breach (not found)', () => {
    it('should return a Promise', (done) => {
      let query = hibp.breach(BREACH_NOT_FOUND);
      expect(query).to.be.a(Promise);
      expect(query).to.have.property('then');
      done();
    });

    it('should resolve with undefined', (done) => {
      hibp.breach(BREACH_NOT_FOUND)
          .then((breachData) => {
            expect(breachData).to.be(undefined);
            done();
          })
          .catch(done);
    });
  });

  describe('dataClasses', () => {
    it('should return a Promise', (done) => {
      let query = hibp.dataClasses();
      expect(query).to.be.a(Promise);
      expect(query).to.have.property('then');
      done();
    });

    it('should resolve with an array', (done) => {
      hibp.dataClasses()
          .then((dataClasses) => {
            expect(dataClasses).to.be.an('array');
            done();
          })
          .catch(done);
    });
  });

  describe('pasteAccount (pasted email)', () => {
    it('should return a Promise', (done) => {
      let query = hibp.pasteAccount(EMAIL_PASTED);
      expect(query).to.be.a(Promise);
      expect(query).to.have.property('then');
      done();
    });

    it('should resolve with an array', (done) => {
      hibp.pasteAccount(EMAIL_PASTED)
          .then((pasteData) => {
            expect(pasteData).to.be.an('array');
            done();
          })
          .catch(done);
    });
  });

  describe('pasteAccount (clean email)', () => {
    it('should return a Promise', (done) => {
      let query = hibp.pasteAccount(EMAIL_CLEAN);
      expect(query).to.be.a(Promise);
      expect(query).to.have.property('then');
      done();
    });

    it('should resolve with undefined', (done) => {
      hibp.pasteAccount(EMAIL_CLEAN)
          .then((pasteData) => {
            expect(pasteData).to.be(undefined);
            done();
          })
          .catch(done);
    });
  });

  describe('pasteAccount (invalid email)', () => {
    it('should return a Promise', (done) => {
      let query = hibp.pasteAccount(EMAIL_INVALID);
      expect(query).to.be.a(Promise);
      expect(query).to.have.property('then');
      done();
    });

    it('should throw an Error starting with "Bad request"', (done) => {
      hibp.pasteAccount(EMAIL_INVALID)
          .catch((err) => {
            expect(err.message).to.match(/^Bad request/);
            done();
          });
    });
  });
});
