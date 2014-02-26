variables = (req, res, next) -> # Set template globals
    date = new Date()
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
            '//fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,700'
            '//cdnjs.cloudflare.com/ajax/libs/font-awesome/4.0.3/css/font-awesome.min.css'
            '/css/enactus.css'
        ]
        scripts: [
            '//ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js'
            '//cdnjs.cloudflare.com/ajax/libs/foundation/5.1.1/js/foundation.min.js'
            '/js/enactus.js'
        ]
        contacts: [
            (
                title: 'get in touch with you'
                slug: 'general'
                email: 'weare@enactuslse.co.uk'
            )
            (
                title: 'create a new project'
                slug: 'create'
                email: 'create@enactuslse.co.uk'
            )
            (
                title: 'join an existing project'
                slug: 'join'
                email: 'weare@enactuslse.co.uk'
            )
            (
                title: 'join the mailing list'
                slug: 'mailing'
                email: 'create@enactuslse.co.uk'
            )
            (
                title: 'contact the web admin'
                slug: 'admin'
                email: 'website@enactuslse.co.uk'
                ignore: true
            )
        ]
        projects: [
            (
                title: 'Trading Futures'
                slug: 'trading-futures'
                email: 'trading.futures@enactuslse.co.uk'
            )
            (
                title: 'L.S.E. Support'
                slug: 'lse-support'
                email: 'lse.support@enactuslse.co.uk'
            )
            (
                title: 'Pathways'
                slug: 'pathways'
                email: 'pathways@enactuslse.co.uk'
            )
            (
                title: 'Creative Cycle'
                slug: 'creative-cycle'
                email: 'creative.cycle@enactuslse.co.uk'
            )
            (
                title: 'Commercial Projects'
                slug: 'commercial'
                email: 'commercial@enactuslse.co.uk'
            )
        ]
    next()

module.exports = variables