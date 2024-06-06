import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import Main from '@/layouts/Landing';

const PrivacyPolicy = (): JSX.Element => {
  return (
    <Box sx={{ overflowX: 'hidden' }}>
      <Main>
        <Box
          sx={{
            width: '100%',
            backgroundImage: 'linear-gradient(180deg, #CEE5FD, #FFF)',
            backgroundSize: '100% 20%',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <Container
            sx={{
              display: 'flex',
              flexDirection: 'column',
              pt: { xs: 14, sm: 20 },
              pb: { xs: 8, sm: 6 },
              pr: { xs: 5, sm: 10 },
              pl: { xs: 5, sm: 10 },
            }}
            disableGutters={true}
          >
            <Box>
              <Typography
                textAlign="center"
                variant="h3"
                sx={{
                  mb: 5,
                }}
              >
                Pluto Privacy Policy
              </Typography>
              <Typography variant="body1">
                This Policy explains how your personal data may be processed
                when you visit and use the Pluto Policy Manager DEMO app.
              </Typography>
            </Box>
            <Box marginY={2}>
              <Typography
                variant="h5"
                gutterBottom
              >
                Data controller
              </Typography>
              <Typography>
                According to{' '}
                <a
                  target="_blank"
                  href="https://www.gdpreu.org/"
                >
                  GDPREU.org
                </a>{' '}
                the &quot;Data Controller&quot; determines the purposes of any
                personal data and the means of processing it. As the Pluto
                Policy Manager DEMO app does not collect ANY data, we also don’t
                have any official data protection officer and are no Data we
                have no control of the procedures and purpose of data usage.
              </Typography>
            </Box>
            <Box marginY={2}>
              <Typography
                variant="h5"
                gutterBottom
              >
                What we (do not) collect
              </Typography>
              <Typography>
                We have built this app so that we do not collect any data from
                visitors for any purpose. Our only interests are informing you
                about our organization, enabling you to contact us and
                maintaining the security of the website, therefore:
              </Typography>
              <Box marginTop={2}>
                <ul>
                  <li>
                    <Typography>
                      We do not set any cookies at all on this site or your own
                      device.
                    </Typography>
                  </li>
                  <li>
                    <Typography>
                      We do not collect any data whatsoever about people who
                      visit our site, unless you subscribe to our mailing list.
                    </Typography>
                  </li>
                  <li>
                    <Typography>
                      We do not conduct any analysis of how people use our site.
                    </Typography>
                  </li>
                  <li>
                    <Typography>
                      We do not allow third-party tracking of any kind on this
                      site.
                    </Typography>
                  </li>
                  <li>
                    <Typography>
                      We have licensed fonts from foundries that don’t entail
                      usage tracking.
                    </Typography>
                  </li>
                </ul>
              </Box>
            </Box>
            <Box marginY={2}>
              <Typography
                variant="h5"
                gutterBottom
              >
                Information security
              </Typography>
              <Typography>
                The Pluto Policy Manager DEMO app exclusively runs locally in
                the user’s browser tab and does not require any kind of
                middleware, server, or centralized storage. Therefore, no data
                can be stored anywhere else than in the local sandbox of the
                user’s browser.
              </Typography>
            </Box>
            <Box marginY={2}>
              <Typography
                variant="h5"
                gutterBottom
              >
                Social media
              </Typography>
              <Typography>We don’t use any social media.</Typography>
            </Box>
            <Box marginY={2}>
              <Typography
                variant="h5"
                gutterBottom
              >
                Changes and revisions
              </Typography>
              <Typography>
                We may update this Policy in the future. We will maintain an
                accessible record of any such changes. Policy published on April
                21st 2022
              </Typography>
            </Box>
          </Container>
        </Box>
      </Main>
    </Box>
  );
};

export default PrivacyPolicy;
