import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import Main from '@/layouts/Landing';

const TermsOfService = (): JSX.Element => {
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
                Pluto Terms of Service
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  mb: 3,
                }}
              >
                This project is an open source software project.
              </Typography>
              <Typography
                sx={{
                  mb: 3,
                }}
                variant="body1"
              >
                Open Source License and Liability.
              </Typography>
              <Typography variant="body1">
                Documentation published describing software is licensed under
                the{' '}
                <a
                  target="_blank"
                  href="https://www.apache.org/licenses/LICENSE-2.0"
                >
                  Apache License 2.0
                </a>
                . You may redistribute and modify this software under the terms
                of the{' '}
                <a
                  target="_blank"
                  href="https://www.apache.org/licenses/LICENSE-2.0"
                >
                  Apache License 2.0
                </a>
                . except otherwise stated
              </Typography>
            </Box>
            <Box marginY={2}>
              <Typography
                variant="h5"
                gutterBottom
              >
                Free Software
              </Typography>
              <Typography
                sx={{
                  mb: 3,
                }}
              >
                This demo program is distributed in the hope that it will be
                useful, but WITHOUT ANY WARRANTY; without even the implied
                warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
                See the Apache License for more details
                (https://www.apache.org/licenses/LICENSE-2.0).
              </Typography>
              <Typography>
                THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND,
                EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
                OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
                NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
                HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
                WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
                FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
                OTHER DEALINGS IN THE SOFTWARE.
              </Typography>
            </Box>
          </Container>
        </Box>
      </Main>
    </Box>
  );
};

export default TermsOfService;
