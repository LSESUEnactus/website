LSE SU Enactus
==============

[![Build Status](https://travis-ci.org/MrSaints/Enactus-LSESU.png?branch=master)](https://travis-ci.org/MrSaints/Enactus-LSESU)

_A work in progress._

The official, flat-file, dynamic web site for the London School of Economics and Political Science Studen Union [Enactus society](http://www.lsesu.com/activities/societies/society/7398/).
The design was inspired by [Enactus' official web site](http://enactus.org/).

[Enactus](http://enactus.org/) is an international non-profit organization that brings together student, academic and business leaders who are committed to using the power of entrepreneurial action to improve the quality of life and standard of living for people in need.


Installation
-------------

1. Install [NodeJS](http://nodejs.org/).
2. Fork / clone or download this repository.
3. Run `npm install` in the main Enactus-LSESU directory *(containing package.json)*.
4. Run `bower install` IF NPM's package.json postinstall script fails *(it was included with Heroku in mind)*.
5. Run or compile Enactus.coffee et al.

### Modifying / extending:
* Template variables and route definitions are located in the config/* directory; amend them accordingly to your likings.
* Template files / views are located in the views/* directory.
* E-mail services are reliant upon [Mailgun](http://mailgun.com). The MAILGUN_API_KEY and MAILGUN_API_URL environment variables must be set for the services to be functional.
* Forms are CSRF-protected. You may amend the session secret by setting the SESSION_SECRET environment variable.
* Refer to bower.json and package.json for a list of the web site's dependencies (front-end and back-end respectively).
* To modify the styles, you will need Ruby for SASS and Foundation.


Roadmap
-------
- Major refactoring (cache routes).
- Admin panel?


Boring Stuff
------------

### Acknowledgements
- [Enactus](http://enactus.org/) and [Enactus UK](http://www.enactusuk.org/).
- [Express](http://expressjs.com).
- [Foundation by ZURB](http://foundation.zurb.com/).
- [CloudFlare](http://cloudflare.com).
- [Mailgun](http://www.mailgun.com/).
- [Heroku](http://heroku.com/).

### Copyright
Copyright (C) 2014, Ian Lai.

### Licensing
[The MIT License (MIT)](http://ian.mit-license.org/) / LICENSE
