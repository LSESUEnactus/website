variables = (req, res, next) -> # Set template globals
    date = new Date()
    cdn = if 'development' is req.app.get 'env' then '' else '//cdn.enactuslse.co.uk'
    res.locals =
        page:
            title: 'LSE SU Enactus'
            description: 'London School of Economics and Political Science Student Union Enactus &ndash; Seeing possibilities. Taking action. Enabling progress.'
            url: 'enactuslse.co.uk'
        date:
            year: date.getFullYear()
        analytics:
            id: 'UA-5243796-8'
        social:
            twitter: '//twitter.com/EnactusLSE'
            facebook: '//facebook.com/LSESUEnactus'
        styles: [
            '//brick.a.ssl.fastly.net/Source+Sans+Pro:300,400,700'
            '//cdn.jsdelivr.net/fontawesome/4.0.3/css/font-awesome.min.css'
            "#{cdn}/css/enactus.css"
        ]
        scripts: [
            '//cdn.jsdelivr.net/jquery/2.1.1/jquery.min.js'
            '//cdn.jsdelivr.net/foundation/5.5.0/js/foundation.min.js'
            "#{cdn}/js/enactus.js"
        ]
        contacts: [
                title: 'get in touch with you'
                slug: 'general'
                email: 'weare@enactuslse.co.uk'
            ,
                title: 'create a new project'
                slug: 'create'
                email: 'create@enactuslse.co.uk'
            ,
                title: 'join an existing project'
                slug: 'join'
                email: 'weare@enactuslse.co.uk'
            ,
                title: 'join the mailing list'
                slug: 'mailing'
                email: 'create@enactuslse.co.uk'
            ,
                title: 'contact the web admin'
                slug: 'admin'
                email: 'website@enactuslse.co.uk'
                ignore: true
        ]
        projects: [
                title: 'Creative Cycle'
                slug: 'creative-cycle'
                email: 'creative.cycle@enactuslse.co.uk'
            ,
                title: 'Gates to Knowledge'
                slug: 'gates-to-knowledge'
                email: 'gates.to.knowledge@enactuslse.co.uk'
            ,
                title: 'Pathways'
                slug: 'pathways'
                email: 'pathways@enactuslse.co.uk'
            ,
                title: 'Commercial Projects'
                slug: 'commercial'
                email: 'commercial@enactuslse.co.uk'
        ]
    next()

module.exports = variables