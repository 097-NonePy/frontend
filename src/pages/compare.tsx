import { SelectChangeEvent, Avatar, Box, Button, Checkbox, CheckboxProps, Chip, MenuItem, Select, styled, TextField, Typography, CircularProgress } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { Iconify } from 'src/components/iconify';
import { SvgColor } from 'src/components/svg-color';
import { useState } from 'react'; // Add this import
import ReactMarkdown from 'react-markdown'


import { CONFIG } from 'src/config-global';
import { DashboardContent } from 'src/layouts/dashboard';

import { BlogView } from 'src/sections/blog/view';

const BpIcon = styled('span')(({ theme }) => ({
  borderRadius: 3,
  width: 16,
  height: 16,
  boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
  backgroundColor: '#f5f8fa',
  backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
  '.Mui-focusVisible &': {
    outline: '2px auto rgba(19,124,189,.6)',
    outlineOffset: 2,
  },
  'input:hover ~ &': {
    backgroundColor: '#ebf1f5',
    ...theme.applyStyles('dark', {
      backgroundColor: '#30404d',
    }),
  },
  'input:disabled ~ &': {
    boxShadow: 'none',
    background: 'rgba(206,217,224,.5)',
    ...theme.applyStyles('dark', {
      background: 'rgba(57,75,89,.5)',
    }),
  },
  ...theme.applyStyles('dark', {
    boxShadow: '0 0 0 1px rgb(16 22 26 / 40%)',
    backgroundColor: '#394b59',
    backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))',
  }),
}));

const BpCheckedIcon = styled(BpIcon)({
  backgroundColor: '#137cbd',
  backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
  '&::before': {
    display: 'block',
    width: 16,
    height: 16,
    backgroundImage:
      "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
      " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
      "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
    content: '""',
  },
  'input:hover ~ &': {
    backgroundColor: '#106ba3',
  },
});

// Inspired by blueprintjs
function BpCheckbox(props: CheckboxProps) {
  return (
    <Checkbox
      sx={{ '&:hover': { bgcolor: 'transparent' } }}
      disableRipple
      color="default"
      checkedIcon={<BpCheckedIcon />}
      icon={<BpIcon />}
      inputProps={{ 'aria-label': 'Checkbox demo' }}
      {...props}
    />
  );
}

// ----------------------------------------------------------------------

interface RequestData {
  namal: boolean;
  sajith: boolean;
  ranil: boolean;
  compare_2019: boolean;
  field: string;
  instructions: string;
}

type CheckboxState = 'namal' | 'sajith' | 'ranil' | 'contrast'; // Define a type for checkbox names

export default function Page() {
  // Define state for checkboxes and select
  const [checkboxStates, setCheckboxStates] = useState({
    namal: false,
    sajith: false,
    ranil: false,
    contrast: false,
  });
  const [focus, setFocus] = useState('');
  const [instructions, setInstructions] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const handleCheckboxChange = (name: CheckboxState) => { // Use the defined type
    setCheckboxStates((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const handleSelectChange = (event: SelectChangeEvent<string>) => { // Update the parameter type
    setFocus(event.target.value as string);
  };

  const handleCompareClick = async () => { // Make it async
    setLoading(true); // Set loading to true
    const requestData: RequestData = {
      namal: checkboxStates.namal,
      sajith: checkboxStates.sajith,
      ranil: checkboxStates.ranil,
      compare_2019: checkboxStates.contrast,
      field: focus,
      instructions,
    };

    try {
      const response = await fetch('http://localhost:8000/compare', { // Replace with your API endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });
      // Handle response if needed
      const data = await response.json();
      console.log(data);
      if (data.error) {
        setError(data.error);
        setResult('');
      } else {
        setResult(data.answer);
        setError('');
      }
    } catch (e) {
      console.error('Error sending request:', e);
      setError('Error sending request');
      setResult('');
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  const handleInstructionsChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInstructions(event.target.value);
  };  

  return (
    <>
      <Helmet>
        <title> Compare Manifests </title>
      </Helmet>
      <DashboardContent>
        <Box display="flex" alignItems="center" mb={5}>
          <Typography variant="h4" flexGrow={1}>
            Compare Manifests
          </Typography>
        </Box>
        <Box display="flex" flexDirection="column" gap={2}>
          <Box display="flex" alignItems="center" sx={{ backgroundColor: '#f5f5f5', padding: 1, borderRadius: 1 }}>
            <Avatar alt="Namal Rajapakse" src="assets/images/avatar/namal.jpg" />
            <Typography variant="body1" sx={{ marginLeft: 1 }}>
              Namal Rajapakse
            </Typography>
            <BpCheckbox 
              sx={{ marginLeft: 'auto' }} 
              checked={checkboxStates.namal} 
              onChange={() => handleCheckboxChange('namal')} 
            />
          </Box>
          <Box display="flex" alignItems="center" sx={{ backgroundColor: '#f5f5f5', padding: 1, borderRadius: 1 }}>
            <Avatar alt="Sajith Premadasa" src="assets/images/avatar/sajith.jpg" />
            <Typography variant="body1" sx={{ marginLeft: 1 }}>
              Sajith Premadasa
            </Typography>
            <BpCheckbox 
              sx={{ marginLeft: 'auto' }} 
              checked={checkboxStates.sajith} 
              onChange={() => handleCheckboxChange('sajith')} 
            />
          </Box>
          <Box display="flex" alignItems="center" sx={{ backgroundColor: '#f5f5f5', padding: 1, borderRadius: 1 }}>
            <Avatar alt="Ranil Wikramasinghe" src="assets/images/avatar/ranil.jpg" />
            <Typography variant="body1" sx={{ marginLeft: 1 }}>
              Ranil Wikramasinghe
            </Typography>
            <BpCheckbox 
              sx={{ marginLeft: 'auto' }} 
              checked={checkboxStates.ranil} 
              onChange={() => handleCheckboxChange('ranil')} 
            />
          </Box>

          <Box display="flex" alignItems="center" sx={{ backgroundColor: '#f5f5f5', padding: 1, borderRadius: 1 }}>
          <Typography variant="body1" sx={{ marginRight: 1 }}>
            Focus on
          </Typography>
          <Select
            defaultValue=""
            onChange={handleSelectChange}
            sx={{ marginLeft: 'auto', minWidth: 120 }}
            inputProps={{ 'aria-label': 'Compare' }}
          >
            <MenuItem value="education">Education</MenuItem>
            <MenuItem value="healthcare">Healthcare</MenuItem>
            <MenuItem value="misc">Misc.</MenuItem>
          </Select>
          </Box>

        <Box display="flex" alignItems="center" sx={{ backgroundColor: '#f5f5f5', padding: 1, borderRadius: 1 }}>
          <Typography variant="body1" sx={{ marginRight: 1 }}>
            Contrast to 2019:
          </Typography>
          <BpCheckbox 
            sx={{ marginLeft: 'auto' }} 
            checked={checkboxStates.contrast} 
            onChange={() => handleCheckboxChange('contrast')} 
          />
        </Box>

        <Box display="flex" flexDirection="column" alignItems="center" gap={1} sx={{ backgroundColor: '#f5f5f5', padding: 1, borderRadius: 1 }}>
          <Typography variant="body1" sx={{ marginRight: 'auto'}}>
              Instructions
            </Typography>
          <TextField
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            placeholder="Enter your instructions here"
            inputProps={{ 'aria-label': 'Instructions' }}
            onChange={handleInstructionsChange}
          />
        </Box>
        <Box display="flex" alignItems="center" sx={{ backgroundColor: 'transparent', padding: 1, borderRadius: 1 }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={loading ? <CircularProgress size={20} /> : <SvgColor src="/assets/icons/navbar/ic-balance.svg" />}
            sx={{ marginLeft: 'auto' }}
            onClick={handleCompareClick}
            disabled={loading} // Disable button while loading
          >
            {loading ? 'Comparing...' : 'Compare'} {/* Change button text */}
          </Button>
        </Box>
        </Box>

        {
          result && (
            <Box display="flex" flexDirection="column" alignItems="center" marginTop={2} sx={{ backgroundColor: '#e0f7fa', padding: 2, borderRadius: 1 }}>
              <Typography variant="body1" sx={{ textAlign: 'center' }}>
                <ReactMarkdown>
                  {result}
                </ReactMarkdown>
              </Typography>
            </Box>
          )
        }

        {
          error && (
            <Box display="flex" flexDirection="column" alignItems="center" marginTop={2} sx={{ backgroundColor: '#f5f5f5', padding: 2, borderRadius: 1 }}>
              <Typography variant="body1" sx={{ textAlign: 'center', color: 'red' }}>
                {error}
              </Typography>
            </Box>
          )
        }
      </DashboardContent>
    </>
  );
}
