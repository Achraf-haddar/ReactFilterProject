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

import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import DialogActions from '@mui/material/DialogActions';

const emails = ['username@gmail.com', 'user02@gmail.com'];

export interface SimpleDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
  onChangeTableSize: (value: any) => void;
}

function SimpleDialog(props: SimpleDialogProps) {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const submit = () => {
    handleClose()
    props.onChangeTableSize(checked)
  }

  const [checked, setChecked] = React.useState([false, false, false]);
  // Hold'em Handle changes
  const handleChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked([event.target.checked, event.target.checked, event.target.checked]);
  };

  const handleChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked([event.target.checked, checked[1], checked[2]]);
  };

  const handleChange3 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked([checked[0], event.target.checked, checked[2]]);
  };

  const handleChange4 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked([checked[0], checked[1], event.target.checked]);
  };

  
  const children = (
    <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
      <FormControlLabel
        label="7-10 Players"
        control={<Checkbox checked={checked[0]} onChange={handleChange2} />}
      />
      <FormControlLabel
        label="3-6 Players"
        control={<Checkbox checked={checked[1]} onChange={handleChange3} />}
      />
      <FormControlLabel
        label="2 Players"
        control={<Checkbox checked={checked[2]} onChange={handleChange4} />}
      />
    </Box>
  );

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen} fullWidth>
        Table Size Filter
      </Button>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Table Size Filter</DialogTitle>
        {/* Hold'em */}
        <List sx={{ pt: 0 }}>
            <ListItem button>
              <FormControlLabel
                label="All"
                control={
                  <Checkbox
                    checked={checked[0] && checked[1] && checked[2]}
                    indeterminate={(checked[0] || checked[1] || checked[2]) && !(checked[0] && checked[1] && checked[2])}
                    onChange={handleChange1}
                  />
                }
              />
              {children}
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

export default function TableSizeFilterComponent({ onChangeTableSize }: any) {
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
        onChangeTableSize={onChangeTableSize}
      />
    </div>
  );
}