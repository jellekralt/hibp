# Change Log

## Version 2.1.0 *(2016-09-04)*

* Replaced **npmcdn.com** with **unpkg.com** in the documentation as the service
  is being renamed
* Inherited support for `http_proxy` and `https_proxy` environment variables
  from Axios 0.14.0
* Simplified build scripts
* Refactored test environment
* Updated dependencies

## Version 2.0.0 *(2016-08-07)*

##### New:

* Added browser support

##### Breaking Changes (see [MIGRATION.md](MIGRATION.md) for details):

* Changed API methods to resolve to null instead of undefined when no data was
  found
* Changed API methods to take a configuration object rather than optional,
  positional parameters

## Version 1.0.8 *(2016-08-06)*

* Updated description and example usage
* Switched test coverage from istanbul to nyc
* Improved cross-platform compatibility for development
* Updated dependencies

## Version 1.0.7 *(2016-07-21)*

* Minor performance increase
* Fixed API documentation for 'breaches' query
* Updated dependencies

## Version 1.0.6 *(2016-06-28)*

* Increased visibility in npm search
* Minor improvements to development environment

## Version 1.0.5 *(2016-04-22)*

* Removed temporary 'breach' hack as the API endpoint has been fixed
* Updated dependencies

## Version 1.0.4 *(2016-04-12)*

* Changed temporary 'breach' hack to match author's intentions

  *The API author (Troy Hunt) indicated there is no hard format restrictions on
  a breach name, so the concept of an invalid breach name is not in play here.
  The API will respond with HTTP status 404 (not found) once the fix has been
  applied. This change mimics that behavior as opposed to responding with HTTP
  status 400 (bad request), which was my initial interpretation.*

## Version 1.0.3 *(2016-04-10)*

* Updated documentation

## Version 1.0.2 *(2016-04-10)*

* Shield clients from broken
  '[breach](https://haveibeenpwned.com/API/v2#SingleBreach)' endpoint when
  querying for an invalid breach name

  *Currently, the endpoint responds with HTTP status 200 and "page not found"
  HTML in the body if an invalid breach name is queried (e.g. 'adobe.com',
  instead of the proper breach name, 'adobe'). Based on the response codes
  described in the API documentation, I believe it should respond with HTTP
  status 400 (bad request). Prior to this patch, it lead to a confusing one-off
  scenario for clients consuming this module. This change should provide a
  consistent experience by intercepting this specific case and throwing a "bad
  request" error instead of a `SyntaxError` from trying to parse HTML. I
  brought this API behavioral discrepancy to the API author's attention and he
  agreed it was broken and noted that a fix is incoming.*

* Updated tests

## Version 1.0.1 *(2016-04-08)*

* Removed `preferGlobal` option from package.json

## Version 1.0.0 *(2016-04-08)*

* Initial release
