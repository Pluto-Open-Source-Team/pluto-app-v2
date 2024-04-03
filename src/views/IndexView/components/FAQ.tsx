import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const questions = [
  {
    id: 'question1',
    question: 'Are my authentication data stored somewhere?',
    answer:
      'All data (access token, app settings, ...) are stored in the local storage of your browser, therefore, no data is stored somewhere else.',
  },
  {
    id: 'question2',
    question: 'How many APIs Pluto Policy Manager communicate with?',
    answer:
      'Pluto Policy Manager only communicates with official Google API, there is no middleware or any 3rd party API involved.',
  },
  {
    id: 'question3',
    question: 'Can I make changes to the source code of Pluto Policy Manager?',
    answer:
      'Yes you can make changes to the source code of the application. The code is available on our GitHub organisation.',
  },
];
const FAQ = (): JSX.Element => {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <Container
      id="faq"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: { xs: 3, sm: 6 },
      }}
    >
      <Typography
        component="h2"
        variant="h4"
        color="text.primary"
        sx={{
          width: { sm: '100%', md: '60%' },
          textAlign: 'center',
        }}
      >
        Frequently asked questions
      </Typography>
      <Box sx={{ width: '100%' }}>
        {questions.map((question) => (
          <Accordion
            expanded={expanded === question.id}
            onChange={handleChange(question.id)}
            key={question.id}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              id={`${question.id}-header`}
            >
              <Typography
                component="h3"
                variant="subtitle2"
              >
                {question.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography
                variant="body2"
                gutterBottom
                sx={{ maxWidth: { sm: '100%', md: '70%' } }}
              >
                {question.answer}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Container>
  );
};

export default FAQ;
