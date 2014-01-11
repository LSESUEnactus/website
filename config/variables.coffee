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
            twitter: 'EnactusLSE'
            facebook: 'LSESUEnactus'
        styles: [
            '//fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,700'
            '//cdnjs.cloudflare.com/ajax/libs/font-awesome/4.0.3/css/font-awesome.min.css'
            '/css/enactus.css'
        ]
        scripts: [
            '//ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js'
            '//cdnjs.cloudflare.com/ajax/libs/foundation/5.0.2/js/foundation.min.js'
            #'/components/jquery-snowfall/snowfall.min.jquery.js'
            '/js/plugins.js'
            '/js/enactus.js'
        ]
        contacts:
            admin: 'website@enactuslse.co.uk'
            general: 'weare@enactuslse.co.uk'
            create: 'create@enactuslse.co.uk'
            mailing: 'newsletter@enactuslse.co.uk'
            projects:
                'trading-futures': 'trading.futures@enactuslse.co.uk'
                'lse-support': 'lse.support@enactuslse.co.uk'
                'pathways': 'pathways@enactuslse.co.uk'
                'commercial-projects': 'commercial@enactuslse.co.uk'
    next()

module.exports = variables