import { Nav } from './sidebar.type';

export class SidebarConfig {
    config: Array<Nav> =
    [
        {
            'label': 'Login',
            'icon': '',
            'route': 'login'
        }, {
            'label': 'Map',
            'icon': '',
            'route': 'map'
        }, {
            'label': 'Demos',
            'subnav': [
                {
                    'label': 'Normal Page',
                    'icon': '',
                    'route': 'normal'
                }
            ],
            'subnavState': 'inactive'
        }, {
            'label': 'External Links',
            'subnav': [
                {
                    'label': 'Google',
                    'icon': '',
                    'uri': 'https://google.com'
                }, {
                    'label': 'Facebook',
                    'icon': '',
                    'uri': 'https://facebook.com'
                }, {
                    'label': 'eBay',
                    'icon': '',
                    'uri': 'https://ebay.com'
                }
            ],
            'subnavState': 'inactive'
        }
    ];
}