_getMeta = (array, slug, ignore = true) ->
    for item, index in array when item.slug is slug and (not ignore or not item.ignore?)
        item.value = index
        return item

# GET index
index = (req, res, ctrl) ->
    res.locals.token = req.csrfToken()
    res.locals.scripts.push '/js/contact.js'

    # Get and set form parameters
    typeMeta = _getMeta res.locals.contacts, req.body.type
    projectMeta = _getMeta res.locals.projects, req.body.project
    res.locals.selected =
        type:
            title: typeMeta?.title ? res.locals.contacts[0].title
            value: typeMeta?.value ? 0
        project:
            title: projectMeta?.title ? res.locals.projects[0].title
            value: projectMeta?.value ? 0
        showProjects: true if req.body.type is 'join'

# POST index
postIndex = (req, res, ctrl) ->
    # Call GET index
    index req, res, ctrl

    # Set metadata
    metadata = ctrl.routes['contact-us']
    ctrl._setTitle res, metadata.title
    ctrl._setBreadcrumbs res, metadata.title, 'contact-us', []

    # Validate form data
    req.checkBody('name', 'We do not know what your name is.').notEmpty().len(3, 20)
    req.checkBody('email', 'Your e-mail is unreachable. Perhaps you entered it incorrectly?').notEmpty().isEmail()

    req.sanitize('type').toInt()
    req.sanitize('project').toInt()

    res.locals.form_errors = req.validationErrors true

    if not res.locals.form_errors
        admin = _getMeta(res.locals.contacts, 'admin', false).email

        if req.body.type is 2
            action = 'join your project'
            recipient = res.locals.projects[req.body.project].email
        else
            action = res.locals.contacts[req.body.type].title
            recipient = res.locals.contacts[req.body.type].email

        message =
            from: "LSE SU Enactus Website <#{admin}>"
            to: recipient ? admin
            subject: "A new request from #{req.body.name} @ #{res.locals.page.title}"
            html: "Hello,<br /><br />
                    <b>#{req.body.name}</b> has made a request to <b>#{action}</b>, at #{res.locals.page.title}.<br />
                    You can contact and/or assist the requester at <b>#{req.body.email}</b>.<br /><br />
                    Thank you!"

        # @TODO Redirect to original page to prevent multiple requests from reloading?
        if 'development' is ctrl.app.get 'env'
            console.log message
        else
            return ctrl.app.get('mailgun').messages().send message, (error, body) ->
                if error
                    res.locals.form_failure = true
                else
                    res.locals.form_success = true
                ctrl._render res, 'contact-us/index'
                res.end()

    ctrl._render res, 'contact-us/index'

module.exports =
    index: index
    postIndex: postIndex