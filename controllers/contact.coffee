index = (req, res, ctrl) ->
    res.locals.token = req.csrfToken()
    res.locals.scripts.push '/js/contact.js'

    # @TODO Refactor in the future (decouple)
    if req.method is 'POST'
        metadata = ctrl.routes['contact-us']
        ctrl._setTitle res, metadata.title
        ctrl._setBreadcrumbs res, metadata.title, 'contact-us', []

        req.checkBody('name', 'We do not know what your name is.').notEmpty().len(3, 20)
        req.checkBody('email', 'Your e-mail is unreachable. Perhaps you entered it incorrectly?').notEmpty().isEmail()

        req.sanitize('type').toInt()
        req.sanitize('project').toInt()

        res.locals.form_errors = req.validationErrors(true)

        if not res.locals.form_errors
            switch req.param('type')
                when 1
                    action = 'create a new project'
                    recipient = 'create'
                when 2
                    action = 'join your project'
                    recipient = switch req.param('project')
                        when 0 then 'trading-futures'
                        when 1 then 'lse-support'
                        when 2 then 'pathways'
                        else 'commercial-projects'
                when 3 
                    action = 'join the mailing list'
                    recipient = 'mailing'
                else
                    action = 'get in touch with you'
                    recipient = 'general'

            message =
                from: "LSE SU Enactus Website <#{res.locals.contacts.admin}>",
                to: res.locals.contacts.projects[recipient] ? res.locals.contacts[recipient],
                subject: "A new request from #{req.param('name')} @ #{res.locals.page.title}",
                html: "Hello,<br /><br />
                        <b>#{req.param('name')}</b> has made a request to <b>#{action}</b> at #{res.locals.page.title}.<br />
                        You can contact and/or assist the requester at <b>#{req.param('email')}</b>.<br /><br />
                        Thank you!"

            # @TODO Redirect to original page to prevent multiple requests from reloading?
            return ctrl.app.get('mailgun').messages.send message, (error, response, body) =>
                if response.statusCode is 200
                    res.locals.form_success = true
                else
                    res.locals.form_failure = false
                ctrl._render res, 'contact-us/index'

        ctrl._render res, 'contact-us/index'

module.exports = 
    index: index