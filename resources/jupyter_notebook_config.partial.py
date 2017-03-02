
# Whether to trust or not X-Scheme/X-Forwarded-Proto and X-Real-Ip/X-Forwarded-
# For headerssent by the upstream reverse proxy. Necessary if the proxy handles
# SSL
c.NotebookApp.trust_xheaders = True

# Include our extra templates
c.NotebookApp.extra_template_paths = ['/srv/templates/']

# Supply overrides for the tornado.web.Application that the IPython notebook
# uses.
import notebook
c.NotebookApp.tornado_settings = {
    'headers': {
        'Content-Security-Policy': "frame-ancestors *"
    },
    'static_url_prefix': 'https://cdn.jupyter.org/notebook/%s/' % notebook.__version__
}
