_getMeta = (array, slug) ->
    for item, index in array when item.slug is slug and not item.ignore?
        item.value = index
        return item

index = (req, res, ctrl) ->
    res.locals.token = req.csrfToken()
    res.locals.scripts.push '/js/contact.js'

    typeMeta = _getMeta res.locals.contacts, req.param('type')
    projectMeta = _getMeta res.locals.projects, req.param('project')

    res.locals.selected =
        type:
            title: typeMeta?.title ? res.locals.contacts[0].title
            value: typeMeta?.value ? 0
        project:
            title: projectMeta?.title ? res.locals.projects[0].title
            value: projectMeta?.value ? 0
        showProjects: true if req.param('type') is 'join'

    # @TODO Refactor in the future
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
            admin = 'website@enactuslse.co.uk'

            if req.param('type') is 2
                action = 'join your project'
                recipient = res.locals.projects[req.param('project')].email
            else
                action = res.locals.contacts[req.param('type')].title
                recipient = res.locals.contacts[req.param('type')].email

            message =
                from: "LSE SU Enactus Website <#{admin}>"
                to: recipient ? admin
                subject: "A new request from #{req.param('name')} @ #{res.locals.page.title}"
                html: "Hello,<br /><br />
                        <b>#{req.param('name')}</b> has made a request to <b>#{action}</b>, at #{res.locals.page.title}.<br />
                        You can contact and/or assist the requester at <b>#{req.param('email')}</b>.<br /><br />
                        Thank you!"

            # @TODO Redirect to original page to prevent multiple requests from reloading?
            return ctrl.app.get('mailgun').messages.send message, (error, response, body) =>
                if response.statusCode is 200
                    res.locals.form_success = true
                else
                    res.locals.form_failure = false
                ctrl._render res, 'contact-us/index'
                res.end()

        ctrl._render res, 'contact-us/index'

module.exports = 
    index: index