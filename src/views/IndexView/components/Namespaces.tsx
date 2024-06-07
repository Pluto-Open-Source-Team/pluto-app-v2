import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { getNamespaces } from '@/utils/getNamespaces';

const Namespaces = (): JSX.Element => {
  return (
    <Container
      id="namespaces"
      sx={{
        pt: { xs: 4, sm: 6 },
        pb: { xs: 8, sm: 16 },
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: { xs: 3, sm: 6 },
      }}
    >
      <Box
        sx={{
          width: { sm: '100%', md: '60%' },
          textAlign: 'center',
        }}
      >
        <Typography
          component="h2"
          variant="h4"
          color="text.primary"
          sx={{
            pb: 2,
          }}
          fontWeight={500}
        >
          Supported Namespaces
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
        >
          The following namespaces are available in the current version of
          Pluto:
        </Typography>
      </Box>
      <Box
        sx={{
          overflow: 'auto',
        }}
      >
        <TableContainer
          component={Paper}
          elevation={0}
          sx={{
            width: { sm: '100%', md: '100%' },
            display: 'table',
            tableLayout: 'fixed',
            justifyContent: 'center',
          }}
        >
          <Table
            aria-label="caption table"
            sx={{ minWidth: 600 }}
          >
            <TableHead>
              <TableRow>
                <TableCell>Namespace</TableCell>
                <TableCell align="center">
                  <Typography
                    sx={{ textTransform: 'uppercase', fontWeight: 'medium' }}
                  >
                    Export
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography
                    sx={{ textTransform: 'uppercase', fontWeight: 'medium' }}
                  >
                    Import
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {getNamespaces().map((namespace) => (
                <TableRow key={namespace.name}>
                  <TableCell
                    component="th"
                    scope="row"
                  >
                    <Typography
                      variant="subtitle1"
                      color="text.primary"
                      fontWeight={600}
                    >
                      {namespace.name}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Box
                      display={'flex'}
                      justifyContent={'center'}
                    >
                      {namespace.export && (
                        <Box
                          component={Avatar}
                          bgcolor="#1c76d2"
                          width={20}
                          height={20}
                        >
                          <svg
                            width={12}
                            height={12}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </Box>
                      )}
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    <Box
                      display={'flex'}
                      justifyContent={'center'}
                    >
                      {namespace.import && (
                        <Box
                          component={Avatar}
                          bgcolor="#1c76d2"
                          width={20}
                          height={20}
                        >
                          <svg
                            width={12}
                            height={12}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </Box>
                      )}
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default Namespaces;
