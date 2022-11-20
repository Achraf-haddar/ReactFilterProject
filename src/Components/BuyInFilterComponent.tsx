import * as React from 'react';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import Slider from '@mui/material/Slider';

import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import DialogActions from '@mui/material/DialogActions';
import SliderComponent from './SliderComponent';

const emails = ['username@gmail.com', 'user02@gmail.com'];

export interface SimpleDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
  onChangeBuyIn: (value: any) => void;
}

function SimpleDialog(props: SimpleDialogProps) {
  const [values, setValues] = React.useState([0, 100]);
  

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const submit = () => {
    handleClose()
    props.onChangeBuyIn(values)
  }
  const minDistance = 10;
  const handleChange = (
    event: Event,
    newValue: number | number[],
    activeThumb: number,
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setValues([Math.min(newValue[0], values[1] - minDistance), values[1]]);
    } else {
      setValues([values[0], Math.max(newValue[1], values[0] + minDistance)]);
    }
  };
  function valuetext(value: number) {
    return `${value}°C`;
  }

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen} fullWidth>
        Buy In Filter
      </Button>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Buy In Filter</DialogTitle>
        
        <List sx={{ pt: 0 }}>
            <ListItem button>
              <FormControlLabel
                label={null}
                control={
                  <Box sx={{ width: 300 }}>
                    <Slider
                      getAriaLabel={() => 'Minimum distance'}
                      value={values}
                      onChange={handleChange}
                      valueLabelDisplay="auto"
                      getAriaValueText={valuetext}
                      disableSwap
                    />
                  </Box>
                }
              />
            </ListItem>
        </List>

    
        <DialogActions>
            <Button onClick={handleClose}>Disagree</Button>
            <Button onClick={submit} autoFocus>
              Agree
            </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default function BuyInFilterComponent({ onChangeBuyIn }: any) {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: string) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <div>
      <br />
     
    <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
        onChangeBuyIn={onChangeBuyIn}
    />
        
    </div>
  );
}